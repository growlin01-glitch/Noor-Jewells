'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Lock, Truck, CreditCard } from 'lucide-react';
import { useCart } from '@/lib/store';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCart();
  const total = getTotal();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formattedTotal = new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 0,
  }).format(total);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call to WooCommerce
    setTimeout(() => {
      clearCart();
      router.push('/checkout/success');
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-24 px-6 text-center">
        <p className="font-serif italic text-xl">Your bag is empty. Please add items before checking out.</p>
        <Link href="/shop" className="text-brand-gold underline mt-4 block">Return to Shop</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <Link href="/cart" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-stone-400 hover:text-brand-dark mb-12">
          <ChevronLeft className="w-4 h-4" /> Back to Bag
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-12">
             <h1 className="text-4xl md:text-5xl font-serif mb-12 text-center">Checkout</h1>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Contact Info */}
              <section className="space-y-6">
                <h3 className="text-[11px] uppercase tracking-[0.2em] font-semibold border-b pb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-brand-dark text-white rounded-full flex items-center justify-center text-[10px]">1</span>
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Full Name</label>
                      <input type="text" required className="w-full border-b border-stone-200 py-2 focus:border-brand-gold outline-none text-sm" placeholder="John Doe" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Phone Number</label>
                      <input type="tel" required className="w-full border-b border-stone-200 py-2 focus:border-brand-gold outline-none text-sm" placeholder="+880 17XX XXX XXX" />
                   </div>
                   <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Email Address</label>
                      <input type="email" required className="w-full border-b border-stone-200 py-2 focus:border-brand-gold outline-none text-sm" placeholder="john@example.com" />
                   </div>
                </div>
              </section>

              {/* Shipping Address */}
              <section className="space-y-6">
                <h3 className="text-[11px] uppercase tracking-[0.2em] font-semibold border-b pb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-brand-dark text-white rounded-full flex items-center justify-center text-[10px]">2</span>
                  Shipping Address
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Street Address</label>
                      <input type="text" required className="w-full border-b border-stone-200 py-2 focus:border-brand-gold outline-none text-sm" placeholder="House 123, Road 4, Sector 7" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Area / City</label>
                      <input type="text" required className="w-full border-b border-stone-200 py-2 focus:border-brand-gold outline-none text-sm" placeholder="Uttara, Dhaka" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Division</label>
                      <select required className="w-full border-b border-stone-200 py-2 focus:border-brand-gold outline-none text-sm bg-transparent">
                        <option>Dhaka</option>
                        <option>Chittagong</option>
                        <option>Rajshahi</option>
                        <option>Khulna</option>
                        <option>Barisal</option>
                        <option>Sylhet</option>
                        <option>Rangpur</option>
                        <option>Mymensingh</option>
                      </select>
                   </div>
                </div>
              </section>

              {/* Payment Method */}
              <section className="space-y-6">
                <h3 className="text-[11px] uppercase tracking-[0.2em] font-semibold border-b pb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-brand-dark text-white rounded-full flex items-center justify-center text-[10px]">3</span>
                  Payment Method
                </h3>
                <div className="space-y-4">
                  <label className="flex items-center gap-4 p-4 border border-brand-dark bg-[#fcfbf7] cursor-pointer">
                    <input type="radio" name="payment" defaultChecked className="accent-brand-dark" />
                    <div>
                      <p className="text-sm font-semibold">Cash on Delivery (COD)</p>
                      <p className="text-[10px] text-stone-500 uppercase tracking-widest">Pay in cash when your order is delivered</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-4 p-4 border border-stone-100 opacity-50 cursor-not-allowed">
                    <input type="radio" name="payment" disabled className="accent-brand-dark" />
                    <div className="flex justify-between w-full items-center">
                      <div>
                        <p className="text-sm font-semibold">Online Payment (Coming Soon)</p>
                        <p className="text-[10px] text-stone-500 uppercase tracking-widest">Secure payment via bKash, SSLCommerz</p>
                      </div>
                      <CreditCard className="w-4 h-4 text-stone-400" />
                    </div>
                  </label>
                </div>
              </section>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-dark text-white py-6 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-stone-800 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>Processing...</>
                ) : (
                  <>Complete Order <Lock className="w-3 h-3" /></>
                )}
              </button>
            </form>
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 space-y-8 bg-[#fcfbf7] p-8">
              <h3 className="text-[11px] uppercase tracking-[0.2em] font-semibold border-b pb-4">In Your Bag</h3>
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-16 h-20 shrink-0 bg-stone-100">
                      <Image src={item.images[0]?.src} alt={item.name} fill className="object-cover" referrerPolicy="no-referrer" />
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-brand-dark text-white text-[8px] flex items-center justify-center rounded-full font-bold">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex flex-col justify-center flex-grow">
                      <h4 className="text-sm font-serif">{item.name}</h4>
                      <p className="text-[10px] text-stone-500 uppercase tracking-widest">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-xs font-mono self-center">৳{parseInt(item.price) * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-6 space-y-4">
                <div className="flex justify-between text-xs">
                  <span className="text-stone-500 uppercase tracking-widest">Subtotal</span>
                  <span className="font-mono">৳{total}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-stone-500 uppercase tracking-widest">Shipping</span>
                  <span className="font-mono">৳80</span>
                </div>
                <div className="flex justify-between text-lg font-serif border-t pt-4">
                  <span>Total</span>
                  <span className="text-brand-gold font-mono">৳{total + 80}</span>
                </div>
              </div>

              <div className="pt-6 space-y-4">
                <div className="flex items-center gap-3 text-stone-500">
                  <Truck className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-widest">Standard Shipping (2-3 Days)</span>
                </div>
                <div className="flex items-center gap-3 text-stone-500">
                  <Lock className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-widest">Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
