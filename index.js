'use strict'

module.exports = ReqIp

function ReqIp (header) {
  header = header || 'x-forwarded-for'

  return function ip (req, res, callback) {
    req.ip = proxyHeader(req, header) || req.connection.remoteAddress
    callback()
  }
}

function proxyHeader (req, header) {
  const value = req.headers[header]
  return value && value.split(', ')[0]
}
