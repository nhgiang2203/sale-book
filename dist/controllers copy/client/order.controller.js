"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.success = exports.order = void 0;
const category_model_1 = __importDefault(require("../../models/category.model"));
const order_model_1 = __importDefault(require("../../models/order.model"));
const helper = __importStar(require("../../helpers/generate"));
const book_model_1 = __importDefault(require("../../models/book.model"));
const order = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    console.log(typeof data["cart"]);
    console.log(data);
    for (const book of data["cart"]) {
        const infoBook = yield category_model_1.default.findOne({
            bookId: book.bookId,
            typeBook: book.typeBook
        });
        book["price"] = infoBook.price;
        book["discount"] = infoBook.discount;
        console.log(book);
    }
    const randomNumber = parseInt(helper.generateRandomNumber(8));
    const code = helper.generateOrderCode(randomNumber);
    console.log(typeof data["cart"]);
    const orderData = {
        code: code,
        info: data["info"],
        cart: data["cart"],
    };
    console.log(orderData);
    const order = new order_model_1.default(orderData);
    yield order.save();
    res.json({
        code: 200,
        orderCode: code
    });
});
exports.order = order;
const success = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderCode = req.query.orderCode;
    const order = yield order_model_1.default.findOne({
        code: orderCode
    });
    for (const item of order["cart"]) {
        item["price_special"] = item["price"] * (1 - item["discount"] / 100);
        item["total"] = item["quantity"] * item["price_special"];
        const bookInfo = yield book_model_1.default.findOne({
            _id: item["bookId"],
            deleted: false,
            status: "active"
        });
        const purchase = bookInfo.purchase + item["quantity"];
        yield book_model_1.default.updateOne({
            _id: item["bookId"]
        }, {
            purchase: purchase
        });
        const typeBook = yield category_model_1.default.findOne({
            bookId: item["bookId"],
            typeBook: item["typeBook"]
        });
        const stock = typeBook["stock"] - item["quantity"];
        yield category_model_1.default.updateOne({
            bookId: item["bookId"],
            typeBook: item["typeBook"]
        }, {
            stock: stock
        });
        item["title"] = bookInfo.title;
        item["thumbnail"] = bookInfo.thumbnail;
        item["slug"] = bookInfo.slug;
    }
    order["total_price"] = order["cart"].reduce((sum, item) => sum + item["total"], 0);
    res.render("client/pages/order/success", {
        pageTitle: "Đặt hàng thành công",
        order: order
    });
});
exports.success = success;
