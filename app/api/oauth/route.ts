import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

const BINANCE_OAUTH_URL = 'https://accounts.binance.com/oauth/token';
const BINANCE_CLIENT_ID = process.env.BINANCE_CLIENT_ID;
const BINANCE_CLIENT_SECRET = process.env.BINANCE_CLIENT_SECRET;

export async function POST() {
  try {
    console.log('Binance Client ID:', BINANCE_CLIENT_ID);
    const response = await axios.post(
      BINANCE_OAUTH_URL,
      {
        client_id: BINANCE_CLIENT_ID,
        client_secret: BINANCE_CLIENT_SECRET,
        grant_type: 'client_credentials',
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    const axiosError: AxiosError = error as AxiosError;
    console.log(axiosError.message)
    console.error('Error obteniendo token OAuth:', axiosError.response?.data || axiosError.message);
    return NextResponse.json(
      { error: 'Failed to fetch OAuth token' },
      { status: 500 }
    );
  }
}
