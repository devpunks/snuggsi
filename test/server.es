const
  snuggsi = require ('middleware')
, port    = process.env.PORT || 80
, app     = new (require ('koa'))
, cors    = require ('koa-cors')

console.warn ('snuggsi', snuggsi)

  app
    .use ( cors ({ methods: ['GET'] }) )

    .use ( snuggsi.compress )

    .use ( snuggsi.mixins )

    .use ( snuggsi.assets )

    .listen ( port )

  console.log
    ( `listening on PORT ${port}` )

module.exports =

function (options) {
  return class {
    constructor () {
      const fun = function (middleware) {

      }

      return fun
    }
  }
}
