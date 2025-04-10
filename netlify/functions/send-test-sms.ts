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
    const { to } = JSON.parse(event.body || '{}');

    if (!to) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing phone number' })
      };
    }

    // Send test SMS
    const result = await client.messages.create({
      body: 'This is a test message from PrivateCharterX',
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
    console.error('Error sending test SMS:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : 'Failed to send test SMS'
      })
    };
  }
};