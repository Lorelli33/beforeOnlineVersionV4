import React, { useState, useEffect } from 'react';
import { Settings, Save, RefreshCw, Shield, Server, Mail } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

interface ServerConfig {
  email_settings: {
    smtp_host: string;
    smtp_port: number;
    smtp_secure: boolean;
  };
  server_status: {
    maintenance_mode: boolean;
    version: string;
  };
  api_limits: {
    max_requests_per_minute: number;
    max_concurrent_connections: number;
  };
}

export default function SystemSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [config, setConfig] = useState<ServerConfig>({
    email_settings: {
      smtp_host: '',
      smtp_port: 587,
      smtp_secure: false
    },
    server_status: {
      maintenance_mode: false,
      version: '1.0.0'
    },
    api_limits: {
      max_requests_per_minute: 60,
      max_concurrent_connections: 100
    }
  });

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('server_config')
        .select('*');

      if (error) throw error;

      const configObj: ServerConfig = {
        email_settings: { smtp_host: '', smtp_port: 587, smtp_secure: false },
        server_status: { maintenance_mode: false, version: '1.0.0' },
        api_limits: { max_requests_per_minute: 60, max_concurrent_connections: 100 }
      };

      data?.forEach(item => {
        if (item.key in configObj) {
          configObj[item.key as keyof ServerConfig] = item.value;
        }
      });

      setConfig(configObj);
    } catch (error) {
      console.error('Error fetching config:', error);
      setError('Failed to load system settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);

      // Update each config section
      for (const [key, value] of Object.entries(config)) {
        const { error } = await supabase
          .from('server_config')
          .upsert({ key, value })
          .eq('key', key);

        if (error) throw error;
      }

      // Show success message
      alert('Settings saved successfully');
    } catch (error) {
      console.error('Error saving config:', error);
      setError('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">System Settings</h2>
        <p className="text-gray-600">Configure system-wide settings and parameters</p>
      </div>

      <div className="space-y-6">
        {/* Email Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Mail size={20} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Email Settings</h3>
                <p className="text-sm text-gray-500">Configure email server settings</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SMTP Host
                </label>
                <input
                  type="text"
                  value={config.email_settings.smtp_host}
                  onChange={(e) => setConfig({
                    ...config,
                    email_settings: {
                      ...config.email_settings,
                      smtp_host: e.target.value
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SMTP Port
                </label>
                <input
                  type="number"
                  value={config.email_settings.smtp_port}
                  onChange={(e) => setConfig({
                    ...config,
                    email_settings: {
                      ...config.email_settings,
                      smtp_port: parseInt(e.target.value)
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div className="col-span-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={config.email_settings.smtp_secure}
                    onChange={(e) => setConfig({
                      ...config,
                      email_settings: {
                        ...config.email_settings,
                        smtp_secure: e.target.checked
                      }
                    })}
                    className="rounded border-gray-300 text-black focus:ring-black"
                  />
                  <span className="text-sm text-gray-700">Use secure connection (TLS)</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Server Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <Server size={20} className="text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Server Status</h3>
                <p className="text-sm text-gray-500">Manage server status and version</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Version
                </label>
                <input
                  type="text"
                  value={config.server_status.version}
                  onChange={(e) => setConfig({
                    ...config,
                    server_status: {
                      ...config.server_status,
                      version: e.target.value
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={config.server_status.maintenance_mode}
                    onChange={(e) => setConfig({
                      ...config,
                      server_status: {
                        ...config.server_status,
                        maintenance_mode: e.target.checked
                      }
                    })}
                    className="rounded border-gray-300 text-black focus:ring-black"
                  />
                  <span className="text-sm text-gray-700">Maintenance Mode</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* API Limits */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <Shield size={20} className="text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg">API Limits</h3>
                <p className="text-sm text-gray-500">Configure API rate limits</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Requests per Minute
                </label>
                <input
                  type="number"
                  value={config.api_limits.max_requests_per_minute}
                  onChange={(e) => setConfig({
                    ...config,
                    api_limits: {
                      ...config.api_limits,
                      max_requests_per_minute: parseInt(e.target.value)
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Concurrent Connections
                </label>
                <input
                  type="number"
                  value={config.api_limits.max_concurrent_connections}
                  onChange={(e) => setConfig({
                    ...config,
                    api_limits: {
                      ...config.api_limits,
                      max_concurrent_connections: parseInt(e.target.value)
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={fetchConfig}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <RefreshCw size={18} />
            <span>Refresh</span>
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save size={18} />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}