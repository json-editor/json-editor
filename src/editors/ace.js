import { StringEditor } from './string.js'
import { extend } from '../utilities.js'

export class AceEditor extends StringEditor {
  setValue (value, initial, fromTemplate) {
    const res = super.setValue(value, initial, fromTemplate)
    if (res !== undefined && res.changed && this.ace_editor_instance) {
      this.ace_editor_instance.setValue(res.value)
      this.ace_editor_instance.session.getSelection().clearSelection()
      this.ace_editor_instance.resize()
    }
  }

  build () {
    this.options.format = 'textarea' /* Force format into "textarea" */
    super.build()
    this.input_type = this.schema.format /* Restore original format */
    this.input.setAttribute('data-schemaformat', this.input_type)
  }

  afterInputReady () {
    let options

    if (window.ace) {
      let mode = this.input_type
      /* aliases for c/cpp */
      if (mode === 'cpp' || mode === 'c++' || mode === 'c') mode = 'c_cpp'

      /* Get options, either global options from "this.defaults.options.ace" or */
      /* single property options from schema "options.ace" */
      options = this.expandCallbacks('ace', extend({}, {
        selectionStyle: 'text',
        minLines: 30,
        maxLines: 30
      }, this.defaults.options.ace || {}, this.options.ace || {}, {
        mode: `ace/mode/${mode}`
      }))

      this.ace_container = document.createElement('div')
      this.ace_container.style.width = '100%'
      this.ace_container.style.position = 'relative'
      /* this.ace_container.style.height = '400px'; */
      this.input.parentNode.insertBefore(this.ace_container, this.input)
      this.input.style.display = 'none'

      this.ace_editor_instance = window.ace.edit(this.ace_container, options)

      this.ace_editor_instance.setValue(this.getValue())
      this.ace_editor_instance.session.getSelection().clearSelection()
      this.ace_editor_instance.resize()

      if (this.schema.readOnly || this.schema.readonly || this.schema.template) {
        this.ace_editor_instance.setReadOnly(true)
      }

      /* Listen for changes */
      this.ace_editor_instance.on('change', () => {
        this.input.value = this.ace_editor_instance.getValue()
        this.refreshValue()
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
    if (!this.always_disabled && this.ace_editor_instance) this.ace_editor_instance.setReadOnly(false)
    super.enable()
  }

  disable (alwaysDisabled) {
    if (this.ace_editor_instance) this.ace_editor_instance.setReadOnly(true)
    super.disable(alwaysDisabled)
  }

  destroy () {
    if (this.ace_editor_instance) {
      this.ace_editor_instance.destroy()
      this.ace_editor_instance = null
    }
    super.destroy()
  }
}
