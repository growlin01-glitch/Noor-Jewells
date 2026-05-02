'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ShoppingBag, Eye } from 'lucide-react';
import { Product } from '@/lib/woocommerce';
import { useCart } from '@/lib/store';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCart((state) => state.addItem);

  const formattedPrice = new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 0,
  }).format(parseFloat(product.price));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 mb-4">
        <Link href={`/product/${product.slug}`} className="block h-full w-full relative z-10">
          {product.images[0] && (
            <Image
              src={product.images[0].src}
              alt={product.images[0].alt || product.name}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
          )}
        </Link>
        
        {/* Sale Badge */}
        {product.on_sale && (
           <span className="absolute top-4 left-4 bg-brand-gold text-white text-[10px] uppercase tracking-widest px-3 py-1 z-20">
             Sale
           </span>
        )}

        {/* Quick Actions Overlay - Hidden on mobile pointers */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-20 pointer-events-none md:pointer-events-auto">
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addItem(product);
              }}
              className="w-12 h-12 bg-white text-brand-dark flex items-center justify-center rounded-full shadow-xl hover:bg-brand-gold hover:text-white transition-all transform hover:scale-110 pointer-events-auto"
              title="Add to Cart"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <Link href={`/product/${product.slug}`} className="block space-y-1 text-center">
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-medium">
          {product.categories[0]?.name || 'Collection'}
        </p>
        <h3 className="font-serif text-lg tracking-wide group-hover:text-brand-gold transition-colors line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center justify-center gap-3">
          {product.sale_price ? (
            <>
              <span className="text-stone-400 line-through text-sm">
                ৳{product.regular_price}
              </span>
              <span className="font-mono text-sm tracking-tight font-medium">
                {formattedPrice}
              </span>
            </>
          ) : (
            <span className="font-mono text-sm tracking-tight font-medium">
              {formattedPrice}
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
