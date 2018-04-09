const
  METHODS
    = [ ... require ('http').METHODS ]

, DEFAULT_METHODS = ['GET', 'HEAD']
, SAFE_METHODS    = [ ... DEFAULT_METHODS, 'OPTIONS', 'TRACE' ]

, UNSAFE_METHODS = METHODS.filter
    (method => !!! SAFE_METHODS.includes (method))

, Base = path =>
    Boolean (... (path = [].concat (path)))
      ? require (`${path}/index.es`)
      : class {}

, allowed = method =>
    METHODS.filter
      (method => method.toLowerCase () in this)


module.exports = path =>

new class extends Base (path) {

  constructor () { super ()

    console.warn ('Constructing extension', path)

    let allow = ['GET', 'HEAD']

    for (let method of UNSAFE_METHODS)
      Object.defineProperty (this, method.toLowerCase (), {
        enumerable: true,
        value: function (context) {
          context.throw (405,  { headers: { allow } } )
        }.bind (this)
      })
  }

//
//options (context)
//  // should be done by CORS
//  { context.status = 200 }

//head (context)
//  { context.status = 200 }

//get (context)
//  { context.status = 200 }

//purge (context)
//  // http://restcookbook.com/Basics/caching/
//  { context.status = 202 }
}
