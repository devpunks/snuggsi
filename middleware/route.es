const
  METHODS = Array
    // HTTP Method Definitions
    // https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html
    // MDN Request Methods
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
    .from ( require ('http').METHODS )

  // decodeURI
  // since these are user defined best to decode everything
  // https://coderwall.com/p/y347ug/encodeuri-vs-encodeuricomponent
, [ decode, encode ]
    = [ decodeURIComponent, encodeURIComponent ]

, allowed = method => METHODS.filter
    (method => method.toLowerCase () in resource)

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

  , allow = METHODS.filter
      (method => method.toLowerCase () in resource)

  , match = new RegExp
      (uri.replace (/{\w+}/g, '([A-Za-z%0-9\-\_]+)'))

  , route = async (context, { method } = context ) => {

      typeof resource == 'object' && allow.includes (method)
        && context.throw (405,  { headers: { allow } } )
        && await resource [method.toLowerCase ()] (context)


      typeof resource === 'function'
        && await resource (context)
    }


  return async (context, next) =>
    match.test (context.path)
      ? await  route ((context))
      : await  next (context)
//    : await  route (parameterized (context))
}
