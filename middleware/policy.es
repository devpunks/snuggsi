// Can actually charge for this feature // https://report-uri.com/#prices

const
//schemes = ['safari-extension://', 'chrome-extension://', 'https://', 'http://']
  SECURE  = true
, header  = 'Content-Security-Policy'
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
, form      = defaults   // form-action
, ancestors = defaults   // frame-ancestors
, frame     = defaults   // frame-src // *DEPRECATED* child-src fallback
, worker    = script     // worker-src // script-src fallback
, objects   = ["'none'"] // object-src
, plugins   = ['audio/*', 'video/*'] // plugin-types when object != 'none'

, base      = defaults   // base-uri
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
    `report-to ${ report.join ` ` }`

  // Fetch directives
  , `default-src ${ defaults.join ` ` }`
  , `img-src ${ img.join ` ` }`
  , `style-src ${ style.join ` ` }`
  , `script-src ${ script.join ` ` }`
  , `font-src ${ font.join ` ` }`
  , `media-src ${ media.join ` ` }`
  , `connect-src ${ connect.join ` ` }`
  , `frame-src ${ frame.join ` ` }`
  , `worker-src ${ worker.join ` ` }`
  , `object-src ${ objects.join ` ` }`
  , !!! objects.includes (`'none'`)
      ? `plugin-types ${ plugins.join ` ` }`
      : ''

//  Navigation Directives
  , `form-action ${ form.join ` ` }`
  , `frame-ancestors ${ ancestors.join ` ` }`

// Document directives
  , `base-uri ${ base.join ` ` }`
  , `sandbox ${ sandboxes.join ` ` }`
  //  `sandbox  ...` is not supported in the <meta> element
  //  or by the Content-Security-policy-Report-Only header field.
  //  https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/sandbox

//  // Other directives
//  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/upgrade-insecure-requests
  , (SECURE ? `block-all-mixed-content` : `update-insecure-requests`)

//  // https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity
//  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/require-sri-for
//  , `require-sri-for ${ integrities.join ` ` }`

//  // DEPRECATED!! See https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
//  , `referrer`
  ]


module.exports = async (context, next) => {

  // Is this a security breach? Will someone be able to disable CSP with this?
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy-Report-Only
  `report` in context.request.query && (header += '-Report-Only')

  context.set ( header, directives.filter (Boolean).join `; ` )

  await next (context)
}
