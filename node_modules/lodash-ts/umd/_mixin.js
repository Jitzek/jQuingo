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
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    /**
     * Type guard that ensures that the value can be coerced to Object
     * to weed out host objects that do not derive from Object.
     * This function is used to check if we want to deep copy an object or not.
     * Note: In ES6 it is possible to modify an object's Symbol.toStringTag property, which will
     * change the value returned by `toString`. This is a rare edge case that is difficult to handle,
     * so it is not handled here.
     * @param  value The value to check
     * @return       If the value is coercible into an Object
     */
    function shouldDeepCopyObject(value) {
        return Object.prototype.toString.call(value) === '[object Object]';
    }
    function copyArray(array, inherited) {
        return array.map(function (item) {
            if (Array.isArray(item)) {
                return copyArray(item, inherited);
            }
            return !shouldDeepCopyObject(item) ?
                item :
                _mixin({
                    deep: true,
                    inherited: inherited,
                    sources: [item],
                    target: {}
                });
        });
    }
    exports.copyArray = copyArray;
    function _mixin(kwArgs) {
        var deep = kwArgs.deep;
        var inherited = kwArgs.inherited;
        var target = kwArgs.target;
        for (var name_1 in kwArgs.sources) {
            var source = kwArgs.sources[name_1];
            if (source === null || source === undefined) {
                continue;
            }
            for (var key in source) {
                if (inherited || hasOwnProperty.call(source, key)) {
                    var value = source[key];
                    if (deep) {
                        if (Array.isArray(value)) {
                            value = copyArray(value, inherited);
                        }
                        else if (shouldDeepCopyObject(value)) {
                            value = _mixin({
                                deep: true,
                                inherited: inherited,
                                sources: [value],
                                target: {}
                            });
                        }
                    }
                    target[key] = value;
                }
            }
        }
        return target;
    }
    exports.default = _mixin;
});
