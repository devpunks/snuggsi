const
  reports
  // `reports-src 'self' https://${domain};`
    = [`'none'`]

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
  // `image-src 'self' data: https://cdn.example.com`
    = [`'none'`]

, styles
  // `style-src 'self' 'unsafe-inline' https://cdn.example.com`
    = [`'none'`]

, scripts
  // Script Nonce for inline <script>
  // https://csp.withgoogle.com/docs/strict-csp.html
  // `scripts-src 'self' 'nonce-${nonce} https://cdn.example.com`
    = [`'none'`]

, policies = [
    `report-uri ${ reports.join ` ` };`
  , `default-src ${ defaults.join ` ` };`
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
