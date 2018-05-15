// retrieve this from remote source

const COUNTRIES = [
  'Australia' ,'Austria' ,'Belgium' ,'Brazil' ,'Canada' ,'Denmark' ,'Finland' ,'France',
  'Germany' ,'Greece' ,'Ireland' ,'Israel' ,'Italy' ,'Japan' ,'Luxembourg' ,'Mexico' ,'Netherlands' ,'Norway',
  'Poland' ,'Portugal' ,'Russia' ,'Spain' ,'Sweden' ,'Switzerland' ,'Turkey' ,'United Kingdom' ,'United States'
]

Element `list-filter`

(class extends HTMLElement {
  initialize () {
    this.items
      = this.context.countries
      = COUNTRIES.map (this.slugify)
  }

// handlers
  oninput (e) {
    const search = country =>
      ~ country.slug.indexOf (e.target.value)

    this.items = this.context.countries.filter (search)
  }

// helpers
  slugify (name) {
    return {
      name: name,
      slug: name.replace (/\s+/g, '-').toLowerCase ()
    }
  }
})
