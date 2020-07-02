const Koa = require("koa");
const static = require("koa-static-cache");
const path = require("path");
const router = require("./controllers");

const PORT = Number(process.env.PORT) || 3000;
const app = new Koa();
const staticOpt = static({
  dir: path.resolve("./static"),
  buffer: true,
  gzip: true,
  usePrecompiledGzip: true,
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