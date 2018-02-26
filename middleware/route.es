module.exports = (uri, middleware) => {

  console.warn ('⚠ Add Routing', uri, middleware)

  return async function (context, next) {
    console.warn ('path', context.path, context.path === uri)
    console.warn ('Holy shit', context, next)

    uri !== context.path
      ? await next (context)
      : await middleware (context)
  }
}
