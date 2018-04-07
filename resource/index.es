const
  METHODS =
    // HTTP Method Definitions
    // https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html
    // MDN Request Methods
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
    [ ... require ('http').METHODS ]

, Base = path =>
    Boolean (... (path = [].concat (path)))
      ? require (`${path}/index.es`)
      : class {}


module.exports = path =>

new class extends Base (path) {

  constructor () { super ()
    console.warn ('Constructing extension', path)
  }

  allowed () {
    return METHODS.filter
      (method => method.toLowerCase () in resource)
  }

//      && context.throw (405,  { headers: { allow } } )
//
//options (context)
//  // should be done by CORS
//  { context.status = 200 }

// Mandatory Methods
// See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
//
  head (context)
    { context.status = 200 }

  get (context)
    { context.status = 200 }

//purge (context)
//  // http://restcookbook.com/Basics/caching/
//  { context.status = 202 }
}
