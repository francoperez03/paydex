import { NextResponse } from 'next/server';
import crypto from 'crypto';
import axios from 'axios';

// Credenciales de Binance Pay
const BINANCE_API_KEY = process.env.BINANCE_PAY_API_KEY;
const BINANCE_API_SECRET = process.env.BINANCE_PAY_API_SECRET;
const BINANCE_PAY_ENDPOINT = 'https://bpay.binanceapi.com/binancepay/openapi/v3/order';

// Función para generar la firma (HMAC SHA512)
function signRequest(payload: string, secretKey: string): string {
  return crypto.createHmac('sha512', secretKey).update(payload).digest('hex');
}

// Manejo de solicitudes POST
export async function POST(request: Request) {
  try {
    const {
      totalAmount,
      currency,
      merchantTradeNo,
      productDetail,
      productName,
    } = await request.json();

    // Construir el payload para Binance Pay
    const payload = {
      env: { terminalType: 'WEB' },
      merchantTradeNo,
      orderAmount: totalAmount.toString(),
      currency,
      goods: {
        goodsType: '02',
        goodsCategory: '0000',
        referenceGoodsId: 'product-id',
        goodsName: productName,
        goodsDetail: productDetail,
      },
    };

    const payloadString = JSON.stringify(payload);
    const nonceStr = crypto.randomBytes(16).toString('hex');
    const timestamp = Date.now().toString();

    // Crear la cadena a firmar
    const message = `${timestamp}\n${nonceStr}\n${payloadString}\n`;
    const signature = signRequest(message, BINANCE_API_SECRET!);

    // Enviar solicitud a Binance Pay
    const response = await axios.post(BINANCE_PAY_ENDPOINT, payload, {
      headers: {
        'Content-Type': 'application/json',
        'BinancePay-Timestamp': timestamp,
        'BinancePay-Nonce': nonceStr,
        'BinancePay-Certificate-SN': BINANCE_API_KEY!,
        'BinancePay-Signature': signature,
      },
    });

    const data = response.data;

    // Manejar la respuesta de Binance
    if (data.returnCode === 'SUCCESS') {
      return NextResponse.json({
        success: true,
        checkoutUrl: data.data.checkoutUrl,
      });
    } else {
      return NextResponse.json(
        { success: false, message: data.returnMessage },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: 'Error procesando la orden en Binance Pay' },
      { status: 500 }
    );
  }
}
