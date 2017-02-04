let TextContent = class extends Text {
  constructor (value) {
    super (value)
  }
}

let value = 'Foooooooo'
window.text = new TextContent (value)

let h1 = document.querySelector ('h1')

h1.appendChild (text)
console.warn (h1)
