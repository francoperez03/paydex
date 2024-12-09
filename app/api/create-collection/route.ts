import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

const BINANCE_COLLECTION_URL = 'https://bpay.binanceapi.com/binancepay/openapi/v3/payment/collect';
const BINANCE_API_KEY = process.env.BINANCE_PAY_API_KEY;
// const BINANCE_API_SECRET = process.env.BINANCE_PAY_API_SECRET;

export async function POST(request: Request) {
  const { amount, currency, description, receiver } = await request.json();

  const payload = {
    amount: amount.toString(),
    currency,
    description,
    receiver,
  };

  try {
    const response = await axios.post(BINANCE_COLLECTION_URL, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${BINANCE_API_KEY}`,
      },
    });

    const { qrcodeLink } = response.data.data;

    return NextResponse.json({ success: true, qrcodeLink });
  } catch (error) {
    const axiosError: AxiosError = error as AxiosError;
    console.error('Error creando colección:', axiosError.response?.data || axiosError.message);
    return NextResponse.json({ success: false, message: 'Error creando colección' }, { status: 500 });
  }
}
