// http://nshipster.com/method-swizzling/
// HTMLElement Swizzle - To swizzle a method is to change a class’s dispatch table in order to resolve messages from an existing selector to a different implementation, while aliasing the original method implementation to a new selector.

// 3.2.3 HTML element constructors
// https://html.spec.whatwg.org/multipage/dom.html#html-element-constructors
// Satisfy Element interface document.createElement
//   - https://dom.spec.whatwg.org/#concept-element-interface


//// base class to extend, same trick as before
//class HTMLCustomElement extends HTMLElement {

//  constructor(_)
//    { return (_ = super(_)).init(), _; }

//  init()
//    { /* override as you like */ }
//}

const HTMLElement =

( _ => {
  function E () {}

  E.prototype =
    window.HTMLElement.prototype

  return E
})()

// http://jsfiddle.net/zaqtg/10
// https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker
// https://developer.mozilla.org/en-US/docs/Web/API/NodeIterator
// https://www.w3.org/TR/DOM-Level-2-Traversal-Range/traversal.html
// https://developer.mozilla.org/en-US/docs/Web/API/NodeFilter

class DOMTokenList {

  constructor (node, symbol) {

    const
      nodes = []
    , expression = /{(\w+|#)}/

    , visit = node =>
        node.localName
          ? [].slice
              .call (node.attributes)
              .map  (attr => expression.test (attr.value) && nodes.push (attr))
          : expression
              .test (node.textContent) && nodes.push (node)

    , walker =
        document.createNodeIterator
          (node, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, visit, null)


    while (walker.nextNode ()) 0 // Walk all nodes and do nothing.


    for (node of nodes)
      (node.text = node.textContent)
        .match (/[^{]+(?=})/g)
        .map   (symbol => (this [symbol] || (this [symbol] = [])).push (node))

  }

  bind (context) {

    const
      reset = symbol =>
        this [symbol].map // more than one occurrence
          (node => node.textContent = node.text)
        && symbol

   // must both run independently not in tandem

    , restore = (symbol) =>
         this [symbol].map (node =>
           (node.textContent =
             node.textContent
               .split ('{'+symbol+'}')
               .join  (context [symbol])))

    Object
      .keys (this)
      .map  (reset)
      .map  (restore)
  }
}

// Preloading - https://w3c.github.io/preload
// $$$$ loading capabilities - https://pie.gd/test/script-link-events/
// $$$$ when is a stylesheet really loaded? https://www.phpied.com/when-is-a-stylesheet-really-loaded/
// IE11 Support for Prerender / Prefetch - https://msdn.microsoft.com/en-us/library/dn265039(v=vs.85).aspx
// Resource Hints - https://www.w3.org/TR/resource-hints
// https://jakearchibald.com/2017/h2-push-tougher-than-i-thought/#push-vs-preload
// http://w3c.github.io/webcomponents/spec/imports/#h-interface-import
// https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/12142852/
// Caching best practices - https://jakearchibald.com/2016/caching-best-practices/
// $$$$$$ HOT SWAP URL BASE PATHS! https://eager.io/blog/three-real-world-use-cases-for-mutation-observer
//
//
// Link in body
//
// https://github.com/whatwg/html/commit/179983e9eb99efe417349a40ebb664bd11668ddd
// https://bugs.webkit.org/show_bug.cgi?id=172639
// https://github.com/whatwg/html/pull/616#issuecomment-180018260
// future links
void (_ => {
  // https://www.w3.org/TR/html5/document-metadata.html#the-link-element
  const onload = link => {
    return function () {
      const
        next = link.nextSibling

      , reflect = (clone, node) => attr =>
          node [attr]
            && (clone [attr] = node [attr])

      for
        (let node of document.querySelectorAll (link.id))
          stamp.call
            (node, this.response.querySelectorAll ('template') [0].cloneNode (true))


      for (let node of this.response.querySelectorAll ('style,link,script')) {
        let
          as = node.getAttribute ('as')

        , clone =
            document.createElement (node.localName)


        void ['src', 'href', 'textContent', 'rel']
          .map (reflect (clone, node))

        // use rel = 'preload stylesheet' for async
        // or use media=snuggsi => media || 'all' trick
        // loadCSS - https://github.com/filamentgroup/loadCSS
        // http://keithclark.co.uk/articles/loading-css-without-blocking-render
        'style' == as && (clone.rel = 'stylesheet')

        link.parentNode.insertBefore (clone, next)

        'script' == as &&
          (link.parentNode.insertBefore
            (document.createElement ('script'), next)
              .src = node.href)
        ;

        /script|test/.test (as)
          || reflect (clone, node)('as')
      }
    }
  };


  [].slice
    .call (document.querySelectorAll ('link[rel^=pre][id*="-"]'))
    .map  (preload)

  function preload (link) {
    const xhr = new XMLHttpRequest

    xhr.open ('GET', link.href)
    xhr.responseType = 'document'
    xhr.onload = onload (link)
    xhr.send ()
  }

document.documentElement
  .addEventListener ('load', console.dir);

//create an observer instance
(new MutationObserver ( mutations => {

  const added = mutations.map (mutation => mutation.addedNodes.length)

  console.warn ('SNUGGS', document.readyState, added)

  for (let mutation of mutations)
    for (let node of mutation.addedNodes) {
      'link' == node.localName
         && /^pre/.test (node.rel)
           && /\-/.test (node.id)
             && preload (node)
      ;

      /\-/.test (node.localName)
        && console.warn ('ce', node.localName, document.readyState)
    }
}))

.observe (document.documentElement, { childList: true, subtree: true })



  // Slot stamping
  // https://github.com/w3c/webcomponents/issues/288
  function stamp (template, insert, replacement) {
    for (replacement of this.querySelectorAll ('[slot]'))
        (template.content || template).querySelector
          ('slot[name='+ replacement.getAttribute ('slot') +']')
            .outerHTML = replacement.outerHTML

    this.innerHTML = template.innerHTML
  }

}) ()

// https://people.cs.pitt.edu/~kirk/cs1501/Pruhs/Spring2006/assignments/editdistance/Levenshtein%20Distance.htm

// https://github.com/WebReflection/hyperHTML/pull/100

// https://skillsmatter.com/skillscasts/10805-an-isomorphic-journey-to-a-lighter-and-blazing-fast-virtual-dom-alternative#video

// https://github.com/webcomponents/template
const Template = template => {

  template.length
    && ( template = document.querySelector
       ( 'template[name=' + template + '' + ']' ) )

  let
    HTML   = template.innerHTML
  , anchor = template.nextSibling

  template.innerHTML = ''

  template.bind =
    bind.bind (template)

  return template

  function bind (context) {

    const
      fragment =
        document.createElement ('section')

    , deposit = (html, context, index) => {
        let clone = HTML

        typeof context != 'object'
          && ( context  = { self: context })

        context ['#'] = index

        for (let i in context)
          clone = clone
            .split ('{'+i+'}')
            .join  (context [i])

        return html + clone
      }

    for (let node of // removes IE childNodes
          (this.dependents || [] ))
            node.parentNode.removeChild (node)


    fragment.innerHTML =
      []
        .concat (context)
        .reduce (deposit, '')


    for (let dependent of
          this.dependents = // non-live nodelist
            [].slice.call (fragment.childNodes))

        this
          .parentNode
          .insertBefore (dependent, anchor)
  }
}

// The CustomElementRegistry Interface
// WHATWG - https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-api
//
// HTML Element Constructors
//   - https://html.spec.whatwg.org/multipage/dom.html#html-element-constructors
//
// The Custom Elements Spec
// W3C - https://w3c.github.io/webcomponents/spec/custom/
// WHATWG- https://html.spec.whatwg.org/multipage/custom-elements.htm
//
// Legacy webcomponentsjs
//   - https://github.com/webcomponents/custom-elements/blob/master/src/CustomElementRegistry.js
//
//   - CEReactions
//     - https://github.com/webcomponents/custom-elements/pull/62
//     - https://html.spec.whatwg.org/multipage/custom-elements.html#cereactions
//     - https://html.spec.whatwg.org/#cereactions


! window.customElements
  && (customElements = {/* microfill */})


new class /* CustomElementRegistry */ {

  constructor () {
    customElements.define
      = this.define.bind (this,  _ => 0 )
      //= this.define.bind (this,  customElements.define )
  }

  define ( native, name, constructor ) {
    // this.running = undefined
    //  definition = this.swizzle ( definition );

    (native).apply
      ( customElements, this.register ( name, constructor ) )
  }


  register () {

    'loading' == document.readyState

      ? addEventListener
        ('DOMContentLoaded', this.queue ( ... arguments ))

      : this.queue ( ... arguments )()

    return arguments
  }


  queue ( name, constructor ) {
    return event =>
      // https://www.nczonline.net/blog/2010/09/28/why-is-getelementsbytagname-faster-that-queryselectorall
      [].slice
        .call ( document.getElementsByTagName (name) )
        .map  ( this.upgrade, constructor.prototype )
  }


  // https://wiki.whatwg.org/wiki/Custom_Elements#Upgrading
  // "Dmitry's Brain Transplant"
  upgrade (element) {

    // Here's where we can swizzle
    // see this.swizzle ()
    Object.setPrototypeOf
      (element, this)
        .connectedCallback
          && element.connectedCallback ()
  }

  // http://nshipster.com/method-swizzling/
  swizzle ( constructor ) {
    //see elements/html-custom-element.es
    return new Function ('class extends HTMLElement {}')
  }
}

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
    strings =
      [].concat ( strings )

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

(class extends Element {

  onconnect () {

//  RESERVED FOR IMPORTS WTF IS GOING ON
//  event
//    && (target = event.target)
//    && this.mirror
//      (target.import.querySelector ('template'))

    this.templates =
      this
        .selectAll ('template[name]')
        .map (Template)

    this.tokens =
      new DOMTokenList (this)

    super.onconnect
      && super.onconnect ()
  }

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

    this.onconnect ()
    this.render    ()
  }


  render (template) {

    for (template of this.templates)
      template.bind
        (this [template.getAttribute ('name')])

    this
      .tokens
      .bind (this)

    void

    [this]
      .concat (this.selectAll ('*'))
      .map    (this.register, this)

    super.onidle && super.onidle ()
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
