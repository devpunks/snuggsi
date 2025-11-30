const
  { route }
    = require ( '.' )

, { Resource }
    = require ('..')

console.log ('assets SNUGGSI', Object.keys(require ('..')))
console.log ('SNUGGSI', process.env.SNUGGSI)


module.exports =
  path => route ('/', Resource (`/${path}/`))
