const Custom = Element => // why buble

( class extends // interfaces
  ( EventTarget ( ParentNode ( GlobalEventHandlers (Element) )))
{
  constructor () {
    super ()
      .initialize ()
  }

  initialize () {

    let
      descriptions =
        Object
          .getOwnPropertyDescriptors
             (Element.prototype)

    , bind = key =>
        'function' === typeof
          descriptions [key].value
            && (this [key] = this [key].bind (this))

    Object
      .keys (descriptions)
      .map  (bind)

    Object
      .getOwnPropertyNames (Element.prototype)
      // POTENTIAL REDUNDANCY
      // Aren't `on` events set up in `.bind` on 20?
      // If so we are `.bind`ing to `this` on two iterations
      // of the same function
      .map (this.reflect, this)

    this.context = {}

    return this
  }


  connectedCallback () {
    super.connectedCallback
      && super.connectedCallback ()

    this
      .onconnect ()
      .render ()
  }


  render () {

    this
      .templates
      .map (template => template.bind (this [template.name]))


    this.tokens.bind (this)

    void []
      .slice
      .call (this.selectAll ('*'))

      .concat ([this])

      .map (this.register, this)

    super.onidle && super.onidle ()
  }


})

