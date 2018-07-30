"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const global_variable_1 = require("./global-variable");
const global = global_variable_1.Global.getGlobal();
exports.Route = ({ path, type, Interceptors = [] }) => {
    return (target, name, value) => {
        if (typeof target === 'function') {
            global.ctrls = path;
            global.ctrlInterceptors = Interceptors;
        }
        else {
            global.funcInterceptors.set(name, Interceptors);
            global.routes.set({
                target: target,
                path: path,
                type: type
            }, target[name]);
        }
    };
};
exports.Autowired = (func) => {
    return (target, name, value) => {
        global.ctrlAttr[name] = func;
    };
};
var TYPE;
(function (TYPE) {
    TYPE["GET"] = "get";
    TYPE["POST"] = "post";
    TYPE["DELETE"] = "delete";
    TYPE["PUT"] = "put";
})(TYPE = exports.TYPE || (exports.TYPE = {}));
//# sourceMappingURL=annotation.js.map