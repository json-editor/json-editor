import { AbstractEditor } from '../editor'
import { $extend } from '../utilities'

export var UploadEditor = AbstractEditor.extend({

  getNumColumns: function () {
    return 4
  },
  build: function () {
    var self = this
    if (!this.options.compact) this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())
    if (this.schema.description) this.description = this.theme.getFormInputDescription(this.schema.description)
    if (this.options.infoText) this.infoButton = this.theme.getInfoButton(this.options.infoText)

    // Editor options
    this.options = this.expandCallbacks('upload', $extend({}, {
      'title': 'Browse',
      'icon': '',
      'auto_upload': false, // Trigger file upload button automatically
      'hide_input': false, // Hide the Browse button and name display (Only works if 'enable_drag_drop' is true)
      'enable_drag_drop': false, // Enable Drag&Drop uploading
      'drop_zone_text': 'Drag & Drop file here', // Text displayed in dropzone box
      'drop_zone_top': false, // Position of dropzone. true=before button input, false=after button input
      'alt_drop_zone': '', // Alternate DropZone DOM selector (Can be created inside another property)
      'mime_type': '', // If set, restricts to mime type(s). Can be either a string or an array
      'max_upload_size': 0, // Maximum file size allowed. 0 = no limit
      'upload_handler': function (jseditor, type, file, cbs) {
        // Default dummy test upload handler
        window.alert('No upload_handler defined for "' + jseditor.path + '". You must create your own handler to enable upload to server')
      }.bind(null, this)
    }, this.defaults.options.upload || {}, this.options.upload || {}))

    this.options.mime_type = this.options.mime_type ? [].concat(this.options.mime_type) : []

    // Input that holds the base64 string
    this.input = this.theme.getFormInputField('hidden')
    this.container.appendChild(this.input)

    // Don't show uploader if this is readonly
    if (!this.schema.readOnly && !this.schema.readonly) {
      if (typeof this.options.upload_handler !== 'function') throw new Error('Upload handler required for upload editor')

      // File uploader
      this.uploader = this.theme.getFormInputField('file')
      this.uploader.style.display = 'none'
      if (this.options.mime_type.length) this.uploader.setAttribute('accept', this.options.mime_type)

      if (!(this.options.enable_drag_drop === true && this.options.hide_input === true)) {
        // Pass click to this.uploader element
        this.clickHandler = function (e) {
          self.uploader.dispatchEvent(new window.MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': false
          }))
        }

        // Browse button
        this.browseButton = this.getButton(this.options.title, this.options.icon, this.options.title)
        this.browseButton.addEventListener('click', this.clickHandler)

        // Display field
        this.fileDisplay = this.theme.getFormInputField('input')
        this.fileDisplay.setAttribute('readonly', true)
        this.fileDisplay.value = 'No file selected.'
        this.fileDisplay.addEventListener('dblclick', this.clickHandler)

        this.fileUploadGroup = this.theme.getInputGroup(this.fileDisplay, [this.browseButton])
      }

      // Drag&Drop upload enabled
      if (this.options.enable_drag_drop === true) {
        // Alternate DropZone defined
        if (this.options.alt_drop_zone !== '') {
          this.altDropZone = document.querySelector(this.options.alt_drop_zone)
          if (this.altDropZone) this.dropZone = this.altDropZone
          else throw new Error('Error: alt_drop_zone selector "' + this.options.alt_drop_zone + '" not found!')
        } else this.dropZone = this.theme.getDropZone(this.options.drop_zone_text)

        if (this.dropZone) {
          this.dropZone.classList.add('upload-dropzone')
          this.dropZone.addEventListener('dblclick', this.clickHandler)
        }
      }

      // Triggered after file have been selected
      this.uploadHandler = function (e) {
        e.preventDefault()
        e.stopPropagation()
        var files = e.target.files || e.dataTransfer.files
        if (files && files.length) {
          if (self.options.max_upload_size !== 0 && files[0].size > self.options.max_upload_size) {
            self.theme.addInputError(self.uploader, 'Filesize too large. Max size is ' + self.options.max_upload_size)
          } else if (self.options.mime_type.length !== 0 && !self.isValidMimeType(files[0].type, self.options.mime_type)) {
            self.theme.addInputError(self.uploader, 'Wrong file format. Allowed format(s): ' + self.options.mime_type.toString())
          } else {
            if (self.fileDisplay) self.fileDisplay.value = files[0].name
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
      }

      this.uploader.addEventListener('change', this.uploadHandler)

      // Drag&Drop Event Handler
      this.dragHandler = function (e) {
        var files = e.dataTransfer.items || e.dataTransfer.files
        var validType = files && files.length && (self.options.mime_type.length === 0 || self.isValidMimeType(files[0].type, self.options.mime_type))
        var validZone = e.currentTarget.classList && e.currentTarget.classList.contains('upload-dropzone') && validType
        switch ((this === window ? 'w_' : 'e_') + e.type) {
          case 'w_drop':
          case 'w_dragover':
            // prevent default browser action if dropped outside dropzone
            if (!validZone) e.dataTransfer.dropEffect = 'none'
            break
          case 'e_dragenter': {
            if (validZone) {
              self.dropZone.classList.add('valid-dropzone')
              e.dataTransfer.dropEffect = 'copy'
            } else self.dropZone.classList.add('invalid-dropzone')
            break
          }
          case 'e_dragover': {
            if (validZone) e.dataTransfer.dropEffect = 'copy'
            break
          }
          case 'e_dragleave':
            self.dropZone.classList.remove('valid-dropzone', 'invalid-dropzone')
            break
          case 'e_drop': {
            self.dropZone.classList.remove('valid-dropzone', 'invalid-dropzone')
            if (validZone) self.uploadHandler(e)
            break
          }
        }
        if (!validZone) e.preventDefault()
      }

      // Set Drag'n'Drop handlers
      if (this.options.enable_drag_drop === true) {
        ['dragover', 'drop'].forEach(function (ev) {
          window.addEventListener(ev, self.dragHandler, true)
        });
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function (ev) {
          self.dropZone.addEventListener(ev, self.dragHandler, true)
        })
      }
    }

    this.preview = document.createElement('div')

    this.control = this.input.controlgroup = this.theme.getFormControl(this.label, this.uploader || this.input, this.description, this.infoButton)
    if (this.uploader) this.uploader.controlgroup = this.control
    var inputNode = this.uploader || this.input
    var elements = document.createElement('div')

    if (this.dropZone && !this.altDropZone && this.options.drop_zone_top === true) elements.appendChild(this.dropZone)
    if (this.fileUploadGroup) elements.appendChild(this.fileUploadGroup)
    if (this.dropZone && !this.altDropZone && this.options.drop_zone_top !== true) elements.appendChild(this.dropZone)
    elements.appendChild(this.preview)
    inputNode.parentNode.insertBefore(elements, inputNode.nextSibling)

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
        console.error('upload error', error, this)
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

    var files = e.target.files || e.dataTransfer.files
    var file = files[0]

    // mime type extracted from file data. More exact than the one in the file object
    var mime = this.preview_value.match(/^data:([^;,]+)[;,]/)
    file.mimeType = mime ? mime[1] : 'unknown'

    if (file.size > 0) {
      // Format bytes as KB/MB etc. with 2 decimals
      var i = Math.floor(Math.log(file.size) / Math.log(1024))
      file.formattedSize = parseFloat((file.size / Math.pow(1024, i)).toFixed(2)) + ' ' + ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][i]
    } else file.formattedSize = '0 Bytes'

    var uploadButton = this.getButton('Upload', 'upload', 'Upload')
    uploadButton.addEventListener('click', function (event) {
      event.preventDefault()

      uploadButton.setAttribute('disabled', 'disabled')
      self.theme.removeInputError(self.uploader)

      if (self.theme.getProgressBar) {
        self.progressBar = self.theme.getProgressBar()
        self.preview.appendChild(self.progressBar)
      }

      self.options.upload_handler(self.path, file, {
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

    this.preview.appendChild(this.theme.getUploadPreview(file, uploadButton, this.preview_value))

    if (this.options.auto_upload) {
      uploadButton.dispatchEvent(new window.MouseEvent('click'))
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
    var self = this
    // Remove Drag'n'Drop handlers
    if (this.options.enable_drag_drop === true) {
      ['dragover', 'drop'].forEach(function (ev) {
        window.removeEventListener(ev, self.dragHandler, true)
      });
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function (ev) {
        self.dropZone.removeEventListener(ev, self.dragHandler, true)
      })
      this.dropZone.removeEventListener('dblclick', this.clickHandler)
      if (this.dropZone && this.dropZone.parentNode) this.dropZone.parentNode.removeChild(this.dropZone)
    }

    if (this.uploader && this.uploader.parentNode) {
      this.uploader.removeEventListener('change', this.uploadHandler)
      this.uploader.parentNode.removeChild(this.uploader)
    }
    if (this.browseButton && this.browseButton.parentNode) {
      this.browseButton.removeEventListener('click', this.clickHandler)
      this.browseButton.parentNode.removeChild(this.browseButton)
    }
    if (this.fileDisplay && this.fileDisplay.parentNode) {
      this.fileDisplay.removeEventListener('dblclick', this.clickHandler)
      this.fileDisplay.parentNode.removeChild(this.fileDisplay)
    }
    if (this.fileUploadGroup && this.fileUploadGroup.parentNode) this.fileUploadGroup.parentNode.removeChild(this.fileUploadGroup)
    if (this.preview && this.preview.parentNode) this.preview.parentNode.removeChild(this.preview)
    if (this.header && this.header.parentNode) this.header.parentNode.removeChild(this.header)
    if (this.input && this.input.parentNode) this.input.parentNode.removeChild(this.input)

    this._super()
  },
  isValidMimeType: function (mimeType, mimeTypesList) {
    return mimeTypesList.reduce(function (a, v) {
      return a || new RegExp(v.replace(/\*/g, '.*'), 'gi').test(mimeType)
    }, false)
  }
})
