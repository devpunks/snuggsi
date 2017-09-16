const Custom = Element => // why buble

( class extends // interfaces
  ( EventTarget
  ( ParentNode
  ( GlobalEventHandlers
  ( Element ))))
{
  constructor ()
    { super () /* will need to add initialize () routine */ }

//initialize () {

//  let
//    bindable = property =>
//      Object.getOwnPropertyDescriptor
//        (Element.prototype, property).value

//  , bind = property =>
//      (this [property] = this [property].bind (this))

//  , names =
//      Object.getOwnPropertyNames
//        (Element.prototype)

//  names
//    .filter (bindable)
//    .map    (bind)
//}


  connectedCallback () {

    this.context = {}

    super.initialize
      && super.initialize ()

    super.connectedCallback
      && super.connectedCallback ()

    // POTENTIAL REDUNDANCY
    // Aren't `on` events set up in `.bind` on 16?
    // If so we are `.bind`ing to `this` on two iterations
    // of the same function
    Object.getOwnPropertyNames
      (Element.prototype).map
        (this.reflect, this)

    this
      .onconnect ()
      .render ()
  }


  render () {

    this
      .templates
      .map (template =>
        template.bind (this [template.name]))

    this
      .tokens
      .bind (this)

    void [this]

      .concat ( ... this.selectAll ('*') )

      .map (this.register, this)

    super.onidle && super.onidle ()
  }


})

