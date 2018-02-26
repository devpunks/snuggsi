console.warn ('Routing')

module.exports = (uri, middleware) => {

  console.warn ('Routing', uri, middleware)

  return async function (context, next) {
    console.warn ('Holy shit', context, next)
    await next ()
  }
}
