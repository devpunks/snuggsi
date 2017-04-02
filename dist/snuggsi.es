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
