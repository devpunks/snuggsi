const
  root      = 'public'

, browse      = require ('./browse')
, negotiate   = require ('./negotiate')
, compressor  = require ('./compressor')
, mixins      = require ('../mixins/middleware')
, assets      = require ('koa-static') (root, {defer: true})

module.exports =
  { browse, negotiate, compress, mixins, assets }
