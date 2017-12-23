const
  { compress, mixins, assets }
    = require ('middleware')

, server
    = (new (require ('koa')))


module.exports = class {

  listen (port) {

    console.warn ('closing', server.close)

    return this
  }


  serve (path) {

    this.port = port || 8080

    server = server

      .use ( require ('koa-cors') ({ methods: ['GET'] }) )

      .use ( compress )

//    .use ( mixins )

//    .use ( assets )

      .listen ( this.port )

    console.warn (server.close)
  }


  destroy ()
    { console.warn (server.close) }
}
