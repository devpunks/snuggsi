const
  { compress, mixins, assets }
    = require ('middleware')

, server
    = (new (require ('koa')))


module.exports = class {

  listen (port) {

    this.port = port || 8080

    return this
  }


  serve (path) {

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
