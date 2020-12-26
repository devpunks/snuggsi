// Benchmark - https://dev.to/chuongtrh/improve-performance-generate-pdf-using-puppeteer-4lg7
// scrapes - https://hackernoon.com/tips-and-tricks-for-web-scraping-with-puppeteer-ed391a63d952

const
// Navigate to chrome://version
//path = '/usr/bin/chromium-browser'
  headless = false
, encoding = 'utf8'
, data     = html =>
    `data:text/html,${html}`
, open     = require ('fs').readFileSync
, path     = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
, puppeteer
    = require ('puppeteer-core')

, html = open ('./test/index.html', encoding)


module.exports = async function ( url = new URL ('https://snuggsi.com') ) {
const
  browser
    = await puppeteer.launch ({
      // flags - https://peter.sh/experiments/chromium-command-line-switches/
        headless
      , dumpio: true
      , timeout: 25000
      , devtools: true
      , executablePath: path
      , waitUntil: 'networkidle2'
//      , args: [
//          '--no-sandbox',
//        , '--disable-gpu',
//        , '--window-size=1920x1080',
//        ]
      })

  void await page
  //.goto ( data (html) )
    .setContent ( html )


  console.warn ( await page.content () )

//await browser.close ``
}


void (async function () {
  await module.exports() //('./test/index.html')
})()


const
  root = `${process.env.NODE_PATH}/`

, { JSDOM, VirtualConsole }
    = require ('jsdom')
, dist   = '' // bundle (`${root}/dist/snuggsi.min`)

, source  = '' // bundle (`${root}/elements/element.html`)
            // https://github.com/tmpvar/jsdom/issues/1030
            // Unfortunately no support for custom elements... yet...
            // https://github.com/tmpvar/jsdom/pull/1872

function browse (interface) {
  interface + '' // flatten TTSL (Tagged Template String Literal) usage

  const
    file = read (`${root}element/${interface}.html`)
  , settings = { runScripts: 'dangerously', virtualConsole: (new VirtualConsole).sendTo (console) }
  , document = (new JSDOM (file, settings)).window.document

  , script    = document.createElement ('script')
  , snuggsi   = script.cloneNode ()
  , example   = script.cloneNode ()
  , polyfills = script.cloneNode ()

  , mutation_observer
    // taken from https://github.com/megawac/MutationObserver.js
    = read (`${root}polyfills/mutation-observer.js`)

  polyfills.textContent
    = [ mutation_observer, '\n' ].join ``

  snuggsi.textContent = dist
  example.textContent = source

  document.body.append (polyfills, snuggsi, example)

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

const
  blockedResourceTypes = [
    'image'
  , 'media'
  , 'font'
  , 'texttrack'
  , 'object'
  , 'beacon'
  , 'csp_report'
  , 'imageset'
  ]
