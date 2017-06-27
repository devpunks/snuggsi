const
  encoding = 'utf8'
, {test}   = require ('tape')
, {JSDOM, VirtualConsole} = require ('jsdom')
, read     = require ('fs').readFileSync
, out      = new VirtualConsole

out.on ('log', () => console.log (arguments))
out.on ('error', () => console.error (arguments))
out.on ('warn', () => console.warn (arguments))
out.on ('jsdomError', () => console.error (arguments))

module.exports.test   = test
module.exports.browse = function (interface) {

  const path = `${__dirname}/${interface}.html`

  console.log ('Running test: ', path)
  return new JSDOM (read (path, encoding), {virtualConsole: out})
}

out.sendTo (console)

