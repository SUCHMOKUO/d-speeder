import Koa from 'koa'
import router from './controller.mjs'
import { errorHandler, staticServer } from './middleware.mjs'

const PORT = Number(process.env.PORT) || 3000

const app = new Koa()

app
  .use(errorHandler)
  .use(staticServer)
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(PORT)
