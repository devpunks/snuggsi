const
  {test} = require ('tape')
, read = require ('fs').readFileSync

, jsdom  = require ('jsdom')
, out = new jsdom.VirtualConsole ()
, {JSDOM} = jsdom

out.sendTo (console)

module.exports.test = test

module.exports.browse = function (interface) {

  const path = `${__dirname}/${interface}.html`

  console.log ('Running test: ', path)
  return new JSDOM (read (path, 'utf8'))
}

