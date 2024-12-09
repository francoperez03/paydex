import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  const webhookSecret = process.env.BINANCE_WEBHOOK_SECRET;
  const signature = request.headers.get('x-binancepay-signature');
  const payload = await request.text();

  if (!webhookSecret || !signature) {
    return NextResponse.json(
      { error: 'Missing signature or webhook secret' },
      { status: 400 }
    );
  }

  const computedSignature = crypto
    .createHmac('sha512', webhookSecret)
    .update(payload)
    .digest('hex');

  if (computedSignature !== signature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  try {
    // Procesar notificación de webhook
    console.log('Webhook received:', JSON.parse(payload));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error procesando webhook:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}
