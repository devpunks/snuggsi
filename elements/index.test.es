const
  read = require ('fs').readFileSync

, {JSDOM, virtualConsole: cs } = require ('jsdom')

console.log (cs)

module.exports = function (interface) {
  const path = `${__dirname}/${interface}.html`

  console.log ('woot in path', path)
  return new JSDOM (read (path, 'utf8'))
}
