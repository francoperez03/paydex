'use client';

import Image from 'next/image';
import { useRef } from 'react';
import styles from './Hero.module.css';

interface HeroProps {
  title: string;
  slogan: string;
  bullets: string[];
}

const Hero = ({ title, slogan, bullets }: HeroProps) => {
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
              {bullets.map((bullet, index) => (
                <li key={index}>{bullet}</li>
              ))}
            </ul>
            <div className={styles.buttons}>
              <button className={styles.secondaryButton} onClick={handleScrollToDetails}>
                Prueba aquí
              </button>
            </div>
          </div>
          <div className={styles.imageSection}>
            <Image
              src="/assets/binance-pay.png"
              alt="Crypto App"
              width={300}
              height={300}
              className={styles.appImage}
            />
          </div>
        </div>
      </section>

      <div ref={productDetailRef} className={styles.productDetailContainer}>
        {/* Contenido adicional */}
      </div>
    </>
  );
};

export default Hero;
