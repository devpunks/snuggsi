// https://github.com/tmpvar/jsdom/wiki/Don%27t-stuff-jsdom-globals-onto-the-Node-global

const
  {JSDOM, VirtualConsole} = require ('jsdom')
, open     = require ('fs').readFileSync
, out      = new VirtualConsole
, {test}   = require ('tape')
, encoding = 'utf8'

module.exports.test   = test
module.exports.browse = function (interface) {
  console.log ('Running test: ', find (interface))
  return new JSDOM (read (interface), {virtualConsole: out})
}

out.on ('log', () => console.log (arguments))
out.on ('error', () => console.error (arguments))
out.on ('warn', () => console.warn (arguments))
out.on ('jsdomError', () => console.error (arguments))

out.sendTo (console)

function read (path) {
  console.log ('Reading', find ('element'))

  return open (find (path), encoding)
}

function fragment (identifier) {
  const
    {window} = new JSDOM
      (read (identifier), { runScripts: 'dangerously' })
  , script = window.document.createElement ('script')

  script.textContent = 'console.log("\\n\\nSNUGGS!!!!!!!\\n\\n")'
  window.document.body.appendChild (script)

  return window.document
}

function browse (identifier) {
  console.log (read (identifier))
}

function find (path)
  { return `${__dirname}/${path}.html` }

console.log (fragment ('index').documentElement.outerHTML)

