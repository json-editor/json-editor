import { StringEditor } from './string.js'
import { isNumber } from '../utilities'

export class NumberEditor extends StringEditor {
  build () {
    super.build()

    if (typeof this.schema.minimum !== 'undefined') {
      let { minimum } = this.schema

      if (typeof this.schema.exclusiveMinimum !== 'undefined') {
        minimum += 1
      }

      this.input.setAttribute('min', minimum)
    }

    if (typeof this.schema.maximum !== 'undefined') {
      let { maximum } = this.schema

      if (typeof this.schema.exclusiveMaximum !== 'undefined') {
        maximum -= 1
      }

      this.input.setAttribute('max', maximum)
    }

    if (typeof this.schema.step !== 'undefined') {
      const step = this.schema.step || 1
      this.input.setAttribute('step', step)
    }

    /* Set custom attributes on input element. Parameter is array of protected keys. Empty array if none. */
    this.setInputAttributes(['maxlength', 'pattern', 'readonly', 'min', 'max', 'step'])
  }

  getNumColumns () {
    return 2
  }

  getValue () {
    if (!this.dependenciesFulfilled) {
      return undefined
    }
    const value = isNumber(this.value) ? parseFloat(this.value) : this.value
    if (!this.jsoneditor.options.use_default_values && value === '') {
      return undefined
    }
    return value
  }
}
