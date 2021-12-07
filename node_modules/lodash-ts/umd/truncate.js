(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./_baseToString", "./_castSlice", "./isRegExp", "./_reHasComplexSymbol", "./_stringSize", "./_stringToArray", "./toString"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    * @Author:				taoqf
    * @Date:				2016-06-15 11:59:02
    * @Last Modified by:	taoqf
    * @Last Modified time:	2016-06-17 15:54:46
    * @CopyRight			飞道科技
    */
    var _baseToString_1 = require("./_baseToString");
    var _castSlice_1 = require("./_castSlice");
    var isRegExp_1 = require("./isRegExp");
    var _reHasComplexSymbol_1 = require("./_reHasComplexSymbol");
    var _stringSize_1 = require("./_stringSize");
    var _stringToArray_1 = require("./_stringToArray");
    var toString_1 = require("./toString");
    /** Used as default options for `_.truncate`. */
    var DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = '...';
    /** Used to match `RegExp` flags from their coerced string values. */
    var reFlags = /\w*$/;
    /**
     * Truncates `string` if it's longer than the given maximum string length.
     * The last characters of the truncated string are replaced with the omission
     * string which defaults to "...".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to truncate.
     * @param {Object} [options={}] The options object.
     * @param {number} [options.length=30] The maximum string length.
     * @param {string} [options.omission='...'] The string to indicate text is omitted.
     * @param {RegExp|string} [options.separator] The separator pattern to truncate to.
     * @returns {string} Returns the truncated string.
     * @example
     *
     * _.truncate('hi-diddly-ho there, neighborino');
     * // => 'hi-diddly-ho there, neighbo...'
     *
     * _.truncate('hi-diddly-ho there, neighborino', {
     *   'length': 24,
     *   'separator': ' '
     * });
     * // => 'hi-diddly-ho there,...'
     *
     * _.truncate('hi-diddly-ho there, neighborino', {
     *   'length': 24,
     *   'separator': /,? +/
     * });
     * // => 'hi-diddly-ho there...'
     *
     * _.truncate('hi-diddly-ho there, neighborino', {
     *   'omission': ' [...]'
     * });
     * // => 'hi-diddly-ho there, neig [...]'
     */
    function truncate(str, separator, length, omission) {
        if (length === void 0) { length = DEFAULT_TRUNC_LENGTH; }
        if (omission === void 0) { omission = DEFAULT_TRUNC_OMISSION; }
        str = toString_1.default(str);
        var strLength = str.length;
        var strSymbols;
        if (_reHasComplexSymbol_1.default.test(str)) {
            strSymbols = _stringToArray_1.default(str);
            strLength = strSymbols.length;
        }
        if (length >= strLength) {
            return str;
        }
        var end = length - _stringSize_1.default(omission);
        if (end < 1) {
            return omission;
        }
        var result = strSymbols
            ? _castSlice_1.default(strSymbols, 0, end).join('')
            : str.slice(0, end);
        if (separator === undefined) {
            return result + omission;
        }
        if (strSymbols) {
            end += (result.length - end);
        }
        if (isRegExp_1.default(separator)) {
            var separator_reg = separator;
            if (str.slice(end).search(separator_reg)) {
                var match = void 0, substring = result;
                if (!separator_reg.global) {
                    separator_reg = RegExp(separator_reg.source, toString_1.default(reFlags.exec(separator)) + 'g');
                }
                separator_reg.lastIndex = 0;
                var newEnd = void 0;
                while (match = separator_reg.exec(substring)) {
                    newEnd = match.index;
                }
                result = result.slice(0, newEnd === undefined ? end : newEnd);
            }
        }
        else if (str.indexOf(_baseToString_1.default(separator), end) != end) {
            var index = result.lastIndexOf(separator);
            if (index > -1) {
                result = result.slice(0, index);
            }
        }
        return result + omission;
    }
    exports.default = truncate;
});
