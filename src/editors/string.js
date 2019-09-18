import { AbstractEditor } from '../editor'
import { $extend, $each } from '../utilities'
export var StringEditor = AbstractEditor.extend({
  register: function () {
    this._super()
    if (!this.input) return
    this.input.setAttribute('name', this.formname)
  },
  unregister: function () {
    this._super()
    if (!this.input) return
    this.input.removeAttribute('name')
  },
  setValue: function (value, initial, fromTemplate) {
    if (this.template && !fromTemplate) {
      return
    }

    if (value === null || typeof value === 'undefined') value = ''
    else if (typeof value === 'object') value = JSON.stringify(value)
    else if (typeof value !== 'string') value = '' + value

    if (value === this.serialized) return

    // Sanitize value before setting it
    var sanitized = this.sanitize(value)

    if (this.input.value === sanitized) {
      return
    }

    this.input.value = sanitized

    var changed = fromTemplate || this.getValue() !== value

    this.refreshValue()

    if (initial) this.is_dirty = false
    else if (this.jsoneditor.options.show_errors === 'change') this.is_dirty = true

    if (this.adjust_height) this.adjust_height(this.input)

    // Bubble this setValue to parents if the value changed
    this.onChange(changed)

    // Return object with changed state and sanitized value for use in editors that extend this
    return {changed: changed, value: sanitized}
  },
  getNumColumns: function () {
    var min = Math.ceil(Math.max(this.getTitle().length, this.schema.maxLength || 0, this.schema.minLength || 0) / 5)
    var num

    if (this.input_type === 'textarea') num = 6
    else if (['text', 'email'].indexOf(this.input_type) >= 0) num = 4
    else num = 2

    return Math.min(12, Math.max(min, num))
  },
  build: function () {
    var self = this
    if (!this.options.compact) this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())
    if (this.schema.description) this.description = this.theme.getFormInputDescription(this.schema.description)
    if (this.options.infoText) this.infoButton = this.theme.getInfoButton(this.options.infoText)

    this.format = this.schema.format
    if (!this.format && this.schema.media && this.schema.media.type) {
      this.format = this.schema.media.type.replace(/(^(application|text)\/(x-)?(script\.)?)|(-source$)/g, '')
    }
    if (!this.format && this.options.default_format) {
      this.format = this.options.default_format
    }
    if (this.options.format) {
      this.format = this.options.format
    }

    // Specific format
    if (this.format) {
      // Text Area
      if (this.format === 'textarea') {
        this.input_type = 'textarea'
        this.input = this.theme.getTextareaInput()
      // Range Input
      } else if (this.format === 'range') {
        this.input_type = 'range'
        var min = this.schema.minimum || 0
        var max = this.schema.maximum || Math.max(100, min + 1)
        var step = 1
        if (this.schema.multipleOf) {
          if (min % this.schema.multipleOf) min = Math.ceil(min / this.schema.multipleOf) * this.schema.multipleOf
          if (max % this.schema.multipleOf) max = Math.floor(max / this.schema.multipleOf) * this.schema.multipleOf
          step = this.schema.multipleOf
        }

        this.input = this.theme.getRangeInput(min, max, step)
      // HTML5 Input type
      } else {
        this.input_type = 'text'
        if (['button', 'checkbox', 'color', 'date', 'datetime-local', 'email', 'file', 'hidden', 'image', 'month', 'number', 'password', 'radio', 'reset', 'search', 'submit', 'tel', 'text', 'time', 'url', 'week'].indexOf(this.format) > -1) {
          this.input_type = this.format
        }
        this.input = this.theme.getFormInputField(this.input_type)
      }
    // Normal text input
    } else {
      this.input_type = 'text'
      this.input = this.theme.getFormInputField(this.input_type)
    }

    // minLength, maxLength, and pattern
    if (typeof this.schema.maxLength !== 'undefined') this.input.setAttribute('maxlength', this.schema.maxLength)
    if (typeof this.schema.pattern !== 'undefined') this.input.setAttribute('pattern', this.schema.pattern)
    else if (typeof this.schema.minLength !== 'undefined') this.input.setAttribute('pattern', '.{' + this.schema.minLength + ',}')

    if (this.options.compact) {
      this.container.classList.add('compact')
    } else {
      if (this.options.input_width) this.input.style.width = this.options.input_width
    }

    if (this.schema.readOnly || this.schema.readonly || this.schema.template) {
      this.always_disabled = true
      this.input.setAttribute('readonly', 'true')
    }

    // Set custom attributes on input element. Parameter is array of protected keys. Empty array if none.
    this.setInputAttributes(['maxlength', 'pattern', 'readonly', 'min', 'max', 'step'])

    this.input
      .addEventListener('change', function (e) {
        e.preventDefault()
        e.stopPropagation()

        // Don't allow changing if this field is a template
        if (self.schema.template) {
          this.value = self.value
          return
        }

        var val = this.value

        // sanitize value
        var sanitized = self.sanitize(val)
        if (val !== sanitized) {
          this.value = sanitized
        }

        self.is_dirty = true

        self.refreshValue()
        self.onChange(true)
      })

    if (this.options.input_height) this.input.style.height = this.options.input_height
    if (this.options.expand_height) {
      this.adjust_height = function (el) {
        if (!el) return
        var i; var ch = el.offsetHeight
        // Input too short
        if (el.offsetHeight < el.scrollHeight) {
          i = 0
          while (el.offsetHeight < el.scrollHeight + 3) {
            if (i > 100) break
            i++
            ch++
            el.style.height = ch + 'px'
          }
        } else {
          i = 0
          while (el.offsetHeight >= el.scrollHeight + 3) {
            if (i > 100) break
            i++
            ch--
            el.style.height = ch + 'px'
          }
          el.style.height = (ch + 1) + 'px'
        }
      }

      this.input.addEventListener('keyup', function (e) {
        self.adjust_height(this)
      })
      this.input.addEventListener('change', function (e) {
        self.adjust_height(this)
      })
      this.adjust_height()
    }

    if (this.format) this.input.setAttribute('data-schemaformat', this.format)

    var input = this.input
    if (this.format === 'range') {
      input = this.theme.getRangeControl(this.input, this.theme.getRangeOutput(this.input, this.schema.default || Math.max(this.schema.minimum || 0, 0)))
    }

    this.control = this.theme.getFormControl(this.label, input, this.description, this.infoButton)
    this.container.appendChild(this.control)

    // Any special formatting that needs to happen after the input is added to the dom
    window.requestAnimationFrame(function () {
      // Skip in case the input is only a temporary editor,
      // otherwise, in the case of an ace_editor creation,
      // it will generate an error trying to append it to the missing parentNode
      if (self.input.parentNode) self.afterInputReady()
      if (self.adjust_height) self.adjust_height(self.input)
    })

    // Compile and store the template
    if (this.schema.template) {
      var callback = this.expandCallbacks('template', {template: this.schema.template})
      if (typeof callback.template === 'function') this.template = callback.template
      else this.template = this.jsoneditor.compileTemplate(this.schema.template, this.template_engine)
      this.refreshValue()
    } else {
      this.refreshValue()
    }
  },
  setupCleave: function (el) {
    // Enable cleave.js support if library is loaded and config is available
    var options = this.expandCallbacks('cleave', $extend({}, this.defaults.options.cleave || {}, this.options.cleave || {}))
    if (typeof options === 'object' && Object.keys(options).length > 0) {
      this.cleave_instance = new window.Cleave(el, options)
    }
  },
  setupImask: function (el) {
    // Enable imask.js support if library is loaded and config is available
    var options = this.expandCallbacks('imask', $extend({}, this.defaults.options.imask || {}, this.options.imask || {}))
    if (typeof options === 'object' && Object.keys(options).length > 0) {
      this.imask_instance = window.IMask(el, options)
    }
  },
  enable: function () {
    if (!this.always_disabled) {
      this.input.disabled = false
      this._super()
    }
  },
  disable: function (alwaysDisabled) {
    if (alwaysDisabled) this.always_disabled = true
    this.input.disabled = true
    this._super()
  },
  afterInputReady: function () {
    var self = this
    self.theme.afterInputReady(self.input)
    if (window.Cleave && !self.cleave_instance) self.setupCleave(self.input)
    if (window.IMask && !self.imask_instance) self.setupImask(self.input)
  },
  refreshValue: function () {
    this.value = this.input.value
    if (typeof this.value !== 'string') this.value = ''
    this.serialized = this.value
  },
  destroy: function () {
    if (this.cleave_instance) this.cleave_instance.destroy()
    if (this.imask_instance) this.imask_instance.destroy()

    this.template = null
    if (this.input && this.input.parentNode) this.input.parentNode.removeChild(this.input)
    if (this.label && this.label.parentNode) this.label.parentNode.removeChild(this.label)
    if (this.description && this.description.parentNode) this.description.parentNode.removeChild(this.description)

    this._super()
  },
  /**
   * This is overridden in derivative editors
   */
  sanitize: function (value) {
    return value
  },
  /**
   * Re-calculates the value if needed
   */
  onWatchedFieldChange: function () {
    var vars

    // If this editor needs to be rendered by a macro template
    if (this.template) {
      vars = this.getWatchedFieldValues()
      this.setValue(this.template(vars), false, true)
    }

    this._super()
  },
  showValidationErrors: function (errors) {
    var self = this

    if (this.jsoneditor.options.show_errors === 'always') {} else if (!this.is_dirty && this.previous_error_setting === this.jsoneditor.options.show_errors) return

    this.previous_error_setting = this.jsoneditor.options.show_errors

    var messages = []
    $each(errors, function (i, error) {
      if (error.path === self.path) {
        messages.push(error.message)
      }
    })

    if (messages.length) {
      this.theme.addInputError(this.input, messages.join('. ') + '.')
    } else {
      this.theme.removeInputError(this.input)
    }
  }
})
