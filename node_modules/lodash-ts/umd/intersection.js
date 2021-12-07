(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeMin = Math.min;
    /**
     * The base implementation of methods like `_.intersection`, without support
     * for iteratee shorthands, that accepts an array of arrays to inspect.
     *
     * @private
     * @param {Array} arr The arrays to be inspected.
     * @param {Array} arrays The arrays to inspect.
     * @returns {Array} Returns the new array of shared values.
     * @example
     *
     * _.intersection([2, 1], [2, 3]);
     * // => [2]
     */
    function intersection(arr) {
        var arrays = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            arrays[_i - 1] = arguments[_i];
        }
        var result = [];
        var seen = new Set(arr);
        seen.forEach(function (it) {
            if (arrays.every(function (array) {
                return array.indexOf(it) != -1;
            })) {
                result.push(it);
            }
        });
        return result;
    }
    exports.default = intersection;
});
