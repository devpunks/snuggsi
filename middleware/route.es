module.exports = (uri, middleware) =>

  async (context, next) =>
    uri !== context.path
      ? await next (context)
      : await middleware (context)
