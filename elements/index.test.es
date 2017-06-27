// https://github.com/tmpvar/jsdom/wiki/Don%27t-stuff-jsdom-globals-onto-the-Node-global

const
  encoding = 'utf8'
, root = `${process.env.NODE_PATH}/`

, {JSDOM, VirtualConsole} = require ('jsdom')
, open     = require ('fs').readFileSync
, snuggsi  = bundle (`${root}/dist/snuggsi`)
, out      = new VirtualConsole
, {test}   = require ('tape')

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

function browse (interface) {

  console.log (`\n\nRunning test(s) for \`${interface}\` Interface:`)

  const dom =
    new JSDOM (read (`${root}elements/${interface}.html`), {virtualConsole: out})

  , window   = dom.window
  , document = dom.window.document
  , script   = document.createElement ('script')

  script.textContent = snuggsi
  console.log (script.textContent)
  document.body.appendChild (script)

  return document
}

function find (path)
  { return `${path}` }

function bundle (lib)
  { return 'console.log("\\n\\nSNUGGS!!!!!!!\\n\\n")\n\n' }

module.exports.test   = test
module.exports.browse = browse

