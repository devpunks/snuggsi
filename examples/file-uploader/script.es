Element `file-upload`

(class extends HTMLElement {

  /**
   * Initializes the element, setting the files list to []
   * and generating a file types' whitelist from a datalist
   * of ID 'file-upload-whitelist'. If no datalist with
   * such ID is found, it defaults to <code>default_whitelist</code>.
   *
   * Also initializes the default values for the label, which
   * can be changed via <code>set_label</code>.
   *
   * @see generate_whitelist
   * @see default_whitelist
   * @see set_label
   */

   initialize ()
     { this.context.files = [] }

  static get label () {

    return this.getAttribute
      ('label') || 'Drag files here'
  }

  static get title () {

    return this.getAttribute
      ('title') || 'Drop files'
  }

  /** The default whitelist object, with names for icons for each type. */ 
  static get default_whitelist () {

    return {
      'text/plain': 'txt-plain.png',
      'image/jpeg': 'app-img.png',
      'image/png' : 'app-img.png',

      'application/pdf': 'app-pdf.png',

      'application/vnd.ms-powerpoint': 'app-ppt.png',
      'application/vnd.ms-word'      : 'app-word.png',
      'application/vnd.ms-excel'     : 'app-excel.png',

      'application/vnd.oasis.opendocument.presentation': 'app-ppt.png',
      'application/vnd.oasis.opendocument.text'        : 'app-word.png',
      'application/vnd.oasis.opendocument.spreadsheet' : 'app-excel.png',

      'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'app-ppt.png',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'  : 'app-word.png',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'        : 'app-excel.png'
     }
  }

  static onconnect () { }

  /**
   * Listens for the event of a user clicking `<button onclick=onclear>`,
   * and "submit"s files accordingly.
   *
   * @param event {MouseEvent} The event that has been triggered.
   *
   * Further reading:
   * - Submit Event
   *   - https://developer.mozilla.org/en-US/docs/Web/Events/submit
   * - GlobalEventHandlers.onsubmit
   *   - https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onsubmit
   */

  static onclear (event) {

    // http://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript
    this.context.files = []

    this.render ()
  }

  /**
   * Listens for changes in the file field, essentially
   * processing new non-dragged files.
   *
   * @param event {Event} The event that has been triggered.
   */

  static onchange (event) {

    if (!!! event.target.files) return

    this.add_files (event.target.files)

    this.render ()
  }

  /**
   * Listens for the event of a user removing a file
   * via the button on the file's entry's row.
   *
   * @param event {MouseEvent} The event that has been triggered. 
   */

  static onremove (event) {

    this.context
      .files
      .splice (event.target.dataset.index, 1)

    this.render ()
  }

  /**
   * Listens for the event of a dragged object LEAVING the
   * label's area.
   *
   * @param event {DragEvent} The event that has been triggered.
   */

  static ondragleave (event) {

    this.select ('label')
      .textContent = this.constructor.label
  }

  /**
   * Listens for the event of a dragged object ENTERING the
   * label's area.
   *
   * @param event {DragEvent} The event that has been triggered. 
   */

  static ondragenter (event) {

    this.select ('label')
      .textContent = this.constructor.title
  }

  /**
   * Listens for the event of the dragged object being dropped
   * within the label's area.
   *
   * @param event {DragEvent} The event that has been triggered.
   */

  static ondrop (event) {

    const
      files =
        event.dataTransfer &&
        event.dataTransfer.files

    if (!!! files) return

    this.add_files (files)

    this.render ()
  }

  /** The list of files currently in queue. */
  get files ()
    { return this.context.files }

  /**
   * Adds the given files to the list.
   *
   * @param files {FileList} The files to be added.
   */

  add_files (files) {
    // Loop through the given list of new files and check if they're
    // a valid key on the whitelist hash.
    for (var i = 0; i < files.length; i++) {
      if (this.whitelist[files[i].type]) {
        this.context.files.push(this.add_icon_url(files[i]))
      }
    }
  }

  /**
   * Generates a whitelist of accepted file mimetypes from a 
   * <code>datalist</code> with ID 'file-upload-whitelist'. 
   * It must be formed by a list of <code>option</code>
   * elements, each with a valid mimetype as <code>label</code>
   * and the corresponding icon as its <code>value</code>.
   * Example:
   *
   *  <datalist id="file-upload-whitelist">
   *    <option value="app-pdf.png"   label="application/pdf">
   *    <option value="app-img.png"   label="image/png">
   *    <option value="app-img.png"   label="image/jpeg">
   *    <option value="txt-plain.png" label="text/plain">
   *  </datalist>
   *
   * If no <code>datalist</code> with such ID is found, it will
   * default to use <code>default_whitelist</code> to generate
   * the element's whitelist.
   *
   * Whitelists can also be programatically set with
   * <code>set_whitelist</code>
   *
   * @see default_whitelist
   * @see set_whitelist
   *
   * @returns {Object} The whitelist.
   */

  generate_whitelist () {
    var whitelist = {}
    var dataList = document.getElementById('file-upload-whitelist')

    if (dataList) {
      var dl_children = dataList.children

      // Add all {label: value} pairs to the whitelist, where
      // the label corresponds to the mimetype, and the value to the
      // type's icon's URL.
      for (var i = 0; i < dl_children.length; i++) {
        whitelist[dl_children[i].label] = dl_children[i].value
      }
    } else {
      whitelist = this.constructor.default_whitelist
    }

    return whitelist
  }

  /**
   * Adds an icon URL to the given file, corresponding to the
   * file's mimetype. The URL is taken from the whitelist hash.
   *
   * It also gives the file a <code>hidden_icon</code> flag to hide
   * the icon if no URL was found. (It's set to an empty string if
   * the URL is valid)
   *
   * @param file {File} The file to add the icon URL to.
   * 
   * @returns {File} The file, for chaining purposes.
   */

  add_icon_url (file) {

    const
      icon_url = this.whitelist[file.type]

    file.icon_url = icon_url === undefined ? '' : icon_url
    // Also add a flag to hide the icon if the URL is invalid.
    file.hidden_icon = icon_url === undefined ? 'hidden' : ''

    return file
  }


})

