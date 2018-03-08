const
  // decodeURI
  // since these are user defined best to decode everything
  // https://coderwall.com/p/y347ug/encodeuri-vs-encodeuricomponent
  [ decode, encode ]
    = [ decodeURIComponent, encodeURIComponent ]

, parameterized = (context, params = {}) =>
    ('params' in context || (context.params = {}))
      && []
        .splice
        .call (context.path.match (prepare), 1) // remove 1st
        .map  ((value, index) => context.params [tokens [index]] = decode (value))
      && context


module.exports = ( uri, resource ) => {

  const
    tokens = uri.match (/[^{]+(?=})/g)

  , match = new RegExp
      (uri.replace (/{\w+}/g, '([A-Za-z%0-9\-\_]+)'))

  , route = async (context, { method } = context ) => {

      typeof resource == 'object'
        && await resource [method.toLowerCase ()] (context)

      typeof resource === 'function'
        && await resource (context)
    }


  return async (context, next) =>
    match.test (context.path)
      ? await  route ( /* parameterized */ (context))
      : await  next (context)
}
