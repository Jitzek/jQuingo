(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./isObject"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var isObject_1 = require("./isObject");
    function isHash(obj) {
        var ret = isObject_1.default(obj);
        return ret && obj.constructor === Object && !obj.nodeType && !obj.setInterval;
    }
    exports.default = isHash;
});
