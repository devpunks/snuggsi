// deflate (zlib) compression - https://github.com/expressjs/compression
const
  gzip   = true
, brotli = true

, root   = '/'
, dist   = 'dist'
, bundle = '/snuggsi.min.es'
, send   = require ('koa-send')

, configuration = { root: dist, gzip, brotli }

module.exports =async context => {
  const
    mime   = /^\*\/\*$/
  , filter = /^\/(snuggsi.*\.es)*$/g

  , compress =
      mime.test (context.request.header.accept)
      && context.path.match (filter)

    // Use ECMASCript path resource  (i.e. `/snuggsi.es`)
    // Otherwise default bundle (i.e. `/` => `/snuggsi.min.es`)
  , resource =
      (context.path === root)
        ? bundle : context.path

  return compress && await
    send (context, resource, configuration)
}

