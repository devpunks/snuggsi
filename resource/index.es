const
  filesystem
    = require ('fs')

, stat
    = require ('util')
      .promisify (filesystem.stat)

, METHODS
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

    ( super.get || ( _ => _ ) )
    ( context, identity )

    context.body
      || await send (context, `${path}${identity}`)
  }

//options (context)
//  // should be done by CORS
//  { context.status = 200 }

//purge (context)
//  // http://restcookbook.com/Basics/caching/
//  { context.status = 202 }
}

function mount (point) { }

// Inded overflow https://github.com/koajs/send/pull/99/files
async function send (context, path) {

  // piped streamed responses
  // https://github.com/koajs/koa/issues/944
  // https://github.com/claudetech/koa-stream
  // https://github.com/pillarjs/send/blob/master/test/send.js#L22-L24
  // HTTP Range Requests - https://tools.ietf.org/html/rfc7233
    const
      file = `${process.cwd ()}${path}`
    , { size, mtime } = await stat (file)


    context.body =
      filesystem.createReadStream (file)

    context.set
      ('last-modified', mtime.toUTCString())

    context.set
      ('content-length', size)

    context.type = file
      .split `.`
      .pop ``

    // test path security
    // `..` or even worse `/`
    // What about paths with special characters?
}
