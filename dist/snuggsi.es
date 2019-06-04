// http://nshipster.com/method-swizzling/
// HTMLElement Swizzle - To swizzle a method is to change a class’s dispatch table in order to resolve messages from an existing selector to a different implementation, while aliasing the original method implementation to a new selector.

// 3.2.3 HTML element constructors
// https://html.spec.whatwg.org/multipage/dom.html#html-element-constructors
// Satisfy Element interface document.createElement
//   - https://dom.spec.whatwg.org/#concept-element-interface

const HTMLElement =

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

( _ => {
  function E () {}

  E.prototype =

    window.HTMLElement.prototype

  // Prevent `.constructor` clobbering
  // E.__proto__ = window.HTMLElement

    // https://github.com/whatwg/html/issues/1704
    // E.prototype.__proto__
    //   = (E.__proto__ = HTMLElement).prototype

    // Domenic's method
    // Object
    //   .setPrototypeOf
    //     (Object.setPrototypeOf (B, A).prototype, A.prototype)

    return E
})()

class TokenList {

  constructor (node) {

    const
      visit = node =>
        node.attributes && [].slice
           .call (node.attributes)
           .map  (collect)
        || collect (node)

    , collect = node =>
        /{(\w+|#)}/.test (node.textContent)
          && (node.text = node.textContent)
              .match (/[^{]+(?=})/g)
              .map   (symbol => (this [symbol] || (this [symbol] = [])).push (node))

    , walker =
        document.createNodeIterator
          (node, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, visit, null)

    while (walker.nextNode ()) null // Walk all nodes and do nothing.
  }


  bind (context) {

    const
      tokenize = symbol => node =>
        (node.textContent
          = node.textContent
          .split ('{'+symbol+'}')
          .join  (context [symbol]))

    for (let symbol in this)
      symbol != 'bind'
        && this [symbol].map
          (node => (node.textContent = node.text))

    for (let symbol in this)
      symbol != 'bind'
        && this [symbol].map
          (tokenize (symbol)) // more than one occurrence
  }
}

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
void ( _ => {

  //create an observer instance
  // Can always default to DOMContentLoaded
  // https://bugs.webkit.org/show_bug.cgi?id=38995#c26
  (new MutationObserver ( mutations => {

    for (let mutation of mutations)
      for (let node of mutation.addedNodes) {
         /^p/.test (node.rel)
           && /\-/.test (node.id)
           && load (node)

         !! /\-/.test (node.localName)
           && (link = document.querySelector ('#'+node.localName))
           && link.content
           && stamp.call (node, link.content)
           && customElements.upgrade (node)
      }
  }))

  .observe (document.documentElement, { childList: true, subtree: true })

  void

  [].slice
    .call (document.querySelectorAll ('[rel^=pre][id~="-"]'))
    .map  (load)


  // XHR Specs
  // https://xhr.spec.whatwg.org
  // Progress events
  // https://xhr.spec.whatwg.org/#interface-progressevent
  // Loader - https://trac.webkit.org/browser/trunk/WebCore/loader/loader.cpp
  function load (link) {

    let xhr = new XMLHttpRequest

    // Destination - https://fetch.spec.whatwg.org/#requestdestination

    xhr.link   = link
    xhr.onload = onload
    // progress events won't fire unless defining before open
    xhr.open ('GET', link.href)
    xhr.responseType = 'document'
    // Max requests
    xhr.send ()
  }


  // https://github.com/w3c/preload/pull/40
  // https://bugs.webkit.org/show_bug.cgi?id=38995
  // https://www.w3.org/TR/html5/document-metadata.html#the-link-element
  function onload () {
    let
      link = this.link

    , response =
        this.response

    , anchor =
        link.nextChild

    , template =
        link.content =
           response.querySelector ('template')

    // https://www.nczonline.net/blog/2010/09/28/why-is-getelementsbytagname-faster-that-queryselectorall
    for (let node of document.querySelectorAll (link.id))
      template && stamp.call (node, template)


    for (let node of response.querySelectorAll ('style,link,script'))
      process (link, node, anchor)
  }


  function process (link, node, anchor) {
      let
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
      ['id', 'rel', 'href', 'src', 'textContent', 'as', 'defer', 'crossOrigin'/* , media */]
        // setAttribute won't work for textContent and likewise explicit set for crossorigin
        .map (attr => node [attr] && attr in clone && (clone [attr] = node [attr]))

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
  }

  // Slot replacement & light DOM stamping
  // https://github.com/w3c/webcomponents/issues/288
  // https://dom.spec.whatwg.org/#slot-assigned-nodes
  function stamp (template) {

    template =
      document.importNode (template, true)

    let slot

    [] // distribute attributes
      .slice
      .call (template.attributes)
      .map  (attr =>
        !   this.attributes [attr.name]
        &&  this.setAttribute (attr.name, attr.value))


    for (let replacement of this.querySelectorAll ('[slot]'))
      (slot = (template.content || template).querySelector
       ( 'slot[name=' + replacement.getAttribute ('slot') + ']' ))

      && // this could be slow
        slot.parentNode.replaceChild (replacement, slot)

    return this.innerHTML = template.innerHTML
  }

}) ()

const Template = template => {

  let
    range = document.createRange ()

  template
    = typeof template === 'string'
    ? document.querySelector ( 'template[name=' + template + ']' )
    : template

  range.selectNodeContents ( template.content )

  let
    fragment = range.cloneContents ()

  , tokenize = (context, index) => {
      let
        clone = fragment.cloneNode (true)

      typeof context != 'object'
        && ( context  = { self: context })

      context ['#'] = index

      void (new TokenList (clone))
        .bind (context)

      return clone
    }

  , bind = context => {
      range.deleteContents ()

      context && []
        .concat (context)
        .map (tokenize)
        .reverse () // Range.insertNode does prepend
        .map (fragment => range.insertNode (fragment))
    }

  range.setStartAfter (template)
  template.bind = bind
  return template
}

window.customElements =
  window.customElements
  || {/* microfill */}

void ( _ => { /* CustomElementRegistry */

  customElements.define = ( name, constructor ) => {

    !! /\-/.test (name)
    && (customElements [name] = constructor)
    && [].slice
      // https://www.nczonline.net/blog/2010/09/28/why-is-getelementsbytagname-faster-that-queryselectorall
      .call ( document.querySelectorAll (name) )
      .map  ( customElements.upgrade )
  }


  customElements.upgrade = function (root) {

    const candidates = []

    // Here's where we can swizzle
    // https://github.com/whatwg/html/issues/1704#issuecomment-241881091

    Object.setPrototypeOf
      (root, customElements [root.localName].prototype)

    root.connectedCallback ()
  }


  void (new MutationObserver ( mutations => {

    for (let mutation of mutations)
      for (let root of mutation.addedNodes)

         !! /\-/.test (root.localName)
         && customElements [root.localName]
         && customElements.upgrade (root)
  }))

  .observe (document.documentElement, { childList: true, subtree: true })

})() /* CustomElementRegistry */

const ParentNode = Element =>

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
  // https://www.w3.org/TR/ElementTraversal/#interface-elementTraversal

(class extends Element {

  select ( )
    { return this.selectAll ( ... arguments ) [0] }

  selectAll ( strings, ... tokens ) {
    strings = [ ].concat ( strings )

    return [].slice.call
      (this.querySelectorAll
        (tokens.reduce // denormalize selector
          ((part, token) => part + token + strings.shift ()
          , strings.shift ())))
  }

})

//  comb (parent) {
//    // ElementTraversal interface
//    // https://www.w3.org/TR/ElementTraversal/#interface-elementTraversal
//
//    if (parent.hasChildNodes())
//      for (let node = parent.firstChild; node; node = node.nextSibling)
//        comb (node)
//  }

const EventTarget = HTMLElement => // why buble

  // DOM Levels
  // (https://developer.mozilla.org/fr/docs/DOM_Levels)
  //
  // WHATWG Living Standard HTML5 EventTarget
  // https://dom.spec.whatwg.org/#eventtarget
  //
  // MDN EventTarget
  // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
  //
  // DOM Level 3 EventTarget
  // https://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.html#Events-EventTarget
  //
  // DOM Level 2 EventTarget
  // (AKA Str🎱  W3C #fockery) ➡️  https://annevankesteren.nl/2016/01/film-at-11
  // 😕  https://w3c.github.io/uievents/DOM3-Events.html#interface-EventTarget
  //❓❓ https://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.html
  // https://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.html#Events-EventTarget
  // Within https://w3c.github.io/uievents/#conf-interactive-ua
  // EventTarget links to WHATWG - https://dom.spec.whatwg.org/#eventtarget

(class extends HTMLElement {

  // MDN EventTarget.addEventListener
  // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
  //
  // WHATWG Living Standard EventTarget.addEventListener
  // https://dom.spec.whatwg.org/#dom-eventtarget-removeeventlistener
  //
  // DOM Level 2 EventTarget.addEventListener
  // https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget-addEventListener


  on ( event, handler ) {

    this.addEventListener
      (event, this.renderable (handler))
  }

  renderable ( handler ) {

    // BIG BUG IN IE!!!
    //
    // https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called
    //
    // https://github.com/webcomponents/webcomponents-platform/blob/master/webcomponents-platform.js#L16

    return event =>
      // for `return false`
      handler.call (this, event) !== false
        // check render availability
        && event.defaultPrevented
        || this.render ()
  }

//off (event, listener = 'on' + this [event])
//  // MDN EventTarget.removeEventListener
//  // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener
//  //
//  // WHATWG Living Standard EventTarget.removeEventListener
//  // https://dom.spec.whatwg.org/#dom-eventtarget-removeeventlistener
//  //
//  // DOM Level 2 EventTarget.removeEventListener
//  // https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget-removeEventListener

//  { this.removeEventListener (event, listener) }

//dispatch (event)
//  // MDN EventTarget.dispatchEvent
//  // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent
//  //
//  // WHATWG Living Standard EventTarget.dispatchEvent
//  // https://dom.spec.whatwg.org/#dom-eventtarget-dispatchevent
//  //
//  // DOM Level 2 EventTarget.dispatchEvent
//  //  https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget-dispatchEvent

//  { }


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


  reflect (handler) {

    /^on/.test (handler) // is a W3C `on`event
      && handler in HTMLElement.prototype // `on*`

      && // automagically delegate event
        this.on ( handler.substr (2), this [handler] )
  }


  register (node, handler, event) {
    for (let attribute of
          [].slice.call (node.attributes))
            /^on/.test (event = attribute.name)
            // https://www.quirksmode.org/js/events_tradmod.html
            // because under traditional registration the handler value is wrapped in scope `{ onfoo }`
            && ( handler = (/{\s*(\w+)/.exec (node [event]) || []) [1])
            && ( node [event] = this.renderable (this [handler]) )
  }

})

const GlobalEventHandlers = Element =>

  // Living Standard HTML5 GlobalEventHandlers
  // https://html.spec.whatwg.org/multipage/webappapis.html#globaleventhandlers
  //
  // MDN GlobalEventHandlers
  // https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers
  //
  // MDN on* Events
  // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Event_handlers
  //
  // DOM Level 0
  // This event handling model was introduced by Netscape Navigator,
  // and remains the most cross-browser model as of 2005
  // https://en.wikipedia.org/wiki/DOM_events#DOM_Level_0#DOM_Level_0
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
  // http://www.quirksmode.org/js/events_tradmod.html


  // HandleEvent Registration - https://viperhtml.js.org/hyperhtml/documentation/#essentials-6

(class extends Element {

  onconnect (event) {

    this.templates =
      this
        .selectAll ('template[name]')
        .map (Template)

    this.tokens =
      new TokenList (this)

    super.onconnect
      && super.onconnect (event)
  }

})
const Custom = Element => // why buble

( class extends // interfaces
  ( ParentNode
  ( EventTarget
  ( GlobalEventHandlers
  ( Element ))))
{
  connectedCallback () {
    this.context = {}

    super.initialize
      && super.initialize ()

    Object
      .getOwnPropertyNames (Element.prototype)
      .map (this.reflect, this)

    this.addEventListener
      ('connect', this.onconnect)
 
    this.addEventListener
      ('idle', super.onidle)

    this.dispatchEvent
      (new Event ('connect'))

    this.render ()
  }


  render () {

    for (let template of this.templates)
      template.bind
        (this [template.getAttribute ('name')])

    this
      .tokens
      .bind (this)

    this.register (this)

    this
      // possibly restrict to elements with on event
      .selectAll ('*')
      .map (this.register, this)

    this.dispatchEvent
      (new Event ('idle'))
  }
})

// http://2ality.com/2013/09/window.html
// http://tobyho.com/2013/03/13/window-prop-vs-global-var

const Element = tag => (

//      const constructor =// swizzle
//        typeof tag === 'string'
//    //    ? HTMLCustomElement
//    //    : HTMLElement

        //https://gist.github.com/allenwb/53927e46b31564168a1d
        // https://github.com/w3c/webcomponents/issues/587#issuecomment-271031208
        // https://github.com/w3c/webcomponents/issues/587#issuecomment-254017839

      Element => // https://en.wikipedia.org/wiki/Higher-order_function
        customElements.define
          ( tag + '', Custom (Element) )

// Assign `window.Element.prototype` in case of feature checking on `Element`
//  E.prototype = Element.prototype
//  return E
)
