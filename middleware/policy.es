// Can actually charge for this feature
// https://report-uri.com/#prices

const
  // `default-src 'self' safari-extension:// chrome-extension:// https://${domain};`
  defaults
    = [`'none'`]

// Depending on analytics framework,
// may want to listen for securitypolicyviolation events
// with JavaScript and collect more information about the client before reporting.
, reports // report-to
    // *DEPRECATED* report-uri
    = ['https://ffb4d440b7878d6a1d371906dbe25fcd.report-uri.com/r/d/csp/enforce']

, frames // frame-src
    // *DEPRECATED* child-src fallback
    // default-src fallback
    = Array.from (defaults)

, connects // connect-src
    = Array.from (defaults)

, images // image-src
    = Array.from (defaults)

, fonts // font-src
    = Array.from (defaults)

, objects // object-src
    = Array.from (defaults)

, medias // media-src
    = Array.from (defaults)

, styles // style-src
    = Array.from (defaults)

, scripts // Script Nonce for inline <script>
    // https://csp.withgoogle.com/docs/strict-csp.html
    // scripts-src
    // nonce-${nonce}
    // ** NONCE MUST BE UNIQUE **
    //   https://w3c.github.io/webappsec-csp/#framework-directive-source-list
    // **NEVER EXPOSE!!! Causes XSS attacks** script-src 'unsafe-inline'
    // **THAT BEING SAID...For Safari 😢
    // 'unsafe-inline' // THIS MAY NOT BE TRUE IN 2018
    // default-src fallback
    = Array.from (defaults)

, workers // worker-src
    // script-src fallback
    = Array.from (scripts)

, directives = [
  // Reporting directives
  , `report-to ${ reports.join ` ` }`  // greenfield

  // Fetch directives
  , `default-src ${ defaults.join ` ` }`
  , `frame-src ${ frames.join ` ` }`
  , `connect-src ${ connects.join ` ` }`
  , `img-src ${ images.join ` ` }`
  , `font-src ${ fonts.join ` ` }`
  , `object-src ${ objects.join ` ` }`
  , `media-src ${ medias.join ` ` }`
  , `style-src ${ styles.join ` ` }`
  , `script-src ${ scripts.join ` ` }`
  , `worker-src ${ workers.join ` ` }`


  // Document directives
//  , `form-action ${ forms.join ` ` }`
//  , `frame-ancestors ${ ancestors.join ` ` }`
//  , `sandbox ${ sandboxes.join ` ` }`

//  // Other directives
//  // https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity
//  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/require-sri-for
//  , `require-sri-for ${ integrities.join ` ` }`
//  , `block-all-mixed-content ${ reports.join ` ` }`
//  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/upgrade-insecure-requests
//  , `update-insecure-requests`

//  // DEPRECATED!! See https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
//  , `referrer`
  ]


module.exports = options =>

  async (context, next, header) => {

    await next ()


    header

      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
      = 'Content-Security-Policy'

      // Is this a security breach?
      // Will someone be able to disable CSP with this?
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy-Report-Only
      + ( 'report' in context.request.query ? '-Report-Only' : '' )


    context
      .set ( header, directives.join `; ` )
  }
