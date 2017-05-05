const Component = Element => // why buble

  // exotic object - https://github.com/whatwg/html/issues/1704

(class extends
// interfaces
(EventTarget
  ( ParentNode
    ( GlobalEventHandlers
      ( Element ))))
{

  constructor () { super ()

    this.context = {}

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

    this.constructor.onidle && // dispatch
      this.constructor.onidle.call (this) // TODO: Migrate to `EventTarget`
  }

  import (event) {

    const
      document = event.target.import
    , template = document &&
        document.querySelector ('template')

    template
      && this.clone (template)

    this.render ()
  }

  clone (template) {
    let
      fragment =
        template.content.cloneNode (true)

     , register = attribute =>
         (this.setAttribute (attribute.name, attribute.value))

    Array
      .from (template.attributes)
      .map  (register)

    this.innerHTML = ''
    this.append (fragment)
  }

//_onload (event) {

//  const
//    shadow = function(element) {

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

//    }
//}

})

