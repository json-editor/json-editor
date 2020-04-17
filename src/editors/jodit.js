import { StringEditor } from './string.js'
import { extend } from '../utilities.js'

export class JoditEditor extends StringEditor {
  setValue (value, initial, fromTemplate) {
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

      this.jodit_instance = new window.Jodit(this.input, options)

      if (this.schema.readOnly || this.schema.readonly || this.schema.template) {
        this.jodit_instance.setReadOnly(true)
      }

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
    if (!this.always_disabled && this.jodit_instance) this.jodit_instance.setReadOnly(false)
    super.enable()
  }

  disable (alwaysDisabled) {
    if (this.jodit_instance) this.jodit_instance.setReadOnly(true)
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
