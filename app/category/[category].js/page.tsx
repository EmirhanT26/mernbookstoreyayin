"use client"; // BURASI ÇOK ÖNEMLİ - useParams için

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

type Book = {
  id: number;
  title: string;
  category: string;
  image: string;
};

const books: Book[] = [
  {
    id: 1,
    title: "React Kitabı",
    category: "programlama",
    image: "/images/react-book.png",
  },
  {
    id: 2,
    title: "Node.js Kitabı",
    category: "programlama",
    image: "/images/nodejs-book.png",
  },
  {
    id: 3,
    title: "Müzik Teorisi",
    category: "müzik",
    image: "/images/music-book.png",
  },
];

const CategoryPage = () => {
  const params = useParams();
  const categoryParam = params.category; // Bu string olacak, dikkat!

  // Filtreleme
  const filteredBooks = books.filter(
    (book) => book.category === categoryParam
  );

  return (
    <div>
      <h1>Category: {categoryParam}</h1>
      {filteredBooks.length === 0 ? (
        <p>Bu kategoride kitap bulunamadı.</p>
      ) : (
        filteredBooks.map((book) => (
          <div key={book.id}>
            <Link href={`/books/${book.id}`}>
              <h2>{book.title}</h2>
              <Image src={book.image} alt={book.title} width={150} height={200} />
            </Link>
          </div>
        ))
      )}
      <Link href="/">Ana sayfaya dön</Link>
    </div>
  );
};

export default CategoryPage;