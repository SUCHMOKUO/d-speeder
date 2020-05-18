const path = require("path");
const { Transform } = require("stream");

function getFileNameFromUrl(url) {
  if (!url) {
    return "";
  }
  return path.basename(url);
}

class Buffered extends Transform {
  static MIN_SIZE = 8 * 1024;

  constructor() {
    super({
      readableHighWaterMark: 10 * 1024 * 1024,
      writableHighWaterMark: 10 * 1024 * 1024,
    });
    this.chunks = null;
  }

  _transform(chunk, encoding, callback) {
    let { chunks } = this;
    if (chunk.length < Buffered.MIN_SIZE) {
      if (!chunks) return callback(null, chunk);
      chunks.push(chunk);
      this.chunks = null;
      let buf = Buffer.concat(chunks);
      callback(null, buf);
      return;
    }
    if (!chunks) {
      chunks = this.chunks = [chunk];
    } else {
      chunks.push(chunk);
    }
    setTimeout(() => {
      let { chunks } = this;
      if (chunks) {
        this.chunks = null;
        let buf = Buffer.concat(chunks);
        this.push(buf);
      }
    }, 100);
    callback();
  }

  _flush(callback) {
    let { chunks } = this;
    if (chunks) {
      this.chunks = null;
      let buf = Buffer.concat(chunks);
      callback(null, buf);
    } else {
      callback();
    }
  }
}

module.exports.getFileNameFromUrl = getFileNameFromUrl;
module.exports.Buffered = Buffered;
