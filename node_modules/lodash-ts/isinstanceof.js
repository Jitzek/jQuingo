"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isFunction_1 = require("./isFunction");
function instanceOf(obj, clazz) {
    if (isFunction_1.default(clazz)) {
        return obj instanceof clazz;
    }
    else {
        return false;
    }
}
exports.default = instanceOf;
