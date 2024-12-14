'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './ProductDetail.module.css';
import Hero from '../components/Hero/Hero';


const ProductDetail = () => {
  const router = useRouter();

  const product = {
    name: 'Growing Content Course',
    description:
      'How to become a Content Specialist. Earn $5000 per month and scale your personal brand.',
    price: 1499.99,
    imageUrl:
      '/assets/product-mini.png',
  };

  const handleBuyClick = () => {
    router.push('/checkout');
  };

  const heroBullets = [
    'Accept payments in installments using Stablecoins and credit cards.',
    'Receive payments instantly to your wallet or crypto exchange, directly from card transactions.',
  ];

  return (
    <div>
      <Hero 
        title="Integrate all your payment methods into a single gateway" 
        bullets={heroBullets} 
      />
      <div className={styles.productDetailContainer}>
        <div className={styles.productContent}>
          <div className={styles.productImage}>
            <Image
              src={product.imageUrl}
              alt="Product"
              width={500}
              height={500}
              className={styles.mainImage}
              priority
            />
          </div>
          <div className={styles.productInfo}>
            <h1 className={styles.productTitle}>{product.name}</h1>
            <p className={styles.productPrice}>${product.price}</p>
            <p className={styles.productDescription}>{product.description}</p>
            <button className={styles.buyButton} onClick={handleBuyClick}>
              Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
