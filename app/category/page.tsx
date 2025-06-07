import dynamic from 'next/dynamic';

// Client component'i dinamik olarak import et (SSR kapalı)
const CategoryClient = dynamic(() => import('./CategoryClient'), { ssr: false });

export default function CategoryPage() {
  return <CategoryClient />;
}