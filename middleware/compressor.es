const
  dist = 'dist'
, lib  = 'snuggsi.min.es'
, path = `${dist}/${lib}`
, send = require ('koa-send')

, configuration = { dist,
  //gzip:   true, // default
  //brotli: true, // default
  }

module.exports = async context => {
  console.log (context)

  const
    mime = /^\*\/\*$/

  , script = mime.test
      (context.request.header.accept)
        && context.path === '/'

  if (script) return await
    send (context, path, configuration)
}

