import React, { useState, useEffect } from 'react';
import { Users, Plane, Bell, Settings, LogOut, CreditCard, History, Shield, User, MessageSquare, Coins } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import LoginModal from '../../components/LoginModal';

// Import admin components
import UserManagement from './components/UserManagement';
import BookingManagement from './components/BookingManagement';
import DocumentVerification from './components/DocumentVerification';
import NotificationCenter from './components/NotificationCenter';
import SystemSettings from './components/SystemSettings';
import SecurityLogs from './components/SecurityLogs';
import FixedOffersManagement from './components/FixedOffersManagement';
import FlightManagement from './components/FlightManagement';
import ChatManagement from './components/ChatManagement';
import PaymentTracking from './components/PaymentTracking';

type View = 'users' | 'bookings' | 'documents' | 'notifications' | 'settings' | 'security' | 'offers' | 'flights' | 'chat' | 'payments';

export default function AdminDashboard() {
  const [currentView, setCurrentView] = useState<View>('payments');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminStatus();
  }, [user]);

  const checkAdminStatus = async () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    if (!user) {
      setShowLoginModal(true);
      return;
    }
    
    try {
      const { data: userData, error } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      if (!userData?.is_admin) {
        navigate('/');
        return;
      }

      setIsAdmin(true);
      setShowLoginModal(false);
    } catch (error) {
      console.error('Error checking admin status:', error);
      navigate('/');
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const renderView = () => {
    if (!isAdmin) return null;

    switch (currentView) {
      case 'users':
        return <UserManagement />;
      case 'bookings':
        return <BookingManagement />;
      case 'documents':
        return <DocumentVerification />;
      case 'notifications':
        return <NotificationCenter />;
      case 'settings':
        return <SystemSettings />;
      case 'security':
        return <SecurityLogs />;
      case 'offers':
        return <FixedOffersManagement />;
      case 'flights':
        return <FlightManagement />;
      case 'chat':
        return <ChatManagement />;
      case 'payments':
        return <PaymentTracking />;
      default:
        return null;
    }
  };

  if (!isAdmin) {
    return (
      <>
        {showLoginModal && (
          <LoginModal
            onClose={() => navigate('/')}
            onRegister={() => navigate('/')}
          />
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Logo />
              <h1 className="ml-4 text-xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <User size={18} className="text-gray-600" />
                </div>
                <div className="text-sm">
                  <div className="font-medium text-gray-900">Admin</div>
                  <div className="text-gray-500">{user?.email}</div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="pt-16 flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 fixed left-0 bottom-0 top-16">
          <nav className="p-4 space-y-1">
            <button
              onClick={() => setCurrentView('payments')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                currentView === 'payments' ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Coins size={20} />
              <span>Payments</span>
            </button>
            
            <button
              onClick={() => setCurrentView('chat')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                currentView === 'chat' ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <MessageSquare size={20} />
              <span>Chat Support</span>
            </button>
            
            <button
              onClick={() => setCurrentView('offers')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                currentView === 'offers' ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Plane size={20} />
              <span>Fixed Offers</span>
            </button>
            
            <button
              onClick={() => setCurrentView('bookings')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                currentView === 'bookings' ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <CreditCard size={20} />
              <span>Bookings</span>
            </button>
            
            <button
              onClick={() => setCurrentView('users')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                currentView === 'users' ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Users size={20} />
              <span>User Management</span>
            </button>
            
            <button
              onClick={() => setCurrentView('documents')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                currentView === 'documents' ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <History size={20} />
              <span>Document Verification</span>
            </button>
            
            <button
              onClick={() => setCurrentView('notifications')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                currentView === 'notifications' ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Bell size={20} />
              <span>Notifications</span>
            </button>
            
            <button
              onClick={() => setCurrentView('settings')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                currentView === 'settings' ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Settings size={20} />
              <span>System Settings</span>
            </button>
            
            <button
              onClick={() => setCurrentView('security')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                currentView === 'security' ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Shield size={20} />
              <span>Security Logs</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
}