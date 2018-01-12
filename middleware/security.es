const
  age   = 63072000
, value = [`max-age=${age}`, 'includeSubDomains', 'preload'].join `; `


module.exports = options =>

  async (context, next) => {
    await next ()

  // max-age=63072000; includeSubDomains; preload

    context.set
      ('strict-transport-security', value)
  }
