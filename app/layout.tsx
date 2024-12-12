import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ParticlesBackground from './components/ParticleBackground/ParticleBackground';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Paydex - Checkout Experience',
  description: 'Modern e-commerce checkout experience',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={inter.className}
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          margin: 0,
          position: 'relative', // Permite manejar el stacking context
        }}
      >
        <ParticlesBackground />
        <div style={{ position: 'relative', zIndex: 10 }}>
          <Header />
          <main style={{ flex: '1', marginTop: '80px' }}>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
