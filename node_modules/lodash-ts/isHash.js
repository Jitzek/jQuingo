"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isObject_1 = require("./isObject");
function isHash(obj) {
    const ret = isObject_1.default(obj);
    return ret && obj.constructor === Object && !obj.nodeType && !obj.setInterval;
}
exports.default = isHash;
