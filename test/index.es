const
  serve = require ('./server')

module.exports = {
  serve
, browse : require ('./browse')
, test   : require ('tape').test
}
