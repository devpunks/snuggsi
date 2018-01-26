// Content Negotiation
//
//   References:
//     Wikipedia - https://en.wikipedia.org/wiki/Content_negotiation
//     WHATWG URL Spec - https://url.spec.whatwg.org
//     MDN - https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation
//     HTTP Accept Header - https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.1

module.exports = async (context, next) =>
{
    //    what is this vary?
//    context.vary ('Accept-Encoding')

  console.warn ('Vary', context.vary ('Accept-Encoding'))
  console.warn ('Vary', context.vary ('Accept'))

  return await next ()
}
