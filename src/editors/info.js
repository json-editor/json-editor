/* Non-Active editor for displaying text blocks in form */
import { ButtonEditor } from './button.js'

export class InfoEditor extends ButtonEditor {
  build () {
    this.options.compact = false
    this.header = this.label = this.theme.getFormInputLabel(this.getTitle())
    this.description = this.theme.getDescription(this.schema.description || '')
    this.control = this.theme.getFormControl(this.label, this.description, null)
    this.container.appendChild(this.control)
  }

  getTitle () {
    return this.translateProperty(this.schema.title)
  }

  getNumColumns () {
    return 12
  }
}
