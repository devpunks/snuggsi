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

  static onconnect () {
    console.log ('connected!!!')
  }

  static onclick () {
    alert ('There is a static God')
  }

  initialize () {
    console.log ('Holy crap I got initialize')
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

    return dates.map
      (function (day) { return { day: new Date(day).getDate () }})
  }

  get mystery () {
    console.log ('Dinner')
    return 'Dinner'
  }

  onfart () {
    console.log ('farting')
    return 'farted'
  }
})
