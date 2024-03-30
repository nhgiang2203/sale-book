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
exports.search = void 0;
const convertToSlug_1 = require("../../helpers/convertToSlug");
const book_model_1 = __importDefault(require("../../models/book.model"));
const search = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const keyword = `${req.query.keyword}`;
    const type = `${req.params.type}`;
    let newBook = [];
    if (keyword) {
        const keywordRegex = new RegExp(keyword, 'i');
        const unicodeSlug = (0, convertToSlug_1.converToSlug)(keyword);
        const slugRegex = new RegExp(unicodeSlug, 'i');
        const books = yield book_model_1.default.find({
            $or: [
                { title: keywordRegex },
                { slug: slugRegex }
            ]
        });
        switch (type) {
            case 'result':
                res.render('client/pages/search/result', {
                    pageTitle: `Kết quả ${keyword}`,
                    keyword: keyword,
                    books: books
                });
                break;
            case 'suggest':
                res.json({
                    code: 200,
                    books: books
                });
                break;
            default:
                res.json({
                    code: 400,
                    message: "Lỗi"
                });
        }
    }
});
exports.search = search;
