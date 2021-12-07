"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
* @Author:				taoqf
* @Date:				2016-06-17 15:47:33
* @Last Modified by:	taoqf
* @Last Modified time:	2016-06-17 15:54:40
* @CopyRight			飞道科技
*/
const isFunction_1 = require("./isFunction");
const isObject_1 = require("./isObject");
const isSymbol_1 = require("./isSymbol");
/** Used as references for various `Number` constants. */
const NAN = 0 / 0;
/** Used to match leading and trailing whitespace. */
const reTrim = /^\s+|\s+$/g;
/** Used to detect bad signed hexadecimal string values. */
const reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
/** Used to detect binary string values. */
const reIsBinary = /^0b[01]+$/i;
/** Used to detect octal string values. */
const reIsOctal = /^0o[0-7]+$/i;
/** Built-in method references without a dependency on `root`. */
const freeParseInt = parseInt;
/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
    if (typeof value == 'number') {
        return value;
    }
    if (isSymbol_1.default(value)) {
        return NAN;
    }
    if (isObject_1.default(value)) {
        var other = isFunction_1.default(value.valueOf) ? value.valueOf() : value;
        value = isObject_1.default(other) ? (other + '') : other;
    }
    if (typeof value != 'string') {
        return value === 0 ? value : +value;
    }
    value = value.replace(reTrim, '');
    var isBinary = reIsBinary.test(value);
    return (isBinary || reIsOctal.test(value))
        ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
        : (reIsBadHex.test(value) ? NAN : +value);
}
exports.default = toNumber;
