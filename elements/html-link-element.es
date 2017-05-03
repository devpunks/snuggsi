
const HTMLLinkElement = class {

  constructor (tag) {
    const
      link = document
        .querySelector // use CSS :any ?
          ('link#'+tag+'[rel=import], link[href*='+tag+'][rel=import]')
      || {}

    Object.defineProperty (link, 'onload',
      {
        enumerable: true
      , set (handler) {
          this.tagName
            ? handler
            : handler ({ target: this })
        }
      }
    )

    return link
  }

  set onload (handler) {

    console.log ('handling', link)
//  link &&
//    document.addEventListener
//      ('HTMLImportsLoaded', _ => this.onload.call (element))

  console.log ('link', link)
  }

  _onload (event) {

    console.log ('wat', this, event.target)

    return

    let
      template = event.target.import
        .querySelector ('template')

    const
      shadow = function(element) {
        console.log ('template', template)

        let
          attributes = template.attributes
        , fragment   = template.content.cloneNode (true)

        , register = attribute =>
            (this.setAttribute (attribute.name, attribute.value))

        Array
          .from (attributes)
          .map  (register)

        fragment.slots =
          Array.from (fragment.querySelectorAll ('slot'))

        element.slots =
          Array.from (element.querySelectorAll ('[slot]'))

        element.slots.map (function (namedslot) {
          fragment.slots
            .filter (slot =>
              (slot.getAttribute ('name') === namedslot.getAttribute ('slot'))
            )
            .map (slot =>
              slot
                // prefer to use replaceWith however support is sparse
                // https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/replaceWith
                // using `Node.parentNode` & `Node.replaceChid` as is defined in (ancient) W3C DOM Level 1,2,3
                // https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode
                // https://developer.mozilla.org/en-US/docs/Web/API/Node/replaceChild
                .parentNode
                .replaceChild (namedslot, slot)
            )
        })

        element.innerHTML = ''
        element.append (fragment)
      }

    Array.from
      // should be using currentScript ?
      (document.getElementsByTagName (this.tagName.toLowerCase ()))
      .map (shadow, this)
  }
}

