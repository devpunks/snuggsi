// Mastering Koa Middleware
// https://medium.com/netscape/mastering-koa-middleware-f0af6d327a69

module.exports = {

  auth         : require ('./auth')
, security     : require ('./security')
, browse       : require ('./browse')
, assets       : require ('./assets')
, distribution : require ('./distribution')
, negotiate    : require ('./negotiate')
, compressor   : require ('./compressor')
, mixins       : require ('mixins/middleware')
}
