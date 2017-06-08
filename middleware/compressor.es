const
  dist   = 'dist'
, lib    = 'snuggsi.min.es'
, path   = `${dist}/${lib}`
, send   = require ('koa-send')

, configuration = { dist,
  //gzip:   true, // default
  //brotli: true, // default
  }


const compressor = async context => {
  const
    mime = /application\/javascript/

  , script = mime.test
      (context.request.header.accept)
        && context.path === '/'

  if (script) return await
    send (context, path, configuration)
}

module.exports = compressor

