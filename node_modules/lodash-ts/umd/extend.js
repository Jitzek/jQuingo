(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./_mixin"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
    * @Author:				taoqf
    * @Date:				2016-06-15 11:59:02
     * @Last Modified by: taoqf
     * @Last Modified time: 2017-10-17 11:54:02
    * @CopyRight			飞道科技
    */
    var _mixin_1 = require("./_mixin");
    function extend(target) {
        var sources = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sources[_i - 1] = arguments[_i];
        }
        return _mixin_1.default({
            deep: false,
            inherited: true,
            sources: sources,
            target: target
        });
    }
    exports.default = extend;
});
