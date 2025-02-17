import { NextResponse } from 'next/server';
import axios from 'axios';

const HITPAY_API_ENDPOINT = process.env.NEXT_PUBLIC_HITPAY_MODE === 'live' 
  ? 'https://api.hit-pay.com/v1' 
  : 'https://api.sandbox.hit-pay.com/v1';

export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      amount,
      currency = 'SGD',
      email,
      name,
      phone,
      reference_number,
      redirect_url
    } = body;

    // Validate required fields
    if (!amount || !email || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create payment request to HitPay
    const formData = new URLSearchParams({
      amount,
      currency,
      email,
      name,
      phone,
      reference_number,
      redirect_url,
      webhook: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/hitpay`
    });

    const response = await axios.post(
      `${HITPAY_API_ENDPOINT}/payment-requests`,
      formData,
      {
        headers: {
          'X-BUSINESS-API-KEY': process.env.HITPAY_API_KEY,
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Request-With': 'XMLHttpRequest'
        }
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Payment creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment' },
      { status: 500 }
    );
  }
} 