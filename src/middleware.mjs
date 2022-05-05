import koaStaticCache from 'koa-static-cache'
import path from 'node:path'
import { getDirname } from './utils.mjs'

export async function errorHandler(ctx, next) {
  try {
    await next()
  } catch (error) {
    ctx.body = {
      code: error.code || 500,
      message: error.message
    }
  }
}

export const staticServer = koaStaticCache({
  dir: path.resolve(getDirname(), '../static'),
  buffer: true,
  gzip: true,
  usePrecompiledGzip: true,
  alias: {
    '/': '/index.html'
  }
})
