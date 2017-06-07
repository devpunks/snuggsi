const
  root   = process.cwd ()
, dist   = `${root}/dist`
, lib    = 'snuggsi.min.es'
, path   = `${dist}/${lib}`
, send   = require ('koa-send')
, assets = require ('koa-static') (`${root}/public`)

, headers = {

  }

, configuration = { root,
  index: 'index.html'
  //gzip:   true, // default
  //brotli: true, // default
  }

const compress = async context => {
  if ('/' !== context.path) return

  await send (context, context.path)
  console.log (dist, context.type, path)
}

module.exports = { compress, assets }

