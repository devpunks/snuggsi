module.exports = path =>
  require ('koa-static')
    ( Boolean (path + '') || 'public', { defer: true } )
