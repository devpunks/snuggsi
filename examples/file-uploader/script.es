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
  initialize () {
    this.context.files = []

//  this.whitelist = this.generate_whitelist()

//  this.default_text = 'Click to upload files'
//  this.on_drag_text = 'Drop here!'
  }

  get label () {
    return this.getAttribute
      ('label') || 'Default'
  }

  /**
   * Listens for the event of a user clicking `<button type=submit>`,
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
  static onsubmit (event)
    { event.preventDefault () }

  /**
   * Listens for the event of a user clicking `<button type=reset>`,
   * and removes all the files accordingly.
   *
   * @param event {MouseEvent} The event that has been triggered.
   *
   * Further reading:
   * - Reset Event
   *   - https://developer.mozilla.org/en-US/docs/Web/Events/reset
   * - GlobalEventHandlers.onreset
   *   - https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onreset
   */
  static onreset (event) {
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
    this.context.files.splice(event.target.dataset.index, 1)

    this.render ()
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

    event.preventDefault ()

//  this.reset_label(event.target)

    this.add_files (files)

    this.render ()
  }

  /**
   * Listens for the event of a dragged object LEAVING the
   * label's area.
   *
   * @param event {DragEvent} The event that has been triggered.
   */
  static ondragleave (event) {
//  this.reset_label(event.target)
  }

  /**
   * Listens for the event of a dragged object ENTERING the
   * label's area.
   *
   * @param event {DragEvent} The event that has been triggered. 
   */
  static ondragenter (event) {
    event.target.innerHTML = this.on_drag_text

    event.preventDefault ()
  }

  /**
   * Listens for the event of a dragged object ENTERING the
   * label's area.
   *
   * @param event {DragEvent} The event that has been triggered. 
   */
  static ondragover (event) {
    event.preventDefault ()
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
   * Resets the whitelist's text to its default value.
   * This default value can be changed via <code>set_label</code>.
   *
   * @param label {Element} The label's DOM Element.
   *
   * @see set_label
   */
  reset_label (label) {
    label.innerHTML = this.default_text
  }

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
    var icon_url = this.whitelist[file.type]

    file.icon_url = icon_url === undefined ? '' : icon_url
    // Also add a flag to hide the icon if the URL is invalid.
    file.hidden_icon = icon_url === undefined ? 'hidden' : ''

    return file
  }

  /**
   * Sets the valid file types / type icons whitelist to the given
   * object.
   *
   * @param whitelist {Object} The new whitelist to use.
   */
  set_whitelist(whitelist) {
    this.whitelist = whitelist
  }

  /**
   * Sets the label's defaults.
   *
   * @param default_text {String} The default text for the label.
   * @param on_drag_text {String} The text to use on the label
   *   when an object is being dragged over said label.
   */
  set_label(default_text, on_drag_text) {
    this.default_text = default_text
    this.on_drag_text = on_drag_text

    // Re-render the element to reflect changes made.
    this.render ()
  }

  /** The list of files currently saved. */
  get files () {
    return this.context.files
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

})


