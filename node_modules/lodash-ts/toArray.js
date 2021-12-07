"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
* @Author:				taoqf
* @Date:				2016-06-15 11:59:02
* @Last Modified by:	taoqf
* @Last Modified time:	2016-06-17 15:54:25
* @CopyRight			飞道科技
*/
const _getTag_1 = require("./_getTag");
const isArrayLike_1 = require("./isArrayLike");
const isString_1 = require("./isString");
const _iteratorToArray_1 = require("./_iteratorToArray");
const _mapToArray_1 = require("./_mapToArray");
const _setToArray_1 = require("./_setToArray");
const _stringToArray_1 = require("./_stringToArray");
const values_1 = require("./values");
/** Built-in value references. */
const iteratorSymbol = (typeof Symbol != 'undefined' && typeof Symbol.iterator == 'symbol') ? Symbol.iterator : undefined;
function copyArray(source) {
    let index = -1;
    const length = source.length;
    const array = Array(length);
    while (++index < length) {
        array[index] = source[index];
    }
    return array;
}
/**
 * @module lodash-ts/toArray
 * @example
 * import toArray from 'lodash-ts/toArray';
 *
 * toArray({ 'a': 1, 'b': 2 });
 * // => [1, 2]
 *
 * toArray('abc');
 * // => ['a', 'b', 'c']
 *
 * toArray(1);
 * // => []
 *
 * toArray(null);
 * // => []
 * @see _.toArray
*/
/**
 * Converts `value` to an array.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Array} Returns the converted array.
 * @example
 *
 * _.toArray({ 'a': 1, 'b': 2 });
 * // => [1, 2]
 *
 * _.toArray('abc');
 * // => ['a', 'b', 'c']
 *
 * _.toArray(1);
 * // => []
 *
 * _.toArray(null);
 * // => []
 */
function toArray(value) {
    if (!value) {
        return [];
    }
    if (isArrayLike_1.default(value)) {
        return isString_1.default(value) ? _stringToArray_1.default(value) : copyArray(value);
    }
    if (iteratorSymbol && value[iteratorSymbol]) {
        return _iteratorToArray_1.default(value[iteratorSymbol]());
    }
    let tag = _getTag_1.default(value), func = tag == _getTag_1.enumTags.mapTag ? _mapToArray_1.default : (tag == _getTag_1.enumTags.setTag ? _setToArray_1.default : values_1.default);
    return func(value);
}
exports.default = toArray;
