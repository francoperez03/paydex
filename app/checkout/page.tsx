'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './Checkout.module.css';
import { createBinanceOrder } from '../services/binance-service';

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  className?: string;
}

export default function Checkout() {
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  // const [paymentStatus, setPaymentStatus  ] = useState<string | null>(null);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  const paymentMethods: PaymentMethod[] = [
    { id: 'bnpl', name: '', icon: '/assets/paydex-logo-black.png' },
    { id: 'paypal', name: '', icon: '/assets/paypal-logo.png' },
    { id: 'binance', name: '', icon: '/assets/binancepay-logo.svg' },
    { id: 'credit', name: '', icon: '/assets/credit-card-logo.jpeg' },
  ];

  const orderSummary = {
    subtotal: 1499.99,
    shipping: 0.00,
    tax: 0.00,
    total: 1499.99,
  };

  const handlePaymentSelect = (id: string) => {
    setSelectedPayment(id);
  };

  const handleCreateCollection = async () => {
    try {
 
      const response = await createBinanceOrder()

      return response;
    } catch (error) {
      console.error('Error creando la colección:', error);
      alert('Hubo un problema al procesar el pago.');
    }
  };

  const handleCheckout = () => {
    if (!selectedPayment) {
      alert('Por favor selecciona un método de pago');
      return;
    }

    if (selectedPayment === 'binance') {
      handleCreateCollection();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardDetails({
      ...cardDetails,
      [e.target.name]: e.target.value,
    });
  };

  // useEffect(() => {
  //   if (paymentStatus === 'SUCCESS') {
  //     alert('El pago fue exitoso. Gracias por tu compra.');
  //   } else if (paymentStatus === 'FAILED') {
  //     alert('El pago no se completó.');
  //   }
  // }, [paymentStatus]);

  return (
    <div className={`checkout-container ${styles['checkout-container']}`}>
      <div className={`checkout-content ${styles['checkout-content']}`}>
        <div className={`payment-section ${styles['payment-section']}`}>
          <h2>Select a payment method</h2>
          <div className={`payment-methods ${styles['payment-methods']}`}>
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`payment-method ${selectedPayment === method.id ? 'selected' : ''} ${styles['payment-method']}`}
                onClick={() => handlePaymentSelect(method.id)}
              >
                {method.id === 'bnpl' && (
                  <div className={`bnpl-logo ${styles['bnpl-logo']}`} style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                    Installments by&nbsp;
                  </div>
                )}

                <Image 
                  src={method.icon} 
                  alt={method.name || 'Payment method'} 
                  className={`payment-icon ${styles['payment-icon']}`}
                  width={method.id === 'bnpl' ? 110 : 200}
                  height={50}
                  priority
                />
              </div>
            ))}
          </div>

          {selectedPayment === 'credit' && (
            <div className={styles['credit-card-form']}>
              <input
                type="text"
                name="cardNumber"
                placeholder="Número de tarjeta"
                value={cardDetails.cardNumber}
                onChange={handleInputChange}
                maxLength={16}
              />
              <input
                type="text"
                name="cardHolder"
                placeholder="Nombre del titular"
                value={cardDetails.cardHolder}
                onChange={handleInputChange}
              />
              <div className={styles['input-group']}>
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/AA"
                  value={cardDetails.expiryDate}
                  onChange={handleInputChange}
                  maxLength={5}
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={cardDetails.cvv}
                  onChange={handleInputChange}
                  maxLength={4}
                />
              </div>
            </div>
          )}

          <button 
            className={`checkout-button ${styles['checkout-button']}`}
            onClick={handleCheckout}
            disabled={
              !selectedPayment ||
              (selectedPayment === 'credit' &&
                (!cardDetails.cardNumber || !cardDetails.cardHolder || !cardDetails.expiryDate || !cardDetails.cvv))
            }
          >
            Complete purchase
          </button>
        </div>

        <div className={`order-summary ${styles['order-summary']}`}>
          <h2>Order Summary</h2>
          <div className={`summary-items ${styles['summary-items']}`}>
            <div className={`summary-item ${styles['summary-item']}`}>
              <span>Subtotal</span>
              <span>${orderSummary.subtotal.toFixed(2)}</span>
            </div>
            <div className={`summary-item ${styles['summary-item']}`}>
              <span>Shipping</span>
              <span>${orderSummary.shipping.toFixed(2)}</span>
            </div>
            <div className={`summary-item ${styles['summary-item']}`}>
              <span>Taxes</span>
              <span>${orderSummary.tax.toFixed(2)}</span>
            </div>
            <div className={`summary-item total ${styles['summary-item']} ${styles.total}`}>
              <span>Total</span>
              <span>${orderSummary.total.toFixed(2)}</span>
            </div>
          </div>
          {/* {merchantTradeNo && (
            <button 
              className={`status-button ${styles['status-button']}`}
              onClick={handleQueryCollection}
            >
              Verificar estado del pago
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
}
