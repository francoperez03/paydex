import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>Payment Methods</h3>
          <Link href="/card-payments">Card Payments</Link>
          <Link href="/fiat-payments">Fiat Payments</Link>
          <Link href="/integrations">Integrations</Link>
        </div>
        
        <div className={styles.footerSection}>
          <h3>Integrations</h3>
          <Link href="/woocommerce">WooCommerce</Link>
          <Link href="/magento">Magento</Link>
          <Link href="/shopify">Shopify</Link>
          <Link href="/custom-integrations">Custom Integrations</Link>
        </div>
        
        <div className={styles.footerSection}>
          <h3>Security</h3>
          <Link href="/pci-compliance">PCI Compliance</Link>
          <Link href="/security-audits">Security Audits</Link>
          <Link href="/compliance">Compliance</Link>
        </div>
        
        <div className={styles.footerSection}>
          <h3>Resources</h3>
          <Link href="/documentation">Documentation</Link>
          <Link href="/api-reference">API Reference</Link>
          <Link href="/guides">Guides</Link>
          <Link href="/support">Support</Link>
        </div>
      </div>
      
      <div className={styles.footerBottom}>
        <div className={styles.footerLegal}>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </div>
        <p className={styles.copyright}> 2024 Paydex. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;