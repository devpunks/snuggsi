const
  decode = decodeURIComponent
  // https://coderwall.com/p/y347ug/encodeuri-vs-encodeuricomponent

, unspecified = context => context.status = 501

, identify = uri =>
    uri.split `/`.pop ``
    // https://cdivilly.wordpress.com/2014/03/11/why-trailing-slashes-on-uris-are-important/

, characters = '[()A-Za-z%0-9\\*\\-\\_\\.]'
, tokenizer  = [ /{\w+}/g, `(${characters}+)` ]

, normalize  =
    (uri, trailing = '/' === uri.slice (-1)) =>
      (uri = [uri, trailing ? `${characters}*` : ''].join `` )
        && RegExp (`^${ uri.replace ( ... tokenizer ) }$`)

, parameterize = (uri, matched, context, tokens) =>
    ( tokens = uri.match (/[^{]+(?=})/g) || [])
    && [ ... matched ]
      .splice (1)
//    .filter (Boolean)
      .reduce ((params, value, index) =>
        params [tokens [index]] = decode (value), {})


module.exports = (uri, endpoint = unspecified) =>

  async (context, next, matched, { method } = context) =>
    (matched = normalize (uri).exec (context.path))
      && (context.params = parameterize (uri, matched, context))
      && (endpoint = endpoint [method.toLowerCase ()] || endpoint)
        ? await endpoint (context, identify (context.path))
        : await next (context)
