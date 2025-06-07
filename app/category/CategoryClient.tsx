'use client';

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from 'react';
import { FaAngleLeft } from "react-icons/fa6";

type BookFromDB = {
  _id: string;
  title: string;
  author?: string;
  image?: string;
  price?: number;
};

const CategoryClient = () => {
  const params = useSearchParams();
  const categoryId = params.get('categoryId') || '1';

  const [books, setBooks] = useState<BookFromDB[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      const res = await fetch(`/api/books?categoryId=${categoryId}`);
      const data = await res.json();
      setBooks(data.data || []);
      setLoading(false);
    }
    fetchBooks();
  }, [categoryId]);

  if (loading) return <div className="p-4 text-center">Yükleniyor...</div>;

  return (
    <div className="flex flex-col px-4 md:px-8 lg:px-16">
      <Link href="/" className="pt-14 flex items-center">
        <div className="pl-0">
          <FaAngleLeft />
        </div>
        <span className="text-xl font-bold pl-[5px]">Home Page</span>
      </Link>

      <div className="flex justify-center items-center pt-2.5 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {books.length === 0 && (
            <p className="col-span-full text-center text-gray-500">Bu kategoride kitap bulunamadı.</p>
          )}
          {books.map(book => (
            <Link
              key={book._id}
              href={`/bookdetails/${book._id}`}
              className="bg-violet-100 shadow-none rounded-lg overflow-hidden"
            >
              <div className="relative">
                {book.image ? (
                  <Image 
                    className="w-full h-[400px] object-cover" 
                    src={book.image} 
                    alt={book.title} 
                    width={270} 
                    height={400} 
                  />
                ) : (
                  <div className="w-full h-[400px] bg-gray-300 flex items-center justify-center text-gray-600">Resim yok</div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold">{book.title}</h3>
                <p className="text-gray-500 font-semibold">{book.author || '-'}</p>
                <p className="text-purple-600 font-bold mt-2 text-xl">{book.price ? `${book.price} $` : '-'}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryClient;
