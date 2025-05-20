"use client"
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FormInput } from "lucide-react";
import { SubmitHandler } from "react-hook-form";


interface FormData {
  name: string;
  email: string;
  password: string;
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default function Home() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const pushLogin = () => {
    router.push('/login');
  };

  // onSubmit fonksiyonu FormData tipinde veri alıyor
  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission logic here
  };

  return (
    <>
      <div className="h-screen grid grid-cols-2">
        <Image
          src="/images/giris.jpg"
          width={720}
          height={1280}
          alt=""
          className="w-full h-screen"
        />
        <div className="flex flex-col mt-20 items-center gap-16">
          <Image
            src="/images/logo.png"
            width={120}
            height={78}
            alt=""
          />
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col pr-16 text-lg font-medium">
            <span className="text-zinc-600">Hello!</span>
            <span className="text-dark text-xl font-bold">Register</span>
            <div className="flex flex-col pt-6 gap-16">
              <span className="text-dark font-medium">
                Name
                <input
                  {...register('name')}
                  type="text"
                  className={`bg-gray-50 border-0 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.name ? 'border-red-500' : ''}`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </span>
            </div>
            <div className="flex flex-col gap-10">
              <span className="text-dark font-medium">
                E-mail
                <input
                  {...register('email')}
                  type="email"
                  className={`bg-gray-50 border-0 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="john@mail.com"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </span>
            </div>
            <div className="flex flex-col gap-10">
              <span className="text-dark font-medium">
                Password
                <input
                  {...register('password')}
                  type="password"
                  className={`bg-gray-50 border-0 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.password ? 'border-red-500' : ''}`}
                  placeholder="•••••••••"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </span>
            </div>
            <div className="flex flex-col mt-2 gap-16">
              <button
                type="submit"
                className="focus:outline-none text-white bg-orange-500 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-orange-900"
              >
                Register
              </button>
            </div>
            <div className="flex flex-col gap-1">
              <button
                type="button"
                onClick={pushLogin}
                className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
