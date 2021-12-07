(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./_baseFlatten", "./toInteger"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    * @Author:				taoqf
    * @Date:				2016-06-15 11:59:02
    * @Last Modified by:	taoqf
    * @Last Modified time:	2016-06-17 15:54:39
    * @CopyRight			飞道科技
    */
    var _baseFlatten_1 = require("./_baseFlatten");
    var toInteger_1 = require("./toInteger");
    /**
     * Flattens `array` a single level deep.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to flatten.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * _.flatten([1, [2, [3, [4]], 5]]);
     * // => [1, 2, [3, [4]], 5]
     */
    function flatten(array, depth) {
        if (depth === void 0) { depth = 1; }
        var length = array ? array.length : 0;
        if (!length) {
            return [];
        }
        depth = depth === undefined ? 1 : toInteger_1.default(depth);
        return _baseFlatten_1.default(array, depth);
    }
    exports.default = flatten;
});
