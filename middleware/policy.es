const

  policies = [
    `default-src 'none';` // `default-src 'self' https://${domain};`
  ]


module.exports = options =>

  async (context, next) => {

    await next ()

    for
      ( let policy of policies )
        context.set
          ('Content-Security-Policy', policy)
  }
