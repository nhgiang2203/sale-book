"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.info = exports.index = void 0;
const book_model_1 = __importDefault(require("../../models/book.model"));
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = req.params.slugCategory;
    const topic = yield topic_model_1.default.findOne({
        slug: slug,
        deleted: false,
        status: 'active'
    });
    const books = yield book_model_1.default.find({
        topicId: topic.id,
        deleted: false,
        status: 'active'
    });
    res.render('client/pages/books/index', {
        pageTitle: "Trang sách",
        books: books
    });
});
exports.index = index;
const info = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.default.findOne({
        _id: req.params.bookId,
        deleted: false,
        status: 'active'
    });
    console.log(book);
    res.render('client/pages/books/detail', {
        pageTitle: book["title"],
        book: book
    });
});
exports.info = info;
