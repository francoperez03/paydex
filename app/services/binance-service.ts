const API_BASE_URL = '/api';
interface QueryCollectionParams {
  collectionId: string;
}

interface QueryCollectionResponse {
  success: boolean;
  data: {
    status: 'SUCCESS' | 'FAILED' | 'PENDING';
  };
  message?: string;
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

export const createBinanceOrder = async () => {
    try {
      const response = await fetch('/api/create-binance-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          totalAmount: 339.97,
          currency: "USDT",
          productDetail: "Detalles del producto",
          productName: "Nombre del producto"
        })
      });
  
      const result = await response.json();
      if (result.success) {
        window.location.href = result.checkoutUrl;
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Error procesando el pago:", error);
      alert("Hubo un problema con el pago.");
    }
  };