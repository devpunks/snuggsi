const
  root   = 'dist'
, bundle = '/snuggsi.min.es'
, send   = require ('koa-send')

, configuration = { root,
  //gzip:   true, // default
  //brotli: true, // default
  }

module.exports = async context => {

  const
    mime = /^\*\/\*$/
  , filter = /^\/(snuggsi.*\.es)*$/g

  , matches  = context.path.match (filter)
  , compress = mime.test (context.request.header.accept)

    // Use ECMASCript path resource  (i.e. `/snuggsi.es`)
    // Otherwise default bundle (i.e. `/` => `/snuggsi.min.es`)
  , resource =
      matches && matches [0] !== '/'
        ? matches [0]
        : bundle

  return compress && await
    send (context, resource, configuration)
}

