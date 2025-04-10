import nodemailer from 'nodemailer';

// In a real application, you would use environment variables for these
const SMTP_HOST = 'smtp.example.com';
const SMTP_PORT = 587;
const SMTP_USER = 'no-reply@mydomain.com';
const SMTP_PASS = 'your-smtp-password';
const BASE_URL = 'https://privatecharterx.com';

// Create transporter
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS
  }
});

// For development, log emails instead of sending them
const isDevelopment = import.meta.env.DEV;

// Send verification email
export const sendVerificationEmail = async (to: string, token: string): Promise<boolean> => {
  const verificationUrl = `${BASE_URL}/verify-email?token=${token}`;
  
  const mailOptions = {
    from: '"PrivateCharterX" <no-reply@mydomain.com>',
    to,
    subject: 'Verify Your Email Address',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #000; padding: 20px; text-align: center;">
          <h1 style="color: #fff; margin: 0;">PrivateCharterX</h1>
        </div>
        <div style="padding: 20px; border: 1px solid #eee; border-top: none;">
          <h2>Verify Your Email Address</h2>
          <p>Thank you for registering with PrivateCharterX. Please click the button below to verify your email address:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" style="background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Verify Email</a>
          </div>
          <p>If you did not create an account, you can safely ignore this email.</p>
          <p>This link will expire in 24 hours.</p>
          <p>If the button doesn't work, copy and paste this URL into your browser:</p>
          <p style="word-break: break-all;">${verificationUrl}</p>
        </div>
        <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
          <p>&copy; ${new Date().getFullYear()} PrivateCharterX. All rights reserved.</p>
        </div>
      </div>
    `
  };

  if (isDevelopment) {
    console.log('Verification Email:', mailOptions);
    return true;
  }

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending verification email:', error);
    return false;
  }
};

// Send password reset email
export const sendPasswordResetEmail = async (to: string, token: string): Promise<boolean> => {
  const resetUrl = `${BASE_URL}/reset-password?token=${token}`;
  
  const mailOptions = {
    from: '"PrivateCharterX" <no-reply@mydomain.com>',
    to,
    subject: 'Reset Your Password',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #000; padding: 20px; text-align: center;">
          <h1 style="color: #fff; margin: 0;">PrivateCharterX</h1>
        </div>
        <div style="padding: 20px; border: 1px solid #eee; border-top: none;">
          <h2>Reset Your Password</h2>
          <p>We received a request to reset your password. Click the button below to create a new password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Reset Password</a>
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
    `
  };

  if (isDevelopment) {
    console.log('Password Reset Email:', mailOptions);
    return true;
  }

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return false;
  }
};

// Send welcome email
export const sendWelcomeEmail = async (to: string, name: string): Promise<boolean> => {
  const mailOptions = {
    from: '"PrivateCharterX" <no-reply@mydomain.com>',
    to,
    subject: 'Welcome to PrivateCharterX',
    html: `
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
            <a href="${BASE_URL}/dashboard" style="background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Visit Your Dashboard</a>
          </div>
          <p>If you have any questions or need assistance, please don't hesitate to contact our support team at <a href="mailto:info@privatecharterx.com">info@privatecharterx.com</a>.</p>
        </div>
        <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
          <p>&copy; ${new Date().getFullYear()} PrivateCharterX. All rights reserved.</p>
        </div>
      </div>
    `
  };

  if (isDevelopment) {
    console.log('Welcome Email:', mailOptions);
    return true;
  }

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return false;
  }
};

// Send referral invitation email
export const sendReferralEmail = async (to: string, referrerName: string, referralCode: string): Promise<boolean> => {
  const referralUrl = `${BASE_URL}/register?referral=${referralCode}`;
  
  const mailOptions = {
    from: '"PrivateCharterX" <no-reply@mydomain.com>',
    to,
    subject: `${referrerName} invites you to join PrivateCharterX`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #000; padding: 20px; text-align: center;">
          <h1 style="color: #fff; margin: 0;">PrivateCharterX</h1>
        </div>
        <div style="padding: 20px; border: 1px solid #eee; border-top: none;">
          <h2>${referrerName} has invited you to PrivateCharterX</h2>
          <p>${referrerName} thinks you would enjoy the premium private jet charter experience offered by PrivateCharterX.</p>
          <p>Join now to access:</p>
          <ul>
            <li>Exclusive private jet charters worldwide</li>
            <li>Special discounts on empty leg flights</li>
            <li>Personalized concierge service</li>
            <li>Rewards program for frequent flyers</li>
          </ul>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${referralUrl}" style="background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Join PrivateCharterX</a>
          </div>
          <p>Your referral code: <strong>${referralCode}</strong></p>
          <p>If the button doesn't work, copy and paste this URL into your browser:</p>
          <p style="word-break: break-all;">${referralUrl}</p>
        </div>
        <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
          <p>&copy; ${new Date().getFullYear()} PrivateCharterX. All rights reserved.</p>
        </div>
      </div>
    `
  };

  if (isDevelopment) {
    console.log('Referral Email:', mailOptions);
    return true;
  }

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending referral email:', error);
    return false;
  }
};