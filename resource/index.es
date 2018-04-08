const
  METHODS =
    // HTTP Method Definitions
    // https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html
    // MDN Request Methods
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
    [ ... require ('http').METHODS ]

// Mandatory Methods
// See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
//

, Base = path =>
    Boolean (... (path = [].concat (path)))
      ? require (`${path}/index.es`)
      : class {}


module.exports = path =>

new class extends Base (path) {

  constructor () { super ()
    console.warn ('Constructing extension', path)
    console.log (Object.getOwnPropertyNames (this))

    for (let prop in this)
      console.warn ('prop', prop)
  }

  allowed () {
    return METHODS.filter
      (method => method.toLowerCase () in resource)
  }

  acl (context) {
    console.warn ("This is ACL", context)

  }

//      && context.throw (405,  { headers: { allow } } )
//
//options (context)
//  // should be done by CORS
//  { context.status = 200 }

  head (context)
    { context.status = 200 }

  get (context)
    { context.status = 200 }

//purge (context)
//  // http://restcookbook.com/Basics/caching/
//  { context.status = 202 }
}
