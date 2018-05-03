// Content Negotiation
//
//   References:
//     WHATWG URL Spec - https://url.spec.whatwg.org
//     Wikipedia - https://en.wikipedia.org/wiki/Content_negotiation
//     MDN - https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation
//     HTTP Accept Header - https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.1

const
  suffix = 'min'
, root   = './dist'
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

    // HTTP1.1 `Accept-Encoding` Header
    // http://tools.ietf.org/html/7231#section-5.3.4
    // https://github.com/koajs/koa/blob/master/docs/api/request.md#content-negotiation
  , brotli
      = context.acceptsEncodings ('identity', 'br')
        === 'br'

  , gzip
      = context.acceptsEncodings ('identity', 'gzip')
        === 'gzip'

  , snuggsi
      = /^\/snuggsi(\.es|\.js)*$/
        .test (context.path)
      || ('/'  === context.path)
      && !!! context.get ('accept').includes ('html')

  , extension
      = (context.path.match (/\.(es|js)$/) || []) [1]
        || (brotli ? 'es' : 'js')

  , minified =
      ('/snuggsi' === context.path)
        && ( !!! debug )
        && ( gzip || brotli)
        ? suffix : ''

  , resource =
      [ name, minified, extension ]
        .filter (Boolean)
        .join `.`

  , options
      = { root , gzip: gzip && !!! debug, brotli: brotli && !!! debug }

  , settings
      = [context, resource, options]


  !! (debug || !!! brotli || !!! gzip)
  && context.set ('Content-Encoding', 'identity')


  snuggsi
    ? await send ( ... settings )
      && extension === 'es'
      && context.set
        ('Content-Type', 'application/ecmascript; charset=utf-8')

    : await next ()
}
