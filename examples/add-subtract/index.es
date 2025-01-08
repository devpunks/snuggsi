Element (`add-subtract`)

(class extends HTMLElement {
  count = 10

  constructor () {
    super ()
    console.log('This is from constructor', this.count, this)
  }

//  connectedCallback() { console.log('Monkey Patch', arguments) }

  decrement ()
    { this.count -- }

  increment ()
    { this.count ++ }
})
