(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./_getTag", "./isObjectLike"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    * @Author:				taoqf
    * @Date:				2016-06-15 11:59:02
     * @Last Modified by: taoqf
     * @Last Modified time: 2017-10-17 12:01:15
    * @CopyRight			飞道科技
    */
    var _getTag_1 = require("./_getTag");
    var isObjectLike_1 = require("./isObjectLike");
    /**
     * Checks if `value` is classified as a `WeakMap` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified,
     *  else `false`.
     * @example
     *
     * _.isWeakMap(new WeakMap);
     * // => true
     *
     * _.isWeakMap(new Map);
     * // => false
     */
    function isWeakMap(value) {
        return isObjectLike_1.default(value) && _getTag_1.default(value) == _getTag_1.enumTags.weakMapTag;
    }
    exports.default = isWeakMap;
});
