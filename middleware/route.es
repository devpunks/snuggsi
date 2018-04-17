const
  decode = decodeURIComponent
  // https://coderwall.com/p/y347ug/encodeuri-vs-encodeuricomponent

, identify = uri =>
    uri.split `/`.pop ``
      || undefined

, characters
    = '([()A-Za-z%0-9\\*\\-\\_\\.]+)'

, tokens
    = [ /{\w+}/g, characters ]

, normalize = uri =>
    new RegExp (`^${ uri.replace ( ... tokens ) }$`)

, parameterize = (match, context, tokens) => {
    'params' in context
      || (context.params = {})

    void []
      .splice.call (context.path.match (match), 1)
      .filter (value => value !== undefined)
      .map ((value, index) =>
        context.params [tokens [index]] = decode (value))

    return context
  }


module.exports = (uri, resource) => {

  const
    trailing =
      '/' === uri.slice (-1)
    // https://cdivilly.wordpress.com/2014/03/11/why-trailing-slashes-on-uris-are-important/

  , characters = '[()A-Za-z%0-9\\*\\-\\_\\.]*'
  , match  = normalize (`${uri}${ trailing ? `${characters}` : '' }`)
  , tokens = uri.match (/[^{]+(?=})/g) || []


  return async (context, next, handle, { method } = context) => {

    handle = resource [method.toLowerCase ()] || resource

    match.test (context.path)
      ? await handle (parameterize (match, context, tokens), trailing && identify (context.path))
      : await next (context)
  }
}
