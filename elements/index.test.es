const
  encoding = 'utf8'
, root = `${process.env.ROOT}/`

, {JSDOM, VirtualConsole} = require ('jsdom')
, open    = require ('fs').readFileSync
, snuggsi = bundle (`${root}/dist/snuggsi`)

, source  = '' // bundle (`${root}/elements/element.html`)
            // https://github.com/tmpvar/jsdom/issues/1030
            // Unfortunately no support for custom elements... yet...
            // https://github.com/tmpvar/jsdom/pull/1872

, out     = new VirtualConsole
, {test: describe} = require ('tape')


function browse (interface) {

  const
    file = read (`${root}elements/${interface}.html`)
  , settings = { runScripts: 'dangerously', virtualConsole: out}
  , dom = new JSDOM (file, settings)

  , document = dom.window.document
  , script   = document.createElement ('script')
  , example  = script.cloneNode ()

  script.textContent  = snuggsi
  example.textContent = source

  document.body.appendChild (script)
  document.body.appendChild (example)

  return document
}

function read (path)
  { return open (find (path), encoding) }

function load (id)
  { return read (`${id}.es`) }

function find (path)
  { return `${path}` }

function bundle (lib)
  { return load (lib) }


out.sendTo (console)

module.exports.browse   = browse
module.exports.describe = describe

