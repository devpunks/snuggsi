console.warn ('loading test helper')

module.exports = {
  serve  : require ('./serve')
, browse : require ('./browse')
, test   : require ('tape').test
}
