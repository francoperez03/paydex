import { NextResponse } from 'next/server';
import crypto from 'crypto';
import axios, { AxiosError } from 'axios';

// Credenciales de Binance Pay
const BINANCE_API_KEY = process.env.BINANCE_API_KEY_PAYEX;
const BINANCE_API_SECRET = process.env.BINANCE_API_SECRET_PAYDEX;
const BINANCE_PAY_ENDPOINT = 'https://bpay.binanceapi.com/binancepay/openapi/v3/order';

function signRequest(payload: string, secretKey: string): string {
  return crypto.createHmac('sha512', secretKey).update(payload).digest('hex').toUpperCase();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { totalAmount, currency, productDetail, productName } = body;
    console.log('Request body:', body);
    const payload = {
      env: {
        terminalType: 'WEB' 
      },
      merchantTradeNo: `${Date.now()}`,
      orderAmount: totalAmount.toFixed(2),
      currency,
      description: productDetail,
      goodsDetails: [
        {
          goodsType: "01",
          goodsCategory: "D000",
          referenceGoodsId: "7876763A3B",
          goodsName:productName,
          goodsDetail: productDetail
        }
      ]
    }
    const timestamp = Date.now();
    
    const payloadString = JSON.stringify(payload);
    const nonce = generateNonce();
    const message = `${timestamp}\n${nonce}\n${payloadString}\n`;
    const signature = signRequest(message, BINANCE_API_SECRET!);

    const { data } = await axios.post(BINANCE_PAY_ENDPOINT, payload, {
      headers: {
        'Content-Type': 'application/json',
        'BinancePay-Timestamp': timestamp,
        'BinancePay-Nonce': nonce,
        'BinancePay-Certificate-SN': BINANCE_API_KEY,
        'BinancePay-Signature': signature
      }
    });

    console.log(data)
    const checkoutUrl = data?.data?.universalUrl;
    if (!checkoutUrl) {
      throw new Error('checkoutUrl no encontrado en la respuesta de Binance');
    }

    return NextResponse.json({
      success: true,
      checkoutUrl,
    });
  } catch (err) {
    const error: AxiosError = err as AxiosError;
    console.error('Error creating Binance order:', error.response?.data || error.message);
    return NextResponse.json({
      success: false,
      error: error.response?.data || error.message
    }, { status: 500 });
  }
}
const generateNonce = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return Array.from({length: 32}, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
};
