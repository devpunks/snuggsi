const
  // decodeURI
  // since these are user defined best to decode everything
  // https://coderwall.com/p/y347ug/encodeuri-vs-encodeuricomponent
  decode = decodeURIComponent

, capture = uri => new RegExp
    (uri.replace (/{\w+}/g, '([A-Za-z%0-9\-\_]+)'))

, route = (context) => {
    'params' in context || (context.params = {})

    []
      .splice.call (context.path.match (prepare), 1)
      .map  ((value, index) =>
          context.params [tokens [index]] = decode (value))

    return context
  }


module.exports = (uri, resource, tokens, match = capture (uri)) =>

  async (context, next, { method } = context) =>

    match.test (context.path)
      && (method = method.toLowerCase ())
      && (tokens = uri.match (/[^{]+(?=})/g))
      && (handle = (resource [method] || resource)
        ? await handle (context)
        : await next (context)
