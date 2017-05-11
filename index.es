const
  app    = new require ('koa')
, static = new require
    ('koa-static')
    ('public')

app.use ( static )
console.log ('listening')
app.listen (process.env.PORT || 80)
