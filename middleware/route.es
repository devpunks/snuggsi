// https://coderwall.com/p/y347ug/encodeuri-vs-encodeuricomponent
// https://cdivilly.wordpress.com/2014/03/11/why-trailing-slashes-on-uris-are-important/

const
  unspecified = context =>
    context.status = 501

, identify = uri =>
    uri.split `/`.pop ``

, trailing = uri =>
    uri +=
      ( `/` === uri.slice (-1) )
      ? `${characters}*`
      : ``

, decode     = decodeURIComponent
, characters = '[()A-Za-z%0-9\\*\\-\\_\\.]'
, tokenizer  = [ /{\w+}/g, `(${characters}+)` ]

, normalize  = uri =>
    RegExp (`^${ trailing (uri).replace ( ... tokenizer ) }$`)

, tokenized = (uri, tokens = uri.match (/[^{]+(?=})/g)) =>
    (params, value, index) =>
      (params [tokens [index]] = decode (value))
        && params

, parameterize = (uri, [ _ , ... params ], context) =>
    context.params = params.reduce (tokenized (uri), {})


module.exports = (uri, endpoint = unspecified) =>

  async (context, next, matched, { method } = context) =>

    (matched = normalize (uri).exec (context.path))
      && parameterize (uri, matched, context)
      && (endpoint = endpoint [method.toLowerCase ()] || endpoint)
        ? await endpoint (context, identify (context.path))
        : await next (context)
