import { Suspense } from 'react';
import './globals.css';
import { CartProvider } from '@/lib/cart';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = { title: 'WhatBytes Store', description: 'Product listing assignment' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <CartProvider>
          <Suspense fallback={<div className="h-20 bg-brand" />}><Header /></Suspense>
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
