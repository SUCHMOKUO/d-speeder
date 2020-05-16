class ProxyHandler {
  constructor(headers, bodyStream) {
    this.headers = headers || {};
    this.bodyStream = bodyStream;
  }
}

class ErrorResponse extends Error {
  constructor(code, message) {
    super(message);
    this.name = "ErrorResponse";
    this.code = code;
  }
}

module.exports.ProxyHandler = ProxyHandler;
module.exports.ErrorResponse = ErrorResponse;
