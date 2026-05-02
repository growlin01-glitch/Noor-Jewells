'use client';

import { motion } from 'motion/react';
import { Mail } from 'lucide-react';

export default function Newsletter() {
  return (
    <section className="bg-brand-dark py-24 px-6 md:px-12 text-white overflow-hidden relative">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="space-y-8"
        >
          <div className="w-12 h-1 bg-brand-gold mx-auto" />
          <h2 className="text-4xl md:text-5xl font-serif">Join the <span className="italic">Nooré</span> Circle</h2>
          <p className="text-stone-400 text-lg max-w-lg mx-auto">
            Subscribe to receive exclusive early access to new collections, 
            styling tips, and private invitations.
          </p>
          
          <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto pt-4" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your Email Address" 
              className="flex-grow bg-white/10 border border-white/20 px-6 py-4 text-sm outline-none focus:border-brand-gold transition-colors"
              required
            />
            <button className="bg-brand-gold text-white px-8 py-4 text-[11px] uppercase tracking-widest font-bold hover:bg-white hover:text-brand-dark transition-all">
              Subscribe
            </button>
          </form>
          
          <p className="text-[10px] uppercase tracking-widest text-stone-500">
            By subscribing, you agree to our privacy policy.
          </p>
        </motion.div>
      </div>

      {/* Decorative background text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[15vw] font-serif font-black text-white/5 whitespace-nowrap pointer-events-none select-none">
        EXCLUSIVE ACCESS
      </div>
    </section>
  );
}
