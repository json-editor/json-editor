import { StringEditor } from './string.js'
import { extend } from '../utilities.js'

export class ScEditor extends StringEditor {
  setValue (value, initial, fromTemplate) {
    const res = super.setValue(value, initial, fromTemplate)
    if (res !== undefined && res.changed && this.sceditor_instance) this.sceditor_instance.val(res.value)
  }

  build () {
    this.options.format = 'textarea' /* Force format into "textarea" */
    super.build()
    this.input_type = this.schema.format /* Restore original format */
    this.input.setAttribute('data-schemaformat', this.input_type)
  }

  afterInputReady () {
    if (window.sceditor) {
      /* Get options, either global options from "this.defaults.options.sceditor" or */
      /* single property options from schema "options.sceditor" */
      const options = this.expandCallbacks('sceditor', extend({}, {
        format: this.input_type,
        emoticonsEnabled: false,
        width: '100%',
        height: 300,
        readOnly: this.schema.readOnly || this.schema.readonly || this.schema.template
      }, this.defaults.options.sceditor || {}, this.options.sceditor || {}, {
        element: this.input
      }))

      const instance = window.sceditor.instance(this.input)

      if (instance === undefined) {
        window.sceditor.create(this.input, options) /* Create doesn't return instance. */
      }

      this.sceditor_instance = instance || window.sceditor.instance(this.input)

      /* Listen for changes */
      this.sceditor_instance.blur(() => {
        this.value = this.sceditor_instance.val()
        this.sceditor_instance.updateOriginal()
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
    if (!this.always_disabled && this.sceditor_instance) this.sceditor_instance.readOnly(false)
    super.enable()
  }

  disable (alwaysDisabled) {
    if (this.sceditor_instance) this.sceditor_instance.readOnly(true)
    super.disable(alwaysDisabled)
  }

  destroy () {
    if (this.sceditor_instance) {
      this.sceditor_instance.destroy()
      this.sceditor_instance = null
    }
    super.destroy()
  }
}
