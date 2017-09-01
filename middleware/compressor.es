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
//   WIkipedia - https://en.wikipedia.org/wiki/Content_negotiation
//   WHATWG URL Spec - https://url.spec.whatwg.org/#dom-url-pathname
//   MDN - https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation
//   HTTP Accept Header - https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.1

const
  send = require ('koa-send')

, root   = '/'
, name   = 'snuggsi.'
, suffix = ''

, configuration = {
    gzip   : true
  , brotli : true
  , root   : './dist'
  }

module.exports =
  async (context, next) =>
{
  const
    accept =
      // HTTP 1.1 `Accept` Header
      //      - https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.1
      context.request.header.accept

  , path =
      // WHATWG URL path Spec
      //   URL path - https://url.spec.whatwg.org/#concept-url-path
      //   pathname - https://url.spec.whatwg.org/#dom-url-pathname
      context.path

  , library =
      // ECMAScript (evergreen) `Accept` Mime Type
      /^(\/|\/snuggsi.+)$/
        .test (context.path)

  , ecmascript =
      // ECMAScript (evergreen) `Accept` Mime Type
      /^\*\/\*$/
        // Chrome, Edge, Firefox, Safari, iOS Safari, Android
        // default: `*/*`
        .test (accept)

  , javascript =
      // Javascript (classic) `Accept` Mime Type
      /application\/javascript/
        // MSIE 6.0-11.0
        // default: `application/javascript, */*;q=0.8`
        .test (accept)
    ||
      // Javascript (classic) `Accept` fallback Mime Type
      //   - wildcard fallback Mime Type & quality factor qualifier
      /\*\/\*;q=\d\.\d/
        // MSIE 6.0-11.0
        // default: `*/*;q=0.8`
        .test (accept)

  , compress =
      library && (ecmascript || javascript)

  , extension = javascript ? 'js' : 'es'

  , bundle =
      [ name, suffix, extension ]
        .join ``

  , resource =
      (context.path === root)
        ? bundle       // default bundle
        : context.path // requested path

  , settings =
      [context, resource, configuration]

  console.log ('\n\npath', context.path)
  console.log ('compress', compress)
  console.log ('bundle', bundle)
  console.log ('resource', resource)

  return (compress && await send ( ... settings ))
    || await next ()
}
