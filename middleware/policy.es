const
  defaults
  // `default-src 'self' https://${domain};`
    = [`'none'`]

, frames
  // `frame-src 'self' https://${domain};`
    = [`'none'`]

, connects
  // `connect-src 'self' https://${domain};`
    = [`'none'`]

, images
  // `image-src 'self' https://cdn.example.com
    = [`'none'`]

, styles
  // `style-src 'self' 'unsafe-inline' https://cdn.example.com
    = [`'none'`]

, scripts
  // `scripts-src 'self' https://cdn.example.com
    = [`'none'`]

, policies = [
    `default-src ${ defaults.join ` ` };`
  , `frame-src ${ frames.join ` ` };`
  , `connect-src ${ connects.join ` ` };`
  , `img-src ${ images.join ` ` };`
  , `style-src ${ styles.join ` ` };`
  , `script-src ${ scripts.join ` ` };`
  ]


module.exports = options =>

  async (context, next) => {

    await next ()

    context.set
      ( 'Content-Security-Policy', policies.join ` ` )
  }
