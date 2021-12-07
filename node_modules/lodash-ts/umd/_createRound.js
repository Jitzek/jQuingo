(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./toInteger", "./toString"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    * @Author:				taoqf
    * @Date:				2016-06-15 11:59:02
     * @Last Modified by: taoqf
     * @Last Modified time: 2017-10-17 13:50:34
    * @CopyRight			飞道科技
    */
    var toInteger_1 = require("./toInteger");
    var toString_1 = require("./toString");
    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeMin = Math.min;
    /**
     * Creates a function like `_.round`.
     *
     * @private
     * @param {string} methodName The name of the `Math` method to use when rounding.
     * @returns {Function} Returns the new round function.
     */
    function createRound(func) {
        return function (num, precision) {
            precision = nativeMin(toInteger_1.default(precision), 292);
            if (precision) {
                // Shift with exponential notation to avoid floating-point issues.
                // See [MDN](https://mdn.io/round#Examples) for more details.
                var pair = (toString_1.default(num) + 'e').split('e'), value = func(pair[0] + 'e' + (+pair[1] + precision));
                pair = (toString_1.default(value) + 'e').split('e');
                return +(pair[0] + 'e' + (+pair[1] - precision));
            }
            return func(num);
        };
    }
    exports.default = createRound;
});
