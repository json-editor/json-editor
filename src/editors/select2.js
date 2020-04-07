import { SelectEditor } from './select.js'
import { extend, hasOwnProperty } from '../utilities.js'

export class Select2Editor extends SelectEditor {
  setValue (value, initial) {
    if (this.select2_instance) {
      if (initial) this.is_dirty = false
      else if (this.jsoneditor.options.show_errors === 'change') this.is_dirty = true

      const sanitized = this.updateValue(value) /* Sets this.value to sanitized value */

      this.input.value = sanitized

      if (this.select2v4) this.select2_instance.val(sanitized).trigger('change')
      else this.select2_instance.select2('val', sanitized)

      this.onChange(true)
    } else super.setValue(value, initial)
  }

  afterInputReady () {
    if (window.jQuery && window.jQuery.fn && window.jQuery.fn.select2 && !this.select2_instance) {
      /* Get options, either global options from "this.defaults.options.select2" or */
      /* single property options from schema "options.select2" */
      const options = this.expandCallbacks('select2', extend({}, this.defaults.options.select2 || {}, this.options.select2 || {}))

      /* New items are allowed if option "tags" is true and type is "string" */
      this.newEnumAllowed = options.tags = !!options.tags && this.schema.type === 'string'

      this.select2_instance = window.jQuery(this.input).select2(options)
      this.select2v4 = hasOwnProperty(this.select2_instance.select2, 'amd')

      /* Create change handler */
      this.selectChangeHandler = () => {
        const value = this.select2v4 ? this.select2_instance.val() : this.select2_instance.select2('val')
        this.updateValue(value)
        this.onChange(true)
      }

      /* Add event handler. */
      /* Note: Must use the "on()" method and not addEventListener() */
      this.select2_instance.on('change', this.selectChangeHandler)
      this.select2_instance.on('select2-blur', this.selectChangeHandler)
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
    const sanitized = this.typecast(value); let res = false; let optionTag

    if (!this.enum_values.includes(sanitized) && sanitized !== '') {
      /* Add to list of valid enum values */
      this.enum_options.push(`${sanitized}`)
      this.enum_display.push(`${sanitized}`)
      this.enum_values.push(sanitized)
      /* Update Schema enum to prevent triggering error */
      /* "Value must be one of the enumerated values" */
      this.schema.enum.push(sanitized)

      optionTag = this.input.querySelector(`option[value="${sanitized}"]`)
      if (optionTag) {
        /* Remove data attribute to make option tag permanent. */
        optionTag.removeAttribute('data-select2-tag')
      } else {
        this.input.appendChild(new Option(sanitized, sanitized, false, false)).trigger('change')
      }

      res = true
    }
    return res
  }

  enable () {
    if (!this.always_disabled) {
      if (this.select2_instance) {
        if (this.select2v4) this.select2_instance.prop('disabled', false)
        else this.select2_instance.select2('enable', true)
      }
    }
    super.enable()
  }

  disable (alwaysDisabled) {
    if (this.select2_instance) {
      if (this.select2v4) this.select2_instance.prop('disabled', true)
      else this.select2_instance.select2('enable', false)
    }
    super.disable(alwaysDisabled)
  }

  destroy () {
    if (this.select2_instance) {
      this.select2_instance.select2('destroy')
      this.select2_instance = null
    }
    super.destroy()
  }
}
