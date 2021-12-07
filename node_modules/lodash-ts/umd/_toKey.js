(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./isSymbol"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    * @Author:				taoqf
    * @Date:				2016-06-15 11:59:02
    * @Last Modified by:	taoqf
    * @Last Modified time:	2016-06-17 15:54:26
    * @CopyRight			飞道科技
    */
    var isSymbol_1 = require("./isSymbol");
    /** Used as references for various `Number` constants. */
    var INFINITY = 1 / 0;
    /**
     * Converts `value` to a string key if it's not a string or symbol.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {string|symbol} Returns the key.
     */
    function toKey(value) {
        if (typeof value == 'string' || isSymbol_1.default(value)) {
            return value;
        }
        var result = (value + '');
        return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
    }
    exports.default = toKey;
});
