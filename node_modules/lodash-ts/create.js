"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assign_1 = require("./assign");
function create(prototype, ...mixins) {
    if (!mixins.length) {
        throw new RangeError('create requires at least one mixin object.');
    }
    const args = mixins.slice();
    args.unshift(Object.create(prototype));
    return assign_1.default.apply(null, args);
}
exports.create = create;
exports.default = create;
