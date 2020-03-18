import { MultiSelectEditor } from '../multiselect.js'
import { extend } from '../../utilities.js'

export class ArraySelectizeEditor extends MultiSelectEditor {
  setValue (value, initial) {
    if (this.selectize_instance) {
      /* Make sure we are dealing with an array of strings so we can check for strict equality */
      value = [].concat(value).map(e => `${e}`)

      this.updateValue(value) /* Sets this.value to sanitized value */

      this.selectize_instance.setValue(this.value)

      this.onChange(true)
    } else super.setValue(value, initial)
  }

  afterInputReady () {
    let options

    if (window.jQuery && window.jQuery.fn && window.jQuery.fn.selectize && !this.selectize_instance) {
      /* Get options, either global options from "this.defaults.options.selectize" or */
      /* single property options from schema "options.selectize" */
      options = this.expandCallbacks('selectize', extend({}, {
        plugins: ['remove_button'],
        delimiter: false,
        createOnBlur: true,
        create: true
      }, this.defaults.options.selectize || {}, this.options.selectize || {}))

      /* New items are allowed if option "create" is true and items type is "string" */
      this.newEnumAllowed = options.create = !!options.create && this.schema.items && this.schema.items.type === 'string'

      this.selectize_instance = (window.jQuery(this.input).selectize(options))[0].selectize

      /* Remove change handler set in parent class (src/multiselect.js) */
      this.control.removeEventListener('change', this.multiselectChangeHandler)

      /* Create a new change handler */
      this.multiselectChangeHandler = e => {
        const value = this.selectize_instance.getValue()
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
    value = [].concat(value)
    let changed = false; const newValue = []
    for (let i = 0; i < value.length; i++) {
      /*      if (!this.select_options[value[i]+'']) { */
      if (!this.select_values[`${value[i]}`]) {
        changed = true
        if (this.newEnumAllowed) {
          if (!this.addNewOption(value[i])) continue
        } else continue
      }
      const sanitized = this.sanitize(this.select_values[value[i]])
      newValue.push(sanitized)
      if (sanitized !== value[i]) changed = true
    }
    this.value = newValue

    return changed
  }

  addNewOption (value) {
    /* Add new value and label */
    this.option_keys.push(`${value}`)
    this.option_titles.push(`${value}`)
    this.select_values[`${value}`] = value
    /* Update Schema enum to prevent triggering "Value must be one of the enumerated values" */
    this.schema.items.enum.push(value)
    /* Add new value and label to selectize */
    this.selectize_instance.addOption({ text: value, value })

    return true
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
