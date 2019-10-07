import { SelectEditor } from './select'
import { $extend } from '../utilities'
export var ChoicesEditor = SelectEditor.extend({

  setValue: function (value, initial) {
    if (this.choices_instance) {
      // Sanitize value before setting it
      var sanitized = this.typecast(value || '')

      if (this.enum_values.indexOf(sanitized) < 0) sanitized = this.enum_values[0]

      if (this.value === sanitized) return

      if (initial) this.is_dirty = false
      else if (this.jsoneditor.options.show_errors === 'change') this.is_dirty = true

      this.input.value = this.enum_options[this.enum_values.indexOf(sanitized)]

      this.choices_instance.setChoiceByValue(this.input.value)

      this.value = sanitized
      this.onChange()
    } else this._super(value, initial)
  },
  afterInputReady: function () {
    if (window.Choices && !this.choices_instance) {
      var options
      // Get options, either global options from "this.defaults.options.choices" or
      // single property options from schema "options.choices"
      options = this.expandCallbacks('choices', $extend({}, this.defaults.options.choices || {}, this.options.choices || {}))

      this.choices_instance = new window.Choices(this.input, options)
    }
    this._super()
  },
  onWatchedFieldChange: function () {
    this._super()
    if (this.choices_instance) {
      var self = this; var choicesList = this.enum_options.map(function (v, i) { return {value: v, label: self.enum_display[i]} })
      this.choices_instance.setChoices(choicesList, 'value', 'label', true)
      this.choices_instance.setChoiceByValue(this.value + '') // Set new selection
    }
  },
  enable: function () {
    if (!this.always_disabled && this.choices_instance) this.choices_instance.enable()
    this._super()
  },
  disable: function (alwaysDisabled) {
    if (this.choices_instance) this.choices_instance.disable()
    this._super(alwaysDisabled)
  },
  destroy: function () {
    if (this.choices_instance) {
      this.choices_instance.destroy()
      this.choices_instance = null
    }
    this._super()
  }
})
