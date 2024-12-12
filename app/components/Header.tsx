'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import Image from 'next/image';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.headerContent}>
        <Link href="/" className={styles.logo}>
          <Image src="/assets/paydex-logo-black.png" alt="Paydex Logo" width={100} height={30} />
        </Link>
        <nav className={styles.navMenu}>
          <Link href="/products">Products</Link>
          <Link href="/solutions">Solutions</Link>
          <Link href="/developers">Developers</Link>
          <Link href="/pricing">Pricing</Link>
        </nav>
        <div className={styles.authButtons}>
          <Link href="/login" className={styles.loginBtn}>
            Log In
          </Link>
          <Link href="/signup" className={styles.signupBtn}>
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
