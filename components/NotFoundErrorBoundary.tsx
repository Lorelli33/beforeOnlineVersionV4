'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, Home } from 'lucide-react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class NotFoundErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={32} className="text-red-600" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
            <p className="text-gray-600 mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="space-y-4">
              <Link
                href="/"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Home size={18} />
                <span>Return Home</span>
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default NotFoundErrorBoundary;