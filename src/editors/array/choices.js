import { MultiSelectEditor } from '../multiselect.js'
import { extend } from '../../utilities.js'

export class ArrayChoicesEditor extends MultiSelectEditor {
  setValue (value, initial) {
    if (this.choices_instance) {
      /* Make sure we are dealing with an array of strings so we can check for strict equality */
      value = [].concat(value).map(e => `${e}`)

      this.updateValue(value) /* Sets this.value to sanitized value */

      this.choices_instance.removeActiveItems() /* Remove existing selection */
      this.choices_instance.setChoiceByValue(this.value) /* Set new selection */

      this.onChange(true)
    } else super.setValue(value, initial)
  }

  afterInputReady () {
    if (window.Choices && !this.choices_instance) {
      /* Get options, either global options from "this.defaults.options.choices" or */
      /* single property options from schema "options.choices" */
      const options = this.expandCallbacks('choices', extend({}, {
        removeItems: true,
        removeItemButton: true
      }, this.defaults.options.choices || {}, this.options.choices || {}, {
        addItems: true,
        editItems: false,
        duplicateItemsAllowed: false
      }))

      /* New items are allowed if option "addItems" is true and items type is "string" */
      /* this.newEnumAllowed = options.addItems = !!options.addItems && this.schema.items && this.schema.items.type == 'string'; */

      /* Choices doesn't support adding new items to select type input */
      this.newEnumAllowed = false

      this.choices_instance = new window.Choices(this.input, options)

      /* Remove change handler set in parent class (src/multiselect.js) */
      this.control.removeEventListener('change', this.multiselectChangeHandler)

      /* Create a new change handler */
      this.multiselectChangeHandler = e => {
        const value = this.choices_instance.getValue(true)
        this.updateValue(value)
        this.onChange(true)
      }
      this.control.addEventListener('change', this.multiselectChangeHandler, false)
    }
    super.afterInputReady()
  }

  updateValue (value) {
    value = [].concat(value)
    let changed = false; const newValue = []
    for (let i = 0; i < value.length; i++) {
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
    /* Add new value and label to choices */
    this.choices_instance.setChoices([{ value: `${value}`, label: `${value}` }], 'value', 'label', false)

    return true
  }

  enable () {
    if (!this.always_disabled && this.choices_instance) this.choices_instance.enable()
    super.enable()
  }

  disable (alwaysDisabled) {
    if (this.choices_instance) this.choices_instance.disable()
    super.disable(alwaysDisabled)
  }

  destroy () {
    if (this.choices_instance) {
      this.choices_instance.destroy()
      this.choices_instance = null
    }
    super.destroy()
  }
}
