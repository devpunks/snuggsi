const
  encoding = 'utf8'
, {test}   = require ('tape')
, jsdom    = require ('jsdom')
, read     = require ('fs').readFileSync
, out      = new jsdom.VirtualConsole ()
, {JSDOM}  = jsdom

module.exports.test   = test
module.exports.browse = function (interface) {

  const path = `${__dirname}/${interface}.html`

  console.log ('Running test: ', path)
  return new JSDOM (read (path, encoding))
}

out.sendTo (console)

