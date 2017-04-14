Element `infinity-calendar`

(class extends HTMLElement {

  static get onclick () { console.log (event) }

  static get onchange () { console.log (event) }

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
