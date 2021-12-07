"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _mixin_1 = require("./_mixin");
exports.assign = !!Object.assign ?
    Object.assign :
    // function<T extends {}, U extends {}> (target: T, ...sources: (U | null | undefined)[]): T&U {
    function (target, ...sources) {
        return _mixin_1.default({
            deep: false,
            inherited: false,
            sources: sources,
            target: target
        });
    };
exports.default = exports.assign;
