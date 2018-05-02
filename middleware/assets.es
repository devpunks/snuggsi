const
  route
    = require ('./route')

, Resource
    = require ('resource')


module.exports =
  path => route ('/', Resource (`/${path}/`))
