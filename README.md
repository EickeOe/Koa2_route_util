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
import { Route, TYPE } from 'koa2_autowired_route/core/annotation';

@(Route({ path: 'route-demo', Interceptors: [demoInterceptor] }) as any)
export class RouteDemo {
    @Route({ path: 'demo', type: TYPE.GET })
    async demo(ctx, next) {
        ctx.body = { text: 'hello world' };
    }
}
```

```typescript
import { Interceptor } from 'koa2_autowired_route/core/annotation';
export class demoInterceptor implements Interceptor{
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

释义: 接口注解

适用: class, method

可选参数：

```typescript
{
    path:string,//url路径
    type:enum,//请求类型
    Interceptors:Interceptor[]//拦截器数组
}
```

#### path

释义: url路径

类型: string

适用: class, method

#### type

释义: 请求类型

类型: enum TYPE

适用: method

可选参数:

```typescript
// 枚举源码
export enum TYPE {
    GET = 'get',
    POST = 'post',
    DELETE = 'delete',
    PUT = 'put'
}
```

即: 

- TYPE.GET
- TYPE.POST
- TYPE.DELETE
- TYPE.PUT

#### Interceptors

释义: 拦截器集合

类型: Interceptor[]

适用: class, method

元素类型：Interceptor 接口的实现类(*可以使用配置多个拦截器*)

示例: 

```typescript
import { Interceptor } from 'koa2_autowired_route/core/annotation';
export class demoInterceptor implements Interceptor{
    intercept(ctx, next): boolean{
        //some if...else...
        return true;
    }
}
```

- return true: 验证通过, 接下来访问接口
- return false: 验证失败, 如果ctx没有抛出异常, 服务器默认会报401

### @Autowired

释义: 依赖注入注解

适用: property

必选参数: 

```typescript
(): Object => new Object()
```

示例:

``` typescript
//route-demo.ts
import { Route, Autowired, TYPE } from 'koa2_autowired_route/core/annotation';

@(Route({ path: 'route-demo' }) as any)
export class RouteDemo {
    @(Autowired(() => 'hello world' ) as any)
    demoProperty;
    @Route({ path: 'demo', type: TYPE.GET })
    async demo(ctx, next) {
        ctx.body = this.demoProperty();
        // 在浏览器中查看此接口,会输出hello world
        // View in browser this, print helloworld
    }
}
```

