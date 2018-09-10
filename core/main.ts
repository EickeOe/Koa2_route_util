import * as Koa from 'koa'
import { router, override } from './routes'
const app = new Koa()
override(app)
app.use(router.routes()).use(router.allowedMethods())
export default app