module.exports = (uri, middleware) => {

  console.warn ('uri', uri)

  return async (context, next) =>
    uri !== context.path
      ? await next (context)
      : await middleware (context)
}
