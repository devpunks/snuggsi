// https://developers.google.com/web/updates/2015/01/ES6-Template-Strings#tagged_templates

// innerHTML issues
// http://www.kieranpotts.com/blog/javascript-html-to-dom/

// https://lists.w3.org/Archives/Public/public-webapps/2012AprJun/0334.html#start334
function tag (...fragments) {
  let
    html = /string/.test (typeof fragments [0])
      ? fragments [0] : fragments [0][0]
    context = fragments [1]

  let bind = context => {
    if (/string|number|boolean/.test (typeof context))
        context = { self: context }

    let pattern = Object
      .keys (context)
      .map (key => `{${key}}`)
      .join (`|`)

    let expression = new RegExp (pattern,`g`)

    return html
      .trim ()
      .replace ( expression,
        match => context [match.replace (/{|}/g, ``)]
      )
  }

  return context
    ? bind (context)
    : context => bind (context)
}

// Contextual auto-escaping
// qsa`.${className}`;
// safehtml`<a href="${url}?q=${query}" onclick="alert('${message}')" style="color: ${color}">${message}</a>`;
//
// // Localization and formatting
// l10n`Hello ${name}; you are visitor number ${visitor}:n! You have ${money}:c in your account!`
//
// // Embedded HTML/XML
// jsx`<a href="${url}">${text}</a>` // becomes React.DOM.a({ href: url }, text)
//
// // DSLs for code execution
// var childProcess = sh`ps ax | grep ${pid}`
class Template {
  constructor (id) {
    return Object.assign
      ( this.factory (id), { bind: this.bind })
  }

  factory (id) {
    return (
      document.getElementById (id)
      || document.createElement ('template')
    ).cloneNode (true)
  }

  bind (context) {
    let html   = this.innerHTML
      , render = context => tag (html) (context)

      , tags = Array.isArray (context)
          ?  context.map (render)
          : [render (context)]

    this.innerHTML = tags.join ('')

    return this
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

const Element = function (localName, ...tokens) {
  if (this instanceof Element) return new self.Element

  // localName = localName.raw [0] for HTML Sanitization?

  function bind (context) {
    this [Symbol.species] = new Context (context)
    console.log ('binding')
//      this.append
//        (new Template (localName).bind (this [Symbol.species]).content)
  }

  return function (pro) { // Should this be a class❓❓❓❓
    if ( ! pro)
      try { return new (window.customElements.get (localName)) }
      catch (_) { throw `Must define custom element \n(i.e. Element \`${localName}\` (class {})` }

    if ( ! new.target) self = this // for `.bind ()`

    function proto () { // Kill this with fire
      pro.__proto__ = HTMLElement // WTF?

      return ~ (pro.__proto__.name.toString ().search (/^HTML(.*)Element$/))
        ? pro : HTMLElement
    }

    // https://github.com/whatwg/html/issues/1704
    class CustomElementPrototype extends pro { // exotic object
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
      set context (context) { self = context }

      // custom element reactions

      static get observedAttributes () { return [`id`] }
      attributeChangedCallback (name, old, value) {
        console.warn (`attribute [${name}] changed from ${old} to ${value}`)
      }

      connectedCallback () {
        super.connectedCallback ()
      }

      // When element is removed from a shadow-including document
      // http://ryanmorr.com/using-mutation-observers-to-watch-for-element-availability/
      disconnectedCallback () {
       // detach event listeners added on attached
        console.warn (`disconnected`, this)
      }

      adoptedCallback () { console.warn (`adopted this`, this) }
    }

    try { window.customElements.define (localName, CustomElementPrototype) }
    finally { return window.customElements.get (localName) }
  }
}

// Assign `window.Element.prototype`
// in case of feature checking on `Element`
// https://github.com/webcomponents/webcomponentsjs/blob/master/webcomponents-es5-loader.js#L19
Element.prototype = window.Element.prototype

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
