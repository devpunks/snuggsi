const
  onlog    = () => console.log (arguments)
, onerror  = () => console.error (arguments)
, onwarn   = () => console.warn (arguments)

, encoding = 'utf8'
, {test}   = require ('tape')
, {JSDOM, VirtualConsole} = require ('jsdom')
, read     = require ('fs').readFileSync
, out      = new VirtualConsole

out.on ('log', onlog)
out.on ('error', onerror)
out.on ('warn', onwarn)

module.exports.test   = test
module.exports.browse = function (interface) {

  const path = `${__dirname}/${interface}.html`

  console.log ('Running test: ', path)
  return new JSDOM (read (path, encoding))
}

out.sendTo (console)

