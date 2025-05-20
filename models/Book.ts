import mongoose, { Schema, models } from 'mongoose';

const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  description: String,
  image: String,
  categoryId: {
    type: Number, // 1: Best Seller, 2: Classics, 3: Children, 4: Other
    required: true,
  },
  price: {
    type: Number,
    required: false, // zorunlu değil ama tanımlı
  },
});

const Book = models.Book || mongoose.model('Book', BookSchema);

export default Book;
