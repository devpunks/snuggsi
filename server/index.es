const
  { compress, mixins, assets }
    = require ('middleware')


module.exports = class {

  listen (port) {

    this.port = port

    return this
  }

  serve (path) {

    (new (require ('koa')))

      .use ( require ('koa-cors') ({ methods: ['GET'] }) )

      .use ( compress )

      .use ( mixins )

      .use ( assets )

      .listen ( this.port )
  }
}
