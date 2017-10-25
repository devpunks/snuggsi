Element `header-group`

(class extends HTMLElement {

  initialize ()
    { console.warn ('Initializing', this) }

  onconnect ()
    { console.warn ('Connecting', this) }

  onclick (event)
    { console.warn ('Clicked', event) }
})
