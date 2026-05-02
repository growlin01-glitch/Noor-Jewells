'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '@/lib/store';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCart();
  const total = getTotal();

  const formattedTotal = new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 0,
  }).format(total);

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-24 px-6 md:px-12 min-h-[70vh] flex flex-col items-center justify-center space-y-8">
        <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center">
          <ShoppingBag className="w-10 h-10 text-stone-300" />
        </div>
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-serif">Your cart is empty</h1>
          <p className="text-stone-500">Looks like you haven&apos;t added any pieces to your collection yet.</p>
        </div>
        <Link
          href="/shop"
          className="bg-brand-dark text-white px-12 py-4 rounded-full text-[11px] uppercase tracking-widest font-semibold hover:bg-stone-800 transition-all"
        >
          Begin Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif mb-4">Your Shopping Collection</h1>
          <p className="text-stone-500 font-medium tracking-wide uppercase text-[10px]">
            {items.length} {items.length === 1 ? 'item' : 'items'} in your bag
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-8 space-y-8">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="flex gap-6 pb-8 border-b border-stone-100 group"
                >
                  <div className="relative w-32 md:w-40 aspect-[4/5] overflow-hidden bg-stone-100 shrink-0">
                    <Image
                      src={item.images[0]?.src || 'https://picsum.photos/seed/prod/800/1000'}
                      alt={item.name}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex flex-col justify-between py-2 flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-1">
                          {item.categories[0]?.name}
                        </p>
                        <h2 className="text-xl md:text-2xl font-serif group-hover:text-brand-gold transition-colors">
                          <Link href={`/product/${item.slug}`}>{item.name}</Link>
                        </h2>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-stone-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-end">
                      <div className="flex items-center border border-stone-200">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-stone-50 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-10 text-center text-sm font-mono">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-stone-50 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-mono text-stone-900">
                          ৳{parseInt(item.price) * item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-4">
            <div className="bg-[#fcfbf7] p-8 space-y-8 sticky top-32">
              <h3 className="text-[11px] uppercase tracking-[0.2em] font-semibold border-b pb-4">Order Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Subtotal</span>
                  <span className="font-mono">{formattedTotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Shipping</span>
                  <span className="text-stone-500 italic">Calculated at checkout</span>
                </div>
                <div className="border-t pt-4 flex justify-between items-end">
                  <span className="text-lg font-serif">Estimated Total</span>
                  <div className="text-right">
                     <span className="block text-2xl font-mono text-brand-gold">{formattedTotal}</span>
                     <span className="text-[9px] text-stone-400 uppercase">Prices in BDT</span>
                  </div>
                </div>
              </div>
              
              <Link
                href="/checkout"
                className="block w-full bg-brand-dark text-white text-center py-5 text-[11px] uppercase tracking-widest font-bold group"
              >
                Proceed to Checkout
                <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <div className="space-y-4 pt-4">
                 <p className="text-[10px] text-stone-400 leading-relaxed italic text-center">
                   Secure payment processed. Fast delivery guaranteed within 2-3 business days.
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
