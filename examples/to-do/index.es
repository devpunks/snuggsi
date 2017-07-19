Element `to-do`

(class extends Storable (HTMLElement) {

  initialize
    (tasks = { tasks: [{ task: 'Eat Food' }] })
      { this.retrieve (tasks) }


  onsubmit (event, input = this.select `input`) {
    event.preventDefault () // ...form from submitting

    this.context.tasks.push ({ task: input.value })

    this.store () // save context
    input.value = ''
  }


  onidle (mark) {
    mark = (task, id) =>
      this.select
        `input[id='${id}']`.checked = task.completed

    this.tasks.map (mark)
  }


  complete (event) {
    event.preventDefault ()

    this.tasks.map (task => task.completed = true)
    this.store () // save context
  }


  toggle (event, task = this.context.tasks [event.target.id]) {
    task.completed = !!! task.completed
    this.store () // save context
  }


  remove (event, parent = event.target.parentNode) {
    const id = parent.querySelector `input`.id

    this.context.tasks.splice (id, 1)
    this.store () // save context
  }

  clear (event, active = task => !!! task.completed) {
    event.preventDefault ()

    this.context.tasks = this.context.tasks.filter (active)
    this.store () // save context
  }

  get name  ()
    { return this.getAttribute `name` || 'snuggsi' }

  get all ()
    { return this.context.tasks.length }

  get active () {
    return this.context
      .tasks
      .filter (task => !!! task.completed)
      .length
  }
  get completed () {
    return this.context
      .tasks
      .filter (task => task.completed)
      .length
  }

  get tasks ()
    { return this.context.tasks }
})
