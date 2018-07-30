"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Global {
    constructor() {
        this.reset();
    }
    static getGlobal() {
        if (!Global._global) {
            Global._global = new Global();
        }
        return Global._global;
    }
    reset() {
        this.routes = new Map();
        this.ctrls = '';
        this.ctrlInterceptors = [];
        this.funcInterceptors = new Map();
        this.ctrlAttr = {};
    }
}
exports.Global = Global;
//# sourceMappingURL=global-variable.js.map