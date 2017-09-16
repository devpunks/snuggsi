const Custom = Element => // why buble

( class extends // interfaces
  ( EventTarget
  ( ParentNode
  ( GlobalEventHandlers
  ( Element ))))
{
  connectedCallback () {

    this.context = {}

    super.initialize
      && super.initialize ()

    super.connectedCallback
      && super.connectedCallback ()

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

