function tokenize (fragment) {
  const
    tokens = []

  , tail = (text, sibling) =>
      (text.after (sibling), sibling)

  // https://www.merriam-webster.com/dictionary/sift
  , sift = text => text
      .textContent.match (/({\w+})/)
      && (tokens [tokens.length] = text)
      || text

  for (match of mine (fragment))
    slice (match.textContent)
      .map (sift)
      .reduce (tail, match)
    , match.remove ()

  return tokens

  // deconstruct
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

    // https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/after
    // Would like to use children
    // to use Element.insertAdjacentElement ('afterend', text)
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement
    // however, text is a Node not an Element
    // WARNING: NO DocumentFragment support
    // https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/children#Browser_compatibility
    // https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
    // BENCHMARK: https://jsperf.com/insertadjacenthtml-perf/3
}

function zip
  (...elements) { const zipper = []

  , lock = (zipper, row) => [...zipper, ...row]
  , pair = teeth  => // http://english.stackexchange.com/questions/121601/pair-or-couple
    // thunk
      (tooth, position) => [tooth, teeth [position]]

  return elements [1]
    .map (pair (elements [0]))
    .reduce (lock)
}

function slice
  (text) { const tokens  = []

  , match    = /({\w+})/g
  , replace  = token => (collect (token), '✂️')
  , collect  = token => tokens.push (token)
  , sections = text
      .replace (match, replace)
        .split ('✂️')

  return zip (tokens, sections)
     .filter (element => element)
        .map (element => new Text (element))
}

function mine // https://www.merriam-webster.com/dictionary/comb#h2
// http://jsfiddle.net/zaqtg/10
// http://stackoverflow.com/questions/2579666/getelementsbytagname-equivalent-for-textnodes#answer-2579869
// https://www.w3.org/TR/DOM-Level-2-Traversal-Range/traversal.html
// https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker
// https://developer.mozilla.org/en-US/docs/Web/API/NodeIterator
// https://developer.mozilla.org/en-US/docs/Web/API/NodeFilter
// NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT

(head) {
  const nodes = []
  const walker = document.createNodeIterator
      (head, NodeFilter.SHOW_TEXT, visit)
      // by default breaks on template YAY! 🎉

  while (node = walker.nextNode ()) nodes.push (node)
  return nodes
}

const tail = (text, sibling) => (text.after (sibling), sibling)

function visit (node) {
  return /({\w+})/g.test (node.data)
    && NodeFilter.FILTER_ACCEPT // <😕  is this even necessary?
}

function comb (parent) {
  if (parent.hasChildNodes())
    for (let node = parent.firstChild; node; node = node.nextSibling)
      DOMComb (node)
}
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
// on* events https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Event_handlers
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Mix-ins
const GlobalEventHandlers = EventTarget => (class extends EventTarget {
  // DOM Levels
  // (https://developer.mozilla.org/fr/docs/DOM_Levels)
  //
  // DOM Level 2 EventTarget
  // 😕  https://w3c.github.io/uievents/DOM3-Events.html#interface-EventTarget
  //❓❓ https://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.html
  //  Within https://w3c.github.io/uievents/#conf-interactive-ua
  //  EventTarget links to WHATWG - https://dom.spec.whatwg.org/#eventtarget
  //
  // WHATWG EventTarget
  // https://dom.spec.whatwg.org/#interface-eventtarget
  //
  // MDN EventTarget
  // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget

  // custom element reactions
  connectedCallback () {
    this.render ()

    void ( super.constructor.onconnect
      || super.connectedCallback
      || function noop () {}
    ).call (this)
  }

  listenable (nodes) {
    return Array.prototype.map
      .call (nodes, node => Object.assign
        (node, {listen: this.listen.bind(this)})) // MUTATES!
  }

  // Event target coparisons - https://developer.mozilla.org/en-US/docs/Web/API/Event/Comparison_of_Event_Targets
  listen (event, listener = this [event])
    { this.addEventListener (event, listener) }

  adoptedCallback () { console.warn ('adopted this', this) }

  stateChangedCallback (previous, next)
      { console.warn ('previous', previous, 'next', next) }

  static get observedAttributes () { return ['id'] }
  attributeChangedCallback (property, previous, next)
      { console.warn ('['+property+'] ['+previous+'] to ['+next+']') }
})
function upgrade () {
    console.time ()
    const
      reflect = p =>
        Object.
          getOwnPropertyNames (p)

    , __prototype = reflect (prototype.prototype)
    , __proto = reflect (prototype)
    , configuration = this.attributes

    console.timeEnd ()
    console.warn (__prototype, __proto, configuration)
}

var ElementPrototype = window.Element.prototype // see bottom of this file

const Element = function
// Custom elements polyfill
// https://github.com/webcomponents/custom-elements/blob/master/src/custom-elements.js
// https://github.com/w3c/webcomponents/issues/587#issuecomment-271031208
// https://github.com/w3c/webcomponents/issues/587#issuecomment-254017839
// Function.name - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name#Examples
//https://gist.github.com/allenwb/53927e46b31564168a1d

(tag = Array.isArray (arguments [0]) ? arguments [0][0] : arguments [0]) {

  return function // https://en.wikipedia.org/wiki/Higher-order_function
    (prototype, self = ! (this === window) ? this : {})
  { // Should this be a class❓❓❓❓

    try
      { if (! prototype) return new window.customElements.get (tag) }

    catch (_)
      { throw 'Must define custom element \n(i.e. Element `'+tag+'` (class {})' }

    class HTMLCustomElement extends GlobalEventHandlers (prototype) { // exotic object - https://github.com/whatwg/html/issues/1704
      constructor () { super ()
        this.context = self //new State (self, this.stateChangedCallback)
        super.initialize, super.initialize ()
      }

      get context ()        { return self }
      set context (context) { return self = context }

      get templates () { return this.selectAll ('template') }

      render (selector) {
        const
          node     = selector ? this.select (selector) : this
        , template = super.render && super.render (selector) // or a bonafied Template
      }

      selectAll (selector) {
        return this.listenable
          (this.querySelectorAll (selector))
      }

      // watch out for clobbering `HTMLInputElement.select ()`
      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select
      select (selector) { return this.selectAll (selector) [0] }
    }

    try
      { window.customElements.define (tag, HTMLCustomElement) }

    finally
      { return window.customElements.get (tag) }
  }
}

// Assign `window.Element.prototype` in case of feature checking on `Element`
Element.prototype = window.Element.prototype
  // http://2ality.com/2013/09/window.html
  // http://tobyho.com/2013/03/13/window-prop-vs-global-var
  // https://github.com/webcomponents/webcomponentsjs/blob/master/webcomponents-es5-loader.js#L19

//Element
//(Element)
//(Element) `data-calendar`
//(Element `data-calendar`)
//Element (`data-calendar`)
//Element ('data-calendar')

//new Element
//(new Element)
//new (Element`date-calendar`)
//(new Element) `date-calendar`
//(new Element `date-calendar`)
//new (Element `date-calendar`)
//new Element (`date-calendar`)
