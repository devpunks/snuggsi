// Mastering Koa Middleware
// https://medium.com/netscape/mastering-koa-middleware-f0af6d327a69

module.exports = {

  auth       : require ('./auth')
, cors       : require ('./cors')
, security   : require ('./security')
, policy     : require ('./policy.es') // because .json ❓❓❓
, browse     : require ('./browse')
, snuggsi    : require ('./snuggsi')
, route      : require ('./route')
, assets     : require ('./assets')
, mixins     : require ('mixins/middleware')
}
