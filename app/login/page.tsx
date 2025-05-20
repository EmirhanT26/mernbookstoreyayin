"use client"
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { loginUser } from '../arrays/array';


interface FormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email('Geçerli bir e-posta adresi giriniz').required('E-posta alanı zorunludur'),
  password: yup.string().min(6, 'Şifre en az 6 karakter olmalı').required('Şifre alanı zorunludur'),
});

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const pushRegister = () => {
    router.push('/register');
  };

  const handleLogin = async (data: FormData) => {
    try {
      const isValid = loginUser(data.email, data.password);
      Swal.fire({
        icon: isValid ? 'success' : 'error',
        title: isValid ? 'Başarılı Hoşgeldiniz' : 'Başarısız',
        footer: isValid ? '<a href="#">Yönlendiriliyor...</a>' : '<a href="#">Tekrar Deneyin</a>',
      });
  
      if (isValid) {
        router.push('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="h-screen grid grid-cols-2">
        <Image src="/images/giris.jpg" width={720} height={1280} alt="" className="w-full h-screen" />
        <div className="flex flex-col mt-20 items-center gap-16">
          <Image src="/images/logo.png" width={120} height={78} alt="" />
          <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col pr-16 text-lg font-medium">
            <span className="text-zinc-600">Welcome back!</span>
            <span className="text-dark text-xl font-bold">Login to your account</span>
            <div className="flex flex-col pt-5 gap-2">
              <label htmlFor="email" className="text-dark font-medium">
                E-mail
              </label>
              <input
                {...register('email')}
                type="email"
                id="email"
                className={`bg-gray-50 border-0 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.email ? 'border-red-500' : ''}`}
                placeholder="john@mail.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-dark font-medium">
                Password
              </label>
              <input
                {...register('password')}
                type="password"
                id="password"
                className={`bg-gray-50 border-0 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.password ? 'border-red-500' : ''}`}
                placeholder="•••••••••"
              />
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password.message}</p>
              )}
            </div>
            <div className="flex items-center h-5 pt-4">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              />
              <label
                htmlFor="remember"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
            <div className="flex flex-col pt-8 gap-6">
              <button
                type="submit"
                className="focus:outline-none text-white bg-orange-500 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-orange-900"
              >
                Login
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={pushRegister}
                className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
