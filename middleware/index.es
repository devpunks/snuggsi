const
  dist   = 'dist'
, dir    = 'public'
, lib    = 'snuggsi.min.es'
, path   = `${dist}/${lib}`
, send   = require ('koa-send')
, assets = require ('koa-static') (dir)

, headers = { }

, configuration = { dist,
  //gzip:   true, // default
  //brotli: true, // default
  }

const compress = async context => {
  const
    mime = /application\/javascript/

  , script = mime.test
      (context.request.header.accept)
        && context.path === '/'

  if (script) return await
    send (context, path, configuration)
}

module.exports = { compress, assets }

