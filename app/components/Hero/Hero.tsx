'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.css';

interface HeroProps {
  title: string;
  bullets: string[];
}

const Hero = ({ title, bullets }: HeroProps) => {
  const [slogan, setSlogan] = useState('by');
  const productDetailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sloganCycle = [
      { text: 'by', delay: 100 },
      { text: 'b', delay: 100 },
      { text: '|', delay: 100 },
      { text: 'f', delay: 100 },
      { text: 'fo', delay: 100 },
      { text: 'for', delay: 1500 },
      { text: 'fo', delay: 100 },
      { text: 'f', delay: 100 },
      { text: '|', delay: 100 },
      { text: 'b', delay: 100 },
      { text: 'by', delay: 1500 }
    ];
    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const updateSlogan = () => {
      const { text, delay } = sloganCycle[currentIndex];
      setSlogan(text);
      currentIndex = (currentIndex + 1) % sloganCycle.length;
      timeoutId = setTimeout(updateSlogan, delay);
    };

    timeoutId = setTimeout(updateSlogan, 100);

    return () => clearTimeout(timeoutId);
  }, []);

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
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.slogan}>
              Made <span className={styles.highlight}>{slogan}</span> digital creators.
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
