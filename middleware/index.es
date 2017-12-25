// Mastering Koa Middleware
// https://medium.com/netscape/mastering-koa-middleware-f0af6d327a69

module.exports = {

  browse     : require ('./browse')
, assets     : require ('./assets')
, negotiate  : require ('./negotiate')
, compressor : require ('./compressor')
, mixins     : require ('../mixins/middleware')
}
