export class ProxyHandler {
  constructor(headers, bodyStream) {
    this.headers = headers || {}
    this.bodyStream = bodyStream
  }
}

export class ErrorResponse extends Error {
  constructor(code, message) {
    super(message)
    this.name = 'ErrorResponse'
    this.code = code
  }
}
