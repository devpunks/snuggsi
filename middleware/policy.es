// Can actually charge for this feature // https://report-uri.com/#prices

const
//schemes   = ['safari-extension://', 'chrome-extension://', 'https://', 'http://']
  header    = 'Content-Security-Policy'
, SECURE    = true
// Depending on analytics framework,
// may want to listen for securitypolicyviolation events
// with JavaScript and collect more information about the client before reporting.
, report    = ['https://snuggsi.report-uri.com/r/d/csp/enforce'] // report-to // *DEPRECATED* report-uri

, defaults  = ["'self'"] // default-src
, img       = defaults   // img-src
, style     = defaults   // style-src
  // nonce-${nonce} ** MUST BE UNIQUE **
  //   https://w3c.github.io/webappsec-csp/#framework-directive-source-list
  // **NEVER EXPOSE!!! Causes XSS attacks** script-src 'unsafe-inline'
  // **THAT BEING SAID...For Safari 😢
  // 'unsafe-inline' // THIS MAY NOT BE TRUE IN 2018
, script    = defaults   // script-src Script Nonce for inline <script>

, font      = defaults   // font-src
, media     = defaults   // media-src
, connect   = defaults   // connect-src
, child     = defaults   // child-src
, frame     = child      // frame-src
, worker    = script     // worker-src // script-src fallback
, object    = ["'none'"] // object-src
, plugin    = ['audio/*', 'video/*'] // plugin-types when object != 'none'

, form      = defaults   // form-action
, ancestors = defaults   // frame-ancestors

, manifest  = defaults   // manifest-src
, base      = defaults   // base-uri
, sandbox   = defaults ||// sandbox
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
  // Reporting
    `report-to ${ report.join ` ` }`

  // Fetch
  , `default-src ${ defaults.join ` ` }`
  , `img-src ${ img.join ` ` }`
  , `style-src ${ style.join ` ` }`
  , `script-src ${ script.join ` ` }`

  , `font-src ${ font.join ` ` }`
  , `media-src ${ media.join ` ` }`
  , `connect-src ${ connect.join ` ` }`
  , `child-src ${ child.join ` ` }`
  , `frame-src ${ frame.join ` ` }`
  , `worker-src ${ worker.join ` ` }`
  , `object-src ${ object.join ` ` }`
  , !!! object.includes (`'none'`)
      ? `plugin-types ${ plugin.join ` ` }`
      : ''

//  Navigation
  , `form-action ${ form.join ` ` }`
  , `frame-ancestors ${ ancestors.join ` ` }`

// Document
  , `base-uri ${ base.join ` ` }`
  , `manifest-src ${ manifest.join ` ` }`
  //  `sandbox  ...` is not supported in the <meta> element
  //  or by the Content-Security-policy-Report-Only header field.
  //  https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/sandbox
  , `sandbox ${ sandbox.join ` ` }`

  // Other
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/upgrade-insecure-requests
  , SECURE
      ? `block-all-mixed-content`
      : `update-insecure-requests`
  // https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/require-sri-for
//, `require-sri-for ${ integrities.join ` ` }`
  // DEPRECATED!! See https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
//, `referrer`
  ]


module.exports = async (context, next, policy) => {

  policy = directives.filter (Boolean).join `; `

  context.set ( header, policy)

  'report'
    in context.request.query
    && context.set ( `${header}-Report-Only`, policy)

  await next (context)
}
