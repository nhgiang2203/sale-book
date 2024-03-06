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
exports.deleteItem = exports.editPatch = exports.edit = exports.detail = exports.createPost = exports.create = exports.index = void 0;
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const config_1 = require("../../config/config");
const pagination_1 = require("../../helpers/pagination");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topics = yield topic_model_1.default.find({
        deleted: false
    });
    const find = {
        deleted: false
    };
    const countTopics = yield topic_model_1.default.countDocuments(find);
    let objectPagination = (0, pagination_1.pagination)({
        currentPage: 1,
        limitedItems: 5
    }, req.query, countTopics);
    res.render('admin/pages/topics/index', {
        pageTitle: "Quản lý danh mục",
        topics: topics,
        pagination: objectPagination
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topics = yield topic_model_1.default.find({
        deleted: false
    });
    res.render('admin/pages/topics/create', {
        pageTitle: "Thêm danh mục",
        topics: topics
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topic = new topic_model_1.default(req.body);
    yield topic.save();
    req.flash('success', "Tạo mới thành công!");
    res.redirect(`/${config_1.systemConfig.prefixAdmin}/topics/`);
});
exports.createPost = createPost;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topic = yield topic_model_1.default.findOne({
        _id: req.params.id,
        deleted: false
    });
    res.render('admin/pages/topics/detail', {
        pageTitle: "Chi tiết danh mục",
        topic: topic
    });
});
exports.detail = detail;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topic = yield topic_model_1.default.findOne({
        _id: req.params.id,
        deleted: false
    });
    res.render('admin/pages/topics/edit', {
        pageTitle: "Chỉnh sửa danh mục",
        topic: topic
    });
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const topic = yield topic_model_1.default.findOne({
            _id: req.params.id,
            deleted: false
        });
        const data = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status
        };
        if (req.body.thumbnail) {
            data["thumbnail"] = req.body.thumbnail;
        }
        yield topic_model_1.default.updateOne({
            _id: req.params.id
        }, data);
        req.flash('success', "Cập nhật thành công!");
    }
    catch (error) {
        req.flash('error', "Cập nhật thất bại!");
    }
    res.redirect('back');
});
exports.editPatch = editPatch;
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield topic_model_1.default.deleteOne({
        _id: req.params.id
    });
    res.redirect('back');
});
exports.deleteItem = deleteItem;
