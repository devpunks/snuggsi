Element `header-group`

(class extends HTMLElement {

  initialize () {
    console.warn ('initialize')
  }

  onclick (event) {
    console.warn('clicked', this.innerHTML)
  }

  onconnect () {
    console.warn ('onconnect')
  }
})

console.warn ('header-group defined')

