module.exports = path =>
  require ('koa-static')
    ( Boolean (path += '') ? path : 'public', { defer: true } )
