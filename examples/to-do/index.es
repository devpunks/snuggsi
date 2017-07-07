Element `to-do`

(class extends HTMLElement {

  initialize () {
    this.context
      .tasks = ['Wash clothes', 'Eat food']
  }

  onsubmit (event, input = this.select `input`) {
    event.preventDefault ()

    this.context
      .tasks.push (input.value)

    input.value = ''
  }

  onidle () { console.log ('idling') }

  all (event) {
    event.prevent () // from painting

    Array
      .from (this.selectAll `input[type=checkbox]`)
      .map (checkbox => checkbox.checked = true)
  }

  complete (event) {
    event.prevent () // from painting

    console.log ('complete', event.target)
  }

  remove (event) {
    this.context.tasks
      .splice (event.target.id, 1)
  }

  clear (event) {
    event.preventDefault ()

    console.log ('clearing')
  }

  get tasks ()
    { return this.context.tasks }

  get name ()
    { return 'Loren Hale' }

  get count ()
    { return this.context.tasks.length }
})

