const
  defaults
  // `default-src 'self' https://${domain};`
    = [`'none'`]

, styles
  // `style-src 'self' 'unsafe-inline' https://cdn.example.com
    = [`'none'`]

, policies = [
  , `default-src ${ defaults.join ` ` };`
  , `style-src ${ styles.join ` ` };`
  ]


module.exports = options =>

  async (context, next) => {

    await next ()

    context.set
      ( 'Content-Security-Policy', policies.join `; ` )
  }
