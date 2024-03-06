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
exports.listJson = exports.index = void 0;
const book_model_1 = __importDefault(require("../../models/book.model"));
const category_model_1 = __importDefault(require("../../models/category.model"));
const index = (req, res) => {
    res.render('client/pages/cart/index', {
        pageTitle: 'Trang giỏ hàng'
    });
};
exports.index = index;
const listJson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const books = req.body;
    for (const book of books) {
        const infoBook = yield book_model_1.default.findOne({
            _id: book.bookId,
            deleted: false,
            status: 'active'
        });
        const dataBook = yield category_model_1.default.findOne({
            bookId: book.bookId,
            typeBook: book.typeBook
        });
        console.log(dataBook);
        book['info'] = infoBook;
        book['price_special'] = dataBook['price'] * (1 - dataBook["discount"] / 100);
        book['total'] = book.quantity * book['price_special'];
    }
    res.json({
        code: 200,
        books: books
    });
});
exports.listJson = listJson;
