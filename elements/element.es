const ElementPrototype = window.Element.prototype // see bottom of this file

const Element = function
  (tag, CustomElementRegistry = window.customElements )

  //https://gist.github.com/allenwb/53927e46b31564168a1d
  // https://github.com/w3c/webcomponents/issues/587#issuecomment-271031208
  // https://github.com/w3c/webcomponents/issues/587#issuecomment-254017839

{ tag = tag [0]

  return function (HTMLElement) // https://en.wikipedia.org/wiki/Higher-order_function
  { // Should this be a class❓❓❓❓

    const
      context =
        this === window ?
          {} : this

//  try
//    { return new CustomElementRegistry.get (tag) }

//  catch (_)
//    { /* console.warn('Defining Element `'+tag+'` (class {})') */ }

    class HTMLCustomElement extends // mixins

      EventTarget
        ( ParentNode
          ( GlobalEventHandlers
            ( HTMLElement )))

    { // exotic object - https://github.com/whatwg/html/issues/1704

      constructor () { super ()

        this.context = context

        this.initialize && this.initialize ()
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

        this.constructor.onready &&
          this.constructor.onready.call (this)
      }

      // custom element reactions
      connectedCallback () {

        (new HTMLLinkElement (tag))
          .onload = this.clone.bind (this)
      }

      clone (event) {
        console.log ('cloning', event.target)

        this.render ()
      }

//_onload (event) {

//  console.log ('wat', this, event.target)

//  return

//  let
//    template = event.target.import
//      .querySelector ('template')

//  const
//    shadow = function(element) {
//      console.log ('template', template)

//      let
//        attributes = template.attributes
//      , fragment   = template.content.cloneNode (true)

//      , register = attribute =>
//          (this.setAttribute (attribute.name, attribute.value))

//      Array
//        .from (attributes)
//        .map  (register)

//      fragment.slots =
//        Array.from (fragment.querySelectorAll ('slot'))

//      element.slots =
//        Array.from (element.querySelectorAll ('[slot]'))

//      element.slots.map (function (namedslot) {
//        fragment.slots
//          .filter (slot =>
//            (slot.getAttribute ('name') === namedslot.getAttribute ('slot'))
//          )
//          .map (slot =>
//            slot
//              // prefer to use replaceWith however support is sparse
//              // https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/replaceWith
//              // using `Node.parentNode` & `Node.replaceChid` as is defined in (ancient) W3C DOM Level 1,2,3
//              // https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode
//              // https://developer.mozilla.org/en-US/docs/Web/API/Node/replaceChild
//              .parentNode
//              .replaceChild (namedslot, slot)
//          )
//      })

//      element.innerHTML = ''
//      element.append (fragment)
//    }

//  Array.from
//    // should be using currentScript ?
//    (document.getElementsByTagName (this.tagName.toLowerCase ()))
//    .map (shadow, this)
//}

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
