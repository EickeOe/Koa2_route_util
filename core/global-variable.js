"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = new Map();
exports.ctrls = '';
exports.ctrlInterceptors = [];
exports.funcInterceptors = new Map();
exports.ctrlAttr = {};
exports.reset = () => {
    exports.routes = new Map();
    exports.ctrls = '';
    exports.ctrlInterceptors = [];
    exports.funcInterceptors = new Map();
    exports.ctrlAttr = {};
};
exports.global = {
    routes: new Map(),
    ctrls: '',
    ctrlInterceptors: [],
    funcInterceptors: new Map(),
    ctrlAttr: {},
    reset: () => {
        this.routes = new Map();
        this.ctrls = '';
        this.ctrlInterceptors = [];
        this.funcInterceptors = new Map();
        this.ctrlAttr = {};
    }
};
//# sourceMappingURL=global-variable.js.map