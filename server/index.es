const
  { compress, mixins, assets }
    = require ('middleware')

, server
    = new (require ('koa'))


module.exports = class {

  listen (port) {

    this.port = port || 8080

    console.warn ('closing', server.close)

    return this
  }


  serve (path) {

    server = server

//    .use ( require ('koa-cors') ({ methods: ['GET'] }) )

      .use ( compress )

//    .use ( mixins )

//    .use ( assets )

      .listen ( this.port )
  }


  destroy ()
    { console.warn (server.close) }
}
