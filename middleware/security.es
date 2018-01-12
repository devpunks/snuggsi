const
  age   = 63072000
, transport = [`max-age=${age}`, 'includeSubDomains', 'preload'].join `; `


module.exports = options =>

  async (context, next) => {
    await next ()

    context.set
      ('strict-transport-security', transport)

    context.set
      ('x-frame-options', value)
  }
