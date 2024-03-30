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
exports.detail = exports.deleteBook = exports.createPost = exports.create = exports.editPatch = exports.edit = exports.index = void 0;
const book_model_1 = __importDefault(require("../../models/book.model"));
const category_model_1 = __importDefault(require("../../models/category.model"));
const pagination_1 = require("../../helpers/pagination");
const config_1 = require("../../config/config");
const topic_model_1 = __importDefault(require("../../models/topic.model"));
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
                    id: book.id,
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
    const startIndex = objectPagination.skip;
    const endIndex = startIndex + objectPagination.limitedItems;
    const items = bookTotal.slice(startIndex, endIndex);
    res.render('admin/pages/books/index', {
        pageTitle: "Quản lý sách",
        books: items,
        pagination: objectPagination
    });
});
exports.index = index;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.default.findOne({
        _id: req.params.id,
        deleted: false
    });
    if (book) {
        const detailBook = yield category_model_1.default.findOne({
            bookId: book.id,
            typeBook: req.params.typeBook,
            deleted: false
        });
        book["typeBook"] = req.params.typeBook;
        book["price"] = detailBook.price;
        book["discount"] = detailBook.discount;
        book["stock"] = detailBook.stock;
        book["status"] = detailBook.status;
    }
    res.render('admin/pages/books/edit', {
        pageTitle: "Trang chỉnh sửa",
        book: book
    });
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = {
            title: req.body.title,
            author: req.body.author,
            publisher: req.body.publisher,
            description: req.body.description
        };
        const detailBook = {
            typeBook: req.body.typeBook,
            price: req.body.price,
            discount: req.body.discount,
            stock: req.body.stock,
            status: req.body.status
        };
        if (req.body.thumbnail) {
            book["thumbnail"] = req.body.thumbnail;
        }
        yield book_model_1.default.updateOne({ _id: req.params.id }, book);
        yield category_model_1.default.updateOne({
            bookId: req.params.id,
            typeBook: req.params.typeBook
        }, detailBook);
        req.flash('success', "Cập nhật thành công!");
    }
    catch (error) {
        req.flash('error', "Cập nhật thất bại!");
    }
    res.redirect('back');
});
exports.editPatch = editPatch;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topics = yield topic_model_1.default.find({
        deleted: false,
    });
    res.render('admin/pages/books/create', {
        pageTitle: "Trang thêm mới",
        topics: topics
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existBook = yield book_model_1.default.findOne({
            title: req.body.title,
            author: req.body.author,
            topicId: req.body.topicId
        });
        if (existBook) {
            const exitsTypeBook = yield category_model_1.default.findOne({
                bookId: existBook.id,
                typeBook: req.body.typeBook
            });
            if (exitsTypeBook) {
                req.flash('error', 'Đã tồn tại!');
                res.redirect('back');
            }
            else {
                const detailBook = {
                    bookId: existBook.id,
                    typeBook: req.body.typeBook,
                    price: req.body.price,
                    discount: req.body.discount,
                    stock: req.body.stock,
                    status: req.body.status
                };
                const newDetail = new category_model_1.default(detailBook);
                yield newDetail.save();
            }
        }
        else {
            const book = {
                title: req.body.title,
                thumbnail: req.body.thumbnail,
                author: req.body.author,
                publisher: req.body.publisher,
                description: req.body.description,
                topicId: req.body.topicId,
                status: req.body.status
            };
            const newBook = new book_model_1.default(book);
            yield newBook.save();
            const detailBook = {
                bookId: newBook.id,
                typeBook: req.body.typeBook,
                price: req.body.price,
                discount: req.body.discount,
                stock: req.body.stock,
                status: req.body.status
            };
            const newDetail = new category_model_1.default(detailBook);
            yield newDetail.save();
        }
        req.flash('success', "Cập nhật thành công!");
    }
    catch (error) {
        req.flash('error', "Cập nhật thất bại!");
    }
    res.redirect(`/${config_1.systemConfig.prefixAdmin}/books/`);
});
exports.createPost = createPost;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield book_model_1.default.deleteOne({
        _id: req.params.id,
    });
    yield category_model_1.default.deleteOne({
        bookId: req.params.id,
        typeBook: req.params.typeBook
    });
    res.redirect('back');
});
exports.deleteBook = deleteBook;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.default.findOne({
        _id: req.params.id,
        deleted: false
    });
    const detailBook = yield category_model_1.default.findOne({
        bookId: req.params.id,
        typeBook: req.params.typeBook,
        deleted: false
    });
    const topic = yield topic_model_1.default.findOne({
        _id: book.topicId,
        deleted: false
    });
    book["topic"] = topic.title;
    book["typeBook"] = detailBook.typeBook;
    book["price"] = detailBook.price;
    book["discount"] = detailBook.discount;
    book["stock"] = detailBook.stock;
    book["status"] = detailBook.status;
    res.render('admin/pages/books/detail', {
        pageTitle: "Trang chi tiết",
        book: book
    });
});
exports.detail = detail;
