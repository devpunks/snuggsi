const Component = Element => // why buble

  // exotic object - https://github.com/whatwg/html/issues/1704

( class extends // interfaces
( EventTarget
  ( ParentNode
    ( GlobalEventHandlers
      ( Element ))))
{

  constructor () { super ()

    this.context = {}

    this.initialize
      && this.initialize ()
  }

  render () {

    this.tokens
      .bind (this)

    Array // of templates with `name` attribute
      .from (this.selectAll ('template[name]'))
      .map  (template => new Template (template.getAttribute ('name')))
      .map  (template => template.bind (this [template.attributes.name.value]))

    this.register ()

    this.constructor.onidle && // dispatch idle event
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

  // This doesn't go here. Perhaps SlotList / Template / TokenList (in that order)
  clone (template) {

    let
      fragment =
        template
          .content
          .cloneNode (true)

    , slots =
        Array.from (fragment.querySelectorAll ('slot'))

    , replacements =
        Array.from (this.querySelectorAll ('[slot]'))

     , register = attribute =>
         (this.setAttribute (attribute.name, attribute.value))

    , replace = replacement =>
        slots
          .filter (match (replacement))
          .map (exchange (replacement))

    , match = replacement => slot =>
        replacement.getAttribute ('slot')
          === slot.getAttribute  ('name')

    , exchange = replacement =>
        slot => slot
          // prefer to use replaceWith however support is sparse
          // https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/replaceWith
          // using `Node.parentNode` & `Node.replaceChid` as is defined in (ancient) W3C DOM Level 1,2,3
          .parentNode
          .replaceChild (replacement, slot)

    Array // map attributes from template
      .from (template.attributes)
      .map  (register)

    replacements
      .map (replace)

    this.innerHTML = ''
    this.append (fragment)
  }

})

