import { MultiSelectEditor } from '../multiselect'
import { $extend } from '../../utilities'
export var ArraySelectizeEditor = MultiSelectEditor.extend({

  setValue: function (value, initial) {
    if (this.selectize_instance) {
      // Make sure we are dealing with an array of strings so we can check for strict equality
      value = [].concat(value).map(function (e) { return e + '' })

      this.updateValue(value) // Sets this.value to sanitized value

      this.selectize_instance.setValue(this.value)

      this.onChange(true)
    } else this._super(value, initial)
  },
  afterInputReady: function () {
    var options; var self = this

    if (window.jQuery && window.jQuery.fn && window.jQuery.fn.selectize && !this.selectize_instance) {
      // Get options, either global options from "this.defaults.options.selectize" or
      // single property options from schema "options.selectize"
      options = this.expandCallbacks('selectize', $extend({}, {
        plugins: ['remove_button'],
        delimiter: false,
        createOnBlur: true,
        create: true
      }, this.defaults.options.selectize || {}, this.options.selectize || {}))

      // New items are allowed if option "create" is true and items type is "string"
      this.newEnumAllowed = options.create = !!options.create && this.schema.items && this.schema.items.type == 'string'

      this.selectize_instance = (window.jQuery(this.input).selectize(options))[0].selectize

      // Remove change handler set in parent class (src/multiselect.js)
      this.control.removeEventListener('change', this.multiselectChangeHandler)

      // Create a new change handler
      this.multiselectChangeHandler = function (e) {
        var value = self.selectize_instance.getValue()
        self.updateValue(value)
        self.onChange(true)
      }

      // Add new event handler.
      // Note: Must use the "on()" method and not addEventListener()
      this.selectize_instance.on('change', this.multiselectChangeHandler)
    }
    this._super()
  },
  updateValue: function (value) {
    value = [].concat(value)
    var changed = false; var newValue = []
    for (var i = 0; i < value.length; i++) {
      //      if (!this.select_options[value[i]+'']) {
      if (!this.select_values[value[i] + '']) {
        changed = true
        if (this.newEnumAllowed) {
          if (!this.addNewOption(value[i])) continue
        } else continue
      }
      var sanitized = this.sanitize(this.select_values[value[i]])
      newValue.push(sanitized)
      if (sanitized !== value[i]) changed = true
    }
    this.value = newValue

    return changed
  },
  addNewOption: function (value) {
    // Add new value and label
    this.option_keys.push(value + '')
    this.option_titles.push(value + '')
    this.select_values[value + ''] = value
    // Update Schema enum to prevent triggering "Value must be one of the enumerated values"
    this.schema.items.enum.push(value)
    // Add new value and label to selectize
    this.selectize_instance.addOption({text: value, value: value})

    return true
  },
  enable: function () {
    if (!this.always_disabled && this.selectize_instance) this.selectize_instance.unlock()
    this._super()
  },
  disable: function (alwaysDisabled) {
    if (this.selectize_instance) this.selectize_instance.lock()
    this._super(alwaysDisabled)
  },
  destroy: function () {
    if (this.selectize_instance) {
      this.selectize_instance.destroy()
      this.selectize_instance = null
    }
    this._super()
  }
})
