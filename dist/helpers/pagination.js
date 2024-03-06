"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagination = void 0;
const pagination = (objectPagination, query, countTopics) => {
    if (query.page) {
        objectPagination.currentPage = parseInt(query.page);
    }
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitedItems;
    const totalPage = Math.ceil(countTopics / objectPagination.limitedItems);
    objectPagination.totalPage = totalPage;
    return objectPagination;
};
exports.pagination = pagination;
