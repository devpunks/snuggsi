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
   * @see get mimetypes
   */

   initialize ()
     { this.context.files = [] }

  get label () {

    return this.getAttribute
      ('label') || 'Drag files here'
  }

  get title () {

    return this.getAttribute
      ('title') || 'Drop files'
  }

  /** The default mimetypes object, with names for icons for each type. */ 
  static get mimetypes () {

    return {
      'application/pdf': 'pdf.png',

      'audio/*'   : 'audio.png',
      'video/*'   : 'video.png',
      'image/jpeg': 'jpeg.png',
      'image/png' : 'png.png',
      'image/jpeg': 'jpeg.png',
      'text/plain': 'plain.png',

      'application/vnd.ms-powerpoint': 'ppt.png',
      'application/vnd.ms-word'      : 'word.png',
      'application/vnd.ms-excel'     : 'excel.png',

      'application/vnd.oasis.opendocument.presentation': 'ppt.png',
      'application/vnd.oasis.opendocument.text'        : 'word.png',
      'application/vnd.oasis.opendocument.spreadsheet' : 'excel.png',

      'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'ppt.png',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'  : 'word.png',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'        : 'excel.png'
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
   *    <option value=app-pdf.png   label=application/pdf>
   *    <option value=app-img.png   label=image/png>
   *    <option value=app-img.png   label=image/jpeg>
   *    <option value=txt-plain.png label=text/plain>
   *  </datalist>
   *
   * If no <code>datalist</code> with such ID is found, it will
   * default to use <code>mimetypes</code> to generate
   * the element's whitelist.
   *
   * Whitelists can also be programatically set with
   * <code>set_whitelist</code>
   *
   * @see mimetypes
   *
   * @returns {Object} The mimetypes.
   */

  get mimetypes () {

    let
      mimetypes = {}

    const
      datalist =
        this.select ('datalist#mimetypes')

    , options = datalist &&
        datalist.querySelectorAll ('option')

    , accept = option =>
        mimetypes [option.value] =
          this.constructor.mimetypes [option.value]

    // Add all { mimetype: icon } pairs to the whitelist, where
    // the label corresponds to the mimetype, and the value to the
    // type's icon's URL.


    void ( !!! options )
      ? this.constructor.mimetypes
      : Array
          .from (options)
          .map (accept)

    return mimetypes
  }

  static onconnect () {
    console.log (this.mimetypes)
  }

  /**
   * Listens for changes in the file field, essentially
   * processing new non-dragged files.
   *
   * @param event {Event} The event that has been triggered.
   */

  static onchange (event) {
    console.log ('change')

    if (!!! event.target.files) return

    this.add_files (event.target.files)

    this.render ()
  }

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

  /**
   * Listens for the event of a user removing a file
   * via the button on the file's entry's row.
   *
   * @param event {MouseEvent} The event that has been triggered. 
   */

  static onremove (event) {

    // http://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript
    this.context.files = []

    this.render ()
  }

  static onclear (event) {

    // http://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript
    this.context.files = []

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
      .textContent = this.label
  }

  /**
   * Listens for the event of a dragged object ENTERING the
   * label's area.
   *
   * @param event {DragEvent} The event that has been triggered. 
   */

  static ondragenter (event) {

    this.select ('label')
      .textContent = this.title
  }

  /**
   * Listens for the event of the dragged object being dropped
   * within the label's area.
   *
   * @param event {DragEvent} The event that has been triggered.
   */

  static ondrop (event) {
  console.log ('drop')

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

})

