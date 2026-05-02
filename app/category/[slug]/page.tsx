import { notFound } from 'next/navigation';
import { wc } from '@/lib/woocommerce';
import ProductCard from '@/components/ProductCard';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  
  const categories = await wc.getCategories();
  const category = categories.find(c => c.slug === slug);
  
  if (!category) {
    notFound();
  }

  const products = await wc.getProducts({ category: slug });

  return (
    <div className="pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 space-y-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold">Category</span>
          <h1 className="text-5xl md:text-6xl font-serif capitalize">{category.name}</h1>
          <p className="text-stone-500 max-w-xl text-lg">
            {category.description || `Browse our exclusive collection of ${category.name.toLowerCase()}.`}
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="text-stone-400 font-serif italic text-xl">No pieces found in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
