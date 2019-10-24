/*

Edtended handling of  oolor type fields.

Has optional support for using https://github.com/Sphinxxxx/vanilla-picker.

*/
import { StringEditor } from './string'
import { $extend } from '../utilities'

export var ColorEditor = StringEditor.extend({

  build: function () {
    this._super()
    if (!this.input) return
    if (window.Picker) { // do when vanilla-picker loaded
      this.input.type = 'text'
      const self = this
      const defaultValue = this.schema.default || '#000000'
      const pickerOptions = $extend({
        editor: false, // default no editor
        alpha: false, // default no alpha
        popup: 'bottom' // show in the bottom
      }, (this.options || {}).Picker || {}, {
        parent: this.container,
        color: defaultValue,
        onChange: function (color) {
          const format = this.settings.editorFormat
          const isAlpha = this.settings.alpha
          self.setValue(format === 'hex' ? (isAlpha ? color.hex : color.hex.slice(0, 7)) : color[format + (isAlpha ? 'a' : '') + 'String'])
        }
      })
      this.picker = new window.Picker(pickerOptions)
      this.picker.openHandler()
      if (!pickerOptions.popup) { // use inline colorPicker
        this.input.style.display = 'none'
      } else {
        this.addEventListener(false)
      }
    }
  },
  destroy: function () {
    this.picker.closeHandler()
    this.picker.destroy()
    this.picker = null
    this.addEventListener(true)
    this._super()
  },
  // helper functions
  addEventListener: function (off) {
    var action = off ? 'removeEventListener' : 'addEventListener'
    var self = this
    function onfocus (e) {
      self.picker.setColor(self.input.value, true)
      self.picker.show()
    }
    this.input[action]('focus', onfocus)
  }
})
