module.exports = {
  test   : require ('tape').test
, browse : require ('./browse')

, serve  :
    (new (require ('server')))
      .listen (3002).serve
}
