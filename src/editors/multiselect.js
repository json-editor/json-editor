import { AbstractEditor } from '../editor'
import { $each } from '../utilities'

export var MultiSelectEditor = AbstractEditor.extend({
  onInputChange: function () {
    this.value = this.input.value
    this.onChange(true)
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
    var longest_text = this.getTitle().length
    for (var i in this.select_values) {
      if (!this.select_values.hasOwnProperty(i)) continue
      longest_text = Math.max(longest_text, (this.select_values[i] + '').length + 4)
    }

    return Math.min(12, Math.max(longest_text / 7, 2))
  },
  preBuild: function () {
    this._super()

    this.select_options = {}
    this.select_values = {}
    this.option_keys = []
    this.option_titles = []

    var i; var self = this
    var items_schema = this.jsoneditor.expandRefs(this.schema.items || {})
    var e = items_schema['enum'] || []
    var t = items_schema.options ? items_schema.options.enum_titles || [] : []

    for (i = 0; i < e.length; i++) {
      // If the sanitized value is different from the enum value, don't include it
      if (this.sanitize(e[i]) !== e[i]) continue

      this.option_keys.push(e[i] + '')
      this.option_titles.push((t[i] || e[i]) + '')
      this.select_values[e[i] + ''] = e[i]
    }
  },
  build: function () {
    var self = this; var i
    if (!this.options.compact) this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())
    if (this.schema.description) this.description = this.theme.getFormInputDescription(this.schema.description)
    if (this.options.infoText) this.infoButton = this.theme.getInfoButton(this.options.infoText)
    if (this.options.compact) this.container.classList.add('compact')

    if ((!this.schema.format && this.option_keys.length < 8) || this.schema.format === 'checkbox') {
      this.input_type = 'checkboxes'

      this.inputs = {}
      this.controls = {}
      for (i = 0; i < this.option_keys.length; i++) {
        this.inputs[this.option_keys[i]] = this.theme.getCheckbox()
        this.select_options[this.option_keys[i]] = this.inputs[this.option_keys[i]]
        var label = this.theme.getCheckboxLabel(this.option_titles[i])
        this.controls[this.option_keys[i]] = this.theme.getFormControl(label, this.inputs[this.option_keys[i]])
      }

      this.control = this.theme.getMultiCheckboxHolder(this.controls, this.label, this.description, this.infoButton)
      this.inputs.controlgroup = this.inputs.controls = this.control // Enable error messages for checkboxes
    } else {
      this.input_type = 'select'
      this.input = this.theme.getSelectInput(this.option_keys, true)
      this.theme.setSelectOptions(this.input, this.option_keys, this.option_titles)
      // this.input.multiple = true;
      this.input.setAttribute('multiple', 'multiple')
      this.input.size = Math.min(10, this.option_keys.length)
      for (i = 0; i < this.option_keys.length; i++) {
        this.select_options[this.option_keys[i]] = this.input.children[i]
      }

      this.control = this.theme.getFormControl(this.label, this.input, this.description, this.infoButton)
    }

    if (this.schema.readOnly || this.schema.readonly) this.disable(true)

    this.container.appendChild(this.control)

    this.multiselectChangeHandler = function (e) {
      var new_value = []
      for (i = 0; i < self.option_keys.length; i++) {
        if (self.select_options[self.option_keys[i]] && (self.select_options[self.option_keys[i]].selected || self.select_options[self.option_keys[i]].checked)) new_value.push(self.select_values[self.option_keys[i]])
      }
      self.updateValue(new_value)
      self.onChange(true)
    }

    this.control.addEventListener('change', this.multiselectChangeHandler, false)

    // Any special formatting that needs to happen after the input is added to the dom
    window.requestAnimationFrame(function () {
      self.afterInputReady()
    })
  },
  postBuild: function () {
    this._super()
    // this.theme.afterInputReady(this.input || this.inputs);
  },
  afterInputReady: function () {
    var self = this
    this.theme.afterInputReady(self.input || self.inputs)
  },
  setValue: function (value, initial) {
    var i, changed
    value = value || []
    if (!(Array.isArray(value))) value = [value]

    // Make sure we are dealing with an array of strings so we can check for strict equality
    value = value.map(function (e) { return e + '' })

    // Update selected status of options
    for (i in this.select_options) {
      if (!this.select_options.hasOwnProperty(i)) continue
      this.select_options[i][this.input_type === 'select' ? 'selected' : 'checked'] = (value.indexOf(i) !== -1)
    }

    changed = this.updateValue(value)
    this.onChange(true)
  },
  removeValue: function (value) {
    // Remove from existing value(s)
    value = [].concat(value)
    this.setValue(this.getValue().filter(function (item) { return value.indexOf(item) == -1 }))
  },
  addValue: function (value) {
    // Add to existing value(s)
    this.setValue(this.getValue().concat(value))
  },
  updateValue: function (value) {
    var changed = false
    var new_value = []
    for (var i = 0; i < value.length; i++) {
      if (!this.select_options[value[i] + '']) {
        changed = true
        continue
      }
      var sanitized = this.sanitize(this.select_values[value[i]])
      new_value.push(sanitized)
      if (sanitized !== value[i]) changed = true
    }
    this.value = new_value

    return changed
  },
  sanitize: function (value) {
    if (this.schema.items.type === 'boolean') return !!value
    else if (this.schema.items.type === 'number') return 1 * value || 0
    else if (this.schema.items.type === 'integer') return Math.floor(value * 1 || 0)
    else return '' + value
  },
  enable: function () {
    if (!this.always_disabled) {
      if (this.input) {
        this.input.disabled = false
      } else if (this.inputs) {
        for (var i in this.inputs) {
          if (!this.inputs.hasOwnProperty(i)) continue
          this.inputs[i].disabled = false
        }
      }
      this._super()
    }
  },
  disable: function (always_disabled) {
    if (always_disabled) this.always_disabled = true
    if (this.input) {
      this.input.disabled = true
    } else if (this.inputs) {
      for (var i in this.inputs) {
        if (!this.inputs.hasOwnProperty(i)) continue
        this.inputs[i].disabled = true
      }
    }
    this._super()
  },
  destroy: function () {
    this._super()
  },
  escapeRegExp: function (string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  },
  showValidationErrors: function (errors) {
    var regexPath = new RegExp('^' + this.escapeRegExp(this.path) + '(\\.\\d+)?$')
    var messages = []

    $each(errors, function (i, error) {
      if (error.path.match(regexPath)) {
        messages.push(error.message)
      }
    })

    if (messages.length) {
      this.theme.addInputError(this.input || this.inputs, messages.join('. ') + '.')
    } else {
      this.theme.removeInputError(this.input || this.inputs)
    }
  }
})
