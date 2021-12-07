(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./_castSlice", "./_reHasComplexSymbol", "./_stringToArray", "./toString"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    * @Author:				taoqf
    * @Date:				2016-06-15 11:59:02
    * @Last Modified by:	taoqf
    * @Last Modified time:	2016-06-17 15:54:25
    * @CopyRight			飞道科技
    */
    var _castSlice_1 = require("./_castSlice");
    var _reHasComplexSymbol_1 = require("./_reHasComplexSymbol");
    var _stringToArray_1 = require("./_stringToArray");
    var toString_1 = require("./toString");
    /**
     * Creates a function like `_.lowerFirst`.
     *
     * @private
     * @param {string} methodName The name of the `String` case method to use.
     * @returns {Function} Returns the new case function.
     */
    function createCaseFirst(methodName) {
        return function (str) {
            str = toString_1.default(str);
            var strSymbols = _reHasComplexSymbol_1.default.test(str)
                ? _stringToArray_1.default(str)
                : undefined;
            var chr = strSymbols
                ? strSymbols[0]
                : str.charAt(0);
            var trailing = strSymbols
                ? _castSlice_1.default(strSymbols, 1).join('')
                : str.slice(1);
            return chr[methodName]() + trailing;
        };
    }
    exports.default = createCaseFirst;
});
