var ElementPrototype = window.Element.prototype // see bottom of this file

const Element = function
  (tag, CustomElementRegistry = window.customElements )

  //https://gist.github.com/allenwb/53927e46b31564168a1d
  // https://github.com/w3c/webcomponents/issues/587#issuecomment-271031208
  // https://github.com/w3c/webcomponents/issues/587#issuecomment-254017839

{ tag = tag [0]

  const
    link = document
      .querySelector // use CSS :any ?
        ('link#'+tag+'[rel=import], link[href*='+tag+'][rel=import]')

  return function (HTMLElement) // https://en.wikipedia.org/wiki/Higher-order_function
  { // Should this be a class❓❓❓❓

    const context = this === window ? {} : this

//  try
//    { return new CustomElementRegistry.get (tag) }

//  catch (_)
//    { /* console.warn('Defining Element `'+tag+'` (class {})') */ }

    class HTMLCustomElement extends // mixins

      EventTarget ( ParentNode ( GlobalEventHandlers ( HTMLElement )))

    { // exotic object - https://github.com/whatwg/html/issues/1704

      constructor () { super ()
        this.context = context

        super.initialize && super.initialize ()
      }

      render () {
        // template = super.render ()
        // Where should this insert?
        // What about the meta elements (i.e. script, style, meta)

        this.tokens.bind (this)

        void (function (templates) {

          const
            bind = template => {
              const
                name = template.getAttribute ('name')

              void (new Template (name))
                .bind (this [name])
            }

          templates.map (bind)
        })
        .call (this, Array.from (this.selectAll ('template[name]')))

        this.register ()

        this.onready && this.onready ()
      }

      // custom element reactions
      connectedCallback () {

        link &&
          (link.onload = HTMLLinkElement.onload.bind (this))

        super.constructor.onconnect
        && super.constructor.onconnect ()

        this.render ()
      }
    }

//  try
//    {
        CustomElementRegistry.define (tag, HTMLCustomElement)
//    }

//  finally
//    {
        return CustomElementRegistry.get (tag)
//    }
  }
}

// Assign `window.Element.prototype` in case of feature checking on `Element`
Element.prototype = ElementPrototype
  // http://2ality.com/2013/09/window.html
  // http://tobyho.com/2013/03/13/window-prop-vs-global-var
  // https://github.com/webcomponents/webcomponentsjs/blob/master/webcomponents-es5-loader.js#L19
