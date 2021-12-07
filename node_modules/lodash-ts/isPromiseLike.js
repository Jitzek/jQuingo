"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isFunction_1 = require("./isFunction");
function isPromiseLike(obj) {
    return obj && isFunction_1.default(obj.then);
}
exports.default = isPromiseLike;
