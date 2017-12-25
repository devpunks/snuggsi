console.warn ('loading test helper')


module.exports = {
  serve  : require ('./serve')
, browse : require ('./browse')
, get    : require ('http').get
, test   : require ('tape').test
}
