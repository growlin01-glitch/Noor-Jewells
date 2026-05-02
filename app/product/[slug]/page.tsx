import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Shield, Truck, RotateCcw, Star } from 'lucide-react';
import { wc } from '@/lib/woocommerce';
import AddToCartButton from '@/components/AddToCartButton';
import ProductCard from '@/components/ProductCard';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await wc.getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await wc.getProducts({ 
    category: product.categories[0]?.slug,
    limit: 4 
  });

  const formattedPrice = new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 0,
  }).format(parseFloat(product.price));

  return (
    <div className="pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
              <Image
                src={product.images[0]?.src || 'https://picsum.photos/seed/prod/800/1000'}
                alt={product.name}
                fill
                className="object-cover"
                priority
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.slice(1, 5).map((img, i) => (
                <div key={i} className="relative aspect-square overflow-hidden bg-stone-100 cursor-pointer hover:opacity-80 transition-opacity">
                  <Image src={img.src} alt={product.name} fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="space-y-6 pb-8 border-b">
              <div className="flex items-center gap-1 text-brand-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
                <span className="text-[10px] text-stone-500 ml-2 uppercase tracking-widest">(24 Reviews)</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif">{product.name}</h1>
              <p className="text-2xl font-mono tracking-tighter">{formattedPrice}</p>
              <div 
                className="text-stone-600 leading-relaxed text-lg"
                dangerouslySetInnerHTML={{ __html: product.short_description || product.description }}
              />
            </div>

            <div className="py-8 space-y-8">
              <div className="flex flex-col gap-4">
                 <p className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Options</p>
                 <div className="flex gap-3">
                    <button className="px-6 py-2 border border-brand-dark text-[11px] uppercase tracking-widest font-semibold bg-brand-dark text-white">Gold Plated</button>
                    <button className="px-6 py-2 border border-stone-200 text-[11px] uppercase tracking-widest font-semibold hover:border-brand-gold transition-colors">Silver Plated</button>
                 </div>
              </div>

              <AddToCartButton product={product} />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t">
                <div className="flex flex-col items-center text-center gap-3">
                  <Truck className="w-5 h-5 text-brand-gold" />
                  <p className="text-[10px] uppercase tracking-widest font-bold">Fast Delivery</p>
                  <p className="text-[10px] text-stone-500">2-3 Business Days</p>
                </div>
                <div className="flex flex-col items-center text-center gap-3 text-stone-400 opacity-50">
                  <Shield className="w-5 h-5 text-brand-gold" />
                  <p className="text-[10px] uppercase tracking-widest font-bold">Premium Quality</p>
                  <p className="text-[10px] text-stone-500">Hypoallergenic</p>
                </div>
                <div className="flex flex-col items-center text-center gap-3 text-stone-400 opacity-50">
                  <RotateCcw className="w-5 h-5 text-brand-gold" />
                  <p className="text-[10px] uppercase tracking-widest font-bold">Easy Returns</p>
                  <p className="text-[10px] text-stone-500">7-Day Return Policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Long Description */}
        <div className="max-w-4xl mx-auto mb-24 space-y-8 border-t pt-16">
          <h2 className="text-3xl font-serif text-center">Description</h2>
          <div 
            className="text-stone-600 prose prose-stone max-w-none prose-lg"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>

        {/* Design details & Care */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24 border-t pt-16">
          <div className="space-y-6">
            <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-brand-gold">Craftsmanship</h3>
            <h2 className="text-3xl font-serif">The Nooré Standard</h2>
            <p className="text-stone-600 leading-relaxed">
              Every piece in our collection is subject to rigorous quality control. 
              We use 22K gold-plating techniques that ensure a lasting lustre, 
              paired with high-grade semi-precious stones that capture the light 
              just like the real thing.
            </p>
            <ul className="space-y-4 pt-4">
              <li className="flex items-center gap-3 text-sm text-stone-600">
                <div className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
                Hand-finished by master artisans
              </li>
              <li className="flex items-center gap-3 text-sm text-stone-600">
                <div className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
                Hypoallergenic & lead-free materials
              </li>
              <li className="flex items-center gap-3 text-sm text-stone-600">
                <div className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
                Double-sealed for anti-tarnish protection
              </li>
            </ul>
          </div>
          <div className="bg-stone-50 p-12 space-y-6">
            <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-brand-gold">Care Guide</h3>
            <h2 className="text-3xl font-serif italic">Preserving Brilliance</h2>
            <div className="space-y-4 text-sm text-stone-600 leading-relaxed">
              <p>To maintain the exquisite finish of your Nooré jewellery, please follow these guidelines:</p>
              <div className="grid grid-cols-1 gap-4">
                <p>• Avoid direct contact with perfumes, hairsprays, and lotions.</p>
                <p>• Remove jewellery before swimming, bathing, or exercising.</p>
                <p>• Store in the provided luxury pouch to prevent scratching.</p>
                <p>• Gently wipe with a soft, chemical-free cloth after each wear.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="space-y-12">
          <h2 className="text-3xl font-serif text-center">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.filter(p => p.id !== product.id).slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
