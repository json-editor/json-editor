/*

Edtended handling of  oolor type fields.

Has optional support for using https://github.com/Sphinxxxx/vanilla-picker.

*/
import { StringEditor } from './string'
import { $extend } from '../utilities'

export var ColorEditor = StringEditor.extend({
  afterInputReady: function () {
    this._super()
    if (window.Picker && !this.picker_instance) { // do when vanilla-picker loaded
      const self = this
      var options = this.expandCallbacks('colorpicker', $extend({}, {
        editor: false, // default no editor
        alpha: false, // default no alpha
        color: this.value,
        popup: 'bottom' // show in the bottom
      }, this.defaults.options.colorpicker || {}, this.options.colorpicker || {}, {
        parent: this.container,
        onChange: function (color) {
          const format = this.settings.editorFormat
          const isAlpha = this.settings.alpha
          self.setValue(format === 'hex' ? (isAlpha ? color.hex : color.hex.slice(0, 7)) : color[format + (isAlpha ? 'a' : '') + 'String'])
        }
      }))
      this.input.type = 'text'
      this.picker_instance = new window.Picker(options)
      this.picker_instance.openHandler()
      if (!options.popup) { // use inline colorPicker
        this.input.style.display = 'none'
        this.theme.afterInputReady(this.picker_instance.domElement)
      }
    }
  },
  destroy: function () {
    if (this.picker_instance) {
      this.picker_instance.closeHandler()
      this.picker_instance.destroy()
      this.picker_instance = null
    }
    this._super()
  }
})
