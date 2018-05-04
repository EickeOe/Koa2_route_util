import * as Koa from 'koa'
import router from './lib/routes'
const app = new Koa()
app.use(router.routes()).use(router.allowedMethods())
export default app