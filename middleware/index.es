const
  browse      = require ('./browse')
, assets      = require ('./assets')
, negotiate   = require ('./negotiate')
, compressor  = require ('./compressor')
, mixins      = require ('../mixins/middleware')

module.exports =
  { browse, negotiate, compressor, mixins, assets }
