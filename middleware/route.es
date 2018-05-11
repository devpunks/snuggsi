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

, decoded = tokens =>
    (params, value, index) =>
      params [tokens [index]] = decode (value)

, parameterize = (uri, [ _ , ... params ], context) =>
    context.params = params.reduce
      (decoded (uri.match (/[^{]+(?=})/g) || []), {})


module.exports = (uri, endpoint = unspecified) =>

  async (context, next, { method } = context, matched) =>

    (matched = normalize (uri).exec (context.path))
      && parameterize (uri, matched, context)
      && (endpoint = endpoint [method.toLowerCase ()] || endpoint)
        ? await endpoint (context, identify (context.path))
        : await next (context)
