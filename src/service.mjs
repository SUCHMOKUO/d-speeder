import fetch from "node-fetch"
import { ProxyHandler, ErrorResponse } from "./model.mjs"
import { getFileNameFromUrl, Buffered } from "./utils.mjs"

export async function proxy(url) {
  if (!url) {
    throw new ErrorResponse(400, "illegal url");
  }
  const res = await fetch(url);

  if (!res.ok) {
    throw new ErrorResponse(res.status, `Remote error: ${res.statusText}`);
  }
  return new ProxyHandler(
    {
      "Content-Type": res.headers.get("content-type"),
      "Content-Length": res.headers.get("content-length"),
      "Content-Disposition":
        res.headers.get("content-disposition") ||
        `attachment; filename="${getFileNameFromUrl(url)}"`,
    },
    res.body.pipe(new Buffered())
  );
}
