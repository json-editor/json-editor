/*

Edtended handling of  oolor type fields.

Has optional support for using https://github.com/Sphinxxxx/vanilla-picker.

*/
import { StringEditor } from './string.js'
import { extend } from '../utilities.js'

export class ColorEditor extends StringEditor {
  postBuild () {
    if (window.Picker) {
      this.input.type = 'text'
    }
    this.input.style.padding = '3px'
  }

  setValue (value, initial, fromTemplate) {
    const res = super.setValue(value, initial, fromTemplate)
    if (this.picker_instance && this.picker_instance.domElement && res && res.changed) {
      this.picker_instance.setColor(res.value, true)
    }
    return res
  }

  getNumColumns () {
    return 2
  }

  afterInputReady () {
    super.afterInputReady()
    this.createPicker(true)
  }

  disable () {
    super.disable()
    if (this.picker_instance && this.picker_instance.domElement) {
      /* Disable picker cursor dragging */
      this.picker_instance.domElement.style.pointerEvents = 'none'
      /* Disable picker buttons */
      const buttons = this.picker_instance.domElement.querySelectorAll('button')
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true
      }
    }
  }

  enable () {
    super.enable()
    if (this.picker_instance && this.picker_instance.domElement) {
      /* Enable picker cursor dragging */
      this.picker_instance.domElement.style.pointerEvents = 'auto'
      /* Enable picker buttons */
      const buttons = this.picker_instance.domElement.querySelectorAll('button')
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false
      }
    }
  }

  destroy () {
    this.createPicker(false)
    super.destroy()
  }

  /* helper functions */
  createPicker (create) {
    if (create) { /* create vanilla-picker */
      if (window.Picker && !this.picker_instance) { /* do when vanilla-picker loaded */
        const options = this.expandCallbacks('colorpicker', extend({}, {
          editor: false, /* default no editor */
          alpha: false, /* default no alpha */
          color: this.value,
          popup: 'bottom' /* show in the bottom */
        }, this.defaults.options.colorpicker || {}, this.options.colorpicker || {}, {
          parent: this.container
        }))

        const updateHandler = color => {
          const format = this.picker_instance.settings.editorFormat
          const isAlpha = this.picker_instance.settings.alpha
          this.setValue(format === 'hex' ? (isAlpha ? color.hex : color.hex.slice(0, 7)) : color[`${format + (isAlpha ? 'a' : '')}String`])
        }
        if (!options.popup && typeof options.onChange !== 'function') options.onChange = updateHandler
        else if (options.popup && typeof options.onDone !== 'function') options.onDone = updateHandler

        this.picker_instance = new window.Picker(options)
        /* this.picker_instance.openHandler() */
        if (!options.popup) { /* use inline colorPicker */
          this.input.style.display = 'none'
          this.theme.afterInputReady(this.picker_instance.domElement)
        }
      }
    } else { /* destroy vanilla-picker */
      if (this.picker_instance) {
        this.picker_instance.destroy()
        this.picker_instance = null
        this.input.style.display = ''
      }
    }
  }
}
