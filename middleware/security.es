const
  age = 63072000
, frame = 'deny'
, content = 'nosniff'
, transport = [`max-age=${age}`, 'includeSubDomains', 'preload'].join `; `


module.exports = options =>

  async (context, next) => {
    await next ()

    context.set
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
      ('x-frame-options', frame)

    context.set
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
      ('strict-transport-security', transport)

    context.set
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
      ('strict-transport-security', transport)
  }
