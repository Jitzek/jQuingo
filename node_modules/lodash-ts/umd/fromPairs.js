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
    /*
    * @Author:				taoqf
    * @Date:				2016-06-17 15:47:25
    * @Last Modified by:	taoqf
    * @Last Modified time:	2016-06-17 15:54:48
    * @CopyRight			飞道科技
    */
    /**
     * The inverse of `_.toPairs`; this method returns an object composed
     * from key-value `pairs`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} pairs The key-value pairs.
     * @returns {Object} Returns the new object.
     * @example
     *
     * _.fromPairs([['fred', 30], ['barney', 40]]);
     * // => { 'fred': 30, 'barney': 40 }
     */
    function fromPairs(pairs) {
        var index = -1;
        var length = pairs ? pairs.length : 0;
        var result = {};
        while (++index < length) {
            var pair = pairs[index];
            result[pair[0]] = pair[1];
        }
        return result;
    }
    exports.default = fromPairs;
});
