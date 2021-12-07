"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
* @Author:				taoqf
* @Date:				2016-06-15 11:59:02
* @Last Modified by:	taoqf
* @Last Modified time:	2016-06-17 15:54:22
* @CopyRight			飞道科技
*/
const _createPadding_1 = require("./_createPadding");
const _stringSize_1 = require("./_stringSize");
const toInteger_1 = require("./toInteger");
const toString_1 = require("./toString");
/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeCeil = Math.ceil, nativeFloor = Math.floor;
/**
 * Pads `string` on the left and right sides if it's shorter than `length`.
 * Padding characters are truncated if they can't be evenly divided by `length`.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to pad.
 * @param {number} [length=0] The padding length.
 * @param {string} [chars=' '] The string used as padding.
 * @returns {string} Returns the padded string.
 * @example
 *
 * _.pad('abc', 8);
 * // => '  abc   '
 *
 * _.pad('abc', 8, '_-');
 * // => '_-abc_-_'
 *
 * _.pad('abc', 3);
 * // => 'abc'
 */
function pad(str, length, chars) {
    str = toString_1.default(str);
    length = toInteger_1.default(length);
    var strLength = length ? _stringSize_1.default(str) : 0;
    if (!length || strLength >= length) {
        return str;
    }
    var mid = (length - strLength) / 2;
    return (_createPadding_1.default(nativeFloor(mid), chars) +
        str +
        _createPadding_1.default(nativeCeil(mid), chars));
}
exports.default = pad;
