export declare class Global {
    private static _global;
    routes: Map<{
        target: any;
        type: string;
        path: string;
    }, Function | Function[]>;
    ctrls: string;
    ctrlInterceptors: any[];
    funcInterceptors: Map<string, any[]>;
    ctrlAttr: Object;
    private constructor();
    static getGlobal(): Global;
    reset(): void;
}
