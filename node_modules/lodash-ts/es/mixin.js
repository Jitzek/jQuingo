/*
* @Author:				taoqf
* @Date:				2016-06-15 11:59:02
* @Last Modified by:	taoqf
* @Last Modified time:	2016-06-17 15:54:24
* @CopyRight			飞道科技
*/
import _mixin from './_mixin';
export default function mixin(...sources) {
    return _mixin({
        deep: false,
        inherited: true,
        sources: sources,
        target: {}
    });
}
