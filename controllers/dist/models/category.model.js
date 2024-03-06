"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const categorySchema = new mongoose_1.default.Schema({
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
const Category = mongoose_1.default.model('Category', categorySchema, 'categories');
exports.default = Category;
