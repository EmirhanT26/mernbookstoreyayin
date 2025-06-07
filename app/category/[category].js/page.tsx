import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';

type Book = {
  id: number;
  name: string;
  author: string;
  price: number;
  img: string;
};

type Category = {
  category: string;
  items: Book[];
};

const books: Category[] = [
  {
    category: "Best Seller",
    items: [
      { id: 1, name: "Dune", author: "Frank Herbert", price: 87.75, img: "/images/dune.png" },
      { id: 2, name: "1984", author: "George Orwell", price: 37.75, img: "/images/1984.png" },
      { id: 3, name: "Ikıgai", author: "Hector Garcia", price: 36.00, img: "/images/ikigai.png" },
      { id: 4, name: "Metafizik", author: "Aristoteles", price: 36.00, img: "/images/metafizik.png" },
    ],
  },
  {
    category: "Classics",
    items: [
      { id: 1, name: "Romeo Ve Juliet", author: "William Shakespeare", price: 87.75, img: "/images/romeovejuliet.png" },
      { id: 2, name: "Olağan Üstü Bir Gece", author: "Stefan Zweig", price: 35.75, img: "/images/olaganustubirgece.png" },
      { id: 3, name: "Genç Werther&apos;in Acıları", author: "Goethe", price: 36.00, img: "/images/gencwerther.jpg" },
      { id: 4, name: "Zaman Makinesi", author: "H.G Wells", price: 36.00, img: "/images/zamanmakinesi.png" },
    ],
  },
  {
    category: "Children",
    items: [
      { id: 1, name: "Mor Bir Fil Gördüm Sanki", author: "Varol Yaşaroğlu", price: 87.75, img: "/images/morbirfil.png" },
      { id: 2, name: "Alev Saçlı Çocuk", author: "Christine Nöstlinger", price: 35.75, img: "/images/alevsaclicocuk.png" },
      { id: 3, name: "Melodi", author: "Anıl Basılı", price: 36.00, img: "/images/melodi.png" },
      { id: 4, name: "Siber Kahramanlar", author: "Feyza Şahin", price: 36.00, img: "/images/siberkahramanlar.png" },
    ],
  },
];

const CategoryPage = () => {
  const params = useParams();
  const category = params.category;

  if (typeof category !== 'string') {
    return <p>Geçersiz kategori.</p>;
  }

  const categoryData = books.find(cat => cat.category === category);

  if (!categoryData) {
    return <p>Kategori bulunamadı.</p>;
  }

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-10">
      <h1 className="text-3xl font-bold mb-4">{categoryData.category} Books</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
        {categoryData.items.map((book) => (
          <div key={book.id} className="bg-violet-100 p-4 rounded-md">
            <Image
              src={book.img}
              alt={book.name}
              width={300}
              height={200}
              className="mb-2 rounded-md object-cover"
            />
            <h5 className="text-lg font-bold">{book.name}</h5>
            <p className="text-sm text-gray-700">{book.author}</p>
            <p className="font-bold text-purple-600 mt-2">{book.price} $</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;