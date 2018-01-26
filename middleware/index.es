// Mastering Koa Middleware
// https://medium.com/netscape/mastering-koa-middleware-f0af6d327a69

module.exports = {

  auth       : require ('./auth')
, cors       : require ('./cors')
, security   : require ('./security')
, browse     : require ('./browse')
, snuggsi    : require ('./snuggsi')
, negotiator : require ('./negotiator')
, assets     : require ('./assets')
, mixins     : require ('mixins/middleware')
}
