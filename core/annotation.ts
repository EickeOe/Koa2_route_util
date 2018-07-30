import {global} from './global-variable'
//路由注解
export const Route = ({ path, type, Interceptors = [] }: { path: string, type?: string, Interceptors?: any[] }) => {
    return (target: any, name: string, value: PropertyDescriptor) => {
        if (typeof target === 'function') {
            global.ctrls = path;
            global.ctrlInterceptors = Interceptors;
        } else {
            global.funcInterceptors.set(name, Interceptors);
            global.routes.set({
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
        global.ctrlAttr[name]=func;
    };
}
// 请求类型类型
export enum TYPE {
    GET = 'get',
    POST = 'post',
    DELETE = 'delete',
    PUT = 'put'
}