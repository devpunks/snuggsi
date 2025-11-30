// Mastering Koa Middleware
// https://medium.com/netscape/mastering-koa-middleware-f0af6d327a69

module.exports = {

  auth       : require ('./auth.es')
, cors       : require ('./cors.es')
, security   : require ('./security.es')
, browse     : require ('./browse.es')
, snuggsi    : require ('./snuggsi.es')
, route      : require ('./route')
, assets     : require ('./assets')
, mixins     : require ('../mixins/middleware')
} // exports
