'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { MaintenanceProvider } from '@/context/MaintenanceContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider>
          <AuthProvider>
            <MaintenanceProvider>
              <ErrorBoundary>
                {children}
              </ErrorBoundary>
            </MaintenanceProvider>
          </AuthProvider>
        </ThemeProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
}