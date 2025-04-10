'use client';

import { ethers } from 'ethers';
import { logger } from '@/utils/logger';

// Supported wallet types
export const SUPPORTED_WALLETS = [
  {
    id: 'metamask',
    name: 'MetaMask',
    icon: 'https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/metamask-fox.svg',
    description: 'Connect using browser extension'
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    icon: 'https://raw.githubusercontent.com/WalletConnect/walletconnect-assets/master/Logo/Blue%20(Default)/Logo.svg',
    description: 'Connect using mobile wallet'
  }
];

// Contract addresses
export const PVCX_TOKEN_ADDRESS = {
  sepolia: '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199',
  mainnet: '0xdef1cafe000000000000000000000000000000000'
};

// ABI for ERC20 token functions
export const TOKEN_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
  'function transfer(address to, uint amount) returns (bool)',
  'event Transfer(address indexed from, address indexed to, uint amount)'
];

class Web3Service {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.JsonRpcSigner | null = null;
  private account: string | null = null;
  private chainId: number | null = null;
  private initialized: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeProvider();
    }
  }

  private async initializeProvider() {
    try {
      if (typeof window !== 'undefined' && window.ethereum) {
        this.provider = new ethers.BrowserProvider(window.ethereum);
        this.setupEventListeners();
        
        // Check if already connected
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts && accounts.length > 0) {
          this.account = accounts[0];
          this.signer = await this.provider.getSigner();
          const network = await this.provider.getNetwork();
          this.chainId = Number(network.chainId);
        }
        
        this.initialized = true;
      }
    } catch (error) {
      logger.error('Error initializing Web3:', error);
      this.initialized = false;
    }
  }

  private setupEventListeners() {
    if (!window.ethereum) return;

    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      this.account = accounts[0] || null;
      if (!accounts.length) {
        this.signer = null;
      }
    });

    window.ethereum.on('chainChanged', async (chainId: string) => {
      this.chainId = parseInt(chainId);
      if (this.provider && this.account) {
        this.signer = await this.provider.getSigner();
      }
    });

    window.ethereum.on('disconnect', () => {
      this.account = null;
      this.signer = null;
      this.chainId = null;
    });
  }

  async connect(walletType: 'metamask' | 'walletconnect'): Promise<string | null> {
    try {
      // Initialize provider if not already done
      if (!this.initialized && typeof window !== 'undefined') {
        await this.initializeProvider();
      }

      if (!this.provider) {
        throw new Error('Web3 provider not available');
      }

      if (walletType === 'metamask') {
        if (!window.ethereum) {
          throw new Error('Please install MetaMask to connect your wallet');
        }

        // Request account access
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });

        if (!accounts || !accounts.length) {
          throw new Error('No accounts found');
        }

        this.account = accounts[0];
        this.signer = await this.provider.getSigner();
        const network = await this.provider.getNetwork();
        this.chainId = Number(network.chainId);

        return this.account;
      }

      throw new Error('WalletConnect support coming soon');
    } catch (error) {
      logger.error('Error connecting wallet:', error);
      throw error;
    }
  }

  async signMessage(message: string): Promise<string> {
    try {
      if (!this.signer) {
        throw new Error('No signer available');
      }
      return await this.signer.signMessage(message);
    } catch (error) {
      logger.error('Error signing message:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    this.signer = null;
    this.account = null;
    this.chainId = null;
  }

  async getBalance(address: string): Promise<string> {
    try {
      if (!this.provider) {
        await this.initializeProvider();
      }
      if (!this.provider) throw new Error('Web3 provider not available');
      
      const balance = await this.provider.getBalance(address);
      return ethers.formatEther(balance);
    } catch (error) {
      logger.error('Error getting balance:', error);
      return '0.0';
    }
  }

  async getTokenBalance(tokenAddress: string, address: string): Promise<string> {
    try {
      if (!this.provider) {
        await this.initializeProvider();
      }
      if (!this.provider) throw new Error('Web3 provider not available');
      
      const contract = new ethers.Contract(tokenAddress, TOKEN_ABI, this.provider);
      const balance = await contract.balanceOf(address);
      const decimals = await contract.decimals();
      
      return ethers.formatUnits(balance, decimals);
    } catch (error) {
      logger.error('Error getting token balance:', error);
      return '0.0';
    }
  }

  isConnected(): boolean {
    return !!this.account && !!this.signer;
  }

  getAccount(): string | null {
    return this.account;
  }

  getChainId(): number | null {
    return this.chainId;
  }

  useAccount() {
    return {
      address: this.account,
      isConnected: this.isConnected()
    };
  }
}

export const web3Service = new Web3Service();