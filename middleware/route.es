module.exports = (uri, middleware) => {

  console.warn ('⚠ Add Routing', uri, middleware)

  return async function (context, next) {
    uri !== context.path
      ? await next (context)
      : await middleware (context)
  }
}
