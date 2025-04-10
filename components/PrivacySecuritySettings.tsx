import React, { useState } from 'react';
import { ArrowLeft, Lock, Shield, Bell, Eye, Key, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

interface PrivacySecuritySettingsProps {
  onBack: () => void;
}

export default function PrivacySecuritySettings({ onBack }: PrivacySecuritySettingsProps) {
  const { user } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [securityPreferences, setSecurityPreferences] = useState({
    two_factor_auth: false,
    login_notifications: true,
    withdrawal_notifications: true,
    suspicious_activity_alerts: true
  });

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    setIsUpdating(true);
    setMessage(null);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      setMessage({ type: 'success', text: 'Password updated successfully' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update password' });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSecurityPreferenceChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    try {
      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user?.id,
          [name]: checked
        });

      if (error) throw error;

      setSecurityPreferences(prev => ({
        ...prev,
        [name]: checked
      }));
    } catch (error) {
      console.error('Error updating security preference:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-start justify-end p-4">
      <div className="bg-white/95 backdrop-blur-md w-full max-w-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden animate-slideIn">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h2 className="text-xl font-bold">Privacy & Security</h2>
              <p className="text-sm text-gray-500">Manage your account security settings</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {message && (
            <div className={`p-4 rounded-lg ${
              message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
              {message.text}
            </div>
          )}

          {/* Password Change */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Key size={20} className="text-gray-700" />
              <h3 className="font-medium text-gray-900">Change Password</h3>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={isUpdating}
                className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdating ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </div>

          {/* Security Preferences */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield size={20} className="text-gray-700" />
              <h3 className="font-medium text-gray-900">Security Preferences</h3>
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="two_factor_auth"
                  checked={securityPreferences.two_factor_auth}
                  onChange={handleSecurityPreferenceChange}
                  className="rounded border-gray-300 text-black focus:ring-black"
                />
                <div>
                  <div className="font-medium">Two-Factor Authentication</div>
                  <div className="text-sm text-gray-500">Add an extra layer of security to your account</div>
                </div>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="login_notifications"
                  checked={securityPreferences.login_notifications}
                  onChange={handleSecurityPreferenceChange}
                  className="rounded border-gray-300 text-black focus:ring-black"
                />
                <div>
                  <div className="font-medium">Login Notifications</div>
                  <div className="text-sm text-gray-500">Get notified of new login attempts</div>
                </div>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="withdrawal_notifications"
                  checked={securityPreferences.withdrawal_notifications}
                  onChange={handleSecurityPreferenceChange}
                  className="rounded border-gray-300 text-black focus:ring-black"
                />
                <div>
                  <div className="font-medium">Withdrawal Notifications</div>
                  <div className="text-sm text-gray-500">Get notified of token withdrawal requests</div>
                </div>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="suspicious_activity_alerts"
                  checked={securityPreferences.suspicious_activity_alerts}
                  onChange={handleSecurityPreferenceChange}
                  className="rounded border-gray-300 text-black focus:ring-black"
                />
                <div>
                  <div className="font-medium">Suspicious Activity Alerts</div>
                  <div className="text-sm text-gray-500">Get notified of unusual account activity</div>
                </div>
              </label>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Eye size={20} className="text-gray-700" />
              <h3 className="font-medium text-gray-900">Privacy Settings</h3>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl space-y-2">
              <p className="text-sm text-gray-600">
                Your privacy is important to us. Review our privacy policy to understand how we handle your data.
              </p>
              <a 
                href="/privacy-policy" 
                className="text-sm text-black font-medium hover:underline inline-flex items-center gap-1"
              >
                View Privacy Policy
                <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Activity Log */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Bell size={20} className="text-gray-700" />
              <h3 className="font-medium text-gray-900">Recent Activity</h3>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl space-y-3">
              <div className="text-sm">
                <div className="font-medium">Last login</div>
                <div className="text-gray-600">
                  {user?.last_login ? new Date(user.last_login).toLocaleString() : 'Never'}
                </div>
              </div>

              <a 
                href="#" 
                className="text-sm text-black font-medium hover:underline inline-flex items-center gap-1"
              >
                View Full Activity Log
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}