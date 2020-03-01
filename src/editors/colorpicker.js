/*

Edtended handling of  oolor type fields.

Has optional support for using https://github.com/Sphinxxxx/vanilla-picker.

*/
import { StringEditor } from './string'
import { $extend } from '../utilities'

export var ColorEditor = StringEditor.extend({
  postBuild: function () {
    if (window.Picker) this.input.type = 'text'
  },
  setValue: function (value, initial, fromTemplate) {
    var res = this._super(value, initial, fromTemplate)
    if (this.picker_instance && this.picker_instance.domElement && res && res.changed) {
      this.picker_instance.setColor(res.value, true)
    }
    return res
  },
  getNumColumns: function () {
    return 2
  },
  afterInputReady: function () {
    this._super()
    this.createPicker(true)
  },
  disable: function () {
    this._super()
    if (this.picker_instance && this.picker_instance.domElement) {
      // Disable picker cursor dragging
      this.picker_instance.domElement.style.pointerEvents = 'none'
      // Disable picker buttons
      var buttons = this.picker_instance.domElement.querySelectorAll('button')
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true
      }
    }
  },
  enable: function () {
    this._super()
    if (this.picker_instance && this.picker_instance.domElement) {
      // Enable picker cursor dragging
      this.picker_instance.domElement.style.pointerEvents = 'auto'
      // Enable picker buttons
      var buttons = this.picker_instance.domElement.querySelectorAll('button')
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false
      }
    }
  },
  destroy: function () {
    this.createPicker(false)
    this._super()
  },
  // helper functions
  createPicker: function (create) {
    if (create) { // create vanilla-picker
      if (window.Picker && !this.picker_instance) { // do when vanilla-picker loaded
        const self = this
        var options = this.expandCallbacks('colorpicker', $extend({}, {
          editor: false, // default no editor
          alpha: false, // default no alpha
          color: this.value,
          popup: 'bottom' // show in the bottom
        }, this.defaults.options.colorpicker || {}, this.options.colorpicker || {}, {
          parent: this.container
        }))

        var updateHandler = function (color) {
          const format = this.settings.editorFormat
          const isAlpha = this.settings.alpha
          self.setValue(format === 'hex' ? (isAlpha ? color.hex : color.hex.slice(0, 7)) : color[format + (isAlpha ? 'a' : '') + 'String'])
        }
        if (!options.popup && typeof options.onChange !== 'function') options.onChange = updateHandler
        else if (options.popup && typeof options.onDone !== 'function') options.onDone = updateHandler

        this.picker_instance = new window.Picker(options)
        // this.picker_instance.openHandler()
        if (!options.popup) { // use inline colorPicker
          this.input.style.display = 'none'
          this.theme.afterInputReady(this.picker_instance.domElement)
        }
      }
    } else { // destroy vanilla-picker
      if (this.picker_instance) {
        this.picker_instance.destroy()
        this.picker_instance = null
        this.input.style.display = ''
      }
    }
  }
})
