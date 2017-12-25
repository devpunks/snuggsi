const
  normalize = path =>
    Boolean (path += '') ? path : 'public'


module.exports = path =>
  require ('koa-static')
    ( Boolean (path += '') ? path : 'public', { defer: true } )
