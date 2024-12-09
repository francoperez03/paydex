'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './ProductDetail.module.css';

const ProductDetail = () => {
  const router = useRouter();

  const product = {
    name: 'Premium Headphones',
    description:
      'High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.',
    price: 299.99,
    imageUrl:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
  };

  const handleBuyClick = () => {
    router.push('/checkout');
  };

  return (
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
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
