const
  policies = [
    `default-src 'none';`
  ]

module.exports = options =>

  async (context, next) => {

    await next ()

    for
      ( let policy of policies )
        context.set
          ('Content-Security-Policy', policy)
  }
