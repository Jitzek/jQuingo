"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
* @Author:				taoqf
* @Date:				2016-06-15 11:59:02
* @Last Modified by:	taoqf
* @Last Modified time:	2016-06-17 15:54:51
* @CopyRight			飞道科技
*/
const isSymbol_1 = require("./isSymbol");
/** Used as references for various `Number` constants. */
const INFINITY = 1 / 0;
/** Used to convert symbols to primitives and strings. */
const symbolProto = typeof Symbol != 'undefined' ? Symbol.prototype : undefined, symbolToString = symbolProto ? symbolProto.toString : undefined;
/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
    // Exit early for strings to avoid a performance hit in some environments.
    if (typeof value == 'string') {
        return value;
    }
    if (isSymbol_1.default(value)) {
        return symbolToString ? symbolToString.call(value) : '';
    }
    const result = (value + '');
    return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}
exports.default = baseToString;
