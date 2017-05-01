var contents = require('fs').readFileSync ('./dist/snuggsi.es', {encoding: 'UTF-8'})

var options = {
  source: './dist/snuggsi.src',
  file: './dist/snuggsi.src',

  transforms: {
    arrow: true,
    modules: false,
    templateString: false,
    dangerousForOf: true
  },

  // custom JSX pragma (see below)
//jsx: 'NotReact.createElement',

  // custom `Object.assign` (used in object spread)
//objectAssign: 'angular.extend',

  // prevent function expressions generated from class methods
  // from being given names – needed to prevent scope leak in IE8
  namedFunctionExpressions: false
}
var buble = require ('buble')
var result = buble.transform (contents,
  options
) // { code: ..., map: ... }

console.log (result.code)

