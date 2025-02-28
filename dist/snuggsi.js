// http://nshipster.com/method-swizzling/
// HTMLElement Swizzle - To swizzle a method is to change a class’s dispatch table in order to resolve messages from an existing selector to a different implementation, while aliasing the original method implementation to a new selector.

// 3.2.3 HTML element constructors
// https://html.spec.whatwg.org/multipage/dom.html#html-element-constructors
// Satisfy Element interface document.createElement
//   - https://dom.spec.whatwg.org/#concept-element-interface

//const HTMLElement =

/*
// Domenic discusses
// https://esdiscuss.org/topic/extending-an-es6-class-using-es5-syntax#content-1
I believe this will work in most cases:

function B() {
  const obj = new A();
  Object.setPrototypeOf(obj, new.target.prototype); // or B.prototype, but if you derive from B you'll have to do this dance again

  // use obj instead of this

  return obj;
}
Also, in general you should do

instead of

B.prototype = Object.create(A.prototype);
for slightly better semantics, including class-side inheritance and not clobbering .constructor.
*/

//( _ => {
//  function E () {}

//  E.prototype =

//    window.HTMLElement.prototype

//  // Prevent `.constructor` clobbering
//  // E.__proto__ = window.HTMLElement

//    // https://github.com/whatwg/html/issues/1704
//    // E.prototype.__proto__
//    //   = (E.__proto__ = HTMLElement).prototype

//    // Domenic's method
//    // Object
//    //   .setPrototypeOf
//    //     (Object.setPrototypeOf (B, A).prototype, A.prototype)

//  return E
//})()

