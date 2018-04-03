// https://cdivilly.wordpress.com/2014/03/11/why-trailing-slashes-on-uris-are-important/
const
  // since these are user defined best to decode everything
  // https://coderwall.com/p/y347ug/encodeuri-vs-encodeuricomponent
  [encode, decode]
    = [ encodeURIComponent, decodeURIComponent ]

, characters
    = '([()A-Za-z%0-9\*\-\_]+)'

, tokens
    = [ /{\w+}/g, characters ]

, capture = uri =>
    new RegExp (`^${ uri.replace ( ... tokens ) }$`)

, parameterize = (match, context, tokens) => {
    'params' in context
      || (context.params = {})

    void []
      .splice.call (context.path.match (match), 1)
      .map ((value, index) =>
        context.params [tokens [index]] = decode (value))

    return context
  }


module.exports = (uri, resource, tokens, match) => {

  tokens = uri.match (/[^{]+(?=})/g)

  return async (context, next, handle, { method } = context) => {

    handle = resource [method.toLowerCase ()] || resource

    const
      identify = handle.length > 1
    , trailing = uri.slice (-1) === '/'

    match  = capture (uri)

    console.warn ('context: %s \n path: %s \n\n', context, context.path)
    console.warn (trailing, identify)

    match.test (context.path)
      ? await handle (parameterize (match, context, tokens))
      : await next (context)

    // console.warn (decode (encode (context.path)), tokens, match, match.test (context.path), resource, context.params)
  }
}
