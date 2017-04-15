Element `infinity-calendar`

(class extends HTMLElement {

  static
    // implicit. Notice not defined on element
    onclick () { console.log ('onclick', event) }

  static
    what () { console.warn (event.target.value) }

  static get date   () { return new Date }
  static get year   () { return this.date.getFullYear () }
  static get month  () { return this.months [this.date.getMonth ()] }
  static get months () {
    return [
      'January', 'February', 'March', 'April', 'May',
      'June', 'July','August','September','October','December' ]
  }

  static onnext () {
    event.preventDefault ()
    console.log ('NEXT WORKED!', arguments) //, this)
  }

  static onprevious () {
    event.preventDefault ()
    console.log ('PREVIOUS WORKED!', arguments) //, this)
  }

  initialize () {
    this.context = {
      month: this.constructor.month,
      year:  this.constructor.year
    }
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
