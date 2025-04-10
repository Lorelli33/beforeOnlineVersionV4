import React, { useState, useEffect } from 'react';
import { Bell, Mail, Calendar, Plane, FileCheck, Check, X } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  created_at: string;
  user?: {
    name: string;
    email: string;
  };
}

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('notifications')
        .select(`
          *,
          user:user_id (
            name,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setNotifications(data || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setError('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId);

      if (error) throw error;

      fetchNotifications();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('read', false);

      if (error) throw error;

      fetchNotifications();
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking_update':
        return <Plane size={20} className="text-blue-500" />;
      case 'document_status':
        return <FileCheck size={20} className="text-green-500" />;
      case 'calendar':
        return <Calendar size={20} className="text-purple-500" />;
      case 'email':
        return <Mail size={20} className="text-orange-500" />;
      default:
        return <Bell size={20} className="text-gray-500" />;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    return notification.type === activeTab;
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
        <h2 className="text-2xl font-bold">Notification Center</h2>
        <p className="text-gray-600">Manage system notifications and alerts</p>
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
              All Notifications
            </button>
            <button
              onClick={() => setActiveTab('unread')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'unread'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Unread
            </button>
            <button
              onClick={() => setActiveTab('booking_update')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'booking_update'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Booking Updates
            </button>
            <button
              onClick={() => setActiveTab('document_status')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'document_status'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Document Status
            </button>
          </nav>
        </div>
      </div>

      {/* Actions */}
      <div className="mb-6">
        <button
          onClick={handleMarkAllAsRead}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
        >
          Mark All as Read
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-xl border p-4 ${
                !notification.read ? 'border-black' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {notification.message}
                      </p>
                      {notification.user && (
                        <p className="text-xs text-gray-500 mt-2">
                          For: {notification.user.name} ({notification.user.email})
                        </p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(notification.created_at).toLocaleString()}
                      </p>
                    </div>
                    {!notification.read && (
                      <button
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="flex-shrink-0 p-1 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <Check size={16} className="text-gray-500" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">No notifications found</h3>
            <p className="text-gray-500 mt-2">
              {activeTab === 'unread'
                ? 'No unread notifications.'
                : activeTab === 'booking_update'
                ? 'No booking updates.'
                : activeTab === 'document_status'
                ? 'No document status updates.'
                : 'No notifications in the system.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}