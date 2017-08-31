// The CustomElementRegistry Interface
// WHATWG - https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-api
//
// The Custom Elements Spec
// WHATWG- https://html.spec.whatwg.org/multipage/custom-elements.htm

class CustomElementRegistry {

  define (tag, constructor) {
    console.warn ('WHAT THE FUCK THIS WORKED FOR IE!!!!')
    console.warn ('tag:', tag)
    console.warn ('class definition:', constructor)
  }
}

// WHATWG Custom Elements Spec - https://html.spec.whatwg.org/multipage/custom-elements.htm

window.customElements
  = window.customElements
  || CustomElementRegistry

void (new window.customElements).define ('foo-bar')
const HTMLLinkElement = function

  // http://w3c.github.io/webcomponents/spec/imports/#h-interface-import

(tag) {

  const
    evt = new Event ('load')

  , target = document.querySelector // use CSS :any ?
      ('link[href*='+tag+'][rel=import]')

  // https://github.com/webcomponents/html-imports#htmlimports
  ;(evt.target = target)
    && window.HTMLImports
    && !!! window.HTMLImports.useNative
    && HTMLImports.whenReady ( _ => target.dispatchEvent (evt) ) // eww

  return target
}

class TokenList {

  constructor (node) {

    this
      .sift (node)
      .map  (this.tokenize, this)
  }

  tokenize (node) {

    const
      insert = node =>
        symbol =>
          (this [symbol] = this [symbol] || []).push (node)

    void (node.text = node.textContent)
      .match (/([^{]*?)(\w|#)(?=\})/g)
      .map (insert (node))
  }

  sift (node) {

    const
      nodes = []
    , expression = /{(\w+|#)}/

    , visit = node =>
        node.nodeType === Node.TEXT_NODE
          ? TEXT_NODE (node)
          : ELEMENT_NODE (node.attributes)
        && NodeFilter.FILTER_REJECT // We don't need 'em

    , TEXT_NODE = node =>
        expression.test (node.textContent)
        && nodes.push (node)

    , ELEMENT_NODE = attrs =>
        Array
          .from (attrs)
          .map  (attr => expression.test (attr.value) && nodes.push (attr))

    , walker =
        document.createNodeIterator
          (node, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, visit)
          // by default breaks on template YAY! 🎉

    while (walker.nextNode ()) 0 // Walk all nodes and do nothing.

    return nodes
  }

  bind (context) {

    const
      keys = Object.keys (this)

    , reset = symbol =>
        this [symbol].map
          (node => (node.textContent = node.text) && symbol)

    , replace =
        (symbol, token = '{'+symbol+'}') =>
          item =>
            (item.textContent = item.textContent.replace (token, context [symbol]))

    keys.map (reset)

    for (let symbol in this)
      this [symbol]
        .map (replace (symbol))
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
//        .map (element => element && new Text (element))
//}
}

// INTERESTING! Converting `Template` to a class increases size by ~16 octets

const Template = HTMLTemplateElement = function (template) {

  template =
    (typeof template == 'string')
      ? document.querySelector ('template[name='+template+']')
      : template

  // create shallow clone using `.getOwnPropertyDescriptors`
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors#Examples
  // https://docs.microsoft.com/en-us/scripting/javascript/reference/object-getownpropertydescriptor-function-javascript
  // NO IE SUPPORT!!!!
  return Object.assign (template, { bind } )

  function bind (context) {

    let
      html     = ''
    , template = this.innerHTML
    , contexts =
        [].concat ( ... [context] )
        // https://dom.spec.whatwg.org/#converting-nodes-into-a-node

    , keys =
        Object
          .keys (contexts [0] || [])    // memoize keys
          .concat (['#', 'self']) // add helper keys

    , tokens   = keys.map (key => '{'+key+'}') // memoize tokens
    , fragment = document.createElement ('template')

    , deposit = (context, index) => {
        let clone = template

        context = (typeof context  === 'object')
          ? context : { self: context }

        context ['#'] = index

        for (let i=0; i<tokens.length; i++)
          clone = clone
            .split (tokens [i])
            .join  (context [keys [i]])

        return clone
      }

    void (this.dependents || [])
      .map (dependent => dependent.remove ())

    for (let i=0, final = ''; i<contexts.length; i++)
      html += deposit (contexts [i], i)

    fragment.innerHTML = html

    this.dependents = Array.from // non-live
      (fragment.content.childNodes)

    this.after ( ... this.dependents )
  }
}
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

  selectAll ( fragments, ... tokens ) {
    fragments =
      [].concat ( ... [fragments] )

    const
      zip = (selector, token) =>
        selector + token + fragments.shift ()

    return Array
      .from
        (this.querySelectorAll
          (tokens.reduce (zip, fragments.shift ())))
  }

  select ( ... selector )
    // watch out for clobbering `HTMLInputElement.select ()`
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select
    { return this.selectAll ( ... selector ) [0] }

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

  onconnect (event, target) {

    (target = event.target)
      && this.mirror (target.import.querySelector ('template'))

    super.onconnect
      && super.onconnect ()

    this.tokens = new TokenList (this)
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

  reflect (handler, event) {
    ( event = ( handler.match (/^on(.+)$/) || [] ) [1] )

    && Object.keys // ensure W3C on event
     ( HTMLElement.prototype )
       .includes ( handler )

    && this.on (event, this [handler])
  }

  register (node) {
    const
      register = (event, handler) =>
        // https://www.quirksmode.org/js/events_tradmod.html
        // because under traditional registration the handler value is wrapped in scope `{ onfoo }`
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

const Component = HTMLElement => // why buble

( class extends // interfaces
  ( EventTarget ( ParentNode ( GlobalEventHandlers ( HTMLElement ))))
{

  constructor () { super ()

    let
      descriptions =
        Object.getOwnPropertyDescriptors
          (HTMLElement.prototype)

    , bind = key =>
        'function' === typeof descriptions [key].value
        && (this [key] = this [key].bind (this))

    Object
      .keys (descriptions)
      .map (bind)

    Object
      .getOwnPropertyNames (HTMLElement.prototype)
      // POTENTIAL REDUNDANCY
      // Aren't `on` events set up in `.bind` on 20?
      // If so we are `.bind`ing to `this` on two iterations
      // of the same function
      .map (this.reflect, this)

    this.context = {}
    this.initialize && this.initialize ()
  }


  connectedCallback (link) {
    link = HTMLLinkElement
      (this.tagName.toLowerCase ())

    link
      ? link.addEventListener ('load', this.onconnect.bind (this))
      : this.onconnect (new Event ('load'))
  }


  render () {

    this.tokens.bind (this)


    Array
      .from
        (this.selectAll ('template[name]'))

      .map
        (template => template.getAttribute ('name'))

      .map
        (name => (new Template (name)).bind (this [name]))


    Array
      .from (this.selectAll ('*'))

      .concat ([this])

      .map (this.register, this)


    super.onidle && super.onidle ()
  }


  mirror (template, insert) {

    template = template.cloneNode (true)

    insert = (replacement, name, slot) =>
      (name = replacement.getAttribute ('slot')) &&

      (slot = template.content.querySelector ('slot[name='+name+']'))
         // prefer to use replaceWith however support is sparse
         // https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/replaceWith
         // using `Node.parentNode` - https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode
         // & `Node.replaceChid` - https://developer.mozilla.org/en-US/docs/Web/API/Node/replaceChild
         // as is defined in (ancient) W3C DOM Level 1,2,3
         .parentNode
         .replaceChild (replacement, slot)

    for (let replacement of this.selectAll ('[slot]'))
      insert (replacement)

    Array
      .from (template.attributes)

      // skip swapping attribute if setting exists
      .filter (attr => !!! this.attributes [attr.name])

      .map  (attr => this.setAttribute (attr.name, attr.value))

    this.innerHTML = template.innerHTML
  }
})

const ElementPrototype = window.Element.prototype // see bottom of this file

const Element = tag =>

    //https://gist.github.com/allenwb/53927e46b31564168a1d
    // https://github.com/w3c/webcomponents/issues/587#issuecomment-271031208
    // https://github.com/w3c/webcomponents/issues/587#issuecomment-254017839

    Element => // https://en.wikipedia.org/wiki/Higher-order_function
      window.customElements.define
        ( ... [].concat ( ... [tag]), Component (Element))

// Assign `window.Element.prototype` in case of feature checking on `Element`
Element.prototype = ElementPrototype
  // http://2ality.com/2013/09/window.html
  // http://tobyho.com/2013/03/13/window-prop-vs-global-var
  // https://github.com/webcomponents/webcomponentsjs/blob/master/webcomponents-es5-loader.js#L19

