// Non-Active editor for displaying text blocks in form
import { ButtonEditor } from './button'

export var InfoEditor = ButtonEditor.extend({

  build: function () {
    this.options.compact = false
    this.header = this.label = this.theme.getFormInputLabel(this.getTitle())
    this.description = this.theme.getDescription(this.schema.description || '')
    this.control = this.theme.getFormControl(this.label, this.description, null)
    this.container.appendChild(this.control)
  },
  getTitle: function () {
    return this.schema.title
  },
  getNumColumns: function () {
    return 12
  }
})
