import Router from '@koa/router'
import { proxy } from './service.mjs'

const router = new Router()

router.get('/proxy', async (ctx) => {
  const proxyHandler = await proxy(ctx.query.url)
  ctx.set(proxyHandler.headers)
  ctx.body = proxyHandler.bodyStream
})

export default router
