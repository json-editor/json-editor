import { NumberEditor } from './number.js'

export class IntegerEditor extends NumberEditor {
  sanitize (value) {
    value = `${value}`
    return value.replace(/[^0-9-]/g, '')
  }

  getNumColumns () {
    return 2
  }
}
