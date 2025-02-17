import { NextResponse } from 'next/server';
import crypto from 'crypto';

function formDataToObject(formData) {
  const obj = {};
  for (const [key, value] of formData.entries()) {
    obj[key] = value;
  }
  return obj;
}

export function generateSignature(data, secret) {
  // Sort keys alphabetically and concatenate key-value pairs
  const source = [];
  Object.keys(data).sort().forEach((key) => {
      if (key !== 'hmac') {
        source.push(`${key}${data[key]}`);
      }
    });
  
  const payload = source.join('');
  console.log('Signature payload:', payload);
  
  // Use HMAC-SHA256 with the secret
  const hmac = crypto.createHmac('sha256', secret);
  return hmac.update(Buffer.from(payload, 'utf-8')).digest('hex');
}

export async function POST(request) {
  try {
    console.log('hitpay webhook received');
    
    // Parse form data
    const formData = await request.formData();
    const body = formDataToObject(formData);
    console.log('Webhook payload:', body);

    const hmac = body.hmac;
    if (!hmac) {
      console.error('Missing hmac in payload');
      return NextResponse.json(
        { error: 'Missing hmac' },
        { status: 401 }
      );
    }

    // Generate signature using HMAC-SHA256
    const generatedSignature = generateSignature(
      body,
      process.env.HITPAY_SALT
    );

    console.log('Received HMAC:', hmac);
    console.log('Generated HMAC:', generatedSignature);

    if (hmac.toLowerCase() !== generatedSignature.toLowerCase()) {
      console.error('Invalid hmac');
      return NextResponse.json(
        { error: 'Invalid hmac' },
        { status: 401 }
      );
    }

    // Handle different payment statuses
    switch (body.status) {
      case 'completed':
        console.log('Payment completed:', {
          payment_id: body.payment_id,
          payment_request_id: body.payment_request_id,
          amount: body.amount,
          currency: body.currency,
          phone: body.phone
        });
        // Update booking status in your database
        // Send confirmation email
        break;
      case 'failed':
        // Handle failed payment
        // Notify user
        break;
      case 'expired':
        // Handle expired payment
        break;
    }

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}