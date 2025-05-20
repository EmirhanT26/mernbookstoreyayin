import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Kullanıcının giriş yapıp yapmadığını kontrol eden basit bir örnek
export function middleware(request: NextRequest) {
  // Kullanıcının giriş yapıp yapmadığını belirlemek için bir kontrol
  const token = request.cookies.get('authToken'); // Örneğin, kullanıcı token'ını cookie'den alıyoruz

  // Eğer token varsa, yani kullanıcı giriş yapmışsa, istenen sayfaya erişim izni ver
  if (token) {
    return NextResponse.next();
  }

  // Token yoksa, kullanıcıyı giriş sayfasına yönlendir
  const url = request.nextUrl.clone();
  url.pathname = '/login'; // Giriş sayfasının yolu
  return NextResponse.redirect(url);
}

// Middleware'i belirli yollar için uygulamak
export const config = {
  matcher: ['/'], // Koruma altına almak istediğiniz yollar
};