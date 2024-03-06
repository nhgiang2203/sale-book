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
exports.index = void 0;
const book_model_1 = __importDefault(require("../../models/book.model"));
const category_model_1 = __importDefault(require("../../models/category.model"));
const pagination_1 = require("../../helpers/pagination");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield book_model_1.default.find({
        deleted: false
    });
    let bookTotal = [];
    for (const book of books) {
        const data = yield category_model_1.default.find({
            bookId: book.id,
            deleted: false
        }).select("typeBook");
        if (data) {
            for (const typeItem of data) {
                const detailBook = yield category_model_1.default.findOne({
                    bookId: book.id,
                    typeBook: typeItem.typeBook
                });
                const item = {
                    _id: book.id,
                    title: book.title,
                    thumbnail: book.thumbnail,
                    typeBook: detailBook.typeBook,
                    price: detailBook.price,
                    discount: detailBook.discount,
                    stock: detailBook.stock,
                    status: detailBook.status
                };
                bookTotal.push(item);
            }
        }
    }
    const countBooks = bookTotal.length;
    let objectPagination = (0, pagination_1.pagination)({
        currentPage: 1,
        limitedItems: 5
    }, req.query, countBooks);
    res.render('admin/pages/books/index', {
        pageTitle: "Quản lý sách",
        books: bookTotal,
        pagination: objectPagination
    });
});
exports.index = index;
