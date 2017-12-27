module.exports = path =>
  require ('koa-static')
    ( path, { defer: true } )
