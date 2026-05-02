'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, Menu, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '@/lib/store';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); // Controlled via global state ideally, but local for UI toggle
  
  const cartItems = useCart((state) => state.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Shop All', href: '/shop' },
    { name: 'Necklaces', href: '/category/necklaces' },
    { name: 'Earrings', href: '/category/earrings' },
    { name: 'Bracelets', href: '/category/bracelets' },
    { name: 'Rings', href: '/category/rings' },
  ];

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out px-6 md:px-12 py-4',
          isScrolled ? 'bg-brand-paper/80 backdrop-blur-md border-b' : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-brand-dark"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Desktop Links - Left */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.slice(0, 3).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[11px] uppercase tracking-[0.2em] font-medium hover:text-brand-gold transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <h1 className="text-2xl md:text-3xl font-serif tracking-widest uppercase">
              Nooré <span className="text-brand-gold">.</span>
            </h1>
          </Link>

          {/* Actions - Right */}
          <div className="flex items-center gap-4 md:gap-8">
            {/* Desktop Links- Right */}
            <div className="hidden md:flex items-center gap-8 mr-4">
              {navLinks.slice(3).map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[11px] uppercase tracking-[0.2em] font-medium hover:text-brand-gold transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <button className="hover:text-brand-gold transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link href="/cart" className="relative hover:text-brand-gold transition-colors">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-gold text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[80%] max-w-sm bg-brand-paper z-[70] p-8 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-12">
                <h2 className="font-serif text-xl tracking-widest uppercase">Menu</h2>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-serif tracking-wide hover:text-brand-gold"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <div className="absolute bottom-8 left-8 right-8 border-t pt-8">
                <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500 mb-4">Support</p>
                <div className="flex flex-col gap-4">
                  <Link href="/contact" className="text-sm">Contact Us</Link>
                  <Link href="/track" className="text-sm">Track Order</Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
