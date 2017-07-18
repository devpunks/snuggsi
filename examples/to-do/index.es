Element `to-do`

(class extends HTMLElement {

  initialize () {
    this.context.tasks = [{ task: 'Wash clothes' }, { task: 'Eat food' }]
  }

  onsubmit (event, input = this.select `input`) {
    event.preventDefault () // ...form from submitting

    this.context.tasks.push ({ task: input.value })

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
  }

  toggle (event, task = this.context.tasks [event.target.id])
    { task.completed = !!! task.completed }

  remove (event, parent = event.target.parentNode) {
    const id = parent.querySelector `input`.id

    this.context.tasks.splice (id, 1)
  }

  clear (event, active = task => !!! task.completed) {
    event.preventDefault ()

    this.context.tasks = this.context.tasks.filter (active)
  }

  get tasks () { return this.context.tasks }
  get all () { return this.context.tasks.length }
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

  get name  ()
    { return this.getAttribute `name` || 'snuggsi' }
})
