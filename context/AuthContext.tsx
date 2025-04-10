'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { User, UserProfile } from '@/types/auth';
import { logger } from '@/utils/logger';
import { web3Service } from '@/lib/web3';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  loginWithWallet: () => Promise<{ error?: string }>;
  register: (email: string, password: string, name: string, phone?: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkUser();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthChange);
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function checkUser() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await fetchUserData(session.user.id);
      }
    } catch (error) {
      logger.error('Error checking user session:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAuthChange(event: string, session: any) {
    if (event === 'SIGNED_IN' && session?.user) {
      await fetchUserData(session.user.id);
    } else if (event === 'SIGNED_OUT') {
      setUser(null);
      setProfile(null);
      router.push('/');
    }
  }

  async function fetchUserData(userId: string): Promise<void> {
    try {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (userError) throw userError;

      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (profileError) throw profileError;

      setUser(userData);
      setProfile(profileData);
      setError(null);
    } catch (error) {
      logger.error('Error fetching user data:', error);
      setError('Failed to fetch user data');
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return { error: 'Invalid email or password' };
      }

      if (!user) {
        return { error: 'Login failed. Please try again.' };
      }

      return {};
    } catch (error) {
      logger.error('Login error:', error);
      return { error: 'An unexpected error occurred' };
    }
  };

  const loginWithWallet = async () => {
    try {
      const address = await web3Service.connect('metamask');
      if (!address) {
        return { error: 'Failed to connect wallet' };
      }

      // Sign message to prove ownership
      const message = `Sign this message to authenticate with PrivateCharterX\nNonce: ${Date.now()}`;
      const signature = await web3Service.signMessage(message);

      // Use wallet address as email
      const email = `${address.toLowerCase()}@wallet.privatecharterx.com`;
      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email,
        password: signature
      });

      if (error) {
        // If user doesn't exist, create one
        if (error.message.includes('Invalid login credentials')) {
          return register(email, signature, `Wallet ${address.slice(0, 6)}...${address.slice(-4)}`, undefined);
        }
        throw error;
      }

      return {};
    } catch (error) {
      logger.error('Wallet login error:', error);
      return { error: error instanceof Error ? error.message : 'Failed to login with wallet' };
    }
  };

  const register = async (email: string, password: string, name: string, phone?: string) => {
    try {
      const { data: { user }, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            phone
          }
        }
      });

      if (error) {
        return { error: error.message };
      }

      if (!user) {
        return { error: 'Registration failed' };
      }

      return {};
    } catch (error) {
      logger.error('Registration error:', error);
      return { error: 'Registration failed. Please try again.' };
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setProfile(null);
      router.push('/');

      // Also disconnect wallet if connected
      if (web3Service.isConnected()) {
        await web3Service.disconnect();
      }
    } catch (error) {
      logger.error('Logout error:', error);
      throw error;
    }
  };

  const value = {
    user,
    profile,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    loginWithWallet,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}