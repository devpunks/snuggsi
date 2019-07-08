require ('./polyfills')

const
  { SNUGGSI = '.' } = process.env


console.log (process.env)

module.exports = {
  Resource : require (`${SNUGGSI}/resource`)
, Server   : require (`${SNUGGSI}/server`)
, Test     : require (`${SNUGGSI}/test`)
}
