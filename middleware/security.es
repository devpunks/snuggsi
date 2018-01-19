const
  age     = 60 * 60 * 24 * 365
, frame   = 'deny'
, content = 'nosniff'

, xss =
    [1, 'mode=block'].join `; `

, transport =
    [`max-age=${age}`, 'includeSubDomains', 'preload'].join `; `


module.exports = options =>

  async (context, next) => {

    await next ()

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
