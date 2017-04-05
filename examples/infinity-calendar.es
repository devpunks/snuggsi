Element `infinity-calendar`.

bind ( { date : new Date, height: '50vh' } )

(class extends HTMLElement {
  static get month () {
    return this.context.
      date.getMonth ()
  }

  static get year () {
    return this.context.
      date.getYear ()
  }

  static onconnect () { }

  static onclick () {
    alert ('There is a static God')
  }

  constructor () { super ()
    console.log ('ctor')
  }

  initialize () {
    console.log ('initialize')
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

//  for (let i=0; i<1000; i++) {
//    let f = i
//    collection.push ({day: f})
//  }

//  return collection

    return dates.map
      (function (day) { return { day: new Date(day).getDate () }})
  }

  get mystery () { }

  onfart () { }
})
