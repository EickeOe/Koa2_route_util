import * as fs from 'fs';
import * as path from 'path';
import * as Router from 'koa-router';

declare const require: any;
// 请求类型类型
export enum TYPE{
    GET = 'get',
    POST = 'post',
    DELETE = 'delete',
    PUT = 'put'
}
//路由缓存器
let routes: Map<{ target: any, type: string, path: string }, Function | Function[]> = new Map();
let ctrls: string, ctrlInterceptors: any[];
//路由注解
export const Route = ({path, type, Interceptors = []}:{path: string, type?: string, Interceptors?: any[]}) => {
    return (target: any, name: string, value: PropertyDescriptor) => {
       
        if (typeof target === 'function') {
            ctrls = path;
            ctrlInterceptors = Interceptors;
        } else {
            
            routes.set({
                target: target,
                path: path,
                type: type
            }, async(ctx, next)=>{
                
                const check = Interceptors.every(interceptor=>new interceptor().intercept(ctx, next));
                if(check){
                    await target[name].apply(null, [ctx, next]);
                } else {
                    ctx.throw(401, 'server error');
                }
               
            });
        }
    };
};
//拦截器接口，使用拦截器请实现本接口
export interface Interceptor{
    intercept(ctx, next): boolean;
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
    for (let [config, controller] of routes) {
        let controllers = Array.isArray(controller) ? controller : [controller];
        for (let controller of controllers) {
            router[config.type](`/${ctrls}/${config.path}`, controller);
        }
    }
    routes = new Map();
}
export default router;
