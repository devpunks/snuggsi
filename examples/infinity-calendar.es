Element `infinity-calendar`

(class extends HTMLElement {

  initialize ()
    { this.context.date = new Date }

  static onready () {
    this.select
      ('[name=month]').value = this.month

    this.select
      ('[name=year]').value = this.year
  }

  static onchange () {

    const
      month =
        this.select
          ('[name=month]').value

    , year =
        this.select
          ('[name=year]').value

    this.context.date =
      new Date (year, month, 1)

    this.render ()
  }

  static onnext () {
    this.date_from_month (+1)
    this.render ()
  }

  static onprevious () {
    this.date_from_month (-1)
    this.render ()
  }

  static ondayclick (event)
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
      dates = []
    , daily = undefined

    , days  = day =>
        { return { day: day } }

    , date  =
        new Date ( this.year , this.context.date.getMonth () + 1 , 0)

    for (let day=1; day <= date.getDate (); day++)
      dates.push (day)

    return dates.map (days)
  }

  date_from_month (change) {
    this.context.date = new Date
      (this.context.date.setMonth (this.month + change))
  }
})
