import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  //userId: string,
  code: String,
  info: {
    fullName: String,
    phone: String,
    note: String
  },
  cart: [
    {
      bookId: String,
      typeBook: String,
      quantity: Number,
      price: Number,
      discount: Number
    }
  ],
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema, 'orders');
export default Order;