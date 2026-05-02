import { wc } from '@/lib/woocommerce';
import ProductCard from '@/components/ProductCard';

export default async function ShopPage() {
  const products = await wc.getProducts();

  return (
    <div className="pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 space-y-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold">Collections</span>
          <h1 className="text-5xl md:text-6xl font-serif">All Products</h1>
          <p className="text-stone-500 max-w-xl text-lg">
            Discover our entire range of handcrafted imitation jewellery. 
            From timeless classics to contemporary statements.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
