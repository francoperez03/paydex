import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

const BINANCE_CREATE_COLLECTION_URL = 'https://accounts.binance.com/oauth-api/v1/pay/c2c/collection/create';

export async function POST(request: Request) {
  const { accessToken, amount, currency, description } = await request.json();

  if (!accessToken || !amount || !currency || !description) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  try {
    const response = await axios.post(
      BINANCE_CREATE_COLLECTION_URL,
      {
        amount,
        currency,
        description,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    const axiosError: AxiosError = error as AxiosError;
    console.error('Error creando colección:', axiosError.response?.data || axiosError.message);
    return NextResponse.json(
      { error: 'Failed to create collection' },
      { status: 500 }
    );
  }
}
