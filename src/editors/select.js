import { AbstractEditor } from '../editor'
import { $extend, $each } from '../utilities'
export var SelectEditor = AbstractEditor.extend({

  setValue: function (value, initial) {
    // Sanitize value before setting it
    var sanitized = this.typecast(value || '')

    if (this.enum_values.indexOf(sanitized) < 0) sanitized = this.enum_values[0]

    if (this.value === sanitized) return

    if (initial) this.is_dirty = false
    else if (this.jsoneditor.options.show_errors === 'change') this.is_dirty = true

    this.input.value = this.enum_options[this.enum_values.indexOf(sanitized)]

    this.value = sanitized
    this.onChange()
    this.change()
  },
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
  getNumColumns: function () {
    if (!this.enum_options) return 3
    var longestText = this.getTitle().length
    for (var i = 0; i < this.enum_options.length; i++) {
      longestText = Math.max(longestText, this.enum_options[i].length + 4)
    }
    return Math.min(12, Math.max(longestText / 7, 2))
  },
  typecast: function (value) {
    if (this.schema.type === 'boolean') return value === 'undefined' || value === undefined ? undefined : !!value
    else if (this.schema.type === 'number') return 1 * value || 0
    else if (this.schema.type === 'integer') return Math.floor(value * 1 || 0)
    else return '' + value
  },
  getValue: function () {
    if (!this.dependenciesFulfilled) {
      return undefined
    }
    return this.typecast(this.value)
  },
  preBuild: function () {
    var self = this
    this.input_type = 'select'
    this.enum_options = []
    this.enum_values = []
    this.enum_display = []
    var i
    var callback

    // Enum options enumerated
    if (this.schema['enum']) {
      var display = (this.schema.options && this.schema.options.enum_titles) || []

      $each(this.schema['enum'], function (i, option) {
        self.enum_options[i] = '' + option
        self.enum_display[i] = '' + (display[i] || option)
        self.enum_values[i] = self.typecast(option)
      })

      if (!this.isRequired()) {
        self.enum_display.unshift(' ')
        self.enum_options.unshift('undefined')
        self.enum_values.unshift(undefined)
      }
    // Boolean
    } else if (this.schema.type === 'boolean') {
      self.enum_display = (this.schema.options && this.schema.options.enum_titles) || ['true', 'false']
      self.enum_options = ['1', '']
      self.enum_values = [true, false]

      if (!this.isRequired()) {
        self.enum_display.unshift(' ')
        self.enum_options.unshift('undefined')
        self.enum_values.unshift(undefined)
      }
    // Dynamic Enum
    } else if (this.schema.enumSource) {
      this.enumSource = []
      this.enum_display = []
      this.enum_options = []
      this.enum_values = []

      // Shortcut declaration for using a single array
      if (!(Array.isArray(this.schema.enumSource))) {
        if (this.schema.enumValue) {
          this.enumSource = [
            {
              source: this.schema.enumSource,
              value: this.schema.enumValue
            }
          ]
        } else {
          this.enumSource = [
            {
              source: this.schema.enumSource
            }
          ]
        }
      } else {
        for (i = 0; i < this.schema.enumSource.length; i++) {
          // Shorthand for watched variable
          if (typeof this.schema.enumSource[i] === 'string') {
            this.enumSource[i] = {
              source: this.schema.enumSource[i]
            }
          // Make a copy of the schema
          } else if (!(Array.isArray(this.schema.enumSource[i]))) {
            this.enumSource[i] = $extend({}, this.schema.enumSource[i])
          } else {
            this.enumSource[i] = this.schema.enumSource[i]
          }
        }
      }
      // Now, enumSource is an array of sources
      // Walk through this array and fix up the values
      for (i = 0; i < this.enumSource.length; i++) {
        if (this.enumSource[i].value) {
          callback = this.expandCallbacks('template', {template: this.enumSource[i].value})
          if (typeof callback.template === 'function') this.enumSource[i].value = callback.template
          else this.enumSource[i].value = this.jsoneditor.compileTemplate(this.enumSource[i].value, this.template_engine)
        }
        if (this.enumSource[i].title) {
          callback = this.expandCallbacks('template', {template: this.enumSource[i].title})
          if (typeof callback.template === 'function') this.enumSource[i].title = callback.template
          else this.enumSource[i].title = this.jsoneditor.compileTemplate(this.enumSource[i].title, this.template_engine)
        }
        if (this.enumSource[i].filter && this.enumSource[i].value) {
          callback = this.expandCallbacks('template', {template: this.enumSource[i].filter})
          if (typeof callback.template === 'function') this.enumSource[i].filter = callback.template
          else this.enumSource[i].filter = this.jsoneditor.compileTemplate(this.enumSource[i].filter, this.template_engine)
        }
      }
    // Other, not supported
    } else {
      throw new Error("'select' editor requires the enum property to be set.")
    }
  },
  build: function () {
    var self = this
    if (!this.options.compact) this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())
    if (this.schema.description) this.description = this.theme.getFormInputDescription(this.schema.description)
    if (this.options.infoText) this.infoButton = this.theme.getInfoButton(this.options.infoText)
    if (this.options.compact) this.container.classList.add('compact')

    this.input = this.theme.getSelectInput(this.enum_options, false)
    this.theme.setSelectOptions(this.input, this.enum_options, this.enum_display)

    if (this.schema.readOnly || this.schema.readonly) {
      this.always_disabled = true
      this.input.disabled = true
    }

    // Set custom attributes on input element. Parameter is array of protected keys. Empty array if none.
    this.setInputAttributes([])

    this.input.addEventListener('change', function (e) {
      e.preventDefault()
      e.stopPropagation()
      self.onInputChange()
    })

    this.control = this.theme.getFormControl(this.label, this.input, this.description, this.infoButton)
    this.container.appendChild(this.control)

    this.value = this.enum_values[0]

    // Any special formatting that needs to happen after the input is added to the dom
    window.requestAnimationFrame(function () {
      if (self.input.parentNode) self.afterInputReady()
    })
  },
  afterInputReady: function () {
    var self = this
    self.theme.afterInputReady(self.input)
  },
  onInputChange: function () {
    var val = this.typecast(this.input.value)

    var newVal
    // Invalid option, use first option instead
    if (this.enum_values.indexOf(val) === -1) {
      newVal = this.enum_values[0]
    } else {
      newVal = this.enum_values[this.enum_values.indexOf(val)]
    }

    // If valid hasn't changed
    if (newVal === this.value) return

    this.is_dirty = true

    // Store new value and propogate change event
    this.value = newVal
    this.onChange(true)
  },
  onWatchedFieldChange: function () {
    var vars; var j
    var selectOptions = []; var selectTitles = []

    // If this editor uses a dynamic select box
    if (this.enumSource) {
      vars = this.getWatchedFieldValues()

      for (var i = 0; i < this.enumSource.length; i++) {
        // Constant values
        if (Array.isArray(this.enumSource[i])) {
          selectOptions = selectOptions.concat(this.enumSource[i])
          selectTitles = selectTitles.concat(this.enumSource[i])
        } else {
          var items = []
          // Static list of items
          if (Array.isArray(this.enumSource[i].source)) {
            items = this.enumSource[i].source
          // A watched field
          } else {
            items = vars[this.enumSource[i].source]
          }

          if (items) {
            // Only use a predefined part of the array
            if (this.enumSource[i].slice) {
              items = Array.prototype.slice.apply(items, this.enumSource[i].slice)
            }
            // Filter the items
            if (this.enumSource[i].filter) {
              var newItems = []
              for (j = 0; j < items.length; j++) {
                if (this.enumSource[i].filter({i: j, item: items[j], watched: vars})) newItems.push(items[j])
              }
              items = newItems
            }

            var itemTitles = []
            var itemValues = []
            for (j = 0; j < items.length; j++) {
              var item = items[j]

              // Rendered value
              if (this.enumSource[i].value) {
                itemValues[j] = this.typecast(this.enumSource[i].value({
                  i: j,
                  item: item
                }))
              // Use value directly
              } else {
                itemValues[j] = items[j]
              }

              // Rendered title
              if (this.enumSource[i].title) {
                itemTitles[j] = this.enumSource[i].title({
                  i: j,
                  item: item
                })
              // Use value as the title also
              } else {
                itemTitles[j] = itemValues[j]
              }
            }

            if (this.enumSource[i].sort) {
              (function (itemValues, itemTitles, order) {
                itemValues.map(function (v, i) {
                  return { v: v, t: itemTitles[i] }
                }).sort(function (a, b) {
                  return ((a.v < b.v) ? -order : ((a.v === b.v) ? 0 : order))
                }).forEach(function (v, i) {
                  itemValues[i] = v.v
                  itemTitles[i] = v.t
                })
              }.bind(null, itemValues, itemTitles, this.enumSource[i].sort === 'desc' ? 1 : -1))()
            }

            selectOptions = selectOptions.concat(itemValues)
            selectTitles = selectTitles.concat(itemTitles)
          }
        }
      }

      var prevValue = this.value

      this.theme.setSelectOptions(this.input, selectOptions, selectTitles)
      this.enum_options = selectOptions
      this.enum_display = selectTitles
      this.enum_values = selectOptions

      // If the previous value is still in the new select options
      // or if global option "enum_source_value_auto_select" is true, stick with it
      if (selectOptions.indexOf(prevValue) !== -1 || this.jsoneditor.options.enum_source_value_auto_select !== false) {
        this.input.value = prevValue
        this.value = prevValue
      // Otherwise, set the value to the first select option
      } else {
        this.input.value = selectOptions[0]
        this.value = this.typecast(selectOptions[0] || '')
        if (this.parent && !this.watchLoop) this.parent.onChildEditorChange(this)
        else this.jsoneditor.onChange()
        this.jsoneditor.notifyWatchers(this.path)
      }
    }

    this._super()
  },
  enable: function () {
    if (!this.always_disabled) {
      this.input.disabled = false
    }
    this._super()
  },
  disable: function (alwaysDisabled) {
    if (alwaysDisabled) this.always_disabled = true
    this.input.disabled = true
    this._super(alwaysDisabled)
  },
  destroy: function () {
    if (this.label && this.label.parentNode) this.label.parentNode.removeChild(this.label)
    if (this.description && this.description.parentNode) this.description.parentNode.removeChild(this.description)
    if (this.input && this.input.parentNode) this.input.parentNode.removeChild(this.input)

    this._super()
  },
  showValidationErrors: function (errors) {
    var self = this

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
