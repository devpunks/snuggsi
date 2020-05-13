const
  { route }
    = require ('.')

, { Resource }
    = require ('..')

console.log ('SNUGGSI', require ('snuggsi'))


module.exports =
  path => route ('/', Resource (`/${path}/`))
