"use client";
import React, { useEffect, useState } from "react";

type Book = {
  _id: string;
  title: string;
  author?: string;
  categoryId: number | string;
  image?: string;
  price?: number | string;
  description?: string;
};

export default function BookManagePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<Partial<Book>>({});
  const [editId, setEditId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/books");
      const data = await res.json();
      setBooks(data.data || []);
    } catch {
      setMessage("Kitaplar yüklenirken hata oluştu.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.categoryId) {
      setMessage("Kitap adı ve kategori ID zorunludur.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const method = editId ? "PUT" : "POST";
      const url = editId ? `/api/books/${editId}` : "/api/books";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          categoryId: Number(form.categoryId),
          price: form.price
            ? parseFloat(form.price.toString().replace(",", "."))
            : undefined,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage(editId ? "Kitap güncellendi." : "Kitap eklendi.");
        setForm({});
        setEditId(null);
        fetchBooks();
      } else {
        setMessage("İşlem başarısız oldu.");
      }
    } catch {
      setMessage("Sunucu hatası.");
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu kitabı silmek istediğine emin misin?")) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`/api/books/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Kitap silindi.");
        fetchBooks();
      } else {
        setMessage("Silme işlemi başarısız.");
      }
    } catch {
      setMessage("Sunucu hatası.");
    }
    setLoading(false);
  };

  const handleEdit = (book: Book) => {
    setForm({
      title: book.title,
      author: book.author || "",
      categoryId: book.categoryId.toString(),
      image: book.image || "",
      price: book.price?.toString() || "",
      description: book.description || "",
    });
    setEditId(book._id);
    setMessage("");
  };

  const handleCancel = () => {
    setForm({});
    setEditId(null);
    setMessage("");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-3xl font-bold mb-6">
        {editId ? "Kitap Güncelle" : "Yeni Kitap Ekle"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <input
          name="title"
          value={form.title || ""}
          onChange={handleChange}
          placeholder="Kitap Adı *"
          className="border p-2 rounded"
          required
        />
        <input
          name="author"
          value={form.author || ""}
          onChange={handleChange}
          placeholder="Yazar"
          className="border p-2 rounded"
        />
        <input
          name="categoryId"
          value={form.categoryId || ""}
          onChange={handleChange}
          placeholder="Kategori ID *"
          type="number"
          className="border p-2 rounded"
          required
        />
        <input
          name="image"
          value={form.image || ""}
          onChange={handleChange}
          placeholder="Resim URL"
          className="border p-2 rounded"
        />
        <input
          name="price"
          value={form.price || ""}
          onChange={handleChange}
          placeholder="Fiyat ($)"
          type="number"
          step="0.01"
          min="0"
          className="border p-2 rounded"
        />
        <textarea
          name="description"
          value={form.description || ""}
          onChange={handleChange}
          placeholder="Açıklama / Kitap Özeti"
          className="border p-2 rounded col-span-1 md:col-span-3"
          rows={3}
        />

        <div className="flex items-center gap-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? "Bekleyin..." : editId ? "Güncelle" : "Ekle"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              İptal
            </button>
          )}
        </div>
      </form>

      <h2 className="text-2xl font-semibold mb-4">Kitap Listesi</h2>

      {loading && <p>Yükleniyor...</p>}
      {!loading && books.length === 0 && <p>Henüz kitap yok.</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Kitap Adı</th>
              <th className="border px-4 py-2">Yazar</th>
              <th className="border px-4 py-2">Kategori ID</th>
              <th className="border px-4 py-2">Fiyat</th>
              <th className="border px-4 py-2">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td className="border px-4 py-2">{book.title}</td>
                <td className="border px-4 py-2">{book.author || "-"}</td>
                <td className="border px-4 py-2">
                  {book.categoryId.toString()}
                </td>
                <td className="border px-4 py-2">
                  {typeof book.price === "number" ? `${book.price} $` : "-"}
                </td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(book)}
                    className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {message && <p className="mt-4 text-center text-red-600">{message}</p>}
    </div>
  );
}
