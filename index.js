const Koa = require ('koa')
const app = new Koa ()

app.use (ctx => {
  ctx.body = 'Hello World'
})

console.log ('listening')
app.listen (process.env.PORT || 80)
