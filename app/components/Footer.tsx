import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>Products</h3>
          <Link href="/payments">Payments</Link>
          <Link href="/checkout">Checkout</Link>
          <Link href="/invoicing">Invoicing</Link>
          <Link href="/subscriptions">Subscriptions</Link>
        </div>
        
        <div className={styles.footerSection}>
          <h3>Solutions</h3>
          <Link href="/ecommerce">E-commerce</Link>
          <Link href="/saas">SaaS</Link>
          <Link href="/marketplace">Marketplace</Link>
          <Link href="/platforms">Platforms</Link>
        </div>
        
        <div className={styles.footerSection}>
          <h3>Developers</h3>
          <Link href="/documentation">Documentation</Link>
          <Link href="/api-reference">API Reference</Link>
          <Link href="/guides">Guides</Link>
          <Link href="/libraries">Libraries</Link>
        </div>
        
        <div className={styles.footerSection}>
          <h3>Company</h3>
          <Link href="/about">About</Link>
          <Link href="/careers">Careers</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
      
      <div className={styles.footerBottom}>
        <div className={styles.footerLegal}>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
          <Link href="/security">Security</Link>
        </div>
        <p className={styles.copyright}> 2024 Paydex. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;