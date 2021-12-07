"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
* @Author:				taoqf
* @Date:				2016-06-15 11:59:02
* @Last Modified by:	taoqf
* @Last Modified time:	2016-06-17 15:54:51
* @CopyRight			飞道科技
*/
const deburr_1 = require("./deburr");
const words_1 = require("./words");
/** Used to compose unicode capture groups. */
const rsApos = "['\u2019]";
/** Used to match apostrophes. */
const reApos = RegExp(rsApos, 'g');
/**
 * Creates a function like `_.camelCase`.
 *
 * @private
 * @param {Function} callback The function to combine each word.
 * @returns {Function} Returns the new compounder function.
 */
function createCompounder(callback) {
    return function (str) {
        return words_1.default(deburr_1.default(str).replace(reApos, '')).reduce(callback, '');
    };
}
exports.default = createCompounder;
