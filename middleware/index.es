const
  send   = require ('koa-send')
, static = require ('koa-static') ('public')

, headers = {

  }

, configuration = {
    root: `${__dirname}/dist`,

  //gzip:   true, // default
  //brotli: true, // default
  }

async function compress (context) {
  if ('/' === context.path) {
    console.log (context.path)
    await send (context, '/dist/snuggsi.min.es', configuration)
  }
}

module.exports = {
  compress, static
}
