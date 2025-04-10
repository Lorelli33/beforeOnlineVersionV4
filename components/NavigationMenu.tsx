'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Plane, Coins, Brain, FileCheck, Anchor, Users } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

const NavigationMenu: React.FC = () => {
  const pathname = usePathname();
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [showServicesMenu, setShowServicesMenu] = useState(false);
  const [showWeb3Menu, setShowWeb3Menu] = useState(false);
  const servicesMenuRef = useRef<HTMLDivElement>(null);
  const web3MenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    checkAdminStatus();
    
    // Check if URL has hash for empty legs
    if (window.location.hash === '#empty-legs') {
      setShowServicesMenu(false);
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesMenuRef.current && !servicesMenuRef.current.contains(event.target as Node)) {
        setShowServicesMenu(false);
      }
      if (web3MenuRef.current && !web3MenuRef.current.contains(event.target as Node)) {
        setShowWeb3Menu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const checkAdminStatus = async () => {
    if (!user) return;
    
    try {
      const { data: userData, error } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', user.id)
        .single();

      if (!error && userData) {
        setIsAdmin(userData.is_admin);
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
    }
  };

  const handleEmptyLegsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (pathname === '/fixed-offers') {
      const emptyLegsTab = document.querySelector('button[id="empty-legs"]');
      if (emptyLegsTab) {
        emptyLegsTab.click();
      }
    } else {
      window.location.href = '/fixed-offers#empty-legs';
    }
    setShowServicesMenu(false);
  };

  return (
    <nav className="hidden md:flex items-center gap-8">
      {/* Services Dropdown */}
      <div className="relative" ref={servicesMenuRef}>
        <button 
          className="flex items-center gap-1 text-sm text-black hover:text-gray-600 transition-colors"
          onClick={() => setShowServicesMenu(!showServicesMenu)}
          onMouseEnter={() => setShowServicesMenu(true)}
        >
          <span>Services</span>
          <ChevronDown size={16} className={`transition-transform ${showServicesMenu ? 'rotate-180' : ''}`} />
        </button>
        
        {showServicesMenu && (
          <div 
            className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50"
            onMouseLeave={() => setShowServicesMenu(false)}
          >
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">Charter Services</div>
            <Link 
              href="/services/private-jet-charter" 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Private Jet Charter
            </Link>
            <Link 
              href="/services/group-charter" 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Group Charter
            </Link>
            <Link 
              href="/services/helicopter-charter" 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Helicopter Charter
            </Link>
            <Link 
              href="/services/yacht-charter" 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Yacht Charter
            </Link>

            <div className="border-t border-gray-100 my-2"></div>
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">Quick Links</div>
            <Link 
              href="/fixed-offers" 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Fixed Offers
            </Link>
            <a 
              href="/fixed-offers#empty-legs" 
              onClick={handleEmptyLegsClick}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Empty Legs
            </a>
            <Link 
              href="/visa-services" 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Visa Services
            </Link>
            <Link 
              href="/partners" 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Partner With Us
            </Link>
          </div>
        )}
      </div>

      {/* Web3 Dropdown */}
      <div className="relative" ref={web3MenuRef}>
        <button 
          className="flex items-center gap-1 text-sm text-black hover:text-gray-600 transition-colors"
          onClick={() => setShowWeb3Menu(!showWeb3Menu)}
          onMouseEnter={() => setShowWeb3Menu(true)}
        >
          <span>Web3</span>
          <ChevronDown size={16} className={`transition-transform ${showWeb3Menu ? 'rotate-180' : ''}`} />
        </button>
        
        {showWeb3Menu && (
          <div 
            className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50"
            onMouseLeave={() => setShowWeb3Menu(false)}
          >
            <Link 
              href="/web3/ico" 
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Coins size={16} className="text-blue-500" />
              <div>
                <div className="font-medium">PVCX Token</div>
                <div className="text-xs text-gray-500">Tokenized loyalty program</div>
              </div>
            </Link>
            <Link 
              href="/web3/nft-collection" 
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Plane size={16} className="text-purple-500" />
              <div>
                <div className="font-medium">Flight NFTs</div>
                <div className="text-xs text-gray-500">Collectible flight records</div>
              </div>
            </Link>
            <Link 
              href="/web3/ai-travel-agent" 
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Brain size={16} className="text-green-500" />
              <div>
                <div className="font-medium">AI Travel Agent</div>
                <div className="text-xs text-gray-500">Smart travel planning</div>
              </div>
            </Link>
            <Link 
              href="/web3/flight-tracker" 
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <FileCheck size={16} className="text-orange-500" />
              <div>
                <div className="font-medium">Flight Tracker</div>
                <div className="text-xs text-gray-500">Blockchain-verified flights</div>
              </div>
            </Link>
          </div>
        )}
      </div>
      
      <Link href="/how-it-works" className="text-sm text-black hover:text-gray-600 transition-colors">
        How It Works
      </Link>
      
      <Link href="/safety" className="text-sm text-black hover:text-gray-600 transition-colors">
        Safety
      </Link>
      
      <Link href="/contact" className="text-sm text-black hover:text-gray-600 transition-colors">
        Support
      </Link>

      <Link href="/partners" className="text-sm text-black hover:text-gray-600 transition-colors flex items-center gap-1">
        <Users size={16} />
        <span>Partners</span>
      </Link>
    </nav>
  );
}

export default NavigationMenu;