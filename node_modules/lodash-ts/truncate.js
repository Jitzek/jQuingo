"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
* @Author:				taoqf
* @Date:				2016-06-15 11:59:02
* @Last Modified by:	taoqf
* @Last Modified time:	2016-06-17 15:54:46
* @CopyRight			飞道科技
*/
const _baseToString_1 = require("./_baseToString");
const _castSlice_1 = require("./_castSlice");
const isRegExp_1 = require("./isRegExp");
const _reHasComplexSymbol_1 = require("./_reHasComplexSymbol");
const _stringSize_1 = require("./_stringSize");
const _stringToArray_1 = require("./_stringToArray");
const toString_1 = require("./toString");
/** Used as default options for `_.truncate`. */
const DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = '...';
/** Used to match `RegExp` flags from their coerced string values. */
const reFlags = /\w*$/;
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
function truncate(str, separator, length = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION) {
    str = toString_1.default(str);
    let strLength = str.length;
    let strSymbols;
    if (_reHasComplexSymbol_1.default.test(str)) {
        strSymbols = _stringToArray_1.default(str);
        strLength = strSymbols.length;
    }
    if (length >= strLength) {
        return str;
    }
    let end = length - _stringSize_1.default(omission);
    if (end < 1) {
        return omission;
    }
    let result = strSymbols
        ? _castSlice_1.default(strSymbols, 0, end).join('')
        : str.slice(0, end);
    if (separator === undefined) {
        return result + omission;
    }
    if (strSymbols) {
        end += (result.length - end);
    }
    if (isRegExp_1.default(separator)) {
        let separator_reg = separator;
        if (str.slice(end).search(separator_reg)) {
            let match, substring = result;
            if (!separator_reg.global) {
                separator_reg = RegExp(separator_reg.source, toString_1.default(reFlags.exec(separator)) + 'g');
            }
            separator_reg.lastIndex = 0;
            let newEnd;
            while (match = separator_reg.exec(substring)) {
                newEnd = match.index;
            }
            result = result.slice(0, newEnd === undefined ? end : newEnd);
        }
    }
    else if (str.indexOf(_baseToString_1.default(separator), end) != end) {
        const index = result.lastIndexOf(separator);
        if (index > -1) {
            result = result.slice(0, index);
        }
    }
    return result + omission;
}
exports.default = truncate;
