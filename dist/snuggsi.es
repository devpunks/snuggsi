// http://nshipster.com/method-swizzling/
// HTMLElement Swizzle - To swizzle a method is to change a class’s dispatch table in order to resolve messages from an existing selector to a different implementation, while aliasing the original method implementation to a new selector.

// 3.2.3 HTML element constructors
// https://html.spec.whatwg.org/multipage/dom.html#html-element-constructors
// Satisfy Element interface document.createElement
//   - https://dom.spec.whatwg.org/#concept-element-interface


  window.HTMLElement = function (constructor) {

    const E = function HTMLElement () {

      /*  console.dir (this.constructor) */
    }

    E.prototype = constructor.prototype
    E.prototype.constructor = constructor

    return E

  } (HTMLElement)

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


!!! window.customElements
  && (window.customElements = {/* microfill */})


new class CustomElementRegistry {

  constructor ({ define, get, whenDefined } = customElements ) {

    window.customElements.define
      = this._define (define)
        .bind (this)
  }

  _define ( delegate = _=> {} ) {

    this.running = undefined

    //  definition = this.swizzle ( definition );

    return ( name, constructor, options ) => {
      console.warn ('Definining', name, constructor, options)

      void (_=>{}).apply
        ( window.customElements, this.register ( name, constructor ) )
    }
  }

  register (name, Class) {
    // perhaps this goes in swizzle
    (this [name] = Class)
      .localName = name;

    ('loading' === document.readyState)
      && document.addEventListener
        ('DOMContentLoaded', this.queue ( ... arguments ))

    return arguments
  }

  queue ( name, Class, constructor ) {
    return event => {
      let
        selected  =
          document.body
            .querySelectorAll (name)

      , instances = []
          .slice
          .call (selected)
          // .reverse () // should be able to do depth first
          .map  (this.upgrade (Class))
    }
  }

  // https://wiki.whatwg.org/wiki/Custom_Elements#Upgrading
  // "Dmitry's Brain Transplant"
  upgrade (constructor) {
    // Here's where we can swizzle
    return function (element) {

      element =
        Object.setPrototypeOf
          (element, constructor.prototype)

      element.connectedCallback
        && element.connectedCallback ()
    }
  }

  // http://nshipster.com/method-swizzling/
  static swizzle ( name, ... Class ) {

    return definition // tuple
  }
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
        []
          .slice
          .call (attrs)
          .map  (attr => expression.test (attr.value) && nodes.push (attr))

    , walker =
        document.createNodeIterator
          (node, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, visit, null)
          // by default breaks on template YAY! 🎉

    while (walker.nextNode ()) 0 // Walk all nodes and do nothing.

    return nodes
  }

  bind (context) {

    const
      reset = symbol =>
        this [symbol].map // more than one occurrence
          (node => node.textContent = node.text)
        && [symbol, this [symbol]]

   // must both run independently not in tandem


    for (let symbol of Object.keys (this))
      this [symbol]
        .map (reset)

    for (let symbol of Object.keys (this))
      this [symbol]
        .map (replace (symbol))
  }

}

//function zip (...elements) {
//  const
//    lock = (zipper, row) => [...zipper, ...row]
//  , pair = teeth => // http://english.stackexchange.com/questions/121601/pair-or-couple
//      (tooth, position) => // thunk
//        [tooth, teeth [position]]

//  return elements [1]
//    .map (pair (elements [0]))
//    .reduce (lock)
//}

//function slice (text, tokens = []) {
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

// https://people.cs.pitt.edu/~kirk/cs1501/Pruhs/Spring2006/assignments/editdistance/Levenshtein%20Distance.htm

// https://github.com/WebReflection/hyperHTML/pull/100

// https://skillsmatter.com/skillscasts/10805-an-isomorphic-journey-to-a-lighter-and-blazing-fast-virtual-dom-alternative#video

