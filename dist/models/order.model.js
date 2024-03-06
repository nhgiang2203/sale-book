"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
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
const Order = mongoose_1.default.model('Order', orderSchema, 'orders');
exports.default = Order;
