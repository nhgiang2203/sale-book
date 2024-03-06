"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bookSchema = new mongoose_1.default.Schema({
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
const Book = mongoose_1.default.model('Book', bookSchema, 'books');
exports.default = Book;
