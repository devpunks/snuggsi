const
  decode = decodeURIComponent
  // https://coderwall.com/p/y347ug/encodeuri-vs-encodeuricomponent

, identify = uri =>
    uri.split `/`.pop ``

, characters = '[()A-Za-z%0-9\\*\\-\\_\\.]'
, tokens     = [ /{\w+}/g, `(${characters}+)` ]

, normalize =
    (uri, trailing = '/' === uri.slice (-1)) =>
      (uri = [uri, trailing ? `${characters}*` : ''].join `` )
        && new RegExp (`^${ uri.replace ( ... tokens ) }$`)

, parameterize = (match, context, tokens) =>
    (context.params = {})

    && [ ... context.path.match (match) ]
      .splice (1)
      .filter (Boolean)
      .map ((value, index) =>
        context.params [tokens [index]] = decode (value))

    && context


module.exports = (uri, endpoint = context => context.status = 501) => {
    // https://cdivilly.wordpress.com/2014/03/11/why-trailing-slashes-on-uris-are-important/

  const
    match  = normalize (uri)
  , tokens = uri.match (/[^{]+(?=})/g) || []

  return async (context, next, { method } = context) =>
    match.test (context.path)
      && (context  = parameterize (match, context, tokens))
      && (endpoint = endpoint [method.toLowerCase ()] || endpoint)
        ? await (endpoint) (context, identify (context.path))
        : await next (context)
}
