const
  root   = 'dist'
, bundle = 'snuggsi.min.es'
, send   = require ('koa-send')

, configuration = { root,
  //gzip:   true, // default
  //brotli: true, // default
  }

module.exports = async context => {
  console.log (context)

  const
    mime = /^\*\/\*$/

    // Default bundle if no resource specified (i.e. `/`)
    // Otherwise use ECMASCript path resource  (i.e. `/snuggsi.es`)
  , [ _, resource=bundle ] =
      context.path.match (/^\/(snuggsi.*\.es)*$/)

  , compress =
      mime.test (context.request.header.accept)

  return compress && await
    send (context, resource, configuration)
}

