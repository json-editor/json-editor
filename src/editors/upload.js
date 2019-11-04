import { AbstractEditor } from '../editor'
import { $extend, $each } from '../utilities'

export var UploadEditor = AbstractEditor.extend({

  getNumColumns: function () {
    return 4
  },
  build: function () {
    var self = this
    this.title = this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())

    // Editor options
    this.options = this.expandCallbacks('upload', $extend({}, {
      'title': 'Browse',
      'icon': '',
      'auto_upload': false, // Trigger file upload button automatically
      'hide_input': false, // Hide the Browse button and name display (Only works if 'enable_drag_drop' is true)
      'enable_drag_drop': false, // Enable Drag&Drop uploading
      'drop_zone_text': 'Drag & Drop file here', // Text displayed in dropzone box
      'drop_zone_top': false, // Position of dropzone. true=before button input, false=after button input
      'alt_drop_zone_id': '', // Alternate DropZone ID (Can be created inside another property)
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
        if (this.options.alt_drop_zone_id !== '') {
          if (this.options.alt_drop_zone_id.substr(0, 1) !== '#') this.options.alt_drop_zone_id = '#' + this.options.alt_drop_zone_id
          this.dropZone = document.querySelector(this.options.alt_drop_zone_id)
        } else {
          this.dropZone = document.createElement('div')
          this.dropZone.classList.add('je-dropzone')
          this.dropZone.setAttribute('data-text', this.options.drop_zone_text)
          this.container.appendChild(this.dropZone)

          // The Style Rules should be placed in theme once we have theme functions to render the dropzone
          this.jsoneditor.addNewStyleRules(this.jsoneditor.options.theme || window.JSONEditor.defaults.theme, {
            '.je-dropzone': 'position:relative;margin:0.5rem 0;border 2px dashed black;width:100%;height:60px;background:teal;transition: all 0.5s',
            '.je-dropzone:before': 'position:absolute;content:attr(data-text);left:50%;top:50%;transform: translate(-50%,-50%)',
            '.je-dropzone.active-dropzone': 'background:green'
          })
        }
        if (this.dropZone) this.dropZone.classList.add('upload-dropzone')
      }

      // Triggered after file have been selected
      this.uploadHandler = function (e) {
        e.preventDefault()
        e.stopPropagation()
        var files = e.target.files || e.dataTransfer.files
        if (files && files.length) {
          var errors = []
          // size of uploaded file is too big
          if (self.options.max_upload_size !== 0 && files[0].size > self.options.max_upload_size) {
            errors.push({
              path: self.path,
              property: 'size',
              message: 'Filesize too large. Max size is ' + self.options.max_upload_size
            })
          }
          // wrong file/mime type
          if (self.options.mime_type.length !== 0 && !self.isValidMimeType(files[0].type, self.options.mime_type)) {
            errors.push({
              path: self.path,
              property: 'format',
              message: 'Wrong file format. Allowed format(s): ' + self.options.mime_type.toString()
            })
          }
          if (errors.length > 0) {
            self.is_dirty = true
            self.showValidationErrors(errors)
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
        var validType = files && (self.options.mime_type.length === 0 || self.isValidMimeType(files[0].type, self.options.mime_type))
        var validZone = e.currentTarget.classList && e.currentTarget.classList.contains('upload-dropzone') && validType
        switch ((this === window ? 'w_' : 'e_') + e.type) {
          case 'w_drop':
          case 'w_dragover':
            if (!validZone) e.dataTransfer.dropEffect = 'none'
            break
          case 'e_dragenter': {
            if (validZone) {
              self.dropZone.classList.add('active-dropzone')
              e.dataTransfer.dropEffect = 'copy'
            }
            break
          }
          case 'e_dragleave':
            if (validZone) self.dropZone.classList.remove('active-dropzone')
            break
          case 'e_dragover': {
            if (validZone) {
              e.dataTransfer.dropEffect = 'copy'
              self.dropZone.classList.add('active-dropzone')
            }
            break
          }
          case 'e_drop': {
            if (validZone) self.uploadHandler(e)
            self.dropZone.classList.remove('active-dropzone')
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

    var description = this.schema.description || ''

    this.preview = this.theme.getFormInputDescription(description)

    this.control = this.theme.getFormControl(this.label, this.uploader || this.input, this.preview)
    this.container.appendChild(this.control)
    if (this.dropZone && this.options.alt_drop_zone_id === '' && this.options.drop_zone_top === true) this.container.appendChild(this.dropZone)
    if (this.fileUploadGroup) this.container.appendChild(this.fileUploadGroup)
    if (this.dropZone && this.options.alt_drop_zone_id === '' && this.options.drop_zone_top !== true) this.container.appendChild(this.dropZone)
    this.container.appendChild(this.preview)

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

    // Remove Drag'n'Drop handlers
    if (this.options.enable_drag_drop === true) {
      ['dragover', 'drop'].forEach(function (ev) {
        window.removeEventListener(ev, self.dragHandler, true)
      });
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function (ev) {
        self.dropZone.removeEventListener(ev, self.dragHandler, true)
      })
    }

    if (this.preview && this.preview.parentNode) this.preview.parentNode.removeChild(this.preview)
    if (this.title && this.title.parentNode) this.title.parentNode.removeChild(this.title)
    if (this.input && this.input.parentNode) this.input.parentNode.removeChild(this.input)

    this._super()
  },
  isValidMimeType: function (mimeType, mimeTypesList) {
    return mimeTypesList.reduce(function (a, v) {
      return a || new RegExp(v.replace(/\*/g, '.*'), 'gi').test(mimeType)
    }, false)
  },
  showValidationErrors: function (errors) {
    var self = this
    if (this.jsoneditor.options.show_errors === 'always') {
    } else if (!this.is_dirty && this.previous_error_setting === this.jsoneditor.options.show_errors) {
      return
    }

    this.previous_error_setting = this.jsoneditor.options.show_errors

    var messages = []
    $each(errors, function (i, error) {
      if (error.path === self.path) {
        messages.push(error.message)
      }
    })
    this.input.controlgroup = this.control

    if (messages.length) {
      this.theme.addInputError(this.input, messages.join('. ') + '.')
    } else {
      this.theme.removeInputError(this.input)
    }
  }
})
