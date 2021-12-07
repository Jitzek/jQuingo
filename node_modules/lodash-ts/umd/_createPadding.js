(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./_baseToString", "./_castSlice", "./_reHasComplexSymbol", "./_stringSize", "./_stringToArray"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    * @Author:				taoqf
    * @Date:				2016-06-15 11:59:02
     * @Last Modified by: taoqf
     * @Last Modified time: 2017-10-17 11:45:52
    * @CopyRight			飞道科技
    */
    var _baseToString_1 = require("./_baseToString");
    var _castSlice_1 = require("./_castSlice");
    var _reHasComplexSymbol_1 = require("./_reHasComplexSymbol");
    var _stringSize_1 = require("./_stringSize");
    var _stringToArray_1 = require("./_stringToArray");
    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeCeil = Math.ceil;
    /** Used as references for various `Number` constants. */
    var MAX_SAFE_INTEGER = 9007199254740991;
    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeFloor = Math.floor;
    /**
     * The base implementation of `_.repeat` which doesn't coerce arguments.
     *
     * @private
     * @param {string} string The string to repeat.
     * @param {number} n The number of times to repeat the string.
     * @returns {string} Returns the repeated string.
     */
    function baseRepeat(str, n) {
        var result = '';
        if (!str || n < 1 || n > MAX_SAFE_INTEGER) {
            return result;
        }
        // Leverage the exponentiation by squaring algorithm for a faster repeat.
        // See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
        do {
            if (n % 2) {
                result += str;
            }
            n = nativeFloor(n / 2);
            if (n) {
                str += str;
            }
        } while (n);
        return result;
    }
    /**
     * Creates the padding for `string` based on `length`. The `chars` string
     * is truncated if the number of characters exceeds `length`.
     *
     * @private
     * @param {number} length The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padding for `string`.
     */
    function createPadding(length, chars) {
        chars = chars === undefined ? ' ' : _baseToString_1.default(chars);
        var charsLength = chars.length;
        if (charsLength < 2) {
            return charsLength ? baseRepeat(chars, length) : chars;
        }
        var result = baseRepeat(chars, nativeCeil(length / _stringSize_1.default(chars)));
        return _reHasComplexSymbol_1.default.test(chars)
            ? _castSlice_1.default(_stringToArray_1.default(result), 0, length).join('')
            : result.slice(0, length);
    }
    exports.default = createPadding;
});
