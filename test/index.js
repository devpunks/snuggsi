const
  zip = (a, b) =>
    ( typeof a != 'string' )
      ? a.map( (k, i) => k + ( b[i] || '' ) ).join ``
      : a
, assert = require ('assert')
, a11y = require ('./a11y.es')
, browse = require ('./browse.es')
, { JSDOM } = require ('./parse.es')
, navigate = require ('./navigate.es')
, { Socket, Server } = require('./socket.es')
, { Worker, Service } = require('./worker.es')
, { readFileSync: read } = require('node:fs')
, { test, describe, context=describe } = require('node:test')

, wrap = ( content, template = `${__dirname}/index.html` ) =>
    read ( template ).toString()
      .replace( '${content}', content )

, fetch = resource =>
    ( /.*\.html$/.test ( resource ) )
      // TODO: Remove ternary logic
      ? read ( resource )
      : Buffer.from ( resource )
  // https://github.com/ddamato/code-anatomy/blob/master/test/dom.js
  // https://github.com/ddamato/code-anatomy/blob/master/test/index.spec.js

, parse = ( parts, ...tokens ) => // add + '' for template strings
    new JSDOM ( wrap ( fetch ( zip ( parts, tokens ) ) ),
      { runScripts: 'dangerously', resources: 'usable' } ).window

, view = ( parts, ...tokens ) => // add + '' for template strings
    /^(www|http:|https:)+[^\s]+[\w]$/
      .test ( zip ( parts, tokens ) )
      ? console.log (`TODO: Puppeteer >>> ${zip(parts,tokens)}`)
      : new JSDOM ( wrap ( fetch ( zip ( parts, tokens ) ) ),
          { pretendToBeVisual: true, runScripts: 'dangerously', resources: 'usable', url: `file://${process.cwd()}` } ).window

module.exports = { assert, context, describe, test, read, view, browse, navigate, }

const
  configuration = { // url, file, src: html, scripts, html,
//  done (error, window) {
//    console.log (window.document.documentElement.outerHTML)
//    window.close ()
//  } // done

//, onload (window) {
//    console.log ('Window.onload: Only called if creation succeeds without error')
//    window.close ()
//  } // onload

//, created (error, window) {
//    console.log ('Window.created: Modify `window` object (e.g. add new functions on built-in prototypes before any scripts execute')
//    window.close ()
//  } // created
} // configuration

//const virtualConsole = dom.createVirtualConsole().sendTo( console )
//virtualConsole.on (`log`, message => console.log (message))
//dom.env(element, configuration, { virtualConsole })
//dom.jsdom(element, configuration, { virtualConsole })

// https://github.com/tmpvar/jsdom/issues/317
// https://github.com/w3c/web-platform-tests/tree/master/dom/traversal
// https://github.com/tmpvar/jsdom#user-content-for-the-hardcore-jsdomjsdom
// The jsdom.jsdom method does fewer things automatically; it takes in only HTML source, and it does not allow you to separately supply scripts that it will inject and execute. It just gives you back a document object, with usable document.defaultView, and starts asynchronously executing any <script>s included in the HTML source. You can listen for the 'load' event to wait until scripts are done loading and executing, just like you would in a normal HTML page.
//
// Usage of the API generally looks like this:
//
// var jsdom = require("jsdom").jsdom;
// var doc = jsdom(markup, options);
// var window = doc.defaultView;
// dom.jsdom (element, configuration)

