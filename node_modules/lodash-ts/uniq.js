"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
* @Author:				taoqf
* @Date:				2016-06-15 11:59:02
* @Last Modified by:	taoqf
* @Last Modified time:	2016-06-17 15:54:31
* @CopyRight			飞道科技
*/
const _arrayIncludes_1 = require("./_arrayIncludes");
const _setToArray_1 = require("./_setToArray");
/** Used as the size to enable large array optimizations. */
const LARGE_ARRAY_SIZE = 200;
/**
 * Creates a duplicate-free version of an array, using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
 * for equality comparisons, in which only the first occurrence of each
 * element is kept.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @returns {Array} Returns the new duplicate free array.
 * @example
 *
 * _.uniq([2, 1, 2]);
 * // => [2, 1]
 */
function uniq(array) {
    if (array && array.length) {
        const result = [];
        let isCommon = true;
        let includes = _arrayIncludes_1.default;
        let seen1 = result;
        let seen2 = new Set();
        const length = array.length;
        if (length >= LARGE_ARRAY_SIZE) {
            const set = new Set(array);
            if (set) {
                return _setToArray_1.default(set);
            }
            isCommon = false;
        }
        let index = -1;
        outer: while (++index < length) {
            const value = array[index];
            if (isCommon) {
                if (value === value) {
                    var seenIndex = seen1.length;
                    while (seenIndex--) {
                        if (seen1[seenIndex] === value) {
                            continue outer;
                        }
                    }
                    result.push(value);
                }
                else if (!_arrayIncludes_1.default(seen1, value)) {
                    if (seen1 !== result) {
                        seen1.push(value);
                    }
                    result.push(value);
                }
            }
            else if (!seen2.has(value)) {
                seen2.add(value);
                result.push(value);
            }
        }
        return result;
    }
    else {
        return [];
    }
}
exports.default = uniq;
