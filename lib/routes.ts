import * as fs from 'fs';
import * as path from 'path';
import * as Router from 'koa-router';

declare const require: any;
// 请求类型类型
export enum TYPE {
    GET = 'get',
    POST = 'post',
    DELETE = 'delete',
    PUT = 'put'
}
//路由缓存器
let routes: Map<{ target: any, type: string, path: string }, Function | Function[]>,
    ctrls: string,
    ctrlInterceptors: any[],
    funcInterceptors: Map<string, any[]>,
    ctrlAttr: Object;


const init = () => {
    routes = new Map();
    ctrls = '';
    ctrlInterceptors = [];
    funcInterceptors = new Map();
    ctrlAttr = {};
}
init();
//路由注解
export const Route = ({ path, type, Interceptors = [] }: { path: string, type?: string, Interceptors?: any[] }) => {
    return (target: any, name: string, value: PropertyDescriptor) => {
        if (typeof target === 'function') {
            ctrls = path;
            ctrlInterceptors = Interceptors;
        } else {
            funcInterceptors.set(name, Interceptors);
            routes.set({
                target: target,
                path: path,
                type: type
            }, target[name]);
        }
    };
};
//拦截器接口，使用拦截器请实现本接口
export interface Interceptor {
    intercept(ctx, next): boolean;
}
export const Autowired = (func) => {
    return (target: any, name: string, value: PropertyDescriptor) => {
        ctrlAttr[name]=func;
    };
}
//本工具默认配置
let config = {
    'scan-path': 'routes',//route存放路径
};

//获取项目根路径
const getRootPath = (temPath) => {
    while (true) {
        let file = fs.readdirSync(temPath);
        for (let i = 0; i < file.length; i++) {
            if (file[i] === 'route.json') {
                return temPath;
            }
        }
        if (temPath === path.dirname(temPath)) return undefined;
        else temPath = path.dirname(temPath);
    }
};

let routesPath = getRootPath(path.normalize(path.dirname(require.main.filename))) + path.sep + config['scan-path'];
const file = fs.readdirSync(routesPath);
let router: Router = new Router();
for (let ts of file) {
    let filepath = routesPath + path.sep + ts;
    require(filepath);
    let loop=(ctrlAttr)=>{
        for (let [config, controller] of routes) {
            let controllers = Array.isArray(controller) ? controller : [controller];
            for (let controller of controllers) {
                const fInters = funcInterceptors.get(controller.name);
                router[config.type](`/${ctrls}/${config.path}`,
                    async (ctx, next) => {
                        const check = ctrlInterceptors.every(interceptor => new interceptor().intercept(ctx, next)) && fInters.every(interceptor => new interceptor().intercept(ctx, next));
                        if (check) {
                            await controller.apply(ctrlAttr, [ctx, next]);
                        } else {
                            ctx.throw(401, 'server error');
                        }
                    });
            }
        }
    }
    loop(ctrlAttr);
    init();
}


export default router;