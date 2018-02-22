// Content Negotiation
//
//   References:
//     WHATWG URL Spec - https://url.spec.whatwg.org
//     Wikipedia - https://en.wikipedia.org/wiki/Content_negotiation
//     MDN - https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation
//     https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation/List_of_default_Accept_values
//     https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
//     https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types
const
  send = require ('koa-send')


module.exports = async (context, next) =>
{
  const
    accepts // HTTP 1.1 `Accept` Header
      // - https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.1
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding
      // List of default accept values
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation/List_of_default_Accept_values
      = context.accepts.bind (context)

  , resource
      = context.path

  , txt  = accepts `txt`
//, css  = accepts ('css')
//, html = accepts ('html')
//, json = accepts ('json')
//, es   = accepts ('ecma')
//, js   = accepts ('js')

  , extensions = [txt]

  await next ()

  console.log (extensions, resource)

//console.log ('Type', type)
//console.log ('\n\n', context.path, context.request.headers, context.get ('Accept'), ' type', context.accepts (['text', 'html', 'css', 'ecma', 'js', 'json']))
//console.log ('text', text, 'html', html, 'css', css, 'es', es, 'js', js, 'json', json)
}
