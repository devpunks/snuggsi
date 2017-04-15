Element `infinity-calendar`

(class extends HTMLElement {

  static onclick ()
    // implicit. Notice not defined on element
    // MDN on* Events
    // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Event_handlers
    { console.log ('onclick', event) }

  static onnext ()
    { console.log ('NEXT WORKED!', this, arguments) }

  static onprevious ()
    { console.log ('PREVIOUS WORKED!', this, arguments) }

  static
    // explicitly registered to `oninput`
    what () { console.warn (event.target.value) }

  static get date   () { return new Date }
  static get year   () { return this.date.getFullYear () }
  static get month  () { return this.months [this.date.getMonth ()] }
  static get months () {
    return [
      'January', 'February', 'March', 'April', 'May',
      'June', 'July','August','September','October','December' ]
  }

  initialize () {
    this.context = {
      month: this.constructor.month,
      year:  this.constructor.year
    }

    this
      .querySelector ('menu button:first-of-type')
      .addEventListener ('click', this.onprevious)
  }

  get days () {
    const
      dates = []
    , date =
        new Date (
          this.context.date.getYear ()
        , this.context.date.getMonth () + 1
        , 0
        )

    , days  =  day => { day: new Date(day).getDate () }

    for (let day=1; day <= date.getDate (); day++){
      let daily = new Date (date.getTime ())
      dates.push (daily.setDate (day))
    }

    return dates.map (days)
  }
})
