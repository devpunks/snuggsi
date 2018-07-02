// Can actually charge for this feature // https://report-uri.com/#prices

const
//schemes = ['safari-extension://', 'chrome-extension://', 'https://', 'http://']
  SECURE  = true
, header  = 'Content-Security-Policy'
// Depending on analytics framework,
// may want to listen for securitypolicyviolation events
// with JavaScript and collect more information about the client before reporting.
, reports   = ['https://snuggsi.report-uri.com/r/d/csp/enforce'] // report-to // *DEPRECATED* report-uri
, defaults  = ["'self'"] // default-src
, images    = defaults   // img-src
, styles    = defaults   // style-src
  // nonce-${nonce} ** MUST BE UNIQUE **
  //   https://w3c.github.io/webappsec-csp/#framework-directive-source-list
  // **NEVER EXPOSE!!! Causes XSS attacks** script-src 'unsafe-inline'
  // **THAT BEING SAID...For Safari 😢
  // 'unsafe-inline' // THIS MAY NOT BE TRUE IN 2018
, scripts   = defaults   // script-src Script Nonce for inline <script>
, fonts     = defaults   // font-src
, medias    = defaults   // media-src
, frames    = defaults   // frame-src // *DEPRECATED* child-src fallback
, connects  = defaults   // connect-src
, bases     = defaults   // base-uri
, forms     = defaults   // form-action
, ancestors = defaults   // frame-ancestors
, workers   = scripts    // worker-src // script-src fallback
, objects   = ["'none'"] // object-src
, plugins   = ['audio/*', 'video/*'] // plugin-types

, sandboxes = defaults ||// sandbox
  [/*
      allow-forms
    , allow-popups
    , allow-modals
    , allow-scripts
    , allow-same-origin
    , allow-presentation
    , allow-pointer-lock
    , allow-top-navigation
    , allow-orientation-lock
    , allow-popups-to-escape-sandbox
  */]

, directives = [
  // Reporting directives
    `report-to ${ reports.join ` ` }`

  // Fetch directives
  , `default-src ${ defaults.join ` ` }`
  , `frame-src ${ frames.join ` ` }`
  , `connect-src ${ connects.join ` ` }`
  , `img-src ${ images.join ` ` }`
  , `font-src ${ fonts.join ` ` }`
  , `object-src ${ objects.join ` ` }`
  , !!! objects.includes (`'none'`)
      ? `plugin-types ${ plugins.join ` ` }`
      : ''
  , `media-src ${ medias.join ` ` }`
  , `style-src ${ styles.join ` ` }`
  , `script-src ${ scripts.join ` ` }`
  , `worker-src ${ workers.join ` ` }`

// Document directives
  , `base-uri ${ bases.join ` ` }`
  //  `sandbox  ...` is not supported in the <meta> element
  //  or by the Content-Security-policy-Report-Only header field.
  //  https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/sandbox
  , `sandbox ${ sandboxes.join ` ` }`

//  Navigation Directives
  , `form-action ${ forms.join ` ` }`
  , `frame-ancestors ${ ancestors.join ` ` }`

//  // Other directives
//  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/upgrade-insecure-requests
  , (SECURE ? `block-all-mixed-content` : `update-insecure-requests`)

//  // https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity
//  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/require-sri-for
//  , `require-sri-for ${ integrities.join ` ` }`

//  // DEPRECATED!! See https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
//  , `referrer`
  ]


module.exports = options =>

  async (context, next, header) => {

      // Is this a security breach?
      // Will someone be able to disable CSP with this?
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy-Report-Only
      + ( 'report' in context.request.query ? '-Report-Only' : '' )

    context.set ( header, directives.filter (Boolean).join `; ` )

    await next ()
  }
