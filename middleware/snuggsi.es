// Content Negotiation
//
//   References:
//     WHATWG URL Spec - https://url.spec.whatwg.org
//     Wikipedia - https://en.wikipedia.org/wiki/Content_negotiation
//     MDN - https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation
//     HTTP Accept Header - https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.1

const
  root   = '/'
, suffix = 'min'
, name   = 'snuggsi'
, send   = require ('koa-send')


module.exports = async (context, next) =>
{
  const
    accept = // HTTP 1.1 `Accept` Header
             // - https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.1
      context.get ('Accept')

  , encoding = // HTTP1.1 `Accept-Encoding` Header
               // http://tools.ietf.org/html/7231#section-5.3.4
      context.get ('Accept-Encoding')

  , path =
      // WHATWG URL path Spec
      //   URL path - https://url.spec.whatwg.org/#concept-url-path
      //   pathname - https://url.spec.whatwg.org/#dom-url-pathname
      /^\/snuggsi$/.test (context.path)

  , extension = 'js'
//    ecmascript // default
//      ? 'es'   // Ecmascript extension
//      : 'js'   // Javascript extension

  , compress = encoding

  , bundle =
      [ name, encoding ? suffix : '', extension ]
        .filter (Boolean)
        .join `.`

  , resource = bundle
//    (path === root)
//      ? bundle // default resource
//      : path   // requested resource

  , options = {
      gzip   : false
    , brotli : false
    , root   : './dist'
    }

  , settings =
      [context, resource, options]

  console.warn (accept, settings, encoding, path)
  console.warn ('path and compress', `Path: ${path} Compress: ${compress} Encoding: ${encoding}`)
  console.warn ('headers', context.request.headers)

  return await next ()
}
