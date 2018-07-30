export declare let routes: Map<{
    target: any;
    type: string;
    path: string;
}, Function | Function[]>;
export declare let ctrls: string;
export declare let ctrlInterceptors: any[];
export declare let funcInterceptors: Map<string, any[]>;
export declare let ctrlAttr: Object;
export declare const reset: () => void;
export declare const global: {
    routes: Map<any, any>;
    ctrls: string;
    ctrlInterceptors: any[];
    funcInterceptors: Map<any, any>;
    ctrlAttr: {};
    reset: () => void;
};
