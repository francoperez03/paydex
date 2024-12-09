import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

const BINANCE_QUERY_URL = 'https://bpay.binanceapi.com/binancepay/openapi/v3/payment/query';
const BINANCE_API_KEY = process.env.BINANCE_PAY_API_KEY;

export async function POST(request: Request) {
  const { merchantTradeNo } = await request.json();

  const payload = { merchantTradeNo };

  try {
    const response = await axios.post(BINANCE_QUERY_URL, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${BINANCE_API_KEY}`,
      },
    });

    return NextResponse.json({ success: true, data: response.data });
  } catch (error) {
    const axiosError: AxiosError = error as AxiosError;
    console.error('Error creando colección:', axiosError.response?.data || axiosError.message);
    return NextResponse.json({ success: false, message: 'Error consultando colección' }, { status: 500 });
  }
}
