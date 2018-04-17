const
  entry = `index.es`
, root  = process.cwd ``

, Base = path =>
    !!! path
      ? class { }
      : require (`${root}${path}${entry}`)

, DEFAULT_METHODS
    = [ 'GET', 'HEAD' ]

, SAFE_METHODS
    = [ ... DEFAULT_METHODS ]

, METHODS
    = [ ... require ('http').METHODS ]
      // for some reason connect won't work
      .filter (method => method !== 'TRACE')
      .filter (method => method !== 'CONNECT')
      .filter (method => method !== 'OPTIONS') // cors?

, UNSAFE_METHODS
    = METHODS.filter
      (method => !!! SAFE_METHODS.includes (method))

, scan = resource =>
    METHODS.filter
      (method => method.toLowerCase () in resource)

, disable = (resource, method) =>
    Object.defineProperty (resource, method, {
      enumerable: true,
      value (context) { context.throw (405,  { headers }) }
    })


module.exports = path =>

new class extends Base (path = path + '') {

  constructor (allow = scan (super ()), headers = { allow }) {

    for (let method of UNSAFE_METHODS)
      allow.includes (method)
        || disable (this, method)
  }

  head (context)
    { context.status = 200 }


  async get (context, identity) {

    ( super.get || ( _ => _ ) )
    ( context, identity )

    !! context.body
    // test path security
    // `..` or even worse `/`
    // What about paths with special characters?
    || await send
      (context, [ root, path, identity].join `` )
  }

//options (context)
//  // should be done by CORS
//  { context.status = 200 }


//purge (context)
//  // http://restcookbook.com/Basics/caching/
//  { context.status = 202 }
}


function mount (point) { }


// Index overflow https://github.com/koajs/send/pull/99/files
async function send (context, file) {

  const
    { stat, readFileSync: read }
      = require ('fs')

  , { size, mtime }
      = await require ('util')
        .promisify (stat) (file)

  , headers = {
      'content-length' : size
    , 'last-modified'  : mtime.toUTCString `` }

  context.set  ( headers )
  context.body = read (file)
  context.type = file.split `.`.pop ``
}
