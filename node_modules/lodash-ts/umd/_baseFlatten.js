/*
* @Author:        taoqf
* @Date:        2016-06-17 15:47:20
 * @Last Modified by: taoqf
 * @Last Modified time: 2017-10-17 11:43:28
* @CopyRight      飞道科技
*/
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./isArguments", "./isArray"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var isArguments_1 = require("./isArguments");
    var isArray_1 = require("./isArray");
    /**
     * Checks if `value` is a flattenable `arguments` object or array.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
     */
    function isFlattenable(value) {
        return isArray_1.default(value) || isArguments_1.default(value);
    }
    /**
     * The base implementation of `_.flatten` with support for restricting flattening.
     *
     * @private
     * @param {Array} array The array to flatten.
     * @param {number} depth The maximum recursion depth.
     * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
     * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
     * @param {Array} [result=[]] The initial result value.
     * @returns {Array} Returns the new flattened array.
     */
    function baseFlatten(array, depth, predicate, isStrict) {
        if (isStrict === void 0) { isStrict = false; }
        var index = -1, length = array.length;
        predicate || (predicate = isFlattenable);
        var result = [];
        while (++index < length) {
            var value = array[index];
            if (depth > 0 && predicate(value)) {
                result = result.concat(depth > 1 ? baseFlatten(value, depth - 1, predicate, isStrict) : value);
            }
            else if (!isStrict) {
                result[result.length] = value;
            }
        }
        return result;
    }
    exports.default = baseFlatten;
});
