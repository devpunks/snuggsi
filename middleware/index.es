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
  //gzip:   true, // default
  //brotli: true, // default
  }

async function compress (context) {
  if ('/' !== context.path) return

  console.log (dist, context.path, path)
  await send (context, path, configuration)
}

module.exports = {
  compress, assets
}
