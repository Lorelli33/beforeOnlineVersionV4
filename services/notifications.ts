import { supabase } from '../lib/supabase';
import { logger } from '../utils/logger';

interface NotificationOptions {
  userId: string;
  type: string;
  title: string;
  message: string;
  smsText?: string;
}

export const sendNotification = async (options: NotificationOptions) => {
  try {
    // Get user notification settings
    const { data: settings, error: settingsError } = await supabase
      .from('notification_settings')
      .select('*')
      .eq('user_id', options.userId)
      .single();

    if (settingsError) throw settingsError;

    // Create in-app notification
    const { error: notificationError } = await supabase
      .from('notifications')
      .insert([{
        user_id: options.userId,
        type: options.type,
        title: options.title,
        message: options.message,
        read: false
      }]);

    if (notificationError) throw notificationError;

    // Send SMS if enabled
    if (settings.sms_notifications && options.smsText) {
      await fetch('/.netlify/functions/send-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: settings.phone,
          message: options.smsText
        })
      });
    }

    return { success: true };
  } catch (error) {
    logger.error('Error sending notification:', error);
    return { success: false, error };
  }
};

export const markNotificationAsRead = async (notificationId: string) => {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    logger.error('Error marking notification as read:', error);
    return { success: false, error };
  }
};

export const getNotificationSettings = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('notification_settings')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return { settings: data, error: null };
  } catch (error) {
    logger.error('Error getting notification settings:', error);
    return { settings: null, error: 'Failed to get notification settings' };
  }
};

export const updateNotificationSettings = async (userId: string, settings: Partial<{
  email_notifications: boolean;
  sms_notifications: boolean;
  push_notifications: boolean;
  booking_updates: boolean;
  payment_notifications: boolean;
  marketing_notifications: boolean;
}>) => {
  try {
    const { error } = await supabase
      .from('notification_settings')
      .update(settings)
      .eq('user_id', userId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    logger.error('Error updating notification settings:', error);
    return { success: false, error: 'Failed to update notification settings' };
  }
};