import { AbstractEditor } from '../editor'
import { $extend } from '../utilities'

export var UploadEditor = AbstractEditor.extend({

  getNumColumns: function () {
    return 4
  },
  build: function () {
    var self = this
    this.title = this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())

    // Editor options
    var options = this.expandCallbacks('fileupload', $extend({}, {
      'title': 'Browse'
    }, this.defaults.options.fileupload || {}, this.options.fileupload || {}))

    // Input that holds the base64 string
    this.input = this.theme.getFormInputField('hidden')
    this.container.appendChild(this.input)

    // Don't show uploader if this is readonly
    if (!this.schema.readOnly && !this.schema.readonly) {
      if (!this.jsoneditor.options.upload) throw new Error('Upload handler required for upload editor')

      // File uploader
      this.uploader = this.theme.getFormInputField('file')
      this.uploader.style.display = 'none'

      // Browse button
      this.browseButton = this.theme.getFormButton(options.title, null, options.title)
      // this.container.appendChild(this.browseButton)

      // Display field
      this.fileDisplay = this.theme.getFormInputField('input')
      this.fileDisplay.setAttribute('readonly', true)
      this.fileDisplay.value = 'No file selected.'
      // this.container.appendChild(this.fileDisplay)
      this.fileUploadGroup = this.theme.getInputGroup(this.fileDisplay, [this.browseButton])
      this.container.appendChild(this.fileUploadGroup)

      this.dropZone = this.container // this.fileDisplay
      this.dropZone.classList.add('upload-dropzone')

      // Triggered after file have been selected
      this.uploadHandler = function (e) {
        e.preventDefault()
        e.stopPropagation()
        var files = e.target.files || e.dataTransfer.files
        if (files && files.length) {
          self.fileDisplay.value = files.length > 1 ? files.length + ' files.' : files[0].name
          var fr = new window.FileReader()
          fr.onload = function (evt) {
            self.preview_value = evt.target.result
            self.refreshPreview(e)
            self.onChange(true)
            fr = null
          }
          fr.readAsDataURL(files[0])
        }
      }

      this.uploader.addEventListener('change', this.uploadHandler)

      // Pass click to this.uploader element
      this.clickHandler = function (e) {
        self.uploader.dispatchEvent(new window.MouseEvent('click', {
          'view': window,
          'bubbles': true,
          'cancelable': false
        }))
      }
      this.browseButton.addEventListener('click', this.clickHandler)

      this.handleInvalidDrop = function (e) {
        var validZone = e.currentTarget.classList && e.currentTarget.classList.contains('upload-dropzone')
        if (!validZone) {
          e.dataTransfer.dropEffect = 'none'
          e.preventDefault()
        }
      }

      this.dragHandler = function (e) {
        var validZone = e.currentTarget.classList && e.currentTarget.classList.contains('upload-dropzone')
        switch (e.type) {
          case 'dragenter':
            if (validZone) e.dataTransfer.dropEffect = 'copy'
            break
          case 'dragover':
            if (validZone) e.dataTransfer.dropEffect = 'copy'
            break
          case 'drop':
            if (validZone) self.uploadHandler(e)
            break
        }
        if (!validZone) e.preventDefault()
      }

      window.addEventListener('dragover', this.handleInvalidDrop, true)
      window.addEventListener('drop', this.handleInvalidDrop, true)

      this.dropZone.addEventListener('dragenter', this.dragHandler, true)
      this.dropZone.addEventListener('dragover', this.dragHandler, true)
      this.dropZone.addEventListener('drop', this.dragHandler, true)
    }

    var description = this.schema.description
    if (!description) description = ''

    this.preview = this.theme.getFormInputDescription(description)
    this.container.appendChild(this.preview)

    this.control = this.theme.getFormControl(this.label, this.uploader || this.input, this.preview)
    this.container.appendChild(this.control)

    // Any special formatting that needs to happen after the input is added to the dom
    window.requestAnimationFrame(function () {
      self.afterInputReady()
    })
  },
  afterInputReady: function () {
    var self = this
    if (self.value) {
      var img = document.createElement('img')
      img.style.maxWidth = '100%'
      img.style.maxHeight = '100px'
      img.onload = function (event) {
        self.preview.appendChild(img)
      }
      img.onerror = function (error) {
        console.error('upload error', error)
      }
      img.src = self.container.querySelector('a').href
    }
    self.theme.afterInputReady(self.input)
  },
  refreshPreview: function (e) {
    if (this.last_preview === this.preview_value) return
    this.last_preview = this.preview_value

    this.preview.innerHTML = ''

    if (!this.preview_value) return

    var self = this

    var mime = this.preview_value.match(/^data:([^;,]+)[;,]/)
    if (mime) mime = mime[1]
    if (!mime) mime = 'unknown'

    var files = e.target.files || e.dataTransfer.files
    var file = files[0]

    this.preview.innerHTML = '<strong>Type:</strong> ' + mime + ', <strong>Size:</strong> ' + file.size + ' bytes'
    if (mime.substr(0, 5) === 'image') {
      this.preview.innerHTML += '<br>'
      var img = document.createElement('img')
      img.style.maxWidth = '100%'
      img.style.maxHeight = '100px'
      img.src = this.preview_value
      this.preview.appendChild(img)
    }

    this.preview.innerHTML += '<br>'
    var uploadButton = this.getButton('Upload', 'upload', 'Upload')
    this.preview.appendChild(uploadButton)
    uploadButton.addEventListener('click', function (event) {
      event.preventDefault()

      uploadButton.setAttribute('disabled', 'disabled')
      self.theme.removeInputError(self.uploader)

      if (self.theme.getProgressBar) {
        self.progressBar = self.theme.getProgressBar()
        self.preview.appendChild(self.progressBar)
      }

      self.jsoneditor.options.upload(self.path, file, {
        success: function (url) {
          self.setValue(url)

          if (self.parent) self.parent.onChildEditorChange(self)
          else self.jsoneditor.onChange()

          if (self.progressBar) self.preview.removeChild(self.progressBar)
          uploadButton.removeAttribute('disabled')
        },
        failure: function (error) {
          self.theme.addInputError(self.uploader, error)
          if (self.progressBar) self.preview.removeChild(self.progressBar)
          uploadButton.removeAttribute('disabled')
        },
        updateProgress: function (progress) {
          if (self.progressBar) {
            if (progress) self.theme.updateProgressBar(self.progressBar, progress)
            else self.theme.updateProgressBarUnknown(self.progressBar)
          }
        }
      })
    })

    if (this.jsoneditor.options.auto_upload || this.schema.options.auto_upload) {
      // eslint-disable-next-line no-undef
      uploadButton.dispatchEvent(new MouseEvent('click'))
      this.preview.removeChild(uploadButton)
    }
  },
  enable: function () {
    if (!this.always_disabled) {
      if (this.uploader) this.uploader.disabled = false
      this._super()
    }
  },
  disable: function (alwaysDisabled) {
    if (alwaysDisabled) this.always_disabled = true
    if (this.uploader) this.uploader.disabled = true
    this._super()
  },
  setValue: function (val) {
    if (this.value !== val) {
      this.value = val
      this.input.value = this.value
      this.onChange()
    }
  },
  destroy: function () {
    if (this.uploader && this.uploader.parentNode) {
      this.uploader.removeEventListener('change', this.uploadHandler)
      this.uploader.parentNode.removeChild(this.uploader)

      this.browseButton.removeEventListener('click', this.clickHandler)
      this.browseButton.parentNode.removeChild(this.browseButton)

      this.fileDisplay.parentNode.removeChild(this.fileDisplay)

      this.fileUploadGroup.parentNode.removeChild(this.fileUploadGroup)

      window.removeEventListener('dragover', this.handleInvalidDrop, true)
      window.removeEventListener('drop', this.handleInvalidDrop, true)
      this.dropZone.addEventListener('dragenter', this.dragHandler, true)
      this.dropZone.addEventListener('dragover', this.dragHandler, true)
      this.dropZone.addEventListener('drop', this.dragHandler, true)
    }
    if (this.preview && this.preview.parentNode) this.preview.parentNode.removeChild(this.preview)
    if (this.title && this.title.parentNode) this.title.parentNode.removeChild(this.title)
    if (this.input && this.input.parentNode) this.input.parentNode.removeChild(this.input)

    this._super()
  }
})
