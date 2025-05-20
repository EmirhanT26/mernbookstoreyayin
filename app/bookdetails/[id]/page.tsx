"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaAngleLeft, FaHeart, FaRegHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";

interface Book {
  _id: string;
  title: string;
  author: string;
  image: string;
  price?: number;
  description?: string;
}

interface BookDetailProps {
  params: {
    id: string;
  };
}

const BookDetail: React.FC<BookDetailProps> = ({ params }) => {
  const { id } = params;
  const [book, setBook] = useState<Book | null>(null);
  const [like, setLike] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`/api/books/${id}`);
        const data = await res.json();
        if (data.success) {
          setBook(data.data);
        } else {
          setBook(null);
        }
      } catch (error) {
        console.error("Kitap alınamadı", error);
        setBook(null);
      }
    };
    fetchBook();
  }, [id]);

  const likeBook = () => {
    setLike(!like);
  };

  if (!book) {
    return (
      <div className="text-center text-xl mt-20 text-red-600">
        Book not found.
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Geri Dön */}
      <div className="px-4 md:px-10 pt-8">
        <Link href="/" className="flex items-center text-lg font-medium">
          <FaAngleLeft />
          <span className="pl-2">Book Details</span>
        </Link>
      </div>

      <main className="flex-grow px-4 md:px-10 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Kitap Görseli */}
          <div className="flex justify-center">
            <div className="bg-violet-100 rounded-lg p-4 w-72 md:w-80 shadow-md">
              <Image
                src={book.image}
                alt={book.title}
                width={300}
                height={400}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Kitap Bilgisi */}
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold">{book.title}</h1>
              <div>
                {like ? (
                  <FaHeart
                    size="1.8em"
                    className="text-red-500 cursor-pointer"
                    onClick={likeBook}
                  />
                ) : (
                  <CiHeart
                    size="1.8em"
                    className="text-red-500 cursor-pointer"
                    onClick={likeBook}
                  />
                )}
              </div>
            </div>

            <h2 className="text-xl text-gray-600">{book.author}</h2>

            <div>
              <h3 className="text-lg font-semibold">Summary</h3>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                {book.description || "No description provided."}
              </p>
            </div>

            {book.price !== undefined && (
              <div className="mt-4">
                <span className="text-xl font-semibold text-orange-500">
                  {book.price} $
                </span>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Buy Now Butonu (Mobil) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-md">
        <Link
          href="#"
          className="flex items-center justify-between bg-orange-500 text-white px-6 h-[50px]"
        >
          <span className="text-xl font-semibold">{book.price} $</span>
          <span className="text-lg">Buy Now</span>
        </Link>
      </div>

      {/* Buy Now Butonu (Tablet / Desktop) */}
      <div className="hidden md:flex md:fixed md:bottom-6 md:right-6">
        <Link
          href="#"
          className="bg-orange-500 text-white rounded-lg shadow-lg px-6 py-3 flex items-center justify-between w-[280px]"
        >
          <span className="text-xl font-semibold">{book.price} $</span>
          <span className="text-lg">Buy Now</span>
        </Link>
      </div>
    </div>
  );
};

export default BookDetail;