// https://github.com/webcomponents/template
const Template = HTMLTemplateElement = function (template) {

  template =
    typeof template == 'string'
      ? document.querySelector ('template[name='+template+']')
      : template

  template =
    this === HTMLTemplateElement
      ? template.cloneNode (true)
      : template

  template.name =
    template.getAttribute ('name')

  template.comment =
    document.createComment (template.name)

  template
    .parentNode
    .replaceChild
      (template.comment, template)

  Object
    .defineProperty
      (template, 'bind'
      , { value: bind, writable: true, configurable: true })

  return template

  function bind (context) {

    let
      html     = ''
    , template = this.innerHTML
    , contexts = [].concat ( ... [context] )
        // https://dom.spec.whatwg.org/#converting-nodes-into-a-node

    const
      keys =
        'object' === typeof contexts [0]
          ? Object.keys (contexts [0])    // memoize keys
          :  []
          .concat (['#', 'self']) // add helper keys

    , tokens =
        keys.map (key => '{'+key+'}') // memoize tokens

    , fragment = // create template polyfill here
        document.createElement ('template')

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

    void ( this.dependents || [] ).map
      (dependent => dependent.parentNode.removeChild (dependent))

    for (let i=0, final = ''; i<contexts.length; i++)
      html += deposit (contexts [i], i)

    fragment.innerHTML = html

    var children =
      (fragment.content || fragment).childNodes

    this.dependents =
      Array.apply (null, children) // non-live

    this.comment.after
      && this.comment.after ( ... this.dependents )

    !!!  this.comment.after
      && this.dependents.reverse ()
         .map (dependent =>
           this.comment.parentNode.insertBefore
             (dependent, this.comment.nextSibling))
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

    // BIG BUG IN IE!!!
    //
    // https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called
    //
    // https://github.com/webcomponents/webcomponents-platform/blob/master/webcomponents-platform.js#L16

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
      zip =
        (part, token) =>
          part + token + fragments.shift ()

    , selector =
        tokens.reduce (zip, fragments.shift ())

    return []
      .slice
      .call ( this.querySelectorAll (selector) )
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
  // https://en.wikipedia.org/wiki/DOM_events#Inline_model
  //
  // Traditional Model
  // https://en.wikipedia.org/wiki/DOM_events#Traditional_model
  //
  // Traditional Registration
  // http://www.quirksmode.org/js/events_tradmod.html

(class extends Element {

  onconnect (event, target) {

//  RESERVED FOR IMPORTS WTF IS GOING ON
//  event
//    && event.target
//    && (target = event.target)
//    && this.mirror
//      (target.import.querySelector ('template'))

    this
      .templates = []
      .slice
      .call (this.selectAll ('template[name]'))
      .map  (template => new Template (template))

    this.tokens =
      new TokenList (this)

    super.onconnect
      && super.onconnect ()

    return this
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

    /^on/.test (handler) // `on*`
      && handler // is a W3C event
        in HTMLElement.prototype

      && // automagically delegate event
        this.on ( handler.substr (2), this [handler] )
  }

  register (node) {
    const
      register = (event, handler) =>
        // https://www.quirksmode.org/js/events_tradmod.html
        // because under traditional registration the handler value is wrapped in scope `{ onfoo }`
        (handler = /{\s*(\w+)\s*}/.exec (node [event]))

        && ( handler = this [ (handler || []) [1] ] )
        && ( node [event] = this.renderable (handler) )

    void []
      .slice
      .call (node.attributes)
      .map (attr => attr.name)
      .filter (name => /^on/.test (name))
      .map (register)
  }
})

const Custom = Element => // why buble

( class extends // interfaces
  ( EventTarget ( ParentNode ( GlobalEventHandlers (Element) )))
{
  constructor ()
    { super () /* will need to add initialize () routine */ }

//initialize () {

//  let
//    bindable = property =>
//      Object.getOwnPropertyDescriptor
//        (Element.prototype, property).value

//  , bind = property =>
//      (this [property] = this [property].bind (this))

//  , names =
//      Object.getOwnPropertyNames
//        (Element.prototype)

//  names
//    .filter (bindable)
//    .map    (bind)
//}


  connectedCallback () {

    this.context = {}

    super.initialize
      && super.initialize ()

    super.connectedCallback
      && super.connectedCallback ()

    // POTENTIAL REDUNDANCY
    // Aren't `on` events set up in `.bind` on 16?
    // If so we are `.bind`ing to `this` on two iterations
    // of the same function
    Object.getOwnPropertyNames
      (Element.prototype).map
        (this.reflect, this)

    this
      .onconnect ()
      .render ()
  }


  render () {

    this
      .templates
      .map (template =>
        template.bind (this [template.name]))

    this
      .tokens
      .bind (this)

    void [this]

      .concat ( ... this.selectAll ('*') )

      .map (this.register, this)

    super.onidle && super.onidle ()
  }


})

const ElementPrototype = window.Element.prototype // see bottom of this file

const Element = tag => {

  const constructor =// swizzle
    typeof tag === 'string'
//    ? HTMLCustomElement
//    : HTMLElement

    //https://gist.github.com/allenwb/53927e46b31564168a1d
    // https://github.com/w3c/webcomponents/issues/587#issuecomment-271031208
    // https://github.com/w3c/webcomponents/issues/587#issuecomment-254017839

    return klass => { // https://en.wikipedia.org/wiki/Higher-order_function
      void window.customElements.define
        ( ...  [].concat ( ... [tag])
          , Custom (klass), { prototype: constructor })
    }
}

// Assign `window.Element.prototype` in case of feature checking on `Element`
Element.prototype = ElementPrototype
  // http://2ality.com/2013/09/window.html
  // http://tobyho.com/2013/03/13/window-prop-vs-global-var
  // https://github.com/webcomponents/webcomponentsjs/blob/master/webcomponents-es5-loader.js#L19

