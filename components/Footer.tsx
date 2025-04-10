'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Twitter, Instagram, Globe, Mail, Phone, Coins, Plane, Brain, FileCheck, Users, Anchor } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

export default function Footer() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [showServicesMenu, setShowServicesMenu] = useState(false);

  useEffect(() => {
    checkAdminStatus();
  }, [user]);

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
    window.location.href = '/fixed-offers#empty-legs';
    setShowServicesMenu(false);
  };

  return (
    <footer className="bg-black text-white">
      <div className="max-w-8xl mx-auto px-6 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-lg font-bold">{t('footer.tagline')}</h2>
            <p className="mt-2 text-sm text-gray-300 max-w-lg">
              {t('footer.description')}
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <a 
                href="tel:+41447978853" 
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Phone size={18} />
                <span>+41 44 797 88 53</span>
              </a>
              <a 
                href="mailto:info@privatecharterx.com"
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-black text-white rounded-lg border border-gray-700 hover:border-gray-500 transition-colors"
              >
                <Mail size={18} />
                <span>{t('footer.emailUs')}</span>
              </a>
              <Link 
                href="/services/private-jet-charter"
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <Plane size={18} className="rotate-90" />
                <span>{t('footer.requestNow')}</span>
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            {/* Services */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">{t('footer.services')}</h3>
              <ul className="space-y-1">
                <li>
                  <Link href="/services/private-jet-charter" className="text-sm text-gray-300 hover:text-white">{t('footer.privateJetCharter')}</Link>
                </li>
                <li>
                  <Link href="/services/group-charter" className="text-sm text-gray-300 hover:text-white">{t('footer.groupCharter')}</Link>
                </li>
                <li>
                  <Link href="/services/helicopter-charter" className="text-sm text-gray-300 hover:text-white">{t('footer.helicopterCharter')}</Link>
                </li>
                <li>
                  <Link href="/services/yacht-charter" className="text-sm text-gray-300 hover:text-white">{t('footer.yachtCharter')}</Link>
                </li>
                <li>
                  <Link href="/fixed-offers" className="text-sm text-gray-300 hover:text-white">{t('footer.fixedOffers')}</Link>
                </li>
                <li>
                  <a 
                    href="/fixed-offers#empty-legs" 
                    onClick={handleEmptyLegsClick}
                    className="text-sm text-gray-300 hover:text-white"
                  >
                    {t('footer.emptyLegs')}
                  </a>
                </li>
                <li>
                  <Link href="/partners" className="text-sm text-gray-300 hover:text-white flex items-center gap-1">
                    <Users size={14} />
                    <span>Partner Program</span>
                  </Link>
                </li>
                <li>
                  <Link href="/partners" className="text-sm text-gray-300 hover:text-white flex items-center gap-1">
                    <Anchor size={14} />
                    <span>List Your Yacht</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Web3 */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">Web3</h3>
              <ul className="space-y-1">
                <li>
                  <Link 
                    href="/web3/ico" 
                    className="text-sm text-gray-300 hover:text-white flex items-center gap-1"
                  >
                    <Coins size={14} />
                    <span>PVCX Token</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/web3/nft-collection" 
                    className="text-sm text-gray-300 hover:text-white flex items-center gap-1"
                  >
                    <Plane size={14} />
                    <span>Flight NFTs</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/web3/ai-travel-agent" 
                    className="text-sm text-gray-300 hover:text-white flex items-center gap-1"
                  >
                    <Brain size={14} />
                    <span>AI Travel Agent</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/web3/flight-tracker" 
                    className="text-sm text-gray-300 hover:text-white flex items-center gap-1"
                  >
                    <FileCheck size={14} />
                    <span>Flight Tracker</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">{t('footer.quickLinks')}</h3>
              <ul className="space-y-1">
                <li>
                  <Link href="/" className="text-sm text-gray-300 hover:text-white">{t('footer.home')}</Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="text-sm text-gray-300 hover:text-white">{t('footer.howItWorks')}</Link>
                </li>
                <li>
                  <Link href="/safety" className="text-sm text-gray-300 hover:text-white">{t('footer.safety')}</Link>
                </li>
                <li>
                  <Link href="/behind-the-scene" className="text-sm text-gray-300 hover:text-white">{t('footer.about')}</Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-gray-300 hover:text-white">{t('footer.support')}</Link>
                </li>
              </ul>
            </div>
            
            {/* Social */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">{t('footer.connect')}</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://x.com/privatecharterx" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-white"
                >
                  <Twitter size={20} />
                </a>
                <a 
                  href="https://www.instagram.com/privatecharterx" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-white"
                >
                  <Instagram size={20} />
                </a>
                <a 
                  href="https://journal.privatecharterx.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-white"
                >
                  <Globe size={20} />
                </a>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-300">
                  {t('footer.subscribeText')}
                </p>
                <div className="mt-2 max-w-[240px]">
                  <div className="flex">
                    <input
                      type="email"
                      placeholder={t('footer.enterEmail')}
                      className="flex-1 min-w-0 px-3 py-1.5 text-sm border border-gray-700 bg-gray-800 rounded-l-lg focus:ring-2 focus:ring-white focus:border-transparent text-white"
                    />
                    <button className="px-3 py-1.5 bg-white text-black text-sm rounded-r-lg hover:bg-gray-200 transition-colors whitespace-nowrap">
                      {t('footer.subscribe')}
                    </button>
                  </div>
                </div>
              </div> </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} PrivateCharterX. {t('footer.allRightsReserved')}
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/impressum" className="text-sm text-gray-400 hover:text-white">Impressum</Link>
            <Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-white">{t('footer.privacyPolicy')}</Link>
            <Link href="/terms" className="text-sm text-gray-400 hover:text-white">{t('footer.termsOfService')}</Link>
            <Link href="/cookie-policy" className="text-sm text-gray-400 hover:text-white">{t('footer.cookiePolicy')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}