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

console.warn ('Valid HTTP Methods: ', METHODS.join `, `)

module.exports = path =>

new class extends Base (path) {

  constructor () { super ()
    console.warn ('Constructing extension', path)

    console.warn ('keys', Object.keys (this))
    console.warn ('getOwnProperyNames', Object.getOwnPropertyNames (this))

    console.warn ('before')

    for (let prop in this)
      console.warn ('prop', prop)

    Object.defineProperty(this, 'snuggs', {
        value: 42,
        enumerable: true,
        writable: false
    })

    this.facts = 'foo'

    console.warn ('after')
    for (let prop in this)
      console.warn ('prop', prop)

    console.warn ('keys', Object.keys (this))
    console.warn ('getOwnProperyNames', Object.getOwnPropertyNames (this))

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
