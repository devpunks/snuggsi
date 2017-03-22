// retrieve this from remote source

const COUNTRIES = [
  'Australia' ,'Austria' ,'Belgium' ,'Brazil' ,'Canada' ,'Denmark' ,'Finland' ,'France',
  'Germany' ,'Greece' ,'Ireland' ,'Israel' ,'Italy' ,'Japan' ,'Luxembourg' ,'Mexico' ,'Netherlands' ,'Norway',
  'Poland' ,'Portugal' ,'Russia' ,'Spain' ,'Sweden' ,'Switzerland' ,'Turkey' ,'United Kingdom' ,'United States'
]

Element
  `list-filter`.bind (COUNTRIES)

(class extends HTMLElement {
  constructor () { super ()
    this.context = this.context.map (this.slugify)
    this.select('input').listen('input')
  }

// renderers
  render () { return `<li><a href='#/{slug}'>{name}` }

// handlers
  input () {
    const search = country =>
      ~ country.slug.indexOf (event.target.value)

    this.render ('ul', this.context.filter (search))
  }

  connectedCallback () { this.render ('ul') }

// helpers
  slugify (name) {
    return {
      name: name,
      slug: name.replace(/\s+/g, '-').toLowerCase()
    }
  }
})
