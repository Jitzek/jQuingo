"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
* @Author:				taoqf
* @Date:				2016-06-15 11:59:02
* @Last Modified by:	taoqf
* @Last Modified time:	2016-06-17 15:54:23
* @CopyRight			飞道科技
*/
const _getSymbols_1 = require("./_getSymbols");
const keys_1 = require("./keys");
const isArray_1 = require("./isArray");
/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
    var result = keys_1.default(object);
    return isArray_1.default(object) ? result : result.concat(_getSymbols_1.default(object));
}
exports.default = getAllKeys;
