module.exports = context => {

  console.warn ('accepts', context.accepts `txt`, context.headers)

  return 'index.' + context.accepts
    // HTTP 1.1 `Accept` Header
    ([ 'txt', 'html', 'css', 'json', 'js' ])
    // - https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.1
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding
    // List of default accept values
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation/List_of_default_Accept_values
}
