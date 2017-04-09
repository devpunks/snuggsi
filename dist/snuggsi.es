class TokenList {

  constructor (nodes) {
    const
      symbolize = symbol =>
        symbol.match (/(\w+)/g) [0]

    , insert = token =>
        symbol => this [symbol] = token

    , tokenize = token =>
        token.textContent.match (/{(\w+)}/g)
          .map (symbolize)
          .map (insert (token))

    , textify = node =>
        (node.text = node.data) && node

    nodes
      .map (textify)
      .map (tokenize)
  }


  bind (context, node) {

    for (const property in this)
      node = this [property]
      , node.data = node.text

    for (const property in this)
      node = this [property]
      , node.data = node.data
        .replace ('{'+property+'}', context [property])

    return this
  }
}

const ParentNode = Node =>
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

(class extends Node {
  // http://jsfiddle.net/zaqtg/10
  // https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker
  // https://developer.mozilla.org/en-US/docs/Web/API/NodeIterator
  // https://www.w3.org/TR/DOM-Level-2-Traversal-Range/traversal.html
  // https://developer.mozilla.org/en-US/docs/Web/API/NodeFilter
  // NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT

  selectAll (selector) {
    return this.listenable
      (this.querySelectorAll (selector))
  }

  // watch out for clobbering `HTMLInputElement.select ()`
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select
  select (selector) { return this.selectAll (selector) [0] }

  get texts () {
    const
      visit = (node, filter = /({\w+})/g) =>
        filter.exec (node.data) // stored regex is faster https://jsperf.com/regexp-indexof-perf
          && NodeFilter.FILTER_ACCEPT

    , walker = document.createNodeIterator
        (this, NodeFilter.SHOW_TEXT, visit)
        // by default breaks on template YAY! 🎉

    let
      node
    , nodes = []

    while (node = walker.nextNode ())
      nodes.push (node)

    return nodes
  }

  get tokens () {
    return this._tokens
      || (this._tokens = new TokenList (this.texts))
  }
})

//function comb
//  // ElementTraversal interface
//  // https://www.w3.org/TR/ElementTraversal/#interface-elementTraversal
//
//(parent) {
//  if (parent.hasChildNodes())
//    for (let node = parent.firstChild; node; node = node.nextSibling)
//      comb (node)
//}
const EventTarget = Node =>

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

(class extends Node {

  listen (event, listener = 'on' + this [event])

    // MDN EventTarget.addEventListener
    // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
    //
    // WHATWG Living Standard EventTarget.addEventListener
    // https://dom.spec.whatwg.org/#dom-eventtarget-removeeventlistener
    //
    // DOM Level 2 EventTarget.addEventListener
    // https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget-addEventListener

    { this.addEventListener (event, listener) }

//ignore (event, listener = 'on' + this [event])
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

//listenable (nodes) {
//  return Array.prototype.map
//    .call (nodes, node => Object.assign
//      (node, {listen: this.listen.bind(this)})) // MUTATES!
//  return nodes
//}
})
const GlobalEventHandlers = Node =>

  // DOM Levels
  // (https://developer.mozilla.org/fr/docs/DOM_Levels)
  //
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
  // Inline Model
  // https://en.wikipedia.org/wiki/DOM_events#DOM_Level_0#Inline_model
  //
  // Traditional Model
  // https://en.wikipedia.org/wiki/DOM_events#Traditional_model
  //
  // Traditional Registration
  // http://www.quirksmode.org/js/events_tradmod.html

(class extends Node {

  constructor () { super ()
    this.register (this.querySelectorAll ('*'))
  }

  register (nodes) {
    console.log ('what', nodes)

    const exclude =
      ['template', 'link', 'style', 'script']

    , blacklist = element =>
        ! exclude.includes
            (element.tagName.toLowerCase ())

    var a = [this, ...(Array.from (nodes))]
      .filter (blacklist)
      .map (this.mirror, this)

    return this
  }

  mirror (node) {
    const
      filter   = /^on/
    , onevents = name => filter.exec (name)
    , events   = prototype => introspect (prototype).filter (onevents)

    , subtract = list =>
        item => list.indexOf (item) < 0

    , introspect = (prototype = Element) =>
        Object.getOwnPropertyNames (prototype)

    , reflect = self => function (events) {
        events
          .filter (name => self [name] !== undefined)
          .map (delegate (self), this)
    }

    , delegate = self => function (name) {
        self [name] = self
          [(/{\s*(\w+)\s*}/.exec (self [name]) || Array (2)) [1]]
            || this [name]
      }

    , implicit = events (Node)
    , explicit = Array.from (node.attributes)
        .map  (attr => attr.name)
        .filter (onevents)

    console.log(Node.onclick, explicit)

    void [implicit.filter (subtract (explicit)), explicit]
      .map ( reflect (this), Node )
  }

  // custom element reactions
  connectedCallback () {
    void ( super.constructor.onconnect
      || super.connectedCallback
      || function noop () {}
    ).call (this)

    this.render ()
  }

  static get observedAttributes () { return ['id'] }
  attributeChangedCallback (property, previous, next)
    { console.warn ('['+property+'] ['+previous+'] to ['+next+']') }
})
var ElementPrototype = window.Element.prototype // see bottom of this file

const Element = function (
  // Custom elements polyfill
  // https://github.com/webcomponents/custom-elements/blob/master/src/custom-elements.js
  // https://github.com/w3c/webcomponents/issues/587#issuecomment-271031208
  // https://github.com/w3c/webcomponents/issues/587#issuecomment-254017839
  // Function.name - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name#Examples
  //https://gist.github.com/allenwb/53927e46b31564168a1d

  tag = Array.isArray
    (arguments [0]) ? arguments [0][0] : arguments [0]

, CustomElementRegistry = window.customElements
) {

  return function // https://en.wikipedia.org/wiki/Higher-order_function
    (HTMLElement, self = ! (this === window) ? this : {})
  { // Should this be a class❓❓❓❓

    try
      { return new CustomElementRegistry.get (tag) }

    catch (_)
      { /* console.warn('Defining Element `'+tag+'` (class {})') */ }

    class HTMLCustomElement extends // mixins
      (GlobalEventHandlers (EventTarget (ParentNode (HTMLElement))))
    { // exotic object - https://github.com/whatwg/html/issues/1704

      constructor () { super () && super.initialize () }

      render () { this.tokens.bind (this.context) }

      get context () { return self }
      set context (value) { self = value }
      get templates () { return this.selectAll ('template') }
    }

    try
      { CustomElementRegistry.define (tag, HTMLCustomElement) }

    finally
      { return CustomElementRegistry.get (tag) }
  }
}

// Assign `window.Element.prototype` in case of feature checking on `Element`
Element.prototype = ElementPrototype
  // http://2ality.com/2013/09/window.html
  // http://tobyho.com/2013/03/13/window-prop-vs-global-var
  // https://github.com/webcomponents/webcomponentsjs/blob/master/webcomponents-es5-loader.js#L19
const Template = function ( name = 'snuggsi' ) {
  return Object.assign (factory (...name), { bind })

  function bind (context) {
    context = (Array.isArray (context) ? context : [context])

    const
      tokens   = []
    , rendered = context
        .map (context => this.content.cloneNode (true))
        .map (collect, tokens)

    this.innerHTML = ''
    for (const frame of rendered) this.content.appendChild (frame)

    return context.map(transfer, tokens) && this
  }

  function factory (name) {
    return (
       document.querySelector ('template[name='+name+']').cloneNode (true)
    || document.createElement ('template')
  )}

  function collect (fragment) {
    const objectify = tokens =>
      tokens.reduce ( (object, token) =>
        (object [token.textContent.match (/{(.+)}/) [1]]  = token) && object
      , {})

    return this.push (objectify (tokenize (fragment))) && fragment
  }

  function transfer (context, index) {
    for (const property in context) this [index]
      [property] && (this [index] [property].textContent = context [property])
  }
}
