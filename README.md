# Koa2 route  autowired

route  autowired for koa2 implementation .

## 特性

- 参考springMVC的注解，基于koa2的路由框架
- 开箱即用
- 简单优雅

## 安装

```bash
npm install koa2_autowired_route --save
```

## 示例

目录结构

```
.../
    src/
        filters/
            demo-filter.ts
        routes/
            route-demo.ts
        main.ts
        route.json
```

```typescript
//main.ts
import app from 'koa2_autowired_route';
app.listen(3000);
```

```json
//route.json
{
  "scan-path":"routes"
}
```

```typescript
//route-demo.ts
import { Route, Autowired, TYPE } from 'koa2_autowired_route/core/annotation';

@(Route({ path: 'route-demo', Interceptors: [signInterceptor] }) as any)
export class RouteDemo {
    @Route({ path: 'demo', type: TYPE.GET })
    async demo(ctx, next) {
        ctx.body = { text: 'hello world' };
    }
}
```

```typescript
import { Interceptor } from 'koa2_autowired_route/core/annotation';
export class signInterceptor implements Interceptor{
    intercept(ctx, next): boolean{
        //some if...else...
        return true;
    }
}
```

## 运行

```bash
npm run ts-node ./src/main.ts
```

打开[http://localhost:3000](http://localhost:3000)以在浏览器中查看它 .

## 装饰器用法

### @Route

用于绑定接口，可配置参数：

```typescript
{
    path:string,//url路径
    type:enum,//请求类型
    Interceptors:Interceptor[]//拦截器数组
}
```



### @Autowired

 