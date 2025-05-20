"use client";
import Link from "next/link";
import { Carousel } from "flowbite-react";
import { books } from "./consts/books";

const Page = () => {
  return (
    <div className="flex flex-col">

      {/* Carousel */}
      <div className="relative mt-6 px-4 sm:px-6 md:px-8 lg:px-10">
        <Carousel>
          <div className="relative">
            <img
              src="/images/banner.png"
              alt="..."
              className="w-full h-auto sm:h-64 md:h-80 lg:h-96 object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-center text-white bg-black bg-opacity-50">
              <div>
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-amber-500">
                  25% discount
                </span>
                <br />
                <span className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold">
                  all Paulo Coelho books!
                </span>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="/images/banner.png"
              alt="..."
              className="w-full h-auto sm:h-64 md:h-80 lg:h-96 object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-center text-white bg-black bg-opacity-50">
              <div>
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-amber-500">
                  Farklı bir kampanya!
                </span>
                <br />
                <span className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold">
                  Daha fazla kitap keşfedin!
                </span>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="/images/banner.png"
              alt="..."
              className="w-full h-auto sm:h-64 md:h-80 lg:h-96 object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-center text-white bg-black bg-opacity-50">
              <div>
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-amber-500">
                  Son kampanya!
                </span>
                <br />
                <span className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold">
                  En sevdiğiniz yazarlar burada!
                </span>
              </div>
            </div>
          </div>
        </Carousel>
      </div>

      {/* Kitap Kartları Bölümü */}
      <div className="mt-6 px-4 sm:px-6 md:px-8 lg:px-10">
        {books.map((category) => (
          <div key={category.category} className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold">{category.category}</span>
              <Link
                href={{
                  pathname: '/category',
                  query: { categoryId: category.categoryId },
                }}
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
                    <img
                      src={book.img}
                      alt={book.name}
                      className="w-full h-full object-cover"
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
