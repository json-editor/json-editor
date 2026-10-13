import { StringEditor } from './string.js'
import { extend } from '../utilities.js'

export class JoditEditor extends StringEditor {
  setValue (value, initial, fromTemplate) {
    value = this.applyConstFilter(value)

    const res = super.setValue(value, initial, fromTemplate)
    if (res !== undefined && res.changed && this.jodit_instance) this.jodit_instance.setEditorValue(res.value)
  }

  build () {
    this.options.format = 'textarea' /* Force format into "textarea" */
    super.build()
    this.input_type = this.schema.format /* Restore original format */
    this.input.setAttribute('data-schemaformat', this.input_type)
  }

  afterInputReady () {
    let options

    if (window.Jodit) {
      /* Get options, either global options from "this.defaults.options.jodit" or */
      /* single property options from schema "options.jodit" */
      options = this.expandCallbacks('jodit', extend({}, {
        height: 300
      }, this.defaults.options.jodit || {}, this.options.jodit || {}))

      if (this.schema.readOnly || this.schema.readonly || this.schema.template) {
        options.readonly = true
      }

      this.jodit_instance = window.Jodit.make(this.input, options)

      this.jodit_instance.events.on('change', () => {
        this.value = this.jodit_instance.getEditorValue()
        this.is_dirty = true
        this.onChange(true)
      })

      this.theme.afterInputReady(this.input)
    } else super.afterInputReady() /* Library not loaded, so just treat this as a string */
  }

  getNumColumns () {
    return 6
  }

  enable () {
    super.enable()
    this.input.readOnly = false
    if (!this.always_disabled && this.jodit_instance) {
      this.jodit_instance.setDisabled(false)
      this.jodit_instance.setReadOnly(false)
    }
  }

  disable (alwaysDisabled) {
    if (this.jodit_instance) {
      this.jodit_instance.setDisabled(true)
      this.jodit_instance.setReadOnly(true)
    }
    this.input.readOnly = true
    super.disable(alwaysDisabled)
  }

  destroy () {
    if (this.jodit_instance) {
      this.jodit_instance.destruct()
      this.jodit_instance = null
    }
    super.destroy()
  }
}
