"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _mixin_1 = require("./_mixin");
function deepAssign(target, ...sources) {
    return _mixin_1.default({
        deep: true,
        inherited: false,
        sources: sources,
        target: target
    });
}
exports.deepAssign = deepAssign;
exports.default = deepAssign;
