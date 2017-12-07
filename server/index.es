const
  snuggsi = require ('middleware')
, port    = process.env.PORT || 80
, app     = new (require ('koa'))
, cors    = require ('koa-cors')

console.warn ('snuggsi', snuggsi)

/*
  app
    .use ( cors ({ methods: ['GET'] }) )

    .use ( snuggsi.compress )

    .use ( snuggsi.mixins )

    .use ( snuggsi.assets )

    .listen ( port )

*/

let _port

module.exports = class {

  constructor () {
    console.warn ('constructor', arguments)
  }

  listen (port) {
    _port = port
    return this
  }

  serve (path) {
    console.log ('serving', path)
  }
}
