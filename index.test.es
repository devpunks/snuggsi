const { JSDOM } = require (`jsdom`)
  assert = require('assert')
, { test, describe, beforeEach: before, afterEach: after }
  = require('node:test')
, { skip, todo } = test.it
, context = describe

// WARNING! ONLY USE LOCAL SCRIPTS
// https://github.com/tmpvar/jsdom#user-content-for-the-hardcore-jsdomjsdom
// The jsdom.jsdom method does fewer things automatically; it takes in only HTML source, and it does not allow you to separately supply scripts that it will inject and execute. It just gives you back a document object, with usable document.defaultView, and starts asynchronously executing any <script>s included in the HTML source. You can listen for the 'load' event to wait until scripts are done loading and executing, just like you would in a normal HTML page.
//
// Usage of the API generally looks like this:
//
// var jsdom = require("jsdom").jsdom;
// var doc = jsdom(markup, options);
// var window = doc.defaultView;
// dom.jsdom (element, configuration)

const
  fetch = resource =>
    require (`fs`).readFileSync (resource, `utf-8`)
, template = fetch (`./index.html`)
, element = `<ul id='items'>\n\n</ul>\n\n${template}\n\n`
, configuration = {
//html: element,
//scripts: [script],
//url: 'http://foo.bar.com',
// file: a file which jsdom will load HTML from; the resulting document's URL will be a file:// URL,
//src: src
}

configuration.done = (error, window) => {
//console.warn (window.document.querySelector ('template#item').innerHTML)
  console.warn ('Document inner html\n\n', window.document.documentElement.outerHTML)
  window.close ()
} // done

configuration.created = (error, window) => {
  console.log ('\n\n\nWindow.created: Modify `window` object (e.g. add new functions on built-in prototypes before any scripts execute')
} // created

configuration.onload  = (window) => {
  console.log ('\nWindow.onload: Only called if creation succeeds without error\n')
} // onload

// https://github.com/tmpvar/jsdom/issues/317
// https://github.com/w3c/web-platform-tests/tree/master/dom/traversal

describe ('unpkg', _=> {
  let script = '<script src=https://unpkg.com/snuggsi></script>'
  const
  { window } = new JSDOM(`<!DOCTYPE html>${script}<p>Hello world</p>`)
  , source = window.document.scripts[0].src

  console.log( window.document.documentElement.outerHTML )

  before(_=> { }) // before

  test ('<script> source',
    _=> assert (source === 'https://unpkg.com/snuggsi') ) // test

}) // describe

return

var virtualConsole = dom.createVirtualConsole ()
  .sendTo (console)

virtualConsole
  .on (`log`, message => console.log (message))

//dom.jsdom(element, configuration, { virtualConsole })

dom.env(element, configuration, { virtualConsole })
