const
  { route }
    = require ('.')

, { Resource }
    = require ('..')


module.exports =
  path => route ('/', Resource (`/${path}/`))
