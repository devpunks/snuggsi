const
  dist = 'dist'
, lib  = 'snuggsi.min.js'
, path = `${dist}/${lib}`
, send = require ('koa-send')

, configuration = { dist,
  //gzip:   true, // default
  //brotli: true, // default
  }


module.exports = async (context, next) => {
  const
    mime = /application\/javascript/

  , script = mime.test
      (context.request.header.accept)
        && context.path === '/'

  if (script) return await
    send (context, path, configuration)
}

