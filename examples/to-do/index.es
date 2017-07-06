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

  onsubmit (event, input = this.select `input`) {
    event.preventDefault ()

    this.context
      .tasks.push (input.value)

    input.value = ''
  }

  remove (event) {
    this.context.tasks
      .splice (event.target.id, 1)
  }

  get tasks ()
    { return this.context.tasks }

  get name ()
    { return 'Loren Hale' }

  get count ()
    { return this.context.tasks.length }
})

