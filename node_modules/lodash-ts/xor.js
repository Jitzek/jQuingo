"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
* @Author:				taoqf
* @Date:				2016-06-15 11:59:02
* @Last Modified by:	taoqf
* @Last Modified time:	2016-06-17 15:54:31
* @CopyRight			飞道科技
*/
const _baseDifference_1 = require("./_baseDifference");
const isArrayLikeObject_1 = require("./isArrayLikeObject");
const uniq_1 = require("./uniq");
/**
 * Creates an array of unique values that is the
 * [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
 * of the given arrays. The order of result values is determined by the order
 * they occur in the arrays.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of filtered values.
 * @see _.difference, _.without
 * @example
 *
 * _.xor([2, 1], [2, 3]);
 * // => [1, 3]
 */
function xor(...arrays) {
    const arr = arrays.filter(isArrayLikeObject_1.default);
    let index = -1;
    const length = arr.length;
    let result = [];
    while (++index < length) {
        result = _baseDifference_1.default(result, arr[index]).concat(_baseDifference_1.default(arr[index], result));
    }
    return uniq_1.default(result);
}
exports.default = xor;
