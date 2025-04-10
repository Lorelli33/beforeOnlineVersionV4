'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import MaintenanceMode from '@/components/MaintenanceMode';
import { useAuth } from './AuthContext';

interface MaintenanceContextType {
  isMaintenanceMode: boolean;
  toggleMaintenanceMode: () => Promise<void>;
}

const MaintenanceContext = createContext<MaintenanceContextType | undefined>(undefined);

export function MaintenanceProvider({ children }: { children: React.ReactNode }) {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const { user } = useAuth();
  const isAdmin = user?.is_admin;

  useEffect(() => {
    checkMaintenanceStatus();
  }, []);

  const checkMaintenanceStatus = async () => {
    try {
      const { data } = await supabase
        .from('company_settings')
        .select('maintenance_mode')
        .single();
      
      setIsMaintenanceMode(data?.maintenance_mode || false);
    } catch (error) {
      console.error('Error checking maintenance status:', error);
    }
  };

  const toggleMaintenanceMode = async () => {
    try {
      const { error } = await supabase
        .from('company_settings')
        .update({ maintenance_mode: !isMaintenanceMode })
        .eq('id', 1); // Assuming there's only one settings record

      if (error) throw error;
      
      setIsMaintenanceMode(!isMaintenanceMode);
    } catch (error) {
      console.error('Error toggling maintenance mode:', error);
    }
  };

  return (
    <MaintenanceContext.Provider value={{ isMaintenanceMode, toggleMaintenanceMode }}>
      {isMaintenanceMode && <MaintenanceMode isAdmin={isAdmin} onDisable={isAdmin ? toggleMaintenanceMode : undefined} />}
      {children}
    </MaintenanceContext.Provider>
  );
}

export function useMaintenance() {
  const context = useContext(MaintenanceContext);
  if (context === undefined) {
    throw new Error('useMaintenance must be used within a MaintenanceProvider');
  }
  return context;
}