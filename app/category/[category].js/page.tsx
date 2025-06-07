'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function CategoryPage() {
  const params = useParams();
  const category = params.category;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Kategori: {category}</h1>
      <Link href="/" className="text-blue-500 hover:underline">
        Anasayfaya Dön
      </Link>
    </div>
  );
}
