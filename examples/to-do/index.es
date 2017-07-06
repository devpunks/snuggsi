Element `to-do`

(class extends HTMLElement {

  initialize () {
    this.context
      .tasks = ['Wash clothes', 'Eat food']
  }

  onidle () { // hide count if no tasks
    this.select `fieldset`.hidden =
      !!! this.context.tasks.length
  }

  // "automagically" delegates registration on `to-do`
  // based solely on GlobalEventHandlers.on* naming conventions.
  // Further Details: https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers
  onsubmit (event) {
    event.preventDefault ()

    const input = this.select `input`

    this.context
      .tasks.push (input.value)

    input.value = ''
  }

  remove (event) {
    this.context.tasks
      // MDN Array.prototype.slice ()
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
      .splice (event.target.id, 1)
  }

  get tasks ()
    { return this.context.tasks }

  get name ()
    { return 'Loren Hale' }

  get count ()
    { return this.context.tasks.length }

  // perhaps this should be a Mixin:
  // `Storage (HTMLElement)`
  store () {
    console.log (JSON.strinfigy (this.context.tasks))
  }

})


