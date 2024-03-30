"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_slug_updater_1 = __importDefault(require("mongoose-slug-updater"));
mongoose_1.default.plugin(mongoose_slug_updater_1.default);
const bookSchema = new mongoose_1.default.Schema({
    title: String,
    author: String,
    thumbnail: String,
    topicId: String,
    purchase: {
        type: Number,
        default: 0
    },
    publisher: String,
    description: String,
    status: String,
    slug: {
        type: String,
        slug: "title",
        unique: true
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
const Book = mongoose_1.default.model('Book', bookSchema, 'books');
exports.default = Book;
