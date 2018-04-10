const
  METHODS
    = [ ... require ('http').METHODS ]
      // for some reason connect won't work
      .filter (method => method !== 'TRACE')
      .filter (method => method !== 'CONNECT')
      .filter (method => method !== 'OPTIONS') // cors?

, DEFAULT_METHODS
    = [ 'GET', 'HEAD' ]

, SAFE_METHODS
    = [ ... DEFAULT_METHODS ]

, UNSAFE_METHODS
    = METHODS.filter
      (method => !!! SAFE_METHODS.includes (method))

, filter = resource =>
    METHODS.filter
      (method => resource [method.toLowerCase ()])

, Base = path =>
    Boolean (... (path = [].concat (path)))
      ? require (`${process.cwd ()}${path}index.es`)
      : class { }


module.exports = path =>

new class extends Base (path) {

  constructor () { super ()

    const allow = filter (this)

    for (let method of UNSAFE_METHODS)
      allow.includes (method) ||

      Object.defineProperty (this, method.toLowerCase (), {
        enumerable: true,
        value: function (context) {
          context.throw (405,  { headers: { allow } } )
        }.bind (this)
      })
  }

  head (context)
    { context.status = 200 }

  async get (context, identity) {
    await send (context, `${path}${identity}`)
  }

//options (context)
//  // should be done by CORS
//  { context.status = 200 }

//purge (context)
//  // http://restcookbook.com/Basics/caching/
//  { context.status = 202 }
}

function mount (point) { }

async function send (context, path, send = require ('koa-send')) {

    const
      extensions = []
    , index = undefined
    , file = `${process.cwd ()}${path}`
    , options = { index, extensions }

    const filesystem = require ('fs')

    var a = filesystem.stat (file, console.log)

    console.warn (send, a, file, options)

    send (context, file, {})

    // test path security
    // `..` or even worse `/`
    // What about paths with special characters?
}
