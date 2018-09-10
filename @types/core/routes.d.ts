import * as Router from 'koa-router';
declare let config: {
    'scan-path': string;
    'override': string;
};
declare let override: (app: any) => void;
declare let router: Router;
export { config, router, override };
