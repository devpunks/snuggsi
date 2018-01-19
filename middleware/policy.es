const
  policies = [
    `default-src 'none'` // `default-src 'self' https://${domain};`
  , `style-src 'none'` // `style-src 'self' 'unsafe-inline' https://cdn.example.com
  ]


module.exports = options =>

  async (context, next) => {

    await next ()

    context.set
      ( 'Content-Security-Policy', policies.join `; ` )
  }
