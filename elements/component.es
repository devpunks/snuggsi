const Custom = Element => // why buble

( class extends // interfaces
  ( EventTarget ( ParentNode ( GlobalEventHandlers (Element) )))
{
  constructor () {
    super
      () .initialize ()
  }

  initialize () {
    console.warn ('Anything further is snuggsi')


    let
      descriptions =
        Object
          .getOwnPropertyDescriptors
             (Element.prototype)

    , bind = key =>
        !!! console.warn
          (key, descriptions [key].value, descriptions [key], this[key])

        &&

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

    console.warn ('context', this.context)

//  console.log ('super initialize', super.initialize)

    return this
  }


  connectedCallback () {
    super.connectedCallback
      && super.connectedCallback ()

    this.onconnect ()
  }


  render () {
    console.log ('rendering')

    this.tokens.bind (this)

    void []
      .slice
      .call (this.selectAll ('template[name]'))

      .map
        (template => template.getAttribute ('name'))

      .map
        (name => (new Template (name)).bind (this [name]))


    return

    Array.from (this.selectAll ('*'))

      .concat ([this])

      .map (this.register, this)


    super.onidle && super.onidle ()
  }


})

