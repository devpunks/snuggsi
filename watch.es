const fork = require ('child_process').fork

var fs = require ('fs')
  , dir = './elements/'

fs.watch (dir, { recursive: true }, (event, file) => {
  if ( ! (file.includes ('template.test.es')) ) return

  var child = fork (`${dir}${file}`, [], {stdio: 'pipe'})

  child.on ('data', data => console.log (`\n\n\n${data}`))
})

console.log (`Watching tests from => ${dir}🔎 👀 `)
