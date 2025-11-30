// Mastering Koa Middleware
// https://medium.com/netscape/mastering-koa-middleware-f0af6d327a69

module.exports = {

  auth       : require ('./auth.es')
, cors       : require ('./cors.es')
, security   : require ('./security')
, browse     : require ('./browse')
, snuggsi    : require ('./snuggsi')
, route      : require ('./route')
, assets     : require ('./assets')
, mixins     : require ('../mixins/middleware')
}
