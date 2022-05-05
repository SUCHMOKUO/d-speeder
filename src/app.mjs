import Koa from "koa"
import koaStaticCache from "koa-static-cache";
import path from "node:path"
import router from "./controller.mjs"
import { getDirname } from "./utils.mjs";

const PORT = Number(process.env.PORT) || 3000;
const app = new Koa();
const staticOpt = koaStaticCache({
  dir: path.resolve(getDirname(), "../static"),
  buffer: true,
  gzip: true,
  usePrecompiledGzip: true,
  alias: {
    '/': '/index.html'
  }
});

async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (error) {
    ctx.body = {
      code: error.code || 500,
      message: error.message
    }
  }
}

app
  .use(errorHandler)
  .use(staticOpt)
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(PORT);
