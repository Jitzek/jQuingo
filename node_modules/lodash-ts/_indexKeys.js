"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
* @Author:				taoqf
* @Date:				2016-06-15 11:59:02
* @Last Modified by:	taoqf
* @Last Modified time:	2016-06-17 15:54:45
* @CopyRight			飞道科技
*/
const isArguments_1 = require("./isArguments");
const isArray_1 = require("./isArray");
const isLength_1 = require("./isLength");
const isString_1 = require("./isString");
/**
 * Creates an array of index keys for `object` values of arrays,
 * `arguments` objects, and strings, otherwise `null` is returned.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array|null} Returns index keys, else `null`.
 */
function indexKeys(object) {
    const len = object ? object.length : undefined;
    if (isLength_1.default(len) &&
        (isArray_1.default(object) || isString_1.default(object) || isArguments_1.default(object))) {
        let index = -1;
        const result = Array(len);
        while (++index < len) {
            result[index] = String(index);
        }
        return result;
    }
    return null;
}
exports.default = indexKeys;
