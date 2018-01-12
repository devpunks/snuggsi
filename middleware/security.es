const
  age = 63072000
, frame = 'deny'
, transport = [`max-age=${age}`, 'includeSubDomains', 'preload'].join `; `


module.exports = options =>

  async (context, next) => {
    await next ()

    context.set
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
      ('x-frame-options', frame)

    context.set
      ('strict-transport-security', transport)
  }
