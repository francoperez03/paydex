import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

const BINANCE_QUERY_URL = 'https://accounts.binance.com/oauth-api/v1/pay/c2c/collection/query';

export async function POST(request: Request) {
  const { accessToken, collectionId } = await request.json();

  if (!accessToken || !collectionId) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  try {
    const response = await axios.post(
      BINANCE_QUERY_URL,
      { collectionId },
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
    console.error('Error consultando colección:', axiosError.response?.data || axiosError.message);
    return NextResponse.json(
      { error: 'Failed to query collection' },
      { status: 500 }
    );
  }
}
