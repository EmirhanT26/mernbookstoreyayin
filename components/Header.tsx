'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaRegUser, FaPlus } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";

const Header = () => {
  const pathname = usePathname();
  const noHeaderPages = ['/login', '/register'];

  if (noHeaderPages.includes(pathname)) return null;

  return (
    <div className="grid grid-cols-12 mt-6 px-4 sm:px-6 md:px-8 lg:px-10 gap-4 items-center">
      {/* Logo */}
      <div className="col-span-12 md:col-span-3 flex justify-center md:justify-start">
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

      {/* Search */}
      <div className="relative col-span-12 md:col-span-6 mt-4 md:mt-0">
        <span className="absolute left-3 top-2.5 text-gray-400">
          <FontAwesomeIcon icon={faSearch} />
        </span>
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 px-4 py-2 border border-none rounded-md outline-none bg-violet-100"
        />
      </div>

      {/* Iconlar */}
      <div className="flex justify-center md:justify-end items-center gap-2 md:gap-3 col-span-12 md:col-span-3 mt-4 md:mt-0 flex-wrap">
        <Link href="/login">
          <div className="bg-violet-100 w-10 h-10 rounded-md flex items-center justify-center hover:bg-violet-200 transition">
            <FaRegUser size={18} />
          </div>
        </Link>

        <div className="bg-violet-100 w-10 h-10 rounded-md flex items-center justify-center">
          <FaRegHeart size={18} />
        </div>

        <Link href="/checkout">
          <div className="bg-violet-100 w-10 h-10 rounded-md flex items-center justify-center hover:bg-violet-200 transition">
            <AiOutlineShoppingCart size={20} />
          </div>
        </Link>

        <Link href="/bookmanage">
          <div className="bg-violet-100 w-10 h-10 rounded-md flex items-center justify-center hover:bg-violet-200 transition">
            <FaPlus size={16} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
