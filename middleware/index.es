const
  root      = 'public'
, browse    = require ('./browse')
, compress  = require ('./compress')
, negotiate = require ('./negotiate')
, mixins    = require ('../mixins/middleware')
, assets    = require ('koa-static') (root, {defer: true})

module.exports =
  { browse, negotiate, compress, mixins, assets }

