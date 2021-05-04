import { AbstractEditor } from '../editor.js'

export class Base64Editor extends AbstractEditor {
  getNumColumns () {
    return 4
  }

  setFileReaderListener (frMultiple) {
    frMultiple.addEventListener('load', (event) => {
      if (this.count === this.current_item_index) {
        /* Overwrite existing file by default, leave other properties unchanged */
        this.value[this.count][this.key] = event.target.result
      } else {
        const tempObject = {}
        /* Create empty object */
        for (const key in this.parent.schema.properties) {
          tempObject[key] = ''
        }
        /* Set object media file */
        tempObject[this.key] = event.target.result
        this.value.splice(this.count, 0, tempObject) /* insert new file object */
      }

      /* Increment using the listener and not the 'for' loop as the listener will be processed asynchronously */
      this.count += 1
      /* When all files have been processed, update the value of the editor */
      if (this.count === (this.total + this.current_item_index)) {
        this.arrayEditor.setValue(this.value)
      }
    })
  }

  build () {
    if (!this.options.compact) this.title = this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())
    if (this.options.infoText) this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText))

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
      if (this.schema.options && this.schema.options.multiple && this.schema.options.multiple === true && this.parent && this.parent.schema.type === 'object' && this.parent.parent && this.parent.parent.schema.type === 'array') {
        this.uploader.setAttribute('multiple', '')
      }

      this.uploader.addEventListener('change', e => {
        e.preventDefault()
        e.stopPropagation()

        if (e.currentTarget.files && e.currentTarget.files.length) {
          /* Check the amount of files uploaded. */
          /* If 1, use the regular upload, otherwise use the multiple upload method */
          if (e.currentTarget.files.length > 1 && this.schema.options && this.schema.options.multiple && this.schema.options.multiple === true && this.parent && this.parent.schema.type === 'object' && this.parent.parent && this.parent.parent.schema.type === 'array') {
            /* Load editor of parent.parent to get the array */
            this.arrayEditor = this.jsoneditor.getEditor(this.parent.parent.path)
            /* Check the current value of this editor */
            this.value = this.arrayEditor.getValue()
            /* Set variables for amount of files, index of current array item and */
            /* count value containing current status of processed files */
            this.total = e.currentTarget.files.length
            this.current_item_index = parseInt(this.parent.key)
            this.count = this.current_item_index

            for (let i = 0; i < this.total; i++) {
              const frMultiple = new FileReader()
              this.setFileReaderListener(frMultiple)
              frMultiple.readAsDataURL(e.currentTarget.files[i])
            }
          } else {
            let fr = new FileReader()
            fr.onload = (evt) => {
              this.value = evt.target.result
              this.refreshPreview()
              this.onChange(true)
              fr = null
            }
            fr.readAsDataURL(e.currentTarget.files[0])
          }
        }
      })
    }

    this.preview = this.theme.getFormInputDescription(this.translateProperty(this.schema.description))
    this.container.appendChild(this.preview)

    this.control = this.theme.getFormControl(this.label, this.uploader || this.input, this.preview, this.infoButton)
    this.container.appendChild(this.control)
  }

  refreshPreview () {
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

  enable () {
    if (!this.always_disabled) {
      if (this.uploader) this.uploader.disabled = false
      super.enable()
    }
  }

  disable (alwaysDisabled) {
    if (alwaysDisabled) this.always_disabled = true
    if (this.uploader) this.uploader.disabled = true
    super.disable()
  }

  setValue (val) {
    if (this.value !== val) {
      if (this.schema.readOnly && this.schema.enum && !this.schema.enum.includes(val)) this.value = this.schema.enum[0]
      else this.value = val
      this.input.value = this.value
      this.refreshPreview()
      this.onChange()
    }
  }

  destroy () {
    if (this.preview && this.preview.parentNode) this.preview.parentNode.removeChild(this.preview)
    if (this.title && this.title.parentNode) this.title.parentNode.removeChild(this.title)
    if (this.input && this.input.parentNode) this.input.parentNode.removeChild(this.input)
    if (this.uploader && this.uploader.parentNode) this.uploader.parentNode.removeChild(this.uploader)

    super.destroy()
  }
}
