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
Object.defineProperty(exports, "__esModule", { value: true });
const book_route_1 = require("./book.route");
const topic_route_1 = require("./topic.route");
const category_route_1 = require("./category.route");
const cart_route_1 = require("./cart.route");
const order_route_1 = require("./order.route");
const user_route_1 = require("./user.route");
const middleware = __importStar(require("../../middlewares/client/user.middleware"));
const clientRoutes = (app) => {
    app.use(middleware.infoUser);
    app.use('/books', book_route_1.bookRoutes);
    app.use('/topics', topic_route_1.topicRoutes);
    app.use('/categories', category_route_1.categoryRoutes);
    app.use('/cart', cart_route_1.cartRoutes);
    app.use('/order', order_route_1.orderRoutes);
    app.use('/user', user_route_1.userRoutes);
};
exports.default = clientRoutes;
