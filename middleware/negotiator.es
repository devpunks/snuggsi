// Content Negotiation
//
//   References:
//     WHATWG URL Spec - https://url.spec.whatwg.org
//     Wikipedia - https://en.wikipedia.org/wiki/Content_negotiation
//     MDN - https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation
//     HTTP Accept Header - https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.1

const
  send = require ('koa-send')


class Representation {

  get mime () { }
  get type () { }
  get encoding () { }
  get language () { }
}

module.exports = async (context, next, type) =>
{
  const
    accept // HTTP 1.1 `Accept` Header
      // - https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.1
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding
      // List of default accept values
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation/List_of_default_Accept_values
      = context.accept

  , resource
      = context.path

  , html
      = context.accepts ('html')

  , css
      = context.accepts ('css')

  , es
      = context.accepts ('ecmascript')

  , js
      = context.accepts ('javascript')

  , json
      = context.accepts ('json')


  type = context.type

//console.warn (accept.headers, accept.negotiator, type)
  console.log ('Type', type, context.accepts ('html'))
  await next ()
  console.log ('Type', type)
  console.log ('type', context.accepts (['html', 'css', 'ecmascript', 'javascript', 'json']))
  console.log ('html', html, 'css', css, 'es', es, 'js', js, 'json', json)
}