var TokenList = function (node) {
  var this$1 = this;

  var
    scan = function (node) { return node.attributes && [].slice
         .call (node.attributes)
         .map(visit)
      || visit (node); }

  // Syntax Analyzer (Parser)
  , visit = function (node) { return /{(\w+|#)}/.test (node.textContent)
        && (node.text = node.textContent) // cache
            // https://en.wikipedia.org/wiki/Identifier_(computer_languages)
            .match (/[^{]+(?=})/g) // rule
            // TODO: convert `symbol` to `token`
            // https://en.wikipedia.org/wiki/Symbol_table
            .map (function (symbol) { return (this$1 [symbol] || (this$1 [symbol] = [])).push (node); }); }

  // Lexical Analyzer (Scanner)
  , scanner = // https://en.wikipedia.org/wiki/Semantic_analysis_(compilers)
      // https://en.wikipedia.org/wiki/Parsing#Parser
      document.createNodeIterator // .createTreeWalker
        // https://en.wikipedia.org/wiki/Top-down_parsing
        (node, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, scan, null)

  // https://en.wikipedia.org/wiki/One-pass_compiler
  while (scanner.nextNode ()) { null } // Walk all nodes and do nothing.
}; // constructor

TokenList.prototype.bind = function (context) {
  var
    tokenize = function (token) { return function (node) { return (node.textContent = node.textContent
        .split ('{'+token+'}')
        .join(context [token])); }; }

  for (var token in this)
    { token != 'bind' // current method
      && this [token].map // more than one occurrence
        (function (node) { return (node.textContent = node.text); }) } // memoize

  for (var token$1 in this)
    { token$1 != 'bind' // current method
      && this [token$1].map // more than one occurrence
        (tokenize (token$1)) }
}; // TokenList

// https://codereview.chromium.org/1987413002
// https://github.com/whatwg/fetch/pull/442
// https://chromium.googlesource.com/chromium/src.git/+/a5a314d3249ecf1c291b417fbe067e8c2a65fad2
//
// Link rel preload as attribute doesn't support the as=document value
// https://bugs.chromium.org/p/chromium/issues/detail?id=593267
//
// Requests with useStreamOnResponse flag don't reuse preloaded resources
// https://bugs.chromium.org/p/chromium/issues/detail?id=652228
//
// Spurious warning preloading script
// https://bugs.chromium.org/p/chromium/issues/detail?id=655698
//
// WPT
// https://github.com/w3c/web-platform-tests/pull/4505
//
// w3c preload Tighter definition of "load was successful"
// https://github.com/w3c/preload/issues/83
void ( function (_) {

  //create an observer instance
  // Can always default to DOMContentLoaded
  // https://bugs.webkit.org/show_bug.cgi?id=38995#c26
  (new MutationObserver ( function (mutations) {

    for (var i$1 = 0, list$1 = mutations; i$1 < list$1.length; i$1 += 1)
      {
      var mutation = list$1[i$1];

      for (var i = 0, list = mutation.addedNodes; i < list.length; i += 1) {
         var node = list[i];

          /^p/.test (node.rel)
           && /\-/.test (node.id)
           && load (node)

         !! /\-/.test (node.localName)
           && (link = document.querySelector ('#'+node.localName))
           && link.content
           && stamp.call (node, link.content)
           && customElements.upgrade (node)
      }
    }
  }))

  .observe (document.documentElement, { childList: true, subtree: true })

  void [].slice
  .call (document.querySelectorAll ('[rel^=pre][id~="-"]'))
  .map  (load)

  // XHR Specs
  // https://xhr.spec.whatwg.org
  // Progress events
  // https://xhr.spec.whatwg.org/#interface-progressevent
  // Loader - https://trac.webkit.org/browser/trunk/WebCore/loader/loader.cpp
  function load (link) {
    var xhr = new XMLHttpRequest

    // Destination - https://fetch.spec.whatwg.org/#requestdestination

    xhr.link   = link
    xhr.onload = onload
    // progress events won't fire unless defining before open
    xhr.open ('GET', link.href)
    xhr.responseType = 'document'
    // Max requests
    xhr.send ()
  } // load


  // https://github.com/w3c/preload/pull/40
  // https://bugs.webkit.org/show_bug.cgi?id=38995
  // https://www.w3.org/TR/html5/document-metadata.html#the-link-element
  function onload () {
    var
      link = this.link

    , response =
        this.response

    , anchor =
        link.nextChild

    , template =
        link.content =
           response.querySelector ('template')

    // https://www.nczonline.net/blog/2010/09/28/why-is-getelementsbytagname-faster-that-queryselectorall
    for (var i = 0, list = document.querySelectorAll (link.id); i < list.length; i += 1)
      {
      var node = list[i];

      template && stamp.call (node, template)
    }


    for (var i$1 = 0, list$1 = response.querySelectorAll ('style,link,script'); i$1 < list$1.length; i$1 += 1)
      {
      var node$1 = list$1[i$1];

      process (link, node$1, anchor)
    }
  } // onload


  function process (link, node, anchor) {
      var
        // https://chromium.googlesource.com/chromium/src.git/+/0661feafc9a84f03b04dd3719b8aaa255dfaec63/third_party/WebKit/Source/core/loader/LinkLoader.cpp
        // HTML WhatWG scripting
        // https://html.spec.whatwg.org/multipage/scripting.html
        // https://html.spec.whatwg.org/multipage/scripting.html#prepare-a-script
        // Classic script graph - https://html.spec.whatwg.org/multipage/webappapis.html#fetch-a-classic-script
        // Module script tree - https://html.spec.whatwg.org/multipage/webappapis.html#fetch-a-module-script-tree
        // Concept Script script - https://html.spec.whatwg.org/multipage/scripting.html#concept-script-script
        as = node.getAttribute ('as')

      , clone =
          document.createElement
            ('script' == as ? as : node.localName)

      void

      // 'type' is used for data blocks (i.e. `type=text/recipe` or `type=application/x-game-data`
      // https://html.spec.whatwg.org/multipage/scripting.html#data-block
      ['id', 'rel', 'href', 'src', 'textContent', 'as', 'defer', 'crossOrigin' ]
        // setAttribute won't work for textContent and likewise explicit set for crossorigin
        .map (function (attr) { return node [attr] && attr in clone && (clone [attr] = node [attr]); })

      // use rel = 'preload stylesheet' for async
      // or use media=snuggsi => media || 'all' trick
      // loadCSS - https://github.com/filamentgroup/loadCSS
      // http://keithclark.co.uk/articles/loading-css-without-blocking-render
      'style' == as
      // https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/#markup-based-async-loader
        && (clone.rel = 'stylesheet')

      'script' == as // smelly
        && (clone.src = clone.href)

      link
        .parentNode
        .insertBefore (clone, anchor)
  } // process

  // Slot replacement & light DOM stamping
  // https://github.com/w3c/webcomponents/issues/288
  // https://dom.spec.whatwg.org/#slot-assigned-nodes
  function stamp (template) {
    var this$1 = this;


    template =
      document.importNode (template, true)

    var slot

    [] // distribute attributes
      .slice
      .call (template.attributes)
      .map  (function (attr) { return !   this$1.attributes [attr.name]
        &&  this$1.setAttribute (attr.name, attr.value); })


    for (var i = 0, list = this.querySelectorAll ('[slot]'); i < list.length; i += 1)
      {
      var replacement = list[i];

      (slot = (template.content || template).querySelector
       ( 'slot[name=' + replacement.getAttribute ('slot') + ']' ))

      && // this could be slow
        slot.parentNode.replaceChild (replacement, slot)
    }

    return this.innerHTML = template.innerHTML
  } // stamp

}) ()

//Template =>
// Template.foo
// Template ['...']
// document.getElementsByTagName (tag)[name]

// innerHTML issues
// http://kieranpotts.com/blog/javascript-html-to-dom
// https://lists.w3.org/Archives/Public/public-webapps/2012AprJun/0334.html#start334

// investigate `Text.splitText ()`
// Recurse through elements and bind event handlers
// https://developer.mozilla.org/en-US/docs/Web/API/Text/splitText
//
// Greatly improve <template> implementaiton
// https://github.com/tmpvar/jsdom/commit/ceb79457dd01a19f56a615cf6a78598be8ed36b8
var Template = function (template) {

  var
    range = document.createRange ()

  template
    = typeof template === 'string'
    ? document.querySelector ( 'template[name=' + template + ']' )
    : template

  range.selectNodeContents ( template.content )

  var
    fragment = range.cloneContents ()

  , tokenize = function (context, index) {
      var
        clone = fragment.cloneNode (true)

      typeof context != 'object'
        && ( context  = { self: context })

      context ['#'] = index

      void (new TokenList (clone))
        .bind (context)

      return clone
    } // tokenize

  , bind = function (context) {
      range.deleteContents ()

      context && []
        .concat (context)
        .map (tokenize)
        .reverse () // Range.insertNode does prepend
        .map (function (fragment) { return range.insertNode (fragment); })
    }

  range.setStartAfter (template)
  template.bind = bind
  return template
} // Template

// Polyfills
//   - https://github.com/webcomponents/polyfills

//  void (new MutationObserver ( mutations => {

//  for (let mutation of mutations)
//  for (let root of mutation.addedNodes)

//      /\-/.test ( customElements [root.localName] )
//      && customElements.upgrade (root)
//  }))
//  .observe (document.documentElement, { childList: true, subtree: true })


// Scoped CustomElementRegistry
//   - https://github.com/whatwg/html/issues/10854
//   - https://github.com/WICG/webcomponents/issues/1043
//   - https://github.com/w3c/tpac2024-breakouts/issues/26
//   - https://github.com/webcomponents/polyfills/tree/master/packages/scoped-custom-element-registry
//   - https://github.com/WICG/webcomponents/blob/gh-pages/proposals/Scoped-Custom-Element-Registries.md
//   - https://github.com/WICG/webcomponents/issues?q=is%3Aissue+label%3A%22scoped+custom+element+registry%22

//window.customElements =
//window.customElements
//|| {/* microfill */}

//void ( _ => { // CustomElementRegistry - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/FinalizationRegistry

//customElements.define = ( name, constructor ) =>

//  /\-/.test (name)
//    && (customElements [name] = constructor)
//    && [].slice
//      // https://nczonline.net/blog/2010/09/28/why-is-getelementsbytagname-faster-that-queryselectorall
//      .call ( document.querySelectorAll (name) )
//      .map  ( customElements.upgrade )


//customElements.upgrade = (root) => {

//  const candidates = []

//  // Here's where we can swizzle
//  // https://github.com/whatwg/html/issues/1704#issuecomment-241881091

//  Object.setPrototypeOf
//    (root, customElements [root.localName].prototype)

//  root.connectedCallback ()
//} // upgrade

//})() /* CustomElementRegistry */

function ParentNode ( Element ) {

// DOM Levels
// (https://developer.mozilla.org/fr/docs/DOM_Levels)
//
// Living Standard HTML5 ParentNode
// https://dom.spec.whatwg.org/#parentnode
//
// MDN ParentNode
// https://developer.mozilla.org/en-US/docs/Web/API/ParentNode
//
// ElementTraversal interface
// https://w3.org/TR/ElementTraversal/#interface-elementTraversal
// return class extends Element {

  // id / identify ? // Method used to find descendants by ID

  Element.prototype.select = function ()
    {
    var ref;
 return (ref = this).selectAll.apply ( ref, arguments ) [0] } // select

  Element.prototype.selectAll = function ( strings ) {
    var tokens = [], len = arguments.length - 1;
    while ( len-- > 0 ) tokens[ len ] = arguments[ len + 1 ];

    strings = [].concat ( strings )

    return [].slice.call
      ( this.querySelectorAll
        ( tokens.reduce // denormalize selector
          ( function ( part, token ) { return part + token + strings.shift (); }
          , strings.shift () )))
  } //selectAll

  return Element
} // ParentNode

function EventTarget ( Element ) { // why buble

// WHATWG Living Standard HTML5 EventTarget
// https://dom.spec.whatwg.org/#eventtarget
//
// MDN EventTarget
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget

// DOM Levels
// (https://developer.mozilla.org/fr/docs/DOM_Levels)
//
// DOM Level 0 EventTarget
// This event handling model was introduced by Netscape Navigator,
// and remains the most cross-browser model as of 2005
// https://en.wikipedia.org/wiki/DOM_events#DOM_Level_0#DOM_Level_0
//
// DOM Level 2 EventTarget
// (AKA Str🎱  W3C #fockery) ➡️  https://annevankesteren.nl/2016/01/film-at-11
// 😕  https://w3c.github.io/uievents/DOM3-Events.html#interface-EventTarget
//❓❓ https://w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.html
// https://w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.html#Events-EventTarget
// Within https://w3c.github.io/uievents/#conf-interactive-ua
// EventTarget links to WHATWG - https://dom.spec.whatwg.org/#eventtarget
//
// DOM Level 3 EventTarget
// https://w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.html#Events-EventTarget

//
// All Event Handling Models
// https://en.wikipedia.org/wiki/DOM_events#Event_handling_models
//
// Inline Model
// https://en.wikipedia.org/wiki/DOM_events#Inline_model
//
// Traditional Model
// https://en.wikipedia.org/wiki/DOM_events#Traditional_model
//
// Traditional Registration
// http://quirksmode.org/js/events_tradmod.html
//
// HandleEvent Registration
//   - https://gomakethings.com/callbacks-on-web-components
//   - https://viperhtml.js.org/hyperhtml/documentation/#essentials-6

  // MDN EventTarget.dispatchEvent
  // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent
  //
  // WHATWG Living Standard EventTarget.dispatchEvent
  // https://dom.spec.whatwg.org/#dom-eventtarget-dispatchevent
  //
  // DOM Level 2 EventTarget.dispatchEvent
  //  https://w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget-dispatchEvent
  Element.prototype.dispatch = function (name) {

    this.dispatchEvent
      ( new Event ( name ) )
  } // dispatch

  // Classic `on*=TOKEN` attribute handlers
  Element.prototype.register = function ( node, handler, event ) {

    for (var i = 0, list = [].slice.call ( node.attributes ); i < list.length; i += 1 )
        {
      var attribute = list[i];

      /^on/.test ( event = attribute.name )
        // https://quirksmode.org/js/events_tradmod.html
        // because under traditional registration the handler value
        // is wrapped in scope `function on*() {\nonfoo\n}`
        && ( handler = ( /{\s(\w+)\s}/.exec ( node [event] ) || [] ) [1] )
        && ( node [event] = this.renderable (this [handler]) )
    }
  } // register

  // MDN EventTarget.removeEventListener
  // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener
  //
  // WHATWG Living Standard EventTarget.removeEventListener
  // https://dom.spec.whatwg.org/#dom-eventtarget-removeeventlistener
  //
  // DOM Level 2 EventTarget.removeEventListener
  // https://w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget-removeEventListener

//off (event, listener = 'on' + this [event])
//  { this.removeEventListener ( event, listener ) }

// MDN EventTarget.addEventListener
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
//
// WHATWG Living Standard EventTarget.addEventListener
// https://dom.spec.whatwg.org/#dom-eventtarget-removeeventlistener
//
// DOM Level 2 EventTarget.addEventListener
// https://w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget-addEventListener
  Element.prototype.on = function ( event, handler ) {

    this.addEventListener
      ( event, this.renderable ( handler  /* TODO: `options` & `useCapture` */ ) )
  } // on

  // Reflection - https://en.wikipedia.org/wiki/Reflection_(computer_programming)
  // Type Introspection - https://en.wikipedia.org/wiki/Type_introspection
  //
  // In computing, type introspection is the ability of a program
  // to examine the type or properties of an object at runtime.
  // Some programming languages possess this capability.
  //
  // Introspection should not be confused with reflection,
  // which goes a step further and is the ability for a program to manipulate the values,
  // meta-data, properties and/or functions of an object at runtime.
  Element.prototype.reflect = function ( handler ) {

    /^on/.test ( handler ) // is a W3C `on*`event
      && // handler is defined on class
        handler in HTMLElement.prototype // `on*`

      && // automagically delegate event
        this.on ( handler.substr (2), this [handler] )
  } // reflect

  // BIG BUG IN IE!!!
  //
  // https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called
  //
  // https://github.com/webcomponents/webcomponents-platform/blob/master/webcomponents-platform.js#L16
  Element.prototype.renderable = function ( handler ) {
    var this$1 = this;


    return function (event) { return handler.call ( this$1, event ) !== false
        // check render availability
        && event.defaultPrevented
        || this$1.render (); }
  } // renderable

  return Element
} // EventTarget

//function GlobalEventHandlers ( Element ) {

// Living Standard HTML5 GlobalEventHandlers
// https://html.spec.whatwg.org/multipage/webappapis.html#globaleventhandlers
//
// MDN GlobalEventHandlers
// https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers
//
// MDN on* Events
// https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Event_handlers
//return class extends Element {

//onconnect ( event ) {

//  this.templates =
//    this
//      .selectAll ('template[name]')
//      .map (Template)

//  this.tokens =
//    new TokenList (this)

//  super.onconnect
//    && super.onconnect (event)
//} // onconnect

//ondisconnect ( event ) {

//  super.ondisconnect
//    && super.ondisconnect (event)
//} // ondisconnect

//} // class

//} // GlobalEventHandlers

function Custom ( Element ) { // why buble
//class extends // interfaces
Element = EventTarget ( ParentNode
//  ( GlobalEventHandlers
  ( Element )) // ))


//{
  Element.prototype.render = function () {

    for (var i = 0, list = this.templates; i < list.length; i += 1)
      {
      var template = list[i];

      template.bind
        (this [template.getAttribute ('name')])
    }

    this
      .tokens
      .bind (this)

    this.register (this)

    this
      // possibly restrict to elements with on event
      .selectAll ('*')
      .map (this.register, this)

    this.dispatch ('idle')
  } // render

  Element.prototype.connectedCallback ||
  (Element.prototype.connectedCallback = function () {
    this.context = {}

    this.initialize
      && this.initialize ()

    Object
      .getOwnPropertyNames (Element.prototype)
      .map (this.reflect, this)

    this.addEventListener
      ('connect', this.onconnect)

    this.dispatch ('connect')

    this.templates =
      this
        .selectAll ('template[name]')
        .map (Template)

    this.tokens =
      new TokenList (this)

    this.addEventListener
      ('idle', this.onidle)

    this.render ()
  }) // connectedCallback

  Element.prototype.disconnectedCallback ||
  (Element.prototype.disconnectedCallback = function () {
    this.ondisconnect
      && this.ondisconnect ()

    this.dispatch ('disconnect')
  }) // disconnectedCallback

//} // class

  return Element
} // Custom

// http://2ality.com/2013/09/window.html
// http://tobyho.com/2013/03/13/window-prop-vs-global-var

var Element = function (tag) { return (

//      const constructor =// swizzle
//        typeof tag === 'string'
//    //    ? HTMLCustomElement
//    //    : HTMLElement

        //https://gist.github.com/allenwb/53927e46b31564168a1d
        // https://github.com/w3c/webcomponents/issues/587#issuecomment-271031208
        // https://github.com/w3c/webcomponents/issues/587#issuecomment-254017839

      function (Element) { return customElements.define
          ( tag + '', Custom (Element) ); }

// Assign `window.Element.prototype` in case of feature checking on `Element`
//  E.prototype = Element.prototype
//  return E
); }

ent.prototype
//  return E
); }

