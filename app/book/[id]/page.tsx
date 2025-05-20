"use client";
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FaHeart } from 'react-icons/fa';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaAngleLeft } from 'react-icons/fa6';
import { CiHeart } from 'react-icons/ci';
import { FaRegUser } from "react-icons/fa6";
import {Book, books} from '@/app/consts/books';
import { usePathname } from 'next/navigation';
import { FaRegHeart } from "react-icons/fa";

const BookDetail = () => {
  const pathname = usePathname();
  const id = pathname.split('/')[2];
  const [book, setBook] = useState<Book | null>(null);
  const [like, setLike] = useState(false);

  useEffect(() => {
    if (id) {
      const foundBook = books
        .flatMap(category => category.items)
        .find(item => item.id === parseInt(id as string, 10));
      setBook(foundBook || null);
    }
  }, [id]);

  const likeBook = () => {
    setLike(!like);
  };

  if (!book) {
    return <div>Book not found.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen"> 
      <div className="flex flex-col px-4 md:px-10">
     
      <Link href="/" className="pt-14 flex items-center">
        <FaAngleLeft />
        <span className="text-xl font-bold pl-1.5">Book Details</span>
      </Link>
      </div>

      <main className="flex-grow"> 
        <div className="flex flex-col items-center pt-2.5 pb-6 px-4 md:px-10"> 
          <div className="flex flex-col md:flex-row gap-10 p-4 w-full md:w-auto">
            <div className="bg-violet-100 shadow-none rounded-lg overflow-hidden flex-shrink-0 flex justify-center items-center h-auto w-full md:w-1/3">
              <Image
                className="w-2/3 md:w-3/4 mt-7 mb-7"
                src={book.img}
                alt={book.name}
                width={200}
                height={300}
              />
            </div>

            <div className="relative w-full md:w-2/3">
              <h1 className="text-4xl font-semibold">{book.name}</h1>
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl mt-4 font-semibold text-zinc-600">{book.author}</h2>
                  <h2 className="text-2xl font-bold mt-12">Summary</h2>
                  <div className="mt-4 mb-10 md:mb-0">
                    <p className="text-gray-500 text-base md:text-lg">
                      {book.description}
                    </p>
                  </div>
                </div>
                <div className="mt-2 md:mt-0">
                  {like ? (
                    <FaHeart size="2.7em" className="text-red-400 cursor-pointer" onClick={likeBook} />
                  ) : (
                    <CiHeart size="2.4em" className="text-red-400 cursor-pointer" onClick={likeBook} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Buy Now butonu */}
      <div className="bg-white shadow-md md:hidden fixed bottom-0 left-0 w-full">
        <Link href="#" className="flex items-center justify-between bg-orange-500 text-white w-full md:w-[300px] h-[50px] mx-auto px-6">
          <span className="text-xl font-semibold">{book.price} $</span>
          <span className="text-lg">Buy Now</span>
        </Link>
      </div>

      {/* Tabletler İçin */}
      <div className="hidden md:flex md:fixed md:bottom-10 md:right-4 md:w-[300px] md:h-[50px] md:bg-orange-500 md:text-white md:rounded-lg md:shadow-lg">
        <Link href="#" className="flex items-center justify-between w-full h-full px-6">
          <span className="text-xl font-semibold">{book.price} $</span>
          <span className="text-lg">Buy Now</span>
        </Link>
      </div>
    </div>
  );
};

export default BookDetail;