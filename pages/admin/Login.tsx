import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import Logo from '../../components/Logo';

export default function AdminLogin() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    checkAdminStatus();
  }, [user]);

  const checkAdminStatus = async () => {
    if (!user) {
      setIsChecking(false);
      return;
    }
    
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
    } finally {
      setIsChecking(false);
    }
  };

  if (isChecking) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Logo />
          </div>
          <div className="mt-8 bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-gray-100">
            <div className="flex justify-center">
              <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: '/admin/dashboard' }} replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Navigate to="/admin/dashboard" replace />;
}