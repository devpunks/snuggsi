Element `add-subtract`

(class extends HTMLElement {

  initialize ()
    { this.context.count = 0 }

  decrement ()
    { this.context.count -- }

  increment ()
    { this.context.count ++ }

  get count ()
    { return this.context.count }

})


