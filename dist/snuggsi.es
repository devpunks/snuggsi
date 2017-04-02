function State ( context, handler = _ => {} ) {
  this.subscribe = callback => handler = callback

  const
    history = new Array (context)
  , clone   = context => JSON.parse
      (JSON.stringify (context))

  , thunk = property =>
      [ property,
        {
          get: _ => history
            [history.length-1] [property],

          set (value) {
            const next  = clone
              (previous = history [history.length-1])

            next [property] = value
            handler (previous, next)
            history [history.length] = next
          }
        }
      ]

  for (property in context)
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
    Object.defineProperty (this, ...thunk (property))
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties
}
function tokenize (fragment) {
  const
    tokens = []

  , tail = (text, sibling) =>
      ( ! text.after (sibling)) && sibling

  // https://www.merriam-webster.com/dictionary/sift
  , sift = text =>
      text.textContent.match (/({\w+})/) && (tokens [tokens.length] = text)
      || text

  for (match of mine (fragment))
    slice (match.textContent)
      .map (sift)
      .reduce (tail, match)

    && match.remove ()

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
  , replace  = token => collect (token) && '✂️'
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
  console.time ()

  const nodes = []
  const walker = document.createNodeIterator
      (head, NodeFilter.SHOW_TEXT, visit)
      // by default breaks on template YAY! 🎉

  while (node = walker.nextNode ()) nodes.push (node)
  console.timeEnd ()
  return nodes
}

const tail = (text, sibling) => ( ! text.after (sibling)) && sibling

function visit (node) {
  return /({\w+})/g.test (node.data)
    && NodeFilter.FILTER_ACCEPT // <😕  is this even necessary?
}

function comb (parent) {
  if (parent.hasChildNodes())
    for (let node = parent.firstChild; node; node = node.nextSibling)
      DOMComb (node)
}
function Template ( name = 'snuggsi' ) {
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

  function factory (name) { return (
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
// Usage
//
//  Element `date-calendar`

//  (class extends HTMLElement {
//    constructor () {
//      super ()
//      console.log ('Goin in context', this.context)
//      this.listen ('click', (event) => console.log (event))
//    }

//    connectedCallback () {
//      console.log ('from derived connected')
//    }

//    get baz () { return 'baz' }
//  })


// https://github.com/w3c/webcomponents/issues/587#issuecomment-271031208
// https://github.com/w3c/webcomponents/issues/587#issuecomment-254017839
// Custom elements polyfill
// https://github.com/webcomponents/custom-elements/blob/master/src/custom-elements.js
// Function.name - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name#Examples
// https://developer.mozilla.org/en-US/docs/Web/API/Element
// https://developer.mozilla.org/en-US/docs/Web/API/Element/name

//https://gist.github.com/allenwb/53927e46b31564168a1d

var ElementPrototype = window.Element.prototype

const Element = function (tagName, ...tokens) {
  if (this instanceof Element) return new self.Element

  // tagName = tagName.raw [0] for HTML Sanitization?

  return function Definition (prototype) { // Should this be a class❓❓❓❓

    if ( ! prototype)
      try { return new (window.customElements.get (tagName)) }
      catch (_) { throw 'Must define custom element \n(i.e. Element `'+tagName+'` (class {})' }

//    if ( ! new.target) self = this // for `.bind ()`
      if ( ! this instanceof Definition) self = this // for `.bind ()`

    // https://github.com/whatwg/html/issues/1704
    class CustomElement extends prototype { // exotic object

      constructor (context = self) { super ()
        this.context = new State (context, this.stateChangedCallback)
      }

      get rendered () { return this.render () }
      render (selector, context = this.context) {
        const
          node = selector ? this.select (selector) : this
        , template = super.render (selector) // or a bonafied Template

        context = Array.isArray (context)
          ? context : [context]

        node.innerHTML = context
          .map (item => tag (template, item))
          .join ('')
      }

      // watch out for clobbering `HTMLInputElement.select ()`
      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select
      select (selector) {
        return this.listenable
          ([this.querySelector (selector)])[0]
      }

      selectAll (selector) {
        return this.listenable
          (this.querySelectorAll (selector))
      }

      listenable (nodes) {
        return Array.prototype.map
          .call (nodes, node => Object.assign
            (node, {listen: this.listen.bind(this)})) // MUTATES!
      }

      // Event target coparisons
      // https://developer.mozilla.org/en-US/docs/Web/API/Event/Comparison_of_Event_Targets
      // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/relatedTarget
      // https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget
      listen (event, listener = this [event]) {
        this.addEventListener (event, listener)
      }

      get context () { return self }
      set context (context) {
        console.warn ('setting context', context)
        return self = context
        }

      // custom element reactions

      stateChangedCallback
        (previous, next)
          {
            console.warn ('previous', previous)
            console.warn ('next', next)
          }

      attributeChangedCallback
        (property, previous, next)
          { console.warn ('['+property+'] ['+previous+'] to ['+next+']') }

      // possibly map this with context
      static get observedAttributes () { return ['id'] }

      connectedCallback () {
        super.connectedCallback ()
      }

      // When element is removed from a shadow-including document
      // http://ryanmorr.com/using-mutation-observers-to-watch-for-element-availability/
      disconnectedCallback () {
       // detach event listeners added on attached
        console.warn ('disconnected', this)
      }

      adoptedCallback () { console.warn ('adopted this', this) }

      // on* events
      // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Event_handlers
    }

    try { window.customElements.define (tagName, CustomElement) }
    finally { return window.customElements.get (tagName) }
  }
}

// Assign `window.Element.prototype`
// in case of feature checking on `Element`
Element.prototype = window.Element.prototype
  // http://2ality.com/2013/09/window.html
  // http://tobyho.com/2013/03/13/window-prop-vs-global-var/
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
