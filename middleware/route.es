const
  // decodeURI
  // since these are user defined best to decode everything
  // https://coderwall.com/p/y347ug/encodeuri-vs-encodeuricomponent
  decode = decodeURIComponent

, capture = uri => new RegExp
    (uri.replace (/{\w+}/g, '([A-Za-z%0-9\-\_]+)'))

, parameterize = (match, context, tokens) => {
    'params' in context || (context.params = {})

    void []
      .splice.call (context.path.match (match), 1)
      .map  ((value, index) =>
          context.params [tokens [index]] = decode (value))

    return context
  }


module.exports = (uri, resource, tokens, match = capture (uri)) => {

  tokens = uri.match (/[^{]+(?=})/g)

  return async (context, next, handle, { method } = context) =>
    match.test (context.path)
      && (handle = resource [method.toLowerCase ()] || resource)
        ? await handle (parameterize (match, context, tokens))
        : await next (context)
}
