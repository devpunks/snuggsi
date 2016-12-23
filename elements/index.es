module.exports = class {
  constructor (name) {
    if (!(name)) throw `Must provide name`

    console.warn (`Creating Element: ${name}`)
    console.warn (`Document: ${document}`)
    console.warn (`Window: ${window}`)
  }

  append (node) {
    console.warn (`I fucking can't believe this is happening! ${node}`)
  }
}
