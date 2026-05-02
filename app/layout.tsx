import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Nooré Jewells | Premium Imitation Store',
  description: 'Luxury imitation jewellery for the modern aesthetic. Handcrafted elegance delivered to your doorstep.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} ${jetbrainsMono.variable}`}>
      <body suppressHydrationWarning className="bg-[#fcfbf7] font-sans text-stone-900 antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {children}
          <Newsletter />
        </main>
        <Footer />
      </body>
    </html>
  );
}
