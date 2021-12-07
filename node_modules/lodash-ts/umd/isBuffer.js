(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./_root", "./stubFalse"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    * @Author:				taoqf
    * @Date:				2016-06-15 11:59:02
     * @Last Modified by: taoqf
     * @Last Modified time: 2017-10-17 11:51:18
    * @CopyRight			飞道科技
    */
    var _root_1 = require("./_root");
    var stubFalse_1 = require("./stubFalse");
    /** Detect free variable `exports`. */
    var freeExports = typeof exports == 'object' && exports;
    /** Detect free variable `module`. */
    var freeModule = freeExports && typeof module == 'object' && module;
    /** Detect the popular CommonJS extension `module.exports`. */
    var moduleExports = freeModule && freeModule.exports === freeExports;
    /** Built-in value references. */
    var Buffer = moduleExports ? _root_1.default.Buffer : undefined;
    /**
     * Checks if `value` is a buffer.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
     * @example
     *
     * _.isBuffer(new Buffer(2));
     * // => true
     *
     * _.isBuffer(new Uint8Array(2));
     * // => false
     */
    var isBuffer = !Buffer ? stubFalse_1.default : function (value) {
        return value instanceof Buffer;
    };
    exports.default = isBuffer;
});
