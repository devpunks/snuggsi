const
  {test} = require ('tape')
, read = require ('fs').readFileSync

, jsdom  = require ('jsdom')
, out = new jsdom.VirtualConsole ()
, {JSDOM} = jsdom

out.sendTo (console)

module.exports = function (interface) {
  const path = `${__dirname}/${interface}.html`

  console.log ('woot in path', path)
  return new JSDOM (read (path, 'utf8'))
}
