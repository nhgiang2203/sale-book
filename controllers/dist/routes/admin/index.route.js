"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config/config");
const dashboard_route_1 = __importDefault(require("./dashboard.route"));
const topic_route_1 = __importDefault(require("./topic.route"));
const book_route_1 = require("./book.route");
const adminRoutes = (app) => {
    const PATH_ADMIN = `/${config_1.systemConfig.prefixAdmin}`;
    app.use(`${PATH_ADMIN}/dashboard`, dashboard_route_1.default);
    app.use(`${PATH_ADMIN}/topics`, topic_route_1.default);
    app.use(`${PATH_ADMIN}/books`, book_route_1.bookRoutes);
};
exports.default = adminRoutes;
