Element `to-do`

(class extends HTMLElement {

  initialize () {
    this.context.tasks =
      [{ task: 'Wash clothes', completed: true }, { task: 'Eat food' }]
  }

  onsubmit (event, input = this.select `input`) {
    event.preventDefault ()

    this.context.tasks
      .push ({ task: input.value })

    input.value = ''
  }

  onidle () {
    const
      check = (task, id) =>
        task.completed && mark (id)

   ,  mark = (id, selector = `input[id="${id}"]`) =>
        this
          .select (selector)
          .checked = true

    this.tasks.map (check)

    console.log ('idling')
  }

  all (event) {
    event.prevent () // from painting

    Array
      .from (this.selectAll `input[type=checkbox]`)
      .map (checkbox => checkbox.checked = true)
  }

  toggle (event, id = event.target.id) {
    this.context.tasks[id].completed =
      !!!this.context.tasks[id].completed
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

