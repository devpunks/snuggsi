Element `to-do`

(class extends HTMLElement {

  initialize () {
    this.context.tasks =
      [{ task: 'Wash clothes' }, { task: 'Eat food' }]
  }

  onsubmit (event, input = this.select `input`) {
    event.preventDefault ()

    this.context.tasks
      .push (input.value)

    input.value = ''
  }

  onidle () { console.log ('idling') }

  all (event) {
    event.prevent () // from painting

    Array
      .from (this.selectAll `input[type=checkbox]`)
      .map (checkbox => checkbox.checked = true)
  }

  complete (event, id = event.target.id) {
    this.context.tasks
      [id].completed = true
  }

  remove (event) {
    const // a little hairy to retrieve
      id = event.target.parentNode.querySelector
        `input[type=checkbox]`.id

    this.context.tasks
      .splice (event.target.id, 1)
  }

  clear (event) {
    event.preventDefault ()

    const
      completed = this.selectAll
        `input[type=checkbox]:checked`

    for (let checkbox of completed)
      this.context.tasks
        .splice (checkbox.id, 1)
  }

  get tasks ()
    { return this.context.tasks }

  get name ()
    { return 'Loren Hale' }

  get count ()
    { return this.context.tasks.length }
})

