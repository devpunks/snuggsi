const
  app = new (require ('koa'))
, cors = require ('koa-cors')
, snuggsi = require ('./middleware')

app
  .use ( cors ({ methods: ['GET'] }) )

  .use ( snuggsi.compressor )

  .use ( snuggsi.mixins )

  .use ( snuggsi.assets )

  .listen ( process.env.PORT || 80 )

console.log
  ( `listening on PORT ${process.env.PORT}` )

