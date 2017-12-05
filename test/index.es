const serve = require ('./server')

module.exports = {
  describe : require ('tape').test
, browse   : require ('./browse')
, test     : require ('tape').test
}
