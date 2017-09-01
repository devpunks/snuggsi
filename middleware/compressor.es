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
//   MDN - https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation
//   HTTP Accept Header - https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.1

const
  send   = require ('koa-send')

, root   = '/'
, name   = 'snuggsi.'
, suffix = ''

, configuration = {
    gzip   : true
  , brotli : true
  , root   : './dist'
}

module.exports = async (context, next) => {

  const
    // HTTP 1.1 `Accept` Header
    //      - https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.1
    accept  = context.request.header.accept

  , library = /^(\/|\/snuggsi.+)$/
      .test (context.path)

  , ecmascript = /^\*\/\*$/
      .test (accept)

  , javascript =
      /application\/javascript/ // MSIE 11.0 `application/javascript, */*;q=0.8`
        .test (accept)

      || /\*\/\*;q=\d\.\d/ // q=0.8
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
