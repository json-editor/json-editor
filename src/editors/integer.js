import { NumberEditor } from './number'

export var IntegerEditor = NumberEditor.extend({

  sanitize: function (value) {
    value = value + ''
    // eslint-disable-next-line no-useless-escape
    return value.replace(/[^0-9\-]/g, '')
  },
  getNumColumns: function () {
    return 2
  }
})
