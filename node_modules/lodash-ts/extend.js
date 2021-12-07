"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
* @Author:				taoqf
* @Date:				2016-06-15 11:59:02
 * @Last Modified by: taoqf
 * @Last Modified time: 2017-10-17 11:54:02
* @CopyRight			飞道科技
*/
const _mixin_1 = require("./_mixin");
function extend(target, ...sources) {
    return _mixin_1.default({
        deep: false,
        inherited: true,
        sources: sources,
        target: target
    });
}
exports.default = extend;
