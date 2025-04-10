import { logger } from './logger';
import { supabase } from '../lib/supabase';

interface EmailOptions {
  to: string;
  subject: string;
  body: string;
}

export async function sendEmail(options: EmailOptions) {
  try {
    const { error } = await supabase.functions.invoke('send-email', {
      body: {
        to: options.to,
        subject: options.subject,
        html: options.body
      }
    });

    if (error) throw error;
    
    logger.info('Email sent successfully', {
      to: options.to,
      subject: options.subject,
      timestamp: new Date().toISOString()
    });
    
    return true;
  } catch (error) {
    logger.error('Failed to send email:', error);
    throw new Error('Failed to send email. Please try again.');
  }
}

export async function sendWelcomeEmail(email: string, name: string) {
  const subject = 'Welcome to PrivateCharterX';
  const body = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #000; padding: 20px; text-align: center;">
        <h1 style="color: #fff; margin: 0;">PrivateCharterX</h1>
      </div>
      <div style="padding: 20px; border: 1px solid #eee; border-top: none;">
        <h2>Welcome to PrivateCharterX, ${name}!</h2>
        <p>Thank you for joining PrivateCharterX. We're excited to have you on board.</p>
        <p>With your new account, you can:</p>
        <ul>
          <li>Book private jet charters worldwide</li>
          <li>Access exclusive empty leg flights</li>
          <li>Earn rewards with our referral program</li>
          <li>Manage your bookings and preferences</li>
        </ul>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.VITE_APP_URL}/dashboard" 
             style="background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
            Visit Your Dashboard
          </a>
        </div>
        <p>If you have any questions or need assistance, please don't hesitate to contact our support team at <a href="mailto:info@privatecharterx.com">info@privatecharterx.com</a>.</p>
      </div>
      <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
        <p>&copy; ${new Date().getFullYear()} PrivateCharterX. All rights reserved.</p>
      </div>
    </div>
  `;

  return sendEmail({ to: email, subject, body });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.VITE_APP_URL}/reset-password?token=${token}`;
  const subject = 'Reset Your Password';
  const body = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #000; padding: 20px; text-align: center;">
        <h1 style="color: #fff; margin: 0;">PrivateCharterX</h1>
      </div>
      <div style="padding: 20px; border: 1px solid #eee; border-top: none;">
        <h2>Reset Your Password</h2>
        <p>We received a request to reset your password. Click the button below to create a new password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" 
             style="background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
            Reset Password
          </a>
        </div>
        <p>If you did not request a password reset, you can safely ignore this email.</p>
        <p>This link will expire in 1 hour.</p>
        <p>If the button doesn't work, copy and paste this URL into your browser:</p>
        <p style="word-break: break-all;">${resetUrl}</p>
      </div>
      <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
        <p>&copy; ${new Date().getFullYear()} PrivateCharterX. All rights reserved.</p>
      </div>
    </div>
  `;

  return sendEmail({ to: email, subject, body });
}

export async function sendBookingConfirmationEmail(email: string, bookingDetails: any) {
  const subject = 'Booking Confirmation';
  const body = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #000; padding: 20px; text-align: center;">
        <h1 style="color: #fff; margin: 0;">PrivateCharterX</h1>
      </div>
      <div style="padding: 20px; border: 1px solid #eee; border-top: none;">
        <h2>Booking Confirmation</h2>
        <p>Thank you for your booking with PrivateCharterX. Here are your booking details:</p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 4px; margin: 20px 0;">
          <p><strong>Flight:</strong> ${bookingDetails.origin} → ${bookingDetails.destination}</p>
          <p><strong>Date:</strong> ${new Date(bookingDetails.departure_date).toLocaleDateString()}</p>
          <p><strong>Aircraft:</strong> ${bookingDetails.aircraft_type}</p>
          <p><strong>Passengers:</strong> ${bookingDetails.passengers}</p>
          <p><strong>Status:</strong> ${bookingDetails.status}</p>
        </div>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.VITE_APP_URL}/dashboard" 
             style="background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
            View Booking Details
          </a>
        </div>
        <p>If you have any questions or need to make changes to your booking, please contact our support team at <a href="mailto:info@privatecharterx.com">info@privatecharterx.com</a>.</p>
      </div>
      <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
        <p>&copy; ${new Date().getFullYear()} PrivateCharterX. All rights reserved.</p>
      </div>
    </div>
  `;

  return sendEmail({ to: email, subject, body });
}