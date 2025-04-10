import { NextResponse } from 'next/server';
import twilio from 'twilio';

export async function POST(request: Request) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_PHONE_NUMBER;

  if (!accountSid || !authToken || !fromNumber) {
    return NextResponse.json(
      { error: 'Missing Twilio credentials' },
      { status: 500 }
    );
  }

  const client = twilio(accountSid, authToken);

  try {
    const { to, message } = await request.json();

    if (!to || !message) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Send SMS using Twilio
    const result = await client.messages.create({
      body: message,
      to: to,
      from: fromNumber
    });

    return NextResponse.json({
      success: true,
      messageId: result.sid,
      status: result.status
    });
  } catch (error) {
    console.error('Error sending SMS:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to send SMS' },
      { status: 500 }
    );
  }
}