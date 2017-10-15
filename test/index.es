const
  { test : describe }
    = require ('tape')

module.exports = {
  describe
, browse : require ('./browse.es')
, test   : require ('tape').test
, serve  : require ('server/index.es')
}

