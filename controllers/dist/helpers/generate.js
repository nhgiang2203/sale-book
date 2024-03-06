"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomNumber = exports.generateRandomString = exports.generateOrderCode = void 0;
const generateOrderCode = (number) => {
    const code = `OD${String(number).padStart(8, '0')}`;
    return code;
};
exports.generateOrderCode = generateOrderCode;
const generateRandomString = (length) => {
    const charecters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = '';
    for (let i = 0; i < length; i++) {
        result += charecters.charAt(Math.floor(Math.random() * charecters.length));
    }
    return result;
};
exports.generateRandomString = generateRandomString;
const generateRandomNumber = (length) => {
    const charecters = "0123456789";
    let result = '';
    for (let i = 0; i < length; i++) {
        result += charecters.charAt(Math.floor(Math.random() * charecters.length));
    }
    return result;
};
exports.generateRandomNumber = generateRandomNumber;
