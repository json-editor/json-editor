/**
 * Created by Mehmet Baker on 12.04.2017
 */
import { AbstractEditor } from '../editor.js'

export class HiddenEditor extends AbstractEditor {
  register () {
    super.register()
    if (!this.input) return
    if (this.jsoneditor.options.use_name_attributes) {
      this.input.setAttribute('name', this.formname)
    }
  }

  unregister () {
    super.unregister()
    if (!this.input) return
    this.input.removeAttribute('name')
  }

  setValue (value, initial, fromTemplate) {
    if (this.template && !fromTemplate) {
      return
    }

    if (value === null || typeof value === 'undefined') value = ''
    else if (typeof value === 'object') value = JSON.stringify(value)
    else if (typeof value !== 'string') value = `${value}`

    if (value === this.serialized) return

    /* Sanitize value before setting it */
    const sanitized = this.sanitize(value)

    if (this.input.value === sanitized) {
      return
    }

    this.input.value = sanitized

    const changed = fromTemplate || this.getValue() !== value

    this.refreshValue()

    if (initial) this.is_dirty = false
    else if (this.jsoneditor.options.show_errors === 'change') this.is_dirty = true

    if (this.adjust_height) this.adjust_height(this.input)

    /* Bubble this setValue to parents if the value changed */
    this.onChange(changed)
  }

  getNumColumns () {
    return 2
  }

  enable () {
    super.enable()
  }

  disable () {
    super.disable()
  }

  refreshValue () {
    this.value = this.input.value
    if (typeof this.value !== 'string') this.value = ''
    this.serialized = this.value
  }

  destroy () {
    this.template = null
    if (this.input && this.input.parentNode) this.input.parentNode.removeChild(this.input)
    if (this.label && this.label.parentNode) this.label.parentNode.removeChild(this.label)
    if (this.description && this.description.parentNode) this.description.parentNode.removeChild(this.description)

    super.destroy()
  }

  /**
   * This is overridden in derivative editors
   */
  sanitize (value) {
    return value
  }

  /**
   * Re-calculates the value if needed
   */
  onWatchedFieldChange () {
    let vars

    /* If this editor needs to be rendered by a macro template */
    if (this.template) {
      vars = this.getWatchedFieldValues()
      this.setValue(this.template(vars), false, true)
    }

    super.onWatchedFieldChange()
  }

  build () {
    this.format = this.schema.format
    if (!this.format && this.options.default_format) {
      this.format = this.options.default_format
    }
    if (this.options.format) {
      this.format = this.options.format
    }

    this.input_type = 'hidden'
    this.input = this.theme.getFormInputField(this.input_type)

    if (this.format) this.input.setAttribute('data-schemaformat', this.format)

    this.container.appendChild(this.input)

    /* Compile and store the template */
    if (this.schema.template) {
      const callback = this.expandCallbacks('template', { template: this.schema.template })
      if (typeof callback.template === 'function') this.template = callback.template
      else this.template = this.jsoneditor.compileTemplate(this.schema.template, this.template_engine)
      this.refreshValue()
    } else {
      this.refreshValue()
    }
  }
}
