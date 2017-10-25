Element `header-group`

(class extends HTMLElement {

  constructor ()
    { console.warn ('Constructing', this) }

  initialize ()
    { console.warn ('Initializing', this) }

  onconnect ()
    { console.warn ('Connecting', this) }

  onclick (event)
    { console.warn ('Clicked', event) }
})
