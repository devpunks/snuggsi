// https://github.com/tmpvar/jsdom/wiki/Don%27t-stuff-jsdom-globals-onto-the-Node-global

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
  console.log ('Running test: ', find (interface))
  return new JSDOM (read (find (interface), encoding), {virtualConsole: out})
}

out.sendTo (console)


function fragment (identifier) {
  console.log (read (find (path), encoding))
}

function browse (identifier) {

}

function find (path)
  { return `${__dirname}/${path}.html` }

console.log (find ('element'))

