// snuggsi Content negotiation middleware
//
//   Please see https://github.com/devpunks/snuggsi/tree/master/dist#readme
//   for further details.
//
//
// Content Negotiation
//
//   References:
//
//   Wikipedia - https://en.wikipedia.org/wiki/Content_negotiation
//   WHATWG URL Spec - https://url.spec.whatwg.org
//   MDN - https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation
//   HTTP Accept Header - https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.1

const
  suffix = ''
, root   = '/'
, name   = 'snuggsi'
, send   = require ('koa-send')

, configuration = {
    gzip   : true
  , brotli : true
  , root   : './dist'
  }

module.exports = async (context, next) =>
{
  const
    accept = // HTTP 1.1 `Accept` Header
             // - https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.1
      context.request.header.accept

  , path =
      // WHATWG URL path Spec
      //   URL path - https://url.spec.whatwg.org/#concept-url-path
      //   pathname - https://url.spec.whatwg.org/#dom-url-pathname
      context.path

  , library =
      // `/` root
      // or `/snuggsi` in URL path
      /^(\/|\/snuggsi.+)$/
        .test (path)

  , ecmascript = // (evergreen) Accept: #( media-range )`
      /^\*\/\*$/ // Chrome, Edge, Firefox, Safari, iOS Safari, Android
        // type    - *
        // subtype - *
        // example - `*/*`
        .test (accept)

  , javascript =
      // (classic) Accept: #( media-range )`
      /application\/javascript/ // MSIE 6.0-11.0
        // type    - application
        // subtype - javascript
        // example - `application/javascript`
        .test (accept)

    || // , Or with accept-params

      // (classic) Accept: #( media-range [ accept-params ] )`
      /\*\/\*;q=\d\.\d$/ // MSIE 6.0-11.0
        // type    - *
        // subtype - *
        // qfactor - q=0.8
        // example - `*/*;q=0.8`
        .test (accept)

  , compress =
      library && (ecmascript || javascript)

  , extension =
      ecmascript // default
        ? 'es'   // Ecmascript extension
        : 'js'   // Javascript extension

  , bundle =
      [ name, suffix, extension ]
        .filter (Boolean)
        .join ``

  , resource =
      (path === root)
        ? bundle // default resource
        : path   // requested resource

  , settings =
      [context, resource, configuration]

  console.log ('\n\npath', path)
  console.log ('compress', compress)
  console.log ('bundle', bundle)
  console.log ('resource', resource)

  return (compress && await send ( ... settings ))
    || await next ()
}
