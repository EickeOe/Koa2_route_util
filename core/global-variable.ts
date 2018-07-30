//插件全局变量

export class Global{
    private static _global:Global;
    routes:Map<{ target: any, type: string, path: string }, Function | Function[]>;
    ctrls: string;
    ctrlInterceptors: any[];
    funcInterceptors: Map<string, any[]>;
    ctrlAttr: Object;
    private constructor(){
        this.reset();
    }
    static getGlobal():Global{
        if(!Global._global){
            Global._global=new Global();
        }
        return Global._global;
    }
    reset():void {
        this.routes = new Map();
        this.ctrls = '';
        this.ctrlInterceptors = [];
        this.funcInterceptors = new Map();
        this.ctrlAttr = {};
    }
}