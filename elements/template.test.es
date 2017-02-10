// Greatly improve <template> implementaiton
// https://github.com/tmpvar/jsdom/commit/ceb79457dd01a19f56a615cf6a78598be8ed36b8
var fetch = resource => fs.readFileSync (resource, `utf-8`)

var dom = require (`jsdom`)
  , fs = require (`fs`)
  , item = `Foo`
  , script = './elements/template.js'
//, src = [fs.readFileSync (script, 'utf-8')]
  , template = fetch (`./elements/template.html`)
  , element = `<ul id='items'>\n\n</ul>\n\n${template}\n\n`

var configuration = {
  //url: 'http://foo.bar.com',
  //html: element,
  // file: a file which jsdom will load HTML from; the resulting document's URL will be a file:// URL,
  scripts: [script],
//src: src
}

configuration.done = (error, window) => {
//console.warn (window.document.querySelector ('template#item').innerHTML)
  console.warn ('Document inner html\n\n', window.document.documentElement.innerHTML)

  window.close ()
}

configuration.created = (error, window) => {
  console.log ('\n\n\nWindow.created: Modify `window` object (e.g. add new functions on built-in prototypes before any scripts execute')
}

configuration.onload  = (window) => {
  console.log ('\nWindow.onload: Only called if creation succeeds without error\n')
}

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

var virtualConsole = dom.createVirtualConsole ()
  .sendTo (console)

virtualConsole
  .on (`log`, message => console.log (message))

//dom.jsdom(element, configuration, { virtualConsole })

dom.env(element, configuration, { virtualConsole })
