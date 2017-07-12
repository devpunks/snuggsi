const
  root   = 'mixins'
, mime   = /^\*\/\*$/
, filter = /^\/mixins\/(.*\.es)*$/g

, send   = require ('koa-send')


module.exports = async (context, next) => {

  const
    match = filter.test (context.path)
  , resource = './storable.es'

  , settings = [context, resource, { root }]

  , header = ['Content-Type', 'application/ecmascript']
  , response = match && await send ( ... settings )

  void (response && context.set ( ... header ))
    || await next ()

  console.log ('response', context.response.status, response)
}
