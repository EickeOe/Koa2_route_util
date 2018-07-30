//插件全局变量
export let routes: Map<{ target: any, type: string, path: string }, Function | Function[]> = new Map();
export let ctrls: string = '';
export let ctrlInterceptors: any[] = [];
export let funcInterceptors: Map<string, any[]> = new Map();
export let ctrlAttr: Object = {};

export const reset = () => {
    routes = new Map();
    ctrls = '';
    ctrlInterceptors = [];
    funcInterceptors = new Map();
    ctrlAttr = {};
}
export const global={
    routes:new Map(),
    ctrls:'',
    ctrlInterceptors:[],
    funcInterceptors:new Map(),
    ctrlAttr:{},
    reset:() => {
        this.routes = new Map();
        this.ctrls = '';
        this.ctrlInterceptors = [];
        this.funcInterceptors = new Map();
        this.ctrlAttr = {};
    }
}