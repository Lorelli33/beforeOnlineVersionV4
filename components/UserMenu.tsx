import React, { useState, useRef, useEffect } from 'react';
import { User, Settings, LogOut, CreditCard, History, Coins, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Dashboard from './Dashboard';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

interface UserMenuProps {
  onLogout?: () => void;
}

export default function UserMenu({ onLogout }: UserMenuProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
      if (onLogout) onLogout();
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/95 backdrop-blur-sm hover:bg-white/100 transition-colors shadow-lg border border-white/20"
          aria-label="User menu"
        >
          <div className="flex items-center gap-2">
            <User size={18} className="text-gray-700" />
            <span className="text-sm font-medium hidden md:block">
              {isAuthenticated ? (user?.name || 'Account') : 'Sign In'}
            </span>
          </div>
          <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
            {isAuthenticated ? (
              <>
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="text-sm text-gray-500">Welcome{user?.name ? `, ${user.name}` : ''}!</div>
                  <div className="font-medium">{user?.email}</div>
                </div>
                
                <div className="py-1">
                  <button
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    onClick={() => {
                      setIsOpen(false);
                      setShowDashboard(true);
                    }}
                  >
                    <CreditCard size={16} />
                    Dashboard
                  </button>
                  <button
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    onClick={() => {
                      setIsOpen(false);
                      setShowDashboard(true);
                    }}
                  >
                    <History size={16} />
                    Flight History
                  </button>
                  <button
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    onClick={() => {
                      setIsOpen(false);
                      setShowDashboard(true);
                    }}
                  >
                    <Coins size={16} />
                    PVCX Rewards
                  </button>
                  <button
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    onClick={() => {
                      setIsOpen(false);
                      setShowDashboard(true);
                    }}
                  >
                    <Settings size={16} />
                    Account Settings
                  </button>
                </div>

                <div className="border-t border-gray-100 py-1">
                  <button
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <div className="py-2">
                <button
                  className="w-full px-4 py-2.5 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    setIsOpen(false);
                    setShowLoginModal(true);
                  }}
                >
                  Sign In
                </button>
                <button
                  className="w-full px-4 py-2.5 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    setIsOpen(false);
                    setShowRegisterModal(true);
                  }}
                >
                  Create Account
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onRegister={() => {
            setShowLoginModal(false);
            setShowRegisterModal(true);
          }}
        />
      )}

      {showRegisterModal && (
        <RegisterModal
          onClose={() => setShowRegisterModal(false)}
          onLogin={() => {
            setShowRegisterModal(false);
            setShowLoginModal(true);
          }}
        />
      )}

      {showDashboard && (
        <Dashboard 
          onClose={() => setShowDashboard(false)}
          onShowHistory={() => {
            setShowDashboard(false);
          }}
          initialView="dashboard"
        />
      )}
    </>
  );
}