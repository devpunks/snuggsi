const
  // decodeURI
  // since these are user defined best to decode everything
  // https://coderwall.com/p/y347ug/encodeuri-vs-encodeuricomponent
  [ decode, encode ]
    = [decodeURIComponent, encodeURIComponent]


, METHODS = Array
    // HTTP Method Definitions
    // https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html
    // MDN Request Methods
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
    .from ( require ('http').METHODS )


module.exports = ( uri, resource ) => {

  const
    tokens =
      uri.match (/[^{]+(?=})/g)

  , allow = METHODS.filter
      (method => method.toLowerCase () in resource)
      .join `, `

  , expression =
      new RegExp
        (uri.replace (/{\w+}/g, '([A-Za-z%0-9\-\_]+)'))

  , test =
      expression.test
        .bind (expression)

  , allowed = (context, method = context.method.toLowerCase () ) => {
      // https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.6
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      console.log ('Allow', allow.includes (method))

      void

      (!!! context.set ({ allow }))
          && await (resource [context.method.toLowerCase ()] || resource)
            (parameterized (context), next)
    }

  , parameterized = (context, params = {}) =>
      ('params' in context || (context.params = {}))
        && []
          .splice
          .call (context.path.match (expression), 1) // remove 1st
          .map  ((value, index) => context.params [tokens [index]] = decode (value))

        && context


  return async ( context, next, middleware ) => {

    !!! test (context.path)
      ? await next (context)
      : await allowed (context)
  }
}
