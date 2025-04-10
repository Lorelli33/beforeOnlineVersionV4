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
    const { to } = await request.json();

    if (!to) {
      return NextResponse.json(
        { error: 'Missing phone number' },
        { status: 400 }
      );
    }

    // Send test SMS
    const result = await client.messages.create({
      body: 'This is a test message from PrivateCharterX',
      to: to,
      from: fromNumber
    });

    return NextResponse.json({
      success: true,
      messageId: result.sid,
      status: result.status
    });
  } catch (error) {
    console.error('Error sending test SMS:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to send test SMS' },
      { status: 500 }
    );
  }
}