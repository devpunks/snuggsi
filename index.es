const
  app = new (require ('koa'))
, snuggsi = require ('./middleware/index.es')

app
  .use ( snuggsi.compress )

  .use ( snuggsi.static )

  .listen (process.env.PORT || 80)

console.log (`listening on PORT ${process.env.PORT}`)

