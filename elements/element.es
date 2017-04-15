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
    (HTMLElement, self = this === window && this || {})
  { // Should this be a class❓❓❓❓

    try
      { return new CustomElementRegistry.get (tag) }

    catch (_)
      { /* console.warn('Defining Element `'+tag+'` (class {})') */ }

    class HTMLCustomElement extends // mixins

      ( ParentNode ( EventTarget ( GlobalEventHandlers ( HTMLElement ))))

    { // exotic object - https://github.com/whatwg/html/issues/1704

      constructor () { super (), super.initialize () }

      get context () { return self }
      set context (value) { self = value }
      get templates () { return this.selectAll ('template') }

      render () { this.tokens.bind (this.context) }

      // custom element reactions
      connectedCallback () {

        void ( super.constructor.onconnect
          || super.connectedCallback
          || function noop () {}
        ).call (this)

        this.render ()
      }
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
