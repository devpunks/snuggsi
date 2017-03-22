Element
  `auto-complete`.bind (COUNTRIES)

(class extends HTMLElement {
  connectedCallback () { this.render ('datalist') }

  render () { return `<option value={self}>` }
})
