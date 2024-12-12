'use client';

import Image from 'next/image';
import { useRef } from 'react';
import styles from './Hero.module.css';

interface HeroProps {
    title: string;
    slogan: string;
    bullets: string[];
}

const Hero = ({title, slogan, bullets}: HeroProps) => {
  // Referencia para la sección de detalles del producto
  const productDetailRef = useRef<HTMLDivElement>(null);

  const handleScrollToDetails = () => {
    if (productDetailRef.current) {
      productDetailRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <div className={styles.textSection}>
            <h1 className={styles.title}>
              {title}
            </h1>
            <p className={styles.slogan}>
              {slogan}
            </p>
            <ul className={styles.bullets}>
              <li>{bullets[0]}</li>
              <li>{bullets[1]}</li>
            </ul>
            <div className={styles.buttons}>
              <button className={styles.secondaryButton} onClick={handleScrollToDetails}>
                Prueba aquí
              </button>
            </div>
          </div>
          <div className={styles.imageSection}>
            <Image
              src="/assets/binance-pay.png" // Cambia esta URL por tu imagen real
              alt="Crypto App"
              width={300}
              height={300}
              className={styles.appImage}
            />
          </div>
        </div>
      </section>

      {/* Sección de detalles del producto */}
      <div ref={productDetailRef} className={styles.productDetailContainer}>
        {/* Aquí iría el contenido de los detalles del producto */}
      </div>
    </>
  );
};

export default Hero;
