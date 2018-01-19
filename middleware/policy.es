// Can actually charge for this feature
// https://report-uri.com/#prices

const
  // `default-src 'self' safari-extension:// chrome-extension:// https://${domain};`
  defaults
    = [`'none'`]

// Depending on analytics framework,
// may want to listen for securitypolicyviolation events
// with JavaScript and collect more information about the client before reporting.
, reports // `report-uri ${path};`
    = ['https://ffb4d440b7878d6a1d371906dbe25fcd.report-uri.com/r/d/csp/enforce']

, frames // `frame-src 'self' https://${domain};`
    = Array.from (defaults)

, connects // `connect-src 'self' https://${domain};`
    = Array.from (defaults)

, images // `image-src 'self' data: https://cdn.example.com`
    = Array.from (defaults)

, fonts // `font-src 'self' https://cdn.example.com`
    = Array.from (defaults)

, objects // `object-src 'self' https://cdn.example.com`
    = Array.from (defaults)

, medias // `media-src 'self' https://cdn.example.com`
    = Array.from (defaults)

, styles // `style-src 'self' 'unsafe-inline' https://cdn.example.com`
    = Array.from (defaults)

, scripts // Script Nonce for inline <script>
  // https://csp.withgoogle.com/docs/strict-csp.html
  // `scripts-src 'self' 'nonce-${nonce} https://cdn.example.com`
    = Array.from (defaults)

, policies
    = [
      `report-uri ${ reports.join ` ` }`
    , `default-src ${ defaults.join ` ` }`
    , `frame-src ${ frames.join ` ` }`
    , `connect-src ${ connects.join ` ` }`
    , `img-src ${ images.join ` ` }`
    , `font-src ${ fonts.join ` ` }`
    , `object-src ${ objects.join ` ` }`
    , `media-src ${ medias.join ` ` }`
    , `style-src ${ styles.join ` ` }`
    , `script-src ${ scripts.join ` ` }`
    ]


module.exports = options =>

  async (context, next, header) => {

    await next ()

    header
      = 'Content-Security-Policy'
      // Is this a security breach?
      // Will someone be able to disable CSP with this?
      + ( 'report' in context.request.query ? '-Report-Only' : '' )

    context
      .set ( header, policies.join `; ` )
  }
