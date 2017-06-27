// https://github.com/tmpvar/jsdom/wiki/Don%27t-stuff-jsdom-globals-onto-the-Node-global

const
  {JSDOM, VirtualConsole} = require ('jsdom')
, open     = require ('fs').readFileSync
, out      = new VirtualConsole
, {test}   = require ('tape')
, encoding = 'utf8'

out.on ('log', () => console.log (arguments))
out.on ('error', () => console.error (arguments))
out.on ('warn', () => console.warn (arguments))
out.on ('jsdomError', () => console.error (arguments))

out.sendTo (console)

function read (path) {
  return open (find (path), encoding)
}

function load (id)
  { return read (`${id}.es`) }

function fragment (identifier) {
  const
    {window, document} = new JSDOM
      (read (`${identifier}.html`), { runScripts: 'dangerously' })
  , script = window.document.createElement ('script')

  script.textContent = 'console.log("\\n\\nSNUGGS!!!!!!!\\n\\n")'
  window.document.body.appendChild (script)

  return window.document
  return (window, document)
}

function browse (interface) {

  console.log (`\n\nRunning test(s) for \`${interface}\` Interface:`)

  return new JSDOM (read (`${interface}.html`), {virtualConsole: out})
}

function find (path)
  { return `${__dirname}/${path}` }

module.exports.test   = test
module.exports.browse = browse

