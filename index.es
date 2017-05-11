const
  app    = new (require ('koa'))
, static = require ('koa-static') ('public')

app.use ( static )
console.log ('listening')
app.listen (process.env.PORT || 80)
