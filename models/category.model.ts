import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  bookId: String,
  price: Number,
  discount: Number,
  stock: Number,
  status: String,
  typeBook: String,
  deleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Category = mongoose.model('Category', categorySchema, 'categories');
export default Category;