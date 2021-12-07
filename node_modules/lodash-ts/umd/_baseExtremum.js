(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./isSymbol"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    * @Author:        taoqf
    * @Date:        2016-06-17 15:47:20
     * @Last Modified by: taoqf
     * @Last Modified time: 2017-10-17 11:42:40
    * @CopyRight      飞道科技
    */
    var isSymbol_1 = require("./isSymbol");
    /**
     * The base implementation of methods like `_.max` and `_.min` which accepts a
     * `comparator` to determine the extremum value.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The iteratee invoked per iteration.
     * @param {Function} comparator The comparator used to compare values.
     * @returns {*} Returns the extremum value.
     */
    function baseExtremum(array, comparator) {
        var index = -1;
        var length = array.length;
        var computed = undefined;
        while (++index < length) {
            var value = array[index];
            if (value != null && (computed === undefined
                ? (value === value && !isSymbol_1.default(value))
                : comparator(value, computed))) {
                computed = value;
            }
        }
        return computed;
    }
    exports.default = baseExtremum;
});
