(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./_createPadding", "./_stringSize", "./toInteger", "./toString"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    * @Author:				taoqf
    * @Date:				2016-06-15 11:59:02
    * @Last Modified by:	taoqf
    * @Last Modified time:	2016-06-17 15:54:37
    * @CopyRight			飞道科技
    */
    var _createPadding_1 = require("./_createPadding");
    var _stringSize_1 = require("./_stringSize");
    var toInteger_1 = require("./toInteger");
    var toString_1 = require("./toString");
    /**
     * Pads `string` on the right side if it's shorter than `length`. Padding
     * characters are truncated if they exceed `length`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.padEnd('abc', 6);
     * // => 'abc   '
     *
     * _.padEnd('abc', 6, '_-');
     * // => 'abc_-_'
     *
     * _.padEnd('abc', 3);
     * // => 'abc'
     */
    function padEnd(str, length, chars) {
        str = toString_1.default(str);
        length = toInteger_1.default(length);
        var strLength = length ? _stringSize_1.default(str) : 0;
        return (length && strLength < length)
            ? (str + _createPadding_1.default(length - strLength, chars))
            : str;
    }
    exports.default = padEnd;
});
