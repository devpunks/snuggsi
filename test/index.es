console.log ('snuggs')

const
  serve = require ('server')

module.exports = {
  serve  : (new require ('server'))
, browse : require ('./browse')
, test   : require ('tape').test
}
