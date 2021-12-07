(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./isFunction"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var isFunction_1 = require("./isFunction");
    function instanceOf(obj, clazz) {
        if (isFunction_1.default(clazz)) {
            return obj instanceof clazz;
        }
        else {
            return false;
        }
    }
    exports.default = instanceOf;
});
