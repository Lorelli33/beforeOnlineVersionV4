import React, { useState, useEffect } from 'react';
import { Shield, Clock, User, MapPin, AlertTriangle } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

interface SecurityLog {
  id: string;
  event_type: string;
  user_id: string;
  ip_address: string;
  user_agent: string;
  created_at: string;
  details: any;
  severity: 'low' | 'medium' | 'high';
  user?: {
    email: string;
    name: string;
  };
}

export default function SecurityLogs() {
  const [logs, setLogs] = useState<SecurityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const { data: loginHistory, error: loginError } = await supabase
        .from('login_history')
        .select(`
          id,
          user_id,
          login_time as created_at,
          ip_address,
          device_info as user_agent,
          user:user_id (
            email,
            name
          )
        `)
        .order('login_time', { ascending: false })
        .limit(100);

      if (loginError) throw loginError;

      // Format login history as security logs
      const formattedLogs = loginHistory?.map(log => ({
        id: log.id,
        event_type: 'login',
        user_id: log.user_id,
        ip_address: log.ip_address,
        user_agent: log.user_agent,
        created_at: log.created_at,
        details: { type: 'login_attempt', success: true },
        severity: 'low',
        user: log.user
      })) || [];

      setLogs(formattedLogs);
    } catch (error) {
      console.error('Error fetching security logs:', error);
      setError('Failed to load security logs');
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'login':
        return <User size={20} className="text-blue-500" />;
      case 'failed_login':
        return <AlertTriangle size={20} className="text-red-500" />;
      case 'password_reset':
        return <Shield size={20} className="text-purple-500" />;
      default:
        return <Clock size={20} className="text-gray-500" />;
    }
  };

  const filteredLogs = logs.filter(log => {
    if (activeTab === 'all') return true;
    if (activeTab === 'high') return log.severity === 'high';
    if (activeTab === 'failed') return log.event_type === 'failed_login';
    return true;
  });

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
        <h2 className="text-2xl font-bold">Security Logs</h2>
        <p className="text-gray-600">Monitor system security events and user activity</p>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('all')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'all'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              All Events
            </button>
            <button
              onClick={() => setActiveTab('high')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'high'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              High Severity
            </button>
            <button
              onClick={() => setActiveTab('failed')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'failed'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Failed Attempts
            </button>
          </nav>
        </div>
      </div>

      {/* Logs List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP Address
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Severity
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        {getEventIcon(log.event_type)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {log.event_type.replace('_', ' ').charAt(0).toUpperCase() + log.event_type.slice(1)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {log.user_agent}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {log.user?.name || 'Unknown User'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {log.user?.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <MapPin size={16} className="text-gray-400 mr-1" />
                      <span>{log.ip_address}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(log.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(log.severity)}`}>
                      {log.severity.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">No security events found</h3>
            <p className="text-gray-500 mt-2">
              {activeTab === 'high'
                ? 'No high severity events have been recorded.'
                : activeTab === 'failed'
                ? 'No failed login attempts have been detected.'
                : 'No security events have been logged yet.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}