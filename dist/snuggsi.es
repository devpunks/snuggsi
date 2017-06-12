const HTMLLinkElement = function

  // http://w3c.github.io/webcomponents/spec/imports/#h-interface-import

(tag) {

  const
    proxy = {}

  , link = document.querySelector // use CSS :any ?
      ('link#'+tag+'[rel=import], link[href*='+tag+'][rel=import]')

  , register = (event, handler) => // https://github.com/webcomponents/html-imports#htmlimports

      (HTMLImports && !!! HTMLImports.useNative)
        ? HTMLImports.whenReady
            ( _ => handler ({ target: link }) ) // eww

        : link.addEventListener
            (event, handler)


    Object
      .defineProperties (proxy, {

        'addEventListener': {
          writable: false,

          value: function (event, handler) {
            !!! link
              ? handler  ({ target: proxy })
              : register (event, handler)
          }
        }

// TODO: definition for onerror
//    , 'onerror':
//        { set (handler) {} }
      })

  return proxy
}

class TokenList {

  constructor (node) {

    const
      tokenize = node =>
        (node.text = node.textContent)

        && node.textContent
            .match (/{(\w+|#)}/g)
              .map (symbol => symbol.match (/(\w+|#)/g) [0])
              .map (insert (node))

    , insert = token =>
        symbol =>
          (this [symbol] = this [symbol] || [])
            && this [symbol].push (token)

    this
      .sift (node)
      .map  (tokenize)
  }


  sift (node) {

    const
      nodes = []

    , visit = node =>
        node.nodeType === Node.TEXT_NODE
          ? TEXT_NODE (node)
            && NodeFilter.FILTER_ACCEPT // Accept TEXT_NODEs

          : ELEMENT_NODE (node.attributes)
            && NodeFilter.FILTER_REJECT // reject ELEMENT_NODEs

    , TEXT_NODE = node =>
        /{(\w+|#)}/.test (node.textContent)

    , ELEMENT_NODE = attributes =>
        Array
          .from (attributes)
          .filter (attr => /{(\w+|#)}/g.test (attr.value))
          .map (attribute => nodes.push (attribute))

    , walker =
        document.createNodeIterator
          (node, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, visit)
          // by default breaks on template YAY! 🎉

    while
      (node = walker.nextNode ())
        nodes.push (node)

    return nodes
  }

  bind (context) {

    const
      replace = symbol =>
        this [symbol]
          .map (token => token.textContent = token.text)

        && this [symbol]
          .map (replacement (symbol))

    , replacement = symbol =>
        item => // thunk
          item.textContent = item.textContent
            .replace ('{'+symbol+'}', context [symbol])

    Object
      .keys (this)

      .filter
        (key => context [key] !== undefined)

      .map (replace)
  }

//zip (...elements) {

//  const
//    lock = (zipper, row) => [...zipper, ...row]

//  , pair = teeth => // http://english.stackexchange.com/questions/121601/pair-or-couple
//      (tooth, position) => // thunk
//        [tooth, teeth [position]]

//  return elements [1]
//    .map (pair (elements [0]))
//    .reduce (lock)
//}

//slice (text, tokens = []) {

//  const
//    match    = /({\w+})/g // stored regex is faster https://jsperf.com/regexp-indexof-perf
//  , replace  = token => (collect (token), '✂️')
//  , collect  = token => tokens.push (token)
//  , sections = text
//      .replace (match, replace)
//        .split ('✂️')

//  return zip (tokens, sections)
//     .filter (element => element)
//        .map (element => new Text (element))
//}
}

// INTERESTING! Converting `Template` to a class increases size by ~16 octets

const HTMLTemplateElement = Template = function (name) {

  return Object.assign
    (document.querySelector ('template[name='+name+']'), { bind } )

  function bind (context) {
    contexts = [].concat ( ... [context] )

    let
      clone
    , template = this.cloneNode (false)

    template.innerHTML =
    contexts
      .map (context => context)
      .map ((context, index) => {

      context =
        (typeof context  === 'object') ? context : { self: context }

      context ['#'] = index

      clone  = this.cloneNode (true)

      void (new TokenList (clone.content))
        .bind (context)

      return clone.innerHTML // immutable snapshot
    })
    .join ('')

    void (this.dependents || [])
      .map (dependent => dependent.remove ())

    this.dependents =
      Array.from
        (template.content.childNodes)

    this.after ( template.content )

    return this
  }
}

const EventTarget = Element => // why buble

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

(class extends Element {

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

    return (event, render = true) =>
      (event.prevent = _ =>
         (render = false) && event.preventDefault ())

      && handler.call (this, event) !== false // for `return false`

      && render && this.render () // check render availability
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

  // http://jsfiddle.net/zaqtg/10
  // https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker
  // https://developer.mozilla.org/en-US/docs/Web/API/NodeIterator
  // https://www.w3.org/TR/DOM-Level-2-Traversal-Range/traversal.html
  // https://developer.mozilla.org/en-US/docs/Web/API/NodeFilter
  // NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT

  selectAll (selector)
    { return this.querySelectorAll (selector) }

  select (selector)
    // watch out for clobbering `HTMLInputElement.select ()`
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select
    { return this.selectAll (selector) [0] }

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
  // https://en.wikipedia.org/wiki/DOM_events#DOM_Level_0#Inline_model
  //
  // Traditional Model
  // https://en.wikipedia.org/wiki/DOM_events#Traditional_model
  //
  // Traditional Registration
  // http://www.quirksmode.org/js/events_tradmod.html

(class extends Element {

  onconnect (event, document) {

    (document = event.target.import)
      && this.parse (document.querySelector ('template'))

    super.onconnect
      && super.onconnect ()

    this.render ()
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

  introspect (handler, name) {
    ( name = ( handler.match (/^on(.+)$/) || [] ) [1] )

    && Object.keys // ensure W3C on event
     ( HTMLElement.prototype )
       .includes ( handler )

    && this.on (name, this [handler])
  }

  reflect (node) {
    const
      register = (event, handler) =>
        (handler = /{\s*(\w+)\s*}/.exec (node [event]))

        && ( handler = this [ (handler || []) [1] ] )
        && ( node [event] = this.renderable (handler) )

    Array
      .from (node.attributes)
      .map (attr => attr.name)
      .filter (name => /^on/.test (name))
      .map (register)
  }
})

const Component = Element => // why buble

  // exotic object - https://github.com/whatwg/html/issues/1704

( class extends // interfaces
  ( EventTarget ( ParentNode ( GlobalEventHandlers ( Element ))))
{

  constructor () { super ()

    this.context = {}

    this.tokens = new TokenList (this)

    Object
      .getOwnPropertyNames (Element.prototype)
      .map (this.introspect, this)

    // dispatch `initialize`
    // and captured from `EventTarget`
    this.initialize
      && this.initialize ()
  }

  connectedCallback () {

    new HTMLLinkElement
      (this.tagName.toLowerCase ())
        .addEventListener ('load', this.onconnect.bind (this))
  }

  render () {

    this.tokens.bind (this)

    Array
      .from // templates with `name` attribute
        (this.selectAll ('template[name]'))

      .map
        (template => template.getAttribute ('name'))

      .map
        (name => (new Template (name)).bind (this [name]))

    Array
      .from (this.selectAll ('*'))

      .concat ([this])

      .map (this.reflect, this)

    // dispatch `idle`
    // and captured from `EventTarget`
    super.onidle && super.onidle ()
  }

  // This doesn't go here. Perhaps SlotList / Template / TokenList (in that order)
  parse (template) {

    const
      fragment = template.content
        .cloneNode (true)

    , slots =
        Array.from (fragment.querySelectorAll ('slot'))

    , replace = replacement =>
        slots
          .filter (match (replacement))
          .map (exchange (replacement))

    , match = replacement =>
        slot =>
          replacement.getAttribute ('slot')
            === slot.getAttribute  ('name')

    , exchange = replacement =>
        slot =>
          slot
            // prefer to use replaceWith however support is sparse
            // https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/replaceWith
            // using `Node.parentNode` & `Node.replaceChid` as is defined in (ancient) W3C DOM Level 1,2,3
            .parentNode
            .replaceChild (replacement, slot)

    Array // map attributes from template
      .from (template.attributes)
      .map  (attribute => this.setAttribute (attribute.name, attribute.value))

    Array // map slots from template
      .from (this.querySelectorAll ('[slot]'))
      .map  (replace)

    this.innerHTML = template.innerHTML
  }

})

const ElementPrototype = window.Element.prototype // see bottom of this file

const Element =
  (tag, CustomElementRegistry = window.customElements ) =>

    //https://gist.github.com/allenwb/53927e46b31564168a1d
    // https://github.com/w3c/webcomponents/issues/587#issuecomment-271031208
    // https://github.com/w3c/webcomponents/issues/587#issuecomment-254017839

    Element => // https://en.wikipedia.org/wiki/Higher-order_function
      CustomElementRegistry
        .define ( ...tag, Component (Element))

// Assign `window.Element.prototype` in case of feature checking on `Element`
Element.prototype = ElementPrototype
  // http://2ality.com/2013/09/window.html
  // http://tobyho.com/2013/03/13/window-prop-vs-global-var
  // https://github.com/webcomponents/webcomponentsjs/blob/master/webcomponents-es5-loader.js#L19

