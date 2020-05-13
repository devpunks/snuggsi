// Security headers https://hackernoon.com/nodejs-security-headers-101-mf9k24zn
// Helmet - helmet

const
  age     = 60 * 60 * 24 * 365
, frame   = 'deny' // SAMEORIGIN
, content = 'nosniff'

, xss =
    [1, 'mode=block'].join `; `

, transport =
    [`max-age=${age}`, 'includeSubDomains', 'preload'].join `; `


module.exports = options =>
  // https://hackernoon.com/nodejs-security-headers-101-mf9k24zn
  async (context, next) => {
    await next ()

    'x-dns-prefetch-control', 'off'
    'x-download-options', 'noopen'
    '', ''
    '', ''
    '', ''
    '', ''
    '', ''
    '', ''
    '', ''

    context.set
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection
      ('x-xss-protection', xss)

    context.set
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
      ('x-frame-options', frame)

    context.set
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
      ('x-content-type-options', content)

    context.set
      // https://tools.ietf.org/html/rfc6797
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
      ('strict-transport-security', transport)
  }
