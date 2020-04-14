const
  { route }
    = require ('.')

, Resource
    = require ('../resource')


module.exports =
  path => route ('/', Resource (`/${path}/`))
