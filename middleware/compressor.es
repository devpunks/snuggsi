// deflate (zlib) compression - https://github.com/expressjs/compression
// MS Registry key for mime types - HKLM\Software\Microsoft\Windows\CurrentVersion\Internet Settings\Accepted Documents
const
  gzip   = true
, brotli = true

, root   = '/'
, dist   = 'dist'
, bundle = '/snuggsi.min.es'
, send   = require ('koa-send')

, configuration = { root: dist, gzip, brotli }

module.exports = async (context, next) => {
  const
    javascript =
      /application\/javascript/
        .test (context.request.header.accept)

//, ecmascript = //
  const
    mime   = /^\*\/\*$/
  , filter = /^\/(snuggsi.*\.es)*$/g

  , compress =
      mime.test (context.request.header.accept)
      && filter.test (context.path)

    // Use ECMASCript path resource  (i.e. `/snuggsi.es`)
    // Otherwise default bundle (i.e. `/` => `/snuggsi.min.es`)
  , resource =
      (context.path === root)
        ? bundle : context.path

  , settings = [context, resource, configuration]

  console.log ('\n\nUA:', context.request.header ['user-agent'])
  console.log ('ACCEPT', mime.test (context.request.header.accept), context.request.header.accept)
  console.log ('PATH', filter.test (context.path), context.path)

  return (compress && await send ( ... settings ))
    || await next ()

}
