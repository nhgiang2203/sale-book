import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  thumbnail: String,
  topicId: String,
  purchase: Number,
  publisher: String,
  description: String,
  status: String,
  slug: String,
  deleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Book = mongoose.model('Book', bookSchema, 'books');
export default Book;