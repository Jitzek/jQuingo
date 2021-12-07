"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
* @Author:				taoqf
* @Date:				2016-06-15 11:59:02
* @Last Modified by:	taoqf
* @Last Modified time:	2016-06-17 15:54:31
* @CopyRight			飞道科技
*/
const random_1 = require("./random");
const isArrayLike_1 = require("./isArrayLike");
const values_1 = require("./values");
/**
 * Gets a random element from `collection`.
 *
 * @static
 * @memberOf _
 * @since 2.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to sample.
 * @returns {*} Returns the random element.
 * @example
 *
 * _.sample([1, 2, 3, 4]);
 * // => 2
 */
function sample(collection) {
    let array = isArrayLike_1.default(collection) ? collection : values_1.default(collection), length = array.length;
    return length > 0 ? array[random_1.default(0, length - 1)] : undefined;
}
exports.default = sample;
