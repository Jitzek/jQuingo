"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function removeDups(arr) {
    return arr.filter((it, idx) => {
        return arr.indexOf(it, ++idx) == -1;
    });
}
exports.default = removeDups;
