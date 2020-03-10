import { AbstractEditor } from '../editor.js'

export class Base64Editor extends AbstractEditor {
  getNumColumns() {
    return 4
  }

  setFileReaderListener(frMultiple) {
    const self = this
    frMultiple.addEventListener('load', event => {
      if (self.count === self.current_item_index) {
        /* Overwrite existing file by default, leave other properties unchanged */
        self.value[self.count][self.key] = event.target.result
      } else {
        const tempObject = {}
        /* Create empty object */
        for (const key in self.parent.schema.properties) {
          tempObject[key] = ''
        }
        /* Set object media file */
        tempObject[self.key] = event.target.result
        self.value.splice(self.count, 0, tempObject) /* insert new file object */
      }

      /* Increment using the listener and not the 'for' loop as the listener will be processed asynchronously */
      self.count += 1
      /* When all files have been processed, update the value of the editor */
      if (self.count === (self.total + self.current_item_index)) {
        self.arrayEditor.setValue(self.value)
      }
    })
  }

  build() {
    const self = this
    this.title = this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())
    if (this.options.infoText) this.infoButton = this.theme.getInfoButton(this.options.infoText)

    /* Input that holds the base64 string */
    this.input = this.theme.getFormInputField('hidden')
    this.container.appendChild(this.input)

    /* Don't show uploader if this is readonly */
    if (!this.schema.readOnly && !this.schema.readonly) {
      if (!window.FileReader) throw new Error('FileReader required for base64 editor')

      /* File uploader */
      this.uploader = this.theme.getFormInputField('file')

      /* Set attribute of file input field to 'multiple' if: */
      /* 'multiple' key has been set to 'true' in the schema */
      /* and the parent object is of type 'object' */
      /* and the parent of the parent type has been set to 'array' */
      if (self.schema.options && self.schema.options.multiple && self.schema.options.multiple === true && self.parent && self.parent.schema.type === 'object' && self.parent.parent && self.parent.parent.schema.type === 'array') {
        this.uploader.setAttribute('multiple', '')
      }

      this.uploader.addEventListener('change', function (e) {
        e.preventDefault()
        e.stopPropagation()

        if (this.files && this.files.length) {
          /* Check the amount of files uploaded. */
          /* If 1, use the regular upload, otherwise use the multiple upload method */
          if (this.files.length > 1 && self.schema.options && self.schema.options.multiple && self.schema.options.multiple === true && self.parent && self.parent.schema.type === 'object' && self.parent.parent && self.parent.parent.schema.type === 'array') {
            /* Load editor of parent.parent to get the array */
            self.arrayEditor = self.jsoneditor.getEditor(self.parent.parent.path)
            /* Check the current value of this editor */
            self.value = self.arrayEditor.getValue()
            /* Set variables for amount of files, index of current array item and */
            /* count value containing current status of processed files */
            self.total = this.files.length
            self.current_item_index = parseInt(self.parent.key)
            self.count = self.current_item_index

            for (let i = 0; i < self.total; i++) {
              const frMultiple = new FileReader()
              self.setFileReaderListener(frMultiple)
              frMultiple.readAsDataURL(this.files[i])
            }
          } else {
            let fr = new FileReader()
            fr.onload = evt => {
              self.value = evt.target.result
              self.refreshPreview()
              self.onChange(true)
              fr = null
            }
            fr.readAsDataURL(this.files[0])
          }
        }
      })
    }

    this.preview = this.theme.getFormInputDescription(this.schema.description)
    this.container.appendChild(this.preview)

    this.control = this.theme.getFormControl(this.label, this.uploader || this.input, this.preview, this.infoButton)
    this.container.appendChild(this.control)
  }

  refreshPreview() {
    if (this.last_preview === this.value) return
    this.last_preview = this.value

    this.preview.innerHTML = ''

    if (!this.value) return

    let mime = this.value.match(/^data:([^;,]+)[;,]/)
    if (mime) mime = mime[1]

    if (!mime) {
      this.preview.innerHTML = '<em>Invalid data URI</em>'
    } else {
      this.preview.innerHTML = `<strong>Type:</strong> ${mime}, <strong>Size:</strong> ${Math.floor((this.value.length - this.value.split(',')[0].length - 1) / 1.33333)} bytes`
      if (mime.substr(0, 5) === 'image') {
        this.preview.innerHTML += '<br>'
        const img = document.createElement('img')
        img.style.maxWidth = '100%'
        img.style.maxHeight = '100px'
        img.src = this.value
        this.preview.appendChild(img)
      }
    }
  }

  enable() {
    if (!this.always_disabled) {
      if (this.uploader) this.uploader.disabled = false
      super.enable()
    }
  }

  disable(alwaysDisabled) {
    if (alwaysDisabled) this.always_disabled = true
    if (this.uploader) this.uploader.disabled = true
    super.disable()
  }

  setValue(val) {
    if (this.value !== val) {
      this.value = val
      this.input.value = this.value
      this.refreshPreview()
      this.onChange()
    }
  }

  destroy() {
    if (this.preview && this.preview.parentNode) this.preview.parentNode.removeChild(this.preview)
    if (this.title && this.title.parentNode) this.title.parentNode.removeChild(this.title)
    if (this.input && this.input.parentNode) this.input.parentNode.removeChild(this.input)
    if (this.uploader && this.uploader.parentNode) this.uploader.parentNode.removeChild(this.uploader)

    super.destroy()
  }
}
