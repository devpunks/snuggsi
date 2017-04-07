Element `infinity-calendar`.

bind ( { date : new Date, height: '50vh' } )

(class extends HTMLElement {

  static get date  () { return new Date }
  static get month () { this.day.getMonth () }
  static get year  () { this.day.getYear () }

  initialize () { console.log ('initialize') }

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
