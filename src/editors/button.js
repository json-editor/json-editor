/* Non-Active editor for displaying buttons in form */
import { AbstractEditor } from '../editor.js'
import { extend } from '../utilities.js'

export class ButtonEditor extends AbstractEditor {
  constructor (options, defaults) {
    super(options, defaults)
    this.active = false

    /* Set field to required in schema otherwise it will not be displayed */
    if (this.parent && this.parent.schema) {
      if (Array.isArray(this.parent.schema.required)) {
        if (!this.parent.schema.required.includes(this.key)) {
          this.parent.schema.required.push(this.key)
        }
      } else {
        this.parent.schema.required = [this.key]
      }
    }
  }

  build () {
    this.options.compact = true

    /* Get options, either global options from "this.defaults.options.button" or */
    /* single property options from schema "options.button" */
    const title = this.translateProperty(this.schema.title) || this.key
    const options = this.expandCallbacks('button', extend({}, {
      icon: '',
      validated: false,
      align: 'left',
      action: (jseditor, e) => {
        window.alert(`No button action defined for "${jseditor.path}"`)
      }
    }, this.defaults.options.button || {}, this.options.button || {}))

    this.input = this.getButton(title, options.icon, title)
    this.input.addEventListener('click', options.action, false)

    if (this.schema.readOnly || this.schema.readonly || this.schema.template) {
      this.disable(true)
      this.input.setAttribute('readonly', 'true')
    }

    /* Set custom attributes on input element. Parameter is array of protected keys. Empty array if none. */
    this.setInputAttributes(['readonly'])

    this.control = this.theme.getFormButtonHolder(options.align)
    this.control.appendChild(this.input)

    this.container.appendChild(this.control)

    this.changeHandler = () => {
      if (this.jsoneditor.validate(this.jsoneditor.getValue()).length > 0) this.disable()
      else this.enable()
    }

    /* Enable/disable the button depending on form validation */
    if (options.validated) this.jsoneditor.on('change', this.changeHandler)
  }

  enable () {
    if (!this.always_disabled) {
      this.input.disabled = false
      super.enable()
    }
  }

  disable (alwaysDisabled) {
    if (alwaysDisabled) this.always_disabled = true
    this.input.disabled = true
    super.disable()
  }

  getNumColumns () {
    return 2
  }

  activate () {
    this.active = false
    this.enable()
  }

  deactivate () {
    /* only non required properties can be deactivated. */
    if (!this.isRequired()) {
      this.active = false
      this.disable()
    }
  }

  destroy () {
    this.jsoneditor.off('change', this.changeHandler)
    this.changeHandler = null
    super.destroy()
  }
}
