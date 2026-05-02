'use client';

import { useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '@/lib/woocommerce';
import { useCart } from '@/lib/store';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCart((state) => state.addItem);

  const handleAdd = () => {
    addItem(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      className="w-full h-14 bg-brand-dark text-white text-[11px] uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-3 hover:bg-stone-800 transition-all relative overflow-hidden group"
    >
      <AnimatePresence mode="wait">
        {isAdded ? (
          <motion.div
            key="added"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="flex items-center gap-2"
          >
            <Check className="w-4 h-4" /> Added to Cart
          </motion.div>
        ) : (
          <motion.div
            key="add"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" /> Add to Cart
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
    </button>
  );
}
