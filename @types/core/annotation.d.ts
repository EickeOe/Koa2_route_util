export declare const Route: ({ path, type, Interceptors }: {
    path: string;
    type?: string;
    Interceptors?: any[];
}) => (target: any, name: string, value: PropertyDescriptor) => void;
export interface Interceptor {
    intercept(ctx: any, next: any): boolean;
}
export declare const Autowired: (func: any) => (target: any, name: string, value: PropertyDescriptor) => void;
export declare enum TYPE {
    GET = "get",
    POST = "post",
    DELETE = "delete",
    PUT = "put",
}
