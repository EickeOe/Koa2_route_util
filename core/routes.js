"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const Router = require("koa-router");
const global_variable_1 = require("./global-variable");
let config = {
    'scan-path': 'routes',
};
const getRootPath = (temPath) => {
    while (true) {
        let file = fs.readdirSync(temPath);
        for (let i = 0; i < file.length; i++) {
            if (file[i] === 'route.json') {
                return temPath;
            }
        }
        if (temPath === path.dirname(temPath))
            return undefined;
        else
            temPath = path.dirname(temPath);
    }
};
let routesPath = getRootPath(path.normalize(path.dirname(require.main.filename))) + path.sep + config['scan-path'];
const file = fs.readdirSync(routesPath);
let router = new Router();
for (let ts of file) {
    let filepath = routesPath + path.sep + ts;
    require(filepath);
    let loop = (ctrlAttr) => {
        for (let [config, controller] of global_variable_1.global.routes) {
            let controllers = Array.isArray(controller) ? controller : [controller];
            for (let controller of controllers) {
                const fInters = global_variable_1.global.funcInterceptors.get(controller.name);
                router[config.type](`/${global_variable_1.global.ctrls}/${config.path}`, (ctx, next) => __awaiter(this, void 0, void 0, function* () {
                    const check = global_variable_1.global.ctrlInterceptors.every(interceptor => new interceptor().intercept(ctx, next)) && fInters.every(interceptor => new interceptor().intercept(ctx, next));
                    if (check) {
                        yield controller.apply(ctrlAttr, [ctx, next]);
                    }
                    else {
                        ctx.throw(401, 'server error');
                    }
                }));
            }
        }
    };
    loop(global_variable_1.global.ctrlAttr);
    global_variable_1.global.reset();
}
exports.default = router;
//# sourceMappingURL=routes.js.map