// Mastering Koa Middleware
// https://medium.com/netscape/mastering-koa-middleware-f0af6d327a69

module.exports = {

  auth       : require ('./auth')
, cors       : require ('./cors')
, security   : require ('./security')
, browse     : require ('./browse')
, assets     : require ('./assets')
, negotiator : require ('./negotiator')
, mixins     : require ('mixins/middleware')
}
