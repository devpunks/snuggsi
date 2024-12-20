const
  assert = require('assert')
, { JSDOM } = require (`jsdom`)
, { readFileSync: read } = require('node:fs')
, { test, describe, context=describe } = require('node:test')

, wrap = ( content, template = 'test/index.html' ) =>
      read ( template ).toString()
        .replace( '${content}', content )
, fetch = resource =>
    ( /.*\.html$/.test ( resource ) )
      ? read ( resource )
      : Buffer.from ( resource )
  // https://github.com/ddamato/code-anatomy/blob/master/test/dom.js
  // https://github.com/ddamato/code-anatomy/blob/master/test/index.spec.js
, view = url =>
    /^(www|http:|https:)+[^\s]+[\w]$/.test (url)
      ? console.log (`TODO: Puppeteer >>> ${url}`)
      : new JSDOM ( wrap ( fetch (url) ),
          { runScripts: 'dangerously', resources: 'usable' } ).window

, configuration = { // url, file, src: html, scripts, html,
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

module.exports = { assert, context, describe, read, test, view, }

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

