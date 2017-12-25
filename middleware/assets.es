const
  normalize = path =>
    Boolean (path += '') ? path : 'public'


module.exports = path =>
  require ('koa-static')
    ( normalize (path), { defer: true } )
