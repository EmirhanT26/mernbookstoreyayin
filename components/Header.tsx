'use client'; // Client-side hook'ların çalışabilmesi için

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaRegUser } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";

const Header = () => {
  const pathname = usePathname(); // Sayfanın yolunu alın
  const noHeaderPages = ['/login', '/register']; // Header’ın gizleneceği sayfalar

  if (noHeaderPages.includes(pathname)) return null; // Header'ı gizleyin

  return (
    <div className="grid grid-cols-12 mt-6 px-4 sm:px-6 md:px-8 lg:px-10 gap-4">
      <div className="col-span-12 md:col-span-3">
        <Link href="/">
          <Image
            src="/images/logo.png"
            width={60}
            height={39}
            alt="Logo"
            className="w-15 h-13"
          />
        </Link>
      </div>
      <div className="flex items-center relative col-span-12 md:col-span-6">
        <span className="absolute left-3 top-2 text-gray-400">
          <FontAwesomeIcon icon={faSearch} />
        </span>
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-12 px-4 py-2 border border-none rounded-none outline-none bg-violet-100"
        />
      </div>
      <div className="flex justify-center items-center gap-3 col-span-12 md:col-span-3">
        <Link href="/login">
          <div className="bg-violet-100 w-11 h-11 flex items-center justify-center">
            <FaRegUser size="1.5em" />
          </div>
        </Link>
        <div className="bg-violet-100 w-11 h-11 flex items-center justify-center">
          <FaRegHeart size="1.7em" />
        </div>
        <div className="bg-violet-100 w-11 h-11 flex items-center justify-center">
          <Link href="/checkout">
          <AiOutlineShoppingCart size="2.0em" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
