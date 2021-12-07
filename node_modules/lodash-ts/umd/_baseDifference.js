(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./_arrayIncludes"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    * @Author:        taoqf
    * @Date:        2016-06-17 15:47:20
    * @Last Modified by:  taoqf
    * @Last Modified time:  2016-06-17 15:47:20
    * @CopyRight      飞道科技
    */
    var _arrayIncludes_1 = require("./_arrayIncludes");
    /** Used as the size to enable large array optimizations. */
    var LARGE_ARRAY_SIZE = 200;
    /**
     * The base implementation of methods like `_.difference` without support
     * for excluding multiple arrays or iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Array} values The values to exclude.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     */
    function baseDifference(array, values) {
        var index = -1;
        var isCommon = true;
        var length = array && array.length;
        var result = [];
        var valuesLength = values.length;
        var vs = new Set(values);
        if (!length) {
            return result;
        }
        else if (values.length >= LARGE_ARRAY_SIZE) {
            isCommon = false;
        }
        outer: while (++index < length) {
            var value = array[index];
            if (isCommon) {
                if (isCommon && value === value) {
                    var valuesIndex = valuesLength;
                    while (valuesIndex--) {
                        if (values[valuesIndex] === value) {
                            continue outer;
                        }
                    }
                    result.push(value);
                }
                else if (!_arrayIncludes_1.default(values, value)) {
                    result.push(value);
                }
            }
            else if (!vs.has(value)) {
                result.push(value);
            }
        }
        return result;
    }
    exports.default = baseDifference;
});
