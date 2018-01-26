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
    debug
      = 'debug' in context.request.query

  , accept // HTTP 1.1 `Accept` Header
      // - https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.1
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding
      = context.get ('Accept')

  , encoding // HTTP1.1 `Accept-Encoding` Header
      = context.get ('Accept-Encoding')

  , encode // HTTP1.1 `Accept-Encoding` Header
      // http://tools.ietf.org/html/7231#section-5.3.4
      = !!! debug
        && !!! ['', 'identity'].includes (encoding)

  , path // WHATWG URL path Spec
      //   URL path - https://url.spec.whatwg.org/#concept-url-path
      //   pathname - https://url.spec.whatwg.org/#dom-url-pathname
      = /^\/snuggsi$/.test (context.path)

  , ecmascript
      = 'br' === encoding

  , extension
      = ecmascript
        ? 'es'   // Ecmascript extension
        : 'js'   // Javascript extension

  , compress = encode

  , minified = encode ? suffix : ''

  , bundle =
      [ name, minified, extension ]
        .filter (Boolean)
        .join `.`

  , resource = bundle
//    (path === root)
//      ? bundle // default resource
//      : path   // requested resource

  , options = {
      gzip   : !!! debug
    , brotli : !!! debug
    , root   : './dist'
    }

  , settings =
      [context, resource, options]

  console.warn (context.request.query)
  console.warn (accept, resource, options, encode, path, debug)
  console.warn ('path and compress', `Path: ${path} Compress: ${compress} Encoding: ${encode}`)
  console.warn ('headers', context.request.headers)

  path
    ? await send ( ... settings )
      && context.set ('Content-Type', 'application/ecmascript; charset=utf-8')
    : await next ()
}
