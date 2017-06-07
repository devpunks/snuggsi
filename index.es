const
  app    = new (require ('koa'))
, static = require ('koa-static') ('public')

app
  .use    ( static )
  .listen (process.env.PORT || 80)

console.log ('listening')

