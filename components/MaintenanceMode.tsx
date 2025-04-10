import React from 'react';
import Logo from './Logo';

interface MaintenanceModeProps {
  isAdmin?: boolean;
  onDisable?: () => void;
}

export default function MaintenanceMode({ isAdmin, onDisable }: MaintenanceModeProps) {
  return (
    <div className="fixed inset-0 bg-white z-[9999] flex items-center justify-center">
      <div className="max-w-lg w-full mx-4 text-center">
        {isAdmin && (
          <button
            onClick={onDisable}
            className="fixed top-4 right-4 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Disable Maintenance Mode
          </button>
        )}
        
        <div className="mb-8">
          <Logo />
        </div>

        <h1 className="text-2xl font-bold mb-4">Under Maintenance</h1>
        <p className="text-gray-600">
          We're currently performing scheduled maintenance.<br />
          Please check back soon.
        </p>
      </div>
    </div>
  );
}