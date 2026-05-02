import Link from 'next/link';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t pt-20 pb-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <h2 className="text-2xl font-serif tracking-widest uppercase">
              Nooré <span className="text-brand-gold">.</span>
            </h2>
            <p className="text-stone-500 text-sm leading-relaxed max-w-xs">
              Curating the finest imitation jewellery for moments that matter. 
              Elegance handcrafted with passion and delivered with care across Bangladesh.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-brand-dark hover:text-white transition-all">
                <Instagram className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-brand-dark hover:text-white transition-all">
                <Facebook className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-brand-dark hover:text-white transition-all">
                <Twitter className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-[11px] uppercase tracking-[0.2em] font-semibold">Store</h3>
            <ul className="space-y-4">
              <li><Link href="/shop" className="text-sm text-stone-600 hover:text-brand-gold transition-colors">Shop All</Link></li>
              <li><Link href="/category/necklaces" className="text-sm text-stone-600 hover:text-brand-gold transition-colors">Necklaces</Link></li>
              <li><Link href="/category/earrings" className="text-sm text-stone-600 hover:text-brand-gold transition-colors">Earrings</Link></li>
              <li><Link href="/category/bracelets" className="text-sm text-stone-600 hover:text-brand-gold transition-colors">Bracelets</Link></li>
              <li><Link href="/category/rings" className="text-sm text-stone-600 hover:text-brand-gold transition-colors">Rings</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h3 className="text-[11px] uppercase tracking-[0.2em] font-semibold">Support</h3>
            <ul className="space-y-4">
              <li><Link href="/track" className="text-sm text-stone-600 hover:text-brand-gold transition-colors">Track Order</Link></li>
              <li><Link href="/shipping" className="text-sm text-stone-600 hover:text-brand-gold transition-colors">Shipping Options</Link></li>
              <li><Link href="/returns" className="text-sm text-stone-600 hover:text-brand-gold transition-colors">Returns & Exchanges</Link></li>
              <li><Link href="/care" className="text-sm text-stone-600 hover:text-brand-gold transition-colors">Jewellery Care</Link></li>
              <li><Link href="/faq" className="text-sm text-stone-600 hover:text-brand-gold transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-[11px] uppercase tracking-[0.2em] font-semibold">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-brand-gold shrink-0" />
                <span className="text-sm text-stone-600">BD Market, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <span className="text-sm text-stone-600">+880 17XX XXX XXX</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <span className="text-sm text-stone-600">hello@noorejewells.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-[0.1em] text-stone-400">
            &copy; {new Date().getFullYear()} Nooré Jewells. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link href="/privacy" className="text-[10px] uppercase tracking-[0.1em] text-stone-400 hover:text-brand-dark">Privacy Policy</Link>
            <Link href="/terms" className="text-[10px] uppercase tracking-[0.1em] text-stone-400 hover:text-brand-dark">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
