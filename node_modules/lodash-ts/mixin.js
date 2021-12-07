"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
* @Author:				taoqf
* @Date:				2016-06-15 11:59:02
* @Last Modified by:	taoqf
* @Last Modified time:	2016-06-17 15:54:24
* @CopyRight			飞道科技
*/
const _mixin_1 = require("./_mixin");
function mixin(...sources) {
    return _mixin_1.default({
        deep: false,
        inherited: true,
        sources: sources,
        target: {}
    });
}
exports.default = mixin;
