'use strict'

module.exports = ReqIp

function ReqIp (header) {
  header = header || 'x-forwarded-for'

  return function ip (req, res, callback) {
    req.ip = req.headers[header] || req.connection.remoteAddress
    callback()
  }
}
