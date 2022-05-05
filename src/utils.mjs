import path from 'node:path'
import { Transform } from 'node:stream'
import { fileURLToPath } from 'node:url'

export function getFileNameFromUrl(url) {
  if (!url) {
    return ''
  }
  return path.basename(url)
}

export class Buffered extends Transform {
  static MIN_SIZE = 8 * 1024

  constructor() {
    super({
      readableHighWaterMark: 100 * 1024 * 1024,
      writableHighWaterMark: 100 * 1024 * 1024
    })
    this.chunks = null
  }

  _transform(chunk, encoding, callback) {
    let { chunks } = this
    if (chunk.length < Buffered.MIN_SIZE) {
      if (!chunks) return callback(null, chunk)
      chunks.push(chunk)
      this.chunks = null
      let buf = Buffer.concat(chunks)
      callback(null, buf)
      return
    }
    if (!chunks) {
      chunks = this.chunks = [chunk]
    } else {
      chunks.push(chunk)
    }
    setTimeout(() => {
      let { chunks } = this
      if (chunks) {
        this.chunks = null
        let buf = Buffer.concat(chunks)
        this.push(buf)
      }
    }, 1000)
    callback()
  }

  _flush(callback) {
    let { chunks } = this
    if (chunks) {
      this.chunks = null
      let buf = Buffer.concat(chunks)
      callback(null, buf)
    } else {
      callback()
    }
  }
}

export function getDirname() {
  return path.dirname(fileURLToPath(import.meta.url))
}
