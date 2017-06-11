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
  , resource = /^\/(snuggsi.*\.es)*$/

  , bundle =
      mime.test (context.request.header.accept)
      && resource.test (context.path) || undefined

  return bundle && await
    send (context, path, configuration)
}

