const API_BASE_URL = '/api';

interface CreateCollectionParams {
  amount: number;
  currency: string;
  description: string;
}

interface QueryCollectionParams {
  collectionId: string;
}

// interface OAuthResponse {
//   access_token: string;
//   token_type: string;
//   expires_in: number;
// }

interface CreateCollectionResponse {
  success: boolean;
  merchantTradeNo?: string;
  qrcodeLink?: string;
  message?: string;
}

interface QueryCollectionResponse {
  success: boolean;
  data: {
    status: 'SUCCESS' | 'FAILED' | 'PENDING';
  };
  message?: string;
}


export async function getOAuthToken(): Promise<string> {
  try {
    const response = await fetch(`api/oauth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching OAuth token: ${response.statusText}`);
    }

    const data = await response.json();
    return data.access_token; // Devuelve el token de acceso
  } catch (error) {
    console.error('Failed to get OAuth token:', error);
    throw error;
  }
}

export async function createCollection(
  accessToken: string,
  params: CreateCollectionParams
): Promise<CreateCollectionResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error(`Error creating collection: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to create collection:', error);
    throw error;
  }
}

export async function queryCollection(
  accessToken: string,
  params: QueryCollectionParams
): Promise<QueryCollectionResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error(`Error querying collection: ${response.statusText}`);
    }

    return await response.json(); // Devuelve los datos del estado de la colección
  } catch (error) {
    console.error('Failed to query collection:', error);
    throw error;
  }
}



// export async function createBinanceOrder(orderDetails: {
//   amount: number;
//   currency: string;
//   description: string;
//   receiver: string;
// }) {
//   const response = await fetch('/api/create-collection', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(orderDetails),
//   });

//   return response.json();
// }

// export async function queryBinanceCollection(merchantTradeNo: string) {
//   const response = await fetch('/api/query-collection', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ merchantTradeNo }),
//   });

//   return response.json();
// }



// export const createBinanceOrder = async () => {
//     try {
//       const response = await fetch('/api/create-binance-order', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           totalAmount: 339.97,
//           currency: "USD",
//           merchantTradeNo: "order_12345",
//           productDetail: "Detalles del producto",
//           productName: "Nombre del producto"
//         })
//       });
  
//       const result = await response.json();
  
//       if (result.success) {
//         window.location.href = result.checkoutUrl;
//       } else {
//         alert("Error: " + result.message);
//       }
//     } catch (error) {
//       console.error("Error procesando el pago:", error);
//       alert("Hubo un problema con el pago.");
//     }
//   };