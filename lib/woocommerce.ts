export interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  description: string;
  short_description: string;
  images: { id: number; src: string; alt: string }[];
  categories: { id: number; name: string; slug: string }[];
  attributes: { id: number; name: string; options: string[] }[];
  stock_status: 'instock' | 'outofstock';
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: { src: string; alt: string } | null;
  count: number;
}

// Mock Data for Luxury Storefront
const MOCK_CATEGORIES: Category[] = [
  {
    id: 1,
    name: 'Necklaces',
    slug: 'necklaces',
    description: 'Timeless elegance for your neck. Handcrafted with precision.',
    image: { src: 'https://picsum.photos/seed/necklace/800/1000', alt: 'Necklace Category' },
    count: 12
  },
  {
    id: 2,
    name: 'Earrings',
    slug: 'earrings',
    description: 'Drop, stud, or hoop - find your perfect pair.',
    image: { src: 'https://picsum.photos/seed/earrings/800/1000', alt: 'Earrings Category' },
    count: 18
  },
  {
    id: 3,
    name: 'Bracelets',
    slug: 'bracelets',
    description: 'Adorn your wrists with gold-plated beauty.',
    image: { src: 'https://picsum.photos/seed/bracelet/800/1000', alt: 'Bracelets Category' },
    count: 8
  },
  {
    id: 4,
    name: 'Rings',
    slug: 'rings',
    description: 'Symbols of commitment and style.',
    image: { src: 'https://picsum.photos/seed/ring/800/1000', alt: 'Rings Category' },
    count: 15
  }
];

const MOCK_PRODUCTS: Product[] = [
  {
    id: 101,
    name: 'Royal Emerald Choker',
    slug: 'royal-emerald-choker',
    price: '4500',
    regular_price: '5500',
    sale_price: '4500',
    description: 'A magnificent emerald choker piece designed for royalty.',
    short_description: 'Exquisite emerald imitation choker necklace.',
    images: [{ id: 1, src: 'https://picsum.photos/seed/jewellery1/800/1000', alt: 'Royal Emerald Choker' }],
    categories: [{ id: 1, name: 'Necklaces', slug: 'necklaces' }],
    attributes: [],
    stock_status: 'instock',
    on_sale: true
  },
  {
    id: 102,
    name: 'Golden Bloom Earrings',
    slug: 'golden-bloom-earrings',
    price: '2200',
    regular_price: '2200',
    sale_price: '',
    description: 'Delicate floral pattern earrings with premium gold plating.',
    short_description: 'Floral pattern gold-plated earrings.',
    images: [{ id: 2, src: 'https://picsum.photos/seed/jewellery2/800/1000', alt: 'Golden Bloom Earrings' }],
    categories: [{ id: 2, name: 'Earrings', slug: 'earrings' }],
    attributes: [],
    stock_status: 'instock',
    on_sale: false
  },
  {
    id: 103,
    name: 'Infinity Link Bracelet',
    slug: 'infinity-link-bracelet',
    price: '3100',
    regular_price: '3100',
    sale_price: '',
    description: 'Timeless infinity links for a modern wrist accessory.',
    short_description: 'Sleek infinity link gold-plated bracelet.',
    images: [{ id: 3, src: 'https://picsum.photos/seed/jewellery3/800/1000', alt: 'Infinity Link Bracelet' }],
    categories: [{ id: 3, name: 'Bracelets', slug: 'bracelets' }],
    attributes: [],
    stock_status: 'instock',
    on_sale: false
  },
  {
    id: 104,
    name: 'Solitaire Shine Ring',
    slug: 'solitaire-shine-ring',
    price: '1800',
    regular_price: '2500',
    sale_price: '1800',
    description: 'A classic solitaire ring with a brilliant cubic zirconia.',
    short_description: 'Classic solitaire imitation ring.',
    images: [{ id: 4, src: 'https://picsum.photos/seed/jewellery4/800/1000', alt: 'Solitaire Shine Ring' }],
    categories: [{ id: 4, name: 'Rings', slug: 'rings' }],
    attributes: [],
    stock_status: 'instock',
    on_sale: true
  }
];

// WooCommerce API Client
class WooCommerceClient {
  private baseUrl: string;
  private consumerKey: string;
  private consumerSecret: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || '';
    this.consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY || '';
    this.consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET || '';
  }

  private isConfigured() {
    return this.baseUrl && this.consumerKey && this.consumerSecret;
  }

  async getProducts(params?: { category?: string; limit?: number }) {
    if (!this.isConfigured()) {
      // Return mock data filtered by category if configuredness is missing
      if (params?.category) {
        return MOCK_PRODUCTS.filter(p => p.categories.some(c => c.slug === params.category));
      }
      return MOCK_PRODUCTS.slice(0, params?.limit || 10);
    }

    try {
      const url = new URL(`${this.baseUrl}/wp-json/wc/v3/products`);
      url.searchParams.append('consumer_key', this.consumerKey);
      url.searchParams.append('consumer_secret', this.consumerSecret);
      if (params?.category) url.searchParams.append('category', params.category);
      if (params?.limit) url.searchParams.append('per_page', params.limit.toString());

      const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
      if (!res.ok) throw new Error('Failed to fetch products');
      return await res.json() as Product[];
    } catch (error) {
      console.error('WooCommerce API Error:', error);
      return MOCK_PRODUCTS;
    }
  }

  async getProductBySlug(slug: string) {
    if (!this.isConfigured()) {
      return MOCK_PRODUCTS.find(p => p.slug === slug) || null;
    }

    try {
      const url = new URL(`${this.baseUrl}/wp-json/wc/v3/products`);
      url.searchParams.append('consumer_key', this.consumerKey);
      url.searchParams.append('consumer_secret', this.consumerSecret);
      url.searchParams.append('slug', slug);

      const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
      if (!res.ok) throw new Error('Failed to fetch product');
      const products = await res.json() as Product[];
      return products[0] || null;
    } catch (error) {
      console.error('WooCommerce API Error:', error);
      return MOCK_PRODUCTS.find(p => p.slug === slug) || null;
    }
  }

  async getCategories() {
    if (!this.isConfigured()) {
      return MOCK_CATEGORIES;
    }

    try {
      const url = new URL(`${this.baseUrl}/wp-json/wc/v3/products/categories`);
      url.searchParams.append('consumer_key', this.consumerKey);
      url.searchParams.append('consumer_secret', this.consumerSecret);

      const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
      if (!res.ok) throw new Error('Failed to fetch categories');
      return await res.json() as Category[];
    } catch (error) {
      console.error('WooCommerce API Error:', error);
      return MOCK_CATEGORIES;
    }
  }
}

export const wc = new WooCommerceClient();
