"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
* @Author:				taoqf
* @Date:				2016-06-15 11:59:02
* @Last Modified by:	taoqf
* @Last Modified time:	2016-06-17 15:54:49
* @CopyRight			飞道科技
*/
const _createPadding_1 = require("./_createPadding");
const _stringSize_1 = require("./_stringSize");
const toInteger_1 = require("./toInteger");
const toString_1 = require("./toString");
/**
 * Pads `string` on the left side if it's shorter than `length`. Padding
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
 * _.padStart('abc', 6);
 * // => '   abc'
 *
 * _.padStart('abc', 6, '_-');
 * // => '_-_abc'
 *
 * _.padStart('abc', 3);
 * // => 'abc'
 */
function padStart(str, length, chars) {
    str = toString_1.default(str);
    length = toInteger_1.default(length);
    var strLength = length ? _stringSize_1.default(str) : 0;
    return (length && strLength < length)
        ? (_createPadding_1.default(length - strLength, chars) + str)
        : str;
}
exports.default = padStart;
