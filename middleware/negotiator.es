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
//console.warn (Object.keys (context), context.originalUrl)
  await next ()
}
