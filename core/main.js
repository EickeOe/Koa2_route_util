"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const routes_1 = require("./routes");
const app = new Koa();
app.use(routes_1.default.routes()).use(routes_1.default.allowedMethods());
exports.default = app;
//# sourceMappingURL=main.js.map