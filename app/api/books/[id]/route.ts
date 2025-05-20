import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import Book from '@/models/Book';

// GET - Belirli kitabı getir
export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  await connectMongo();
  const book = await Book.findById(params.id);
  if (!book) return NextResponse.json({ success: false, message: "Kitap bulunamadı" }, { status: 404 });
  return NextResponse.json({ success: true, data: book });
}

// PUT - Kitabı güncelle
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectMongo();
  const body = await req.json();

  if (body.price) {
    body.price = parseFloat(body.price.toString().replace(',', '.'));
  }

  try {
    const updatedBook = await Book.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json({ success: true, data: updatedBook });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}


// DELETE - Kitabı sil
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await connectMongo();
  try {
    await Book.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true, message: 'Kitap silindi' });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}