let TextContent = class extends Text {
  constructor (value) {
    super (value.textContent || value)
  }
}
