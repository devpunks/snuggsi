const
  METHODS
    = [ ... require ('http').METHODS ]
      // for some reason connect won't work
      .filter (method => method !== 'TRACE')
      .filter (method => method !== 'CONNECT')
      .filter (method => method !== 'OPTIONS') // cors?

, DEFAULT_METHODS
    = ['GET', 'HEAD']

, SAFE_METHODS
    = [ ... DEFAULT_METHODS ]

, UNSAFE_METHODS
    = METHODS.filter
      (method => !!! SAFE_METHODS.includes (method))

, Base = path =>
    Boolean (... (path = [].concat (path)))
      ? require (`${path}/index.es`)
      : class { get foo () { return 'bar' } }


module.exports = path =>

new class extends Base (path) {

  constructor () { super ()

    for (let prop in this)
      console.warn ('prop', prop)

    for (let method of UNSAFE_METHODS)
      Object.defineProperty (this, method.toLowerCase (), {
        enumerable: true,
        value: function (context) {
          context.throw (405,  { headers: { allow: this.allowed } } )
        }.bind (this)
      })
  }

  get allowed () {
    return METHODS.filter
      (method => method.toLowerCase () in this)
  }

  head (context)
    { context.throw (404) }

  get (context)
    { context.throw (404) }

//
//options (context)
//  // should be done by CORS
//  { context.status = 200 }

//purge (context)
//  // http://restcookbook.com/Basics/caching/
//  { context.status = 202 }
}
