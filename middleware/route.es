module.exports = (uri, middleware) => {

  console.warn ('uri', uri.match (/[^{]+(?=})/g))

/*

collect = node =>
/{(\w+|#)}/.test (node.textContent)
  && (node.text = node.textContent)
      .match (/[^{]+(?=})/g)
      .map   (symbol => (this [symbol] || (this [symbol] = [])).push (node))

*/

  return async (context, next) =>
    uri !== context.path
      ? await next (context)
      : await middleware (context)
}
