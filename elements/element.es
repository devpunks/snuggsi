var ElementPrototype = window.Element.prototype // see bottom of this file

const Element = function
// Custom elements polyfill
// https://github.com/webcomponents/custom-elements/blob/master/src/custom-elements.js
// https://github.com/w3c/webcomponents/issues/587#issuecomment-271031208
// https://github.com/w3c/webcomponents/issues/587#issuecomment-254017839
// Function.name - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name#Examples
//https://gist.github.com/allenwb/53927e46b31564168a1d

(tagName) {
   tagName = Array.isArray (tagName)
      ? tagName [0] : tagName

  return function
    (prototype, self = ! (this === window) ? this : {})
  { // Should this be a class❓❓❓❓

    const
      reflect = p =>
        Object.getOwnPropertyNames (p)

    , __prototype = reflect (prototype.prototype)

    try
      { if ( ! prototype ) return new (window.customElements.get (tagName)) }

    catch (_)
      { throw 'Must define custom element \n(i.e. Element `'+tagName+'` (class {})' }

    class HTMLCustomElement extends GlobalEventHandlers (prototype) { // exotic object - https://github.com/whatwg/html/issues/1704
      constructor () { super ()
        this.context = self //new State (self, this.stateChangedCallback)
      }

      get context () { return self }
      set context (context) {
        console.warn ('setting context', context)
        return self = context
      }

      get templates () { return this.selectAll ('template') }

      render (selector, context = this.context) {
        for (const template of this.templates)
          console.log ("i'm in the renderer", context, template)

        window.element = this
        window.state = this.context

        for (const property of __prototype)
          console.log (property)

        this.append(
          Template `days`.bind (this.days)
          .content
        )

        const
          node = selector ? this.select (selector) : this
        , template = (super.render || function noop () {}) (selector) // or a bonafied Template
      }

      // watch out for clobbering `HTMLInputElement.select ()`
      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select
      select (selector) { return this.selectAll (selector) [0] }

      selectAll (selector) {
        return this.listenable
          (this.querySelectorAll (selector))
      }
    }

    try
      { window.customElements.define (tagName, HTMLCustomElement) }

    finally
      { return window.customElements.get (tagName) }
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
