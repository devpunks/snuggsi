const Storable = Element =>

class extends Element {

  retrieve (records, id=this.tagName) {
    records = JSON.stringify (records)

    this.context = JSON.parse
      (localStorage.getItem (id) || records)
  }

  store (id=this.tagName) {
    localStorage.setItem
      (id, JSON.stringify (this.context))
  }
}
