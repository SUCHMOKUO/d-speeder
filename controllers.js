const Router = require("@koa/router");
const fs = require("fs");
const path = require("path");
const { proxy } = require("./services");

const router = new Router();

const indexHtml = fs.readFileSync(path.resolve("./static/index.html"));
router.get("/", (ctx) => {
  ctx.type = "text/html; charset=utf-8";
  ctx.body = indexHtml;
});

router.get("/proxy", async (ctx) => {
  const proxyHandler = await proxy(ctx.query.url);
  ctx.set(proxyHandler.headers);
  ctx.body = proxyHandler.bodyStream;
});

module.exports = router;
