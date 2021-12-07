"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
* @Author:				taoqf
* @Date:				2016-06-17 15:47:20
* @Last Modified by:	taoqf
* @Last Modified time:	2016-06-17 15:54:42
* @CopyRight			飞道科技
*/
const _castPath_1 = require("./_castPath");
const _isKey_1 = require("./_isKey");
const _toKey_1 = require("./_toKey");
/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(obj, path) {
    const arr_path = _isKey_1.default(path, obj) ? [path] : _castPath_1.default(path);
    let index = 0;
    const length = arr_path.length;
    while (obj != null && index < length) {
        obj = obj[_toKey_1.default(arr_path[index++])];
    }
    return (index && index == length) ? obj : undefined;
}
exports.default = baseGet;
