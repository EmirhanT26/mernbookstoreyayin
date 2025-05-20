import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import Book from '@/models/Book';

// POST - Yeni kitap ekle
export async function POST(req: NextRequest) {
  await connectMongo();
  const body = await req.json();

  if (!body.title || !body.categoryId) {
    return NextResponse.json({ success: false, message: "Başlık ve kategori zorunlu" }, { status: 400 });
  }

  if (body.price) {
    body.price = parseFloat(body.price.toString().replace(',', '.'));
  }

  try {
    const newBook = await Book.create(body);
    return NextResponse.json({ success: true, data: newBook }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

// GET - Kitapları listele (isteğe bağlı categoryId ile)
export async function GET(req: NextRequest) {
  await connectMongo();
  const categoryId = req.nextUrl.searchParams.get('categoryId');

  try {
    const books = await Book.find(categoryId ? { categoryId: Number(categoryId) } : {});
    return NextResponse.json({ success: true, data: books });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
