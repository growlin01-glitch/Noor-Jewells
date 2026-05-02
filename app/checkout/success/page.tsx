'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { CheckCircle, ArrowRight, Package, Mail } from 'lucide-react';

export default function SuccessPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-2xl w-full text-center space-y-12">
        <motion.div
           initial={{ scale: 0, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ type: 'spring', damping: 15, stiffness: 200 }}
           className="w-24 h-24 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center mx-auto"
        >
          <CheckCircle className="w-12 h-12" />
        </motion.div>

        <div className="space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-serif"
          >
            Your Order is <span className="italic font-light text-brand-gold">Confirmed</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-stone-500 text-lg max-w-md mx-auto"
          >
            Thank you for choosing Nooré. Your exquisite new pieces are being prepared 
            for their journey to you.
          </motion.p>
        </div>

        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.5 }}
           className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="p-6 bg-[#fcfbf7] text-left space-y-3">
             <Package className="w-5 h-5 text-brand-gold" />
             <h3 className="text-[10px] uppercase tracking-widest font-bold">What&apos;s Next?</h3>
             <p className="text-xs text-stone-500 leading-relaxed">
               You&apos;ll receive a confirmation SMS/Email shortly. Our courier partner 
               will contact you within 24 hours to schedule delivery.
             </p>
          </div>
          <div className="p-6 bg-[#fcfbf7] text-left space-y-3">
             <Mail className="w-5 h-5 text-brand-gold" />
             <h3 className="text-[10px] uppercase tracking-widest font-bold">Need Help?</h3>
             <p className="text-xs text-stone-500 leading-relaxed">
               Have questions about your order? Our concierge is here to help at
               hello@noorejewells.com or via WhatsApp.
             </p>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.8 }}
           className="pt-8"
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 bg-brand-dark text-white px-12 py-5 text-[11px] uppercase tracking-widest font-bold hover:bg-stone-800 transition-all group"
          >
            Continue Exploring <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
