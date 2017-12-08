module.exports = browse

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


out.sendTo (console)


function browse (interface) {

  interface + '' // flatten TTSL (Tagged Template String Literal) usage

  const
    file = read (`${root}element/${interface}.html`)
  , settings = { runScripts: 'dangerously', virtualConsole: out}
  , document = (new JSDOM (file, settings)).window.document

  , script   = document.createElement ('script')
  , example  = script.cloneNode ()

  script.textContent  = snuggsi
  example.textContent = source

  document.body.appendChild (script)
  document.body.appendChild (example)

  return document
}


function bundle (lib)
  { return load (lib) }

function load (id)
  { return read (`${id}.es`) }

function read (path)
  { return open (find (path), encoding) }

function find (path)
  { return `${path}` }
