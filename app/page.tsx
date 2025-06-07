"use client";

import Link from "next/link";
import Image from "next/image";
import { Carousel } from "flowbite-react";
import { books } from "./consts/books";

const Page = () => {
  return (
    <div className="flex flex-col">
      {/* Carousel */}
      <div className="relative mt-6 px-4 sm:px-6 md:px-8 lg:px-10">
        <Carousel>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="relative">
              <Image
                src="/images/banner.png"
                alt="Banner"
                width={1200}
                height={400}
                className="w-full h-auto sm:h-64 md:h-80 lg:h-96 object-cover"
                priority={i === 0} // İlk görsel öncelikli yüklenir
              />
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-center text-white bg-black bg-opacity-50">
                <div>
                  <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-amber-500">
                    {i === 0 && "25% discount"}
                    {i === 1 && "Farklı bir kampanya!"}
                    {i === 2 && "Son kampanya!"}
                  </span>
                  <br />
                  <span className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold">
                    {i === 0 && "all Paulo Coelho books!"}
                    {i === 1 && "Daha fazla kitap keşfedin!"}
                    {i === 2 && "En sevdiğiniz yazarlar burada!"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Kitap Kartları Bölümü */}
      <div className="mt-6 px-4 sm:px-6 md:px-8 lg:px-10">
        {books.map((category) => (
          <div key={category.category} className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold">{category.category}</span>
              <Link
                href={`/category/${encodeURIComponent(category.category.toLowerCase())}`}
                className="text-orange-500 text-base font-semibold"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {category.items.slice(0, 4).map((book) => (
                <Link
                  key={book.id}
                  href={`/book/${book.id}`}
                  className="flex flex-col sm:flex-row bg-violet-100 border border-gray-200 rounded-lg overflow-hidden"
                >
                  <div className="w-full sm:w-1/3">
                    <Image
                      src={book.img}
                      alt={book.name}
                      width={200}
                      height={300}
                      className="object-cover"
                      priority={false}
                    />
                  </div>
                  <div className="flex flex-col justify-between p-4 sm:w-2/3">
                    <div className="flex flex-col flex-grow">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">{book.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-700">{book.author}</p>
                    </div>
                    <p className="text-sm font-bold text-purple-600 mt-2">{book.price} $</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
