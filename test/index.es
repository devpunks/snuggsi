console.log ('snuggs')

const
  options = { port: 3002 }

module.exports = {
  test   : require ('tape').test
, browse : require ('./browse')
, serve  : new ( require ('server') (options) )
}
