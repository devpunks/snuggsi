require ('./polyfills')

const
  { SNUGGSI = '.' } = process.env


console.log (process.env)

module.exports = {
  Resource : require (`${SNUGGSI}/resource`)
, Server   : require (`${SNUGGSI}/server`)
, test     : require (`${SNUGGSI}/test`).test
}
