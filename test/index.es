const
  { describe, browse, serve } = require ('test')

  { test : describe }
    = require ('tape')

module.exports = {
  describe
, browse : require ('./browse.es')
, test   : require ('tape').test
, serve  : require ('server/index.es')
}

require ('./element.test')
