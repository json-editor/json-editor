import { SelectEditor } from './select.js'
import { extend } from '../utilities.js'

export class SelectizeEditor extends SelectEditor {
  setValue (value, initial) {
    if (this.selectize_instance) {
      if (initial) this.is_dirty = false
      else if (this.jsoneditor.options.show_errors === 'change') this.is_dirty = true

      const sanitized = this.updateValue(value) /* Sets this.value to sanitized value */

      this.input.value = sanitized

      this.selectize_instance.clear(true)
      this.selectize_instance.setValue(sanitized)

      this.onChange(true)
    } else super.setValue(value, initial)
  }

  afterInputReady () {
    if (window.jQuery && window.jQuery.fn && window.jQuery.fn.selectize && !this.selectize_instance) {
      /* Get options, either global options from "this.defaults.options.selectize" or */
      /* single property options from schema "options.selectize" */
      const options = this.expandCallbacks('selectize', extend({}, this.defaults.options.selectize || {}, this.options.selectize || {}))

      /* New items are allowed if option "create" is true and type is "string" */
      this.newEnumAllowed = options.create = !!options.create && this.schema.type === 'string'

      this.selectize_instance = (window.jQuery(this.input).selectize(options))[0].selectize

      /* Remove change handler set in parent class (src/multiselect.js) */
      this.control.removeEventListener('change', this.multiselectChangeHandler)

      /* Create a new change handler */
      this.multiselectChangeHandler = (value) => {
        /* var value = this.selectize_instance.getValue(true); */
        /* this.value = value; */
        this.updateValue(value)
        this.onChange(true)
      }

      /* Add new event handler. */
      /* Note: Must use the "on()" method and not addEventListener() */
      this.selectize_instance.on('change', this.multiselectChangeHandler)
    }
    super.afterInputReady()
  }

  updateValue (value) {
    let sanitized = this.enum_values[0]
    value = this.typecast(value || '')
    if (!this.enum_values.includes(value)) {
      if (this.newEnumAllowed) {
        sanitized = this.addNewOption(value) ? value : sanitized
      }
    } else sanitized = value
    this.value = sanitized
    return sanitized
  }

  addNewOption (value) {
    const sanitized = this.typecast(value); let res = false

    if (!this.enum_values.includes(sanitized) && sanitized !== '') {
      /* Add to list of valid enum values */
      this.enum_options.push(`${sanitized}`)
      this.enum_display.push(`${sanitized}`)
      this.enum_values.push(sanitized)
      /* Update Schema enum to prevent triggering error */
      /* "Value must be one of the enumerated values" */
      this.schema.enum.push(sanitized)

      /* Add selectize item */
      this.selectize_instance.addItem(sanitized)
      this.selectize_instance.refreshOptions(false)

      res = true
    }
    return res
  }

  onWatchedFieldChange () {
    super.onWatchedFieldChange()
    if (this.selectize_instance) {
      this.selectize_instance.clear(true) /* Clear selection */
      this.selectize_instance.clearOptions(true) /* Remove all options */
      this.enum_options.forEach((value, i) => {
        this.selectize_instance.addOption({ value, text: this.enum_display[i] })
      })
      this.selectize_instance.addItem(`${this.value}`, true) /* Set new selection */
    }
  }

  enable () {
    if (!this.always_disabled && this.selectize_instance) this.selectize_instance.unlock()
    super.enable()
  }

  disable (alwaysDisabled) {
    if (this.selectize_instance) this.selectize_instance.lock()
    super.disable(alwaysDisabled)
  }

  destroy () {
    if (this.selectize_instance) {
      this.selectize_instance.destroy()
      this.selectize_instance = null
    }
    super.destroy()
  }
}
