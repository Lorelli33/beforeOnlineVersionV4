import React from 'react';
import { ArrowLeft, ExternalLink, Image } from 'lucide-react';

interface NFTManagementProps {
  onBack: () => void;
}

interface NFT {
  id: string;
  title: string;
  imageUrl: string;
  flightNumber: string;
  date: string;
  openseaUrl: string;
}

const mockNFTs: NFT[] = [
  {
    id: '1',
    title: 'London to New York Private Flight',
    imageUrl: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80',
    flightNumber: 'PCX123',
    date: '2025-03-15',
    openseaUrl: 'https://opensea.io/Privatecharterx'
  },
  {
    id: '2',
    title: 'Dubai to Maldives Luxury Flight',
    imageUrl: 'https://images.unsplash.com/photo-1583373834259-46cc92173cb7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80',
    flightNumber: 'PCX456',
    date: '2025-03-16',
    openseaUrl: 'https://opensea.io/Privatecharterx'
  }
];

export default function NFTManagement({ onBack }: NFTManagementProps) {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div>
          <h2 className="text-xl font-bold">NFT Collection</h2>
          <p className="text-sm text-gray-500">Manage your flight NFTs</p>
        </div>
      </div>

      {/* NFT Grid */}
      {mockNFTs.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {mockNFTs.map((nft) => (
            <div key={nft.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
              <div className="relative h-32">
                <img 
                  src={nft.imageUrl}
                  alt={nft.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm mb-1 line-clamp-1">{nft.title}</h3>
                <div className="text-xs text-gray-500 mb-2">
                  Flight {nft.flightNumber} • {new Date(nft.date).toLocaleDateString()}
                </div>
                <a
                  href={nft.openseaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1 bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 transition-colors text-xs font-medium"
                >
                  View on OpenSea
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Image size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">No NFTs yet</h3>
          <p className="text-gray-500 mt-2">
            Your NFT collection will appear here once you receive your first flight NFT.
          </p>
          <a 
            href="/nft-collection"
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
          >
            Browse NFT Collection
            <ArrowLeft size={16} />
          </a>
        </div>
      )}
    </div>
  );
}