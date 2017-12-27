module.exports = path =>
  require ('koa-static')
    ( normalize (path), { defer: true } )
