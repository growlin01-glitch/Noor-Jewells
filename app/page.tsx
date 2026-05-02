import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import * as motion from 'motion/react-client';
import { wc } from '@/lib/woocommerce';
import ProductCard from '@/components/ProductCard';

export default async function Home() {
  const products = await wc.getProducts({ limit: 4 });
  const categories = await wc.getCategories();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://picsum.photos/seed/luxury/1920/1080"
            alt="Jewellery Hero"
            fill
            className="object-cover scale-105"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center text-white px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[11px] uppercase tracking-[0.5em] mb-6 font-semibold"
          >
            Spring / Summer 2026
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif mb-8 max-w-4xl font-light leading-tight"
          >
            The Art of <span className="italic font-normal">Modern</span> Brilliance
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 bg-white text-brand-dark px-8 py-4 rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-brand-gold hover:text-white transition-all transform hover:scale-105"
            >
              Explore Collection <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/60">Scroll to Explore</span>
          <div className="w-px h-12 bg-white/20 relative overflow-hidden">
             <motion.div 
               animate={{ y: [0, 48] }}
               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
               className="w-full h-1/2 bg-white absolute top-0 left-0"
             />
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold">Curated Selection</span>
              <h2 className="text-4xl md:text-5xl font-serif">Signature Categories</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.slice(0, 4).map((category, index) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="group relative aspect-[3/4] overflow-hidden"
              >
                <Image
                  src={category.image?.src || `https://picsum.photos/seed/${category.slug}/800/1000`}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-8 left-8 right-8 text-white z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-[10px] uppercase tracking-[0.2em] mb-2 opacity-0 group-hover:opacity-80 transition-opacity">Explore</p>
                  <h3 className="text-3xl font-serif tracking-wide">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Split */}
      <section className="grid grid-cols-1 lg:grid-cols-2 h-auto lg:h-[700px]">
        <div className="bg-brand-dark text-white p-12 md:p-24 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-brand-gold">Our Philosophy</span>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight">Masterfully Crafted <br/> <span className="italic font-light">Elegance</span></h2>
            <p className="text-stone-400 text-lg leading-relaxed max-w-md">
              We believe that beauty should be accessible. Our pieces are more than just accessories—they are reflections of the soul, crafted with the same precision as fine jewelry, but designed for the modern lifestyle.
            </p>
            <Link 
              href="/about" 
              className="inline-flex items-center gap-2 group text-sm uppercase tracking-widest border-b border-white/20 pb-2 hover:border-brand-gold transition-all"
            >
              The Story of Nooré <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
        <div className="relative aspect-square lg:aspect-auto">
          <Image
            src="https://picsum.photos/seed/story/1000/1200"
            alt="Handcrafting process"
            fill
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-6 md:px-12 bg-[#fcfbf7]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
             <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold">New Arrivals</span>
             <h2 className="text-4xl md:text-5xl font-serif">The Aura Edit</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/shop"
              className="inline-block px-12 py-5 border border-brand-dark/20 text-xs uppercase tracking-widest font-semibold hover:bg-brand-dark hover:text-white transition-all"
            >
              View Full Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Quote / Banner */}
      <section className="py-32 px-6 bg-white overflow-hidden relative">
         <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="w-12 h-1 bg-brand-gold mx-auto" />
              <blockquote className="text-3xl md:text-5xl font-serif italic text-stone-800 leading-snug">
                &quot;Jewellery has the power to be the one little thing that makes you feel unique.&quot;
              </blockquote>
              <p className="text-[11px] uppercase tracking-[0.3em] text-stone-500">— Elizabeth Taylor</p>
            </motion.div>
         </div>
         {/* Background text decoration */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-serif text-stone-50 opacity-[0.03] whitespace-nowrap pointer-events-none select-none">
            NOORÉ COLLECTION
         </div>
      </section>
    </div>
  );
}
