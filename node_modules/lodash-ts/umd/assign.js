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
    var _mixin_1 = require("./_mixin");
    exports.assign = !!Object.assign ?
        Object.assign :
        // function<T extends {}, U extends {}> (target: T, ...sources: (U | null | undefined)[]): T&U {
        function (target) {
            var sources = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                sources[_i - 1] = arguments[_i];
            }
            return _mixin_1.default({
                deep: false,
                inherited: false,
                sources: sources,
                target: target
            });
        };
    exports.default = exports.assign;
});
