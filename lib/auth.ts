import { supabase } from './supabase';
import { User, LoginCredentials, RegisterCredentials } from '../types/auth';
import { logger } from '../utils/logger';
import { web3Service } from './web3';

export const login = async (credentials: LoginCredentials): Promise<{ user: User | null; error?: string }> => {
  try {
    const { data: { user }, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password
    });

    if (error) throw error;

    if (!user) {
      return { user: null, error: 'Login failed' };
    }

    // Update last login
    await supabase
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', user.id);

    return { user: user as User };
  } catch (error) {
    logger.error('Login error:', error);
    return { user: null, error: 'Invalid email or password' };
  }
};

export const loginWithWallet = async (): Promise<{ user: User | null; error?: string }> => {
  try {
    // Connect wallet first
    const address = await web3Service.connect('metamask');
    if (!address) {
      throw new Error('Failed to connect wallet');
    }

    // Sign message to prove ownership
    const message = `Sign this message to authenticate with PrivateCharterX\nNonce: ${Date.now()}`;
    const signature = await web3Service.signMessage(message);

    // Authenticate with Supabase using wallet signature
    const { data: { user }, error } = await supabase.auth.signInWithPassword({
      email: `${address.toLowerCase()}@wallet.privatecharterx.com`,
      password: signature
    });

    if (error) {
      // If user doesn't exist, create one
      if (error.message.includes('Invalid login credentials')) {
        return register({
          email: `${address.toLowerCase()}@wallet.privatecharterx.com`,
          password: signature,
          name: `Wallet ${address.slice(0, 6)}...${address.slice(-4)}`,
          walletAddress: address
        });
      }
      throw error;
    }

    return { user: user as User };
  } catch (error) {
    logger.error('Wallet login error:', error);
    return { user: null, error: error instanceof Error ? error.message : 'Failed to login with wallet' };
  }
};

export const register = async (credentials: RegisterCredentials): Promise<{ user: User | null; error?: string }> => {
  try {
    const { data: { user }, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        data: {
          name: credentials.name,
          phone: credentials.phone,
          walletAddress: credentials.walletAddress
        }
      }
    });

    if (error) throw error;

    if (!user) {
      return { user: null, error: 'Registration failed' };
    }

    return { user: user as User };
  } catch (error) {
    logger.error('Registration error:', error);
    return { user: null, error: 'Registration failed. Please try again.' };
  }
};

export const logout = async (): Promise<void> => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    // Also disconnect wallet
    await web3Service.disconnect();
  } catch (error) {
    logger.error('Logout error:', error);
    throw error;
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user as User | null;
  } catch (error) {
    logger.error('Get current user error:', error);
    return null;
  }
};

export const isAuthenticated = async (): Promise<boolean> => {
  const user = await getCurrentUser();
  return !!user;
};