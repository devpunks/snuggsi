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
    = [decodeURIComponent, encodeURIComponent]


module.exports = ( uri, resource ) => {

  const
    tokens = uri.match (/[^{]+(?=})/g)

  , expression = new RegExp
      (uri.replace (/{\w+}/g, '([A-Za-z%0-9\-\_]+)'))

  , match = expression.test.bind (expression)

  , parameterized = (context, params = {}) =>
      ('params' in context || (context.params = {}))
        && []
          .splice
          .call (context.path.match (expression), 1) // remove 1st
          .map  ((value, index) => context.params [tokens [index]] = decode (value))

        && context

  , allow = METHODS.filter
      (method => method.toLowerCase () in resource)

  , route = async (context, { method } = context ) => {

      (typeof resource == 'object')
        // Method Not Allowed
        && !!! allow.includes (method)
        && context.throw (405,  { headers: { allow } } )
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
        // https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.6


      (typeof resource == 'function')
        && await resource (context)

      ; // eww

      (typeof resource == 'object')
        && allow.includes (method)
        // Call endpoint with paramaterized context
        && await resource [method.toLowerCase ()] (context)
    }


  return async ( context, next ) => {
    !!! match  (context.path)
      ? await  next (context)
      : await  route ( parameterized (context) )
  }
}
