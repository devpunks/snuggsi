Element `infinity-calendar`

(class extends HTMLElement {

  static get date   () { return new Date }
  static get year   () { return this.date.getFullYear () }
  static get month  () { return this.months [this.date.getMonth ()] }
  static get months () {
    return [
      'January', 'February', 'March', 'April', 'May',
      'June', 'July','August','September','October','December' ]
  }

  initialize () {
    console.time ()
    const i = this.symbolizedTextNodes
    console.timeEnd ()
    console.log (i)
  }

  get days () {
    const
      date =
        new Date
          (this.context.date.getYear (), this.context.date.getMonth () + 1, 0)
    , dates = []

    for (let day=1; day <= date.getDate (); day++){
      let daily = new Date (date.getTime ())
      dates.push (daily.setDate (day))
    }

    const collection = []
    return dates.map
      (function (day) { return { day: new Date(day).getDate () }})
  }
})
