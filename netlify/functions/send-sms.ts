import { Handler } from '@netlify/functions';
import twilio from 'twilio';

const accountSid = process.env.VITE_TWILIO_ACCOUNT_SID;
const authToken = process.env.VITE_TWILIO_AUTH_TOKEN;
const fromNumber = process.env.VITE_TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

export const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { to, message } = JSON.parse(event.body || '{}');

    if (!to || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required parameters' })
      };
    }

    // Send SMS using Twilio
    const result = await client.messages.create({
      body: message,
      to: to,
      from: fromNumber
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        messageId: result.sid,
        status: result.status
      })
    };
  } catch (error) {
    console.error('Error sending SMS:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : 'Failed to send SMS'
      })
    };
  }
};