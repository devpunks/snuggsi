Element `infinity-calendar`

(class extends HTMLElement {

  initialize ()
  {
    this.context.date = new Date
  }

  onconnect () {
    console.warn ('connecting')
  }

  onidle () {
    this.select
      `[name=month]`.value = this.month

    this.select
      `[name=year]`.value = this.year
  }

  onchange () {
    const
      month =
        this.select
          `[name=month]`.value

    , year =
        this.select
          `[name=year]`.value

    this.context.date =
      new Date (year, month, 1)
  }

  next ()
    { this.date_from_month (+1) }

  previous ()
    { this.date_from_month (-1) }

  dayclick (event)
    { alert (event.target.textContent) }

  get year ()
    { return this.context.date.getFullYear () }

  get month ()
    { return this.context.date.getMonth () }

  get years () {
    const
      deviation = 5
    , years = new Array

    for
      (let year = this.year - deviation; year < this.year + deviation; year ++)
        years.push (year)

    return years
  }

  get months () {
    return [
      'January', 'February', 'March', 'April', 'May',
      'June', 'July','August','September','October','November','December' ]
  }

  get days () {
    const
      next_month = this.month + 1
    , date = new Date (this.year , next_month, 0)
    , length = { length: date.getDate () }
    , days = (_, index) => ({ day: index +1 })

    return Array
      .apply (null, length)
      .map (days)
  }

  date_from_month (change) {
    this.context.date = new Date
      (this.context.date.setMonth (this.month + change))
  }

})

