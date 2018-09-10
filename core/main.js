"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const routes_1 = require("./routes");
const app = new Koa();
routes_1.override(app);
app.use(routes_1.router.routes()).use(routes_1.router.allowedMethods());
exports.default = app;
//# sourceMappingURL=main.js.map