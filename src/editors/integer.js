import { NumberEditor } from './number.js'
import { isInteger } from '../utilities.js'

export class IntegerEditor extends NumberEditor {
  getNumColumns () {
    return 2
  }

  getValue () {
    if (!this.dependenciesFulfilled) {
      return undefined
    }

    if (!this.schema.default && !this.jsoneditor.options.use_default_values && this.value === '') {
      this.input.value = ''
      return undefined
    } else {
      return isInteger(this.value) ? parseInt(this.value) : this.value
    }
  }
}
