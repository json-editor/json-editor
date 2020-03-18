import { StringEditor } from './string.js'
import { extend } from '../utilities.js'

export class SimplemdeEditor extends StringEditor {
  setValue (value, initial, fromTemplate) {
    const res = super.setValue(value, initial, fromTemplate)
    if (res !== undefined && res.changed && this.simplemde_instance) this.simplemde_instance.value(res.value)
  }

  build () {
    this.options.format = 'textarea' /* Force format into "textarea" */
    super.build()
    this.input_type = this.schema.format /* Restore original format */
    this.input.setAttribute('data-schemaformat', this.input_type)
  }

  afterInputReady () {
    let options

    if (window.SimpleMDE) {
      /* Get options, either global options from "this.defaults.options.simplemde" or */
      /* single property options from schema "options.simplemde" */
      options = this.expandCallbacks('simplemde', extend({}, {
        height: 300
      }, this.defaults.options.simplemde || {}, this.options.simplemde || {}, {
        element: this.input
      }))

      this.simplemde_instance = new window.SimpleMDE(options)

      if (this.schema.readOnly || this.schema.readonly || this.schema.template) {
        this.simplemde_instance.codemirror.options.readOnly = true
      }

      /* Listen for changes */
      this.simplemde_instance.codemirror.on('change', () => {
        this.value = this.simplemde_instance.value()
        this.is_dirty = true
        this.onChange(true)
      })

      /* This will prevent SimpleMDE content from being hidden until focus in Chrome */
      /* if SimpleMDE is not visible (Like when placed inside Tabs) */
      if (options.autorefresh) {
        this.startListening(this.simplemde_instance.codemirror, this.simplemde_instance.codemirror.state.autoRefresh = { delay: 250 })
      }

      this.theme.afterInputReady(this.input)
    } else super.afterInputReady() /* Library not loaded, so just treat this as a string */
  }

  getNumColumns () {
    return 6
  }

  enable () {
    if (!this.always_disabled && this.simplemde_instance) this.simplemde_instance.codemirror.options.readOnly = false
    super.enable()
  }

  disable (alwaysDisabled) {
    if (this.simplemde_instance) this.simplemde_instance.codemirror.options.readOnly = true
    super.disable(alwaysDisabled)
  }

  destroy () {
    if (this.simplemde_instance) {
      this.simplemde_instance.toTextArea()
      this.simplemde_instance = null
    }
    super.destroy()
  }

  /* Ported from https://codemirror.net/addon/display/autorefresh.js */
  startListening (cm, state) {
    function check () {
      if (cm.display.wrapper.offsetHeight) {
        this.stopListening(cm, state)
        if (cm.display.lastWrapHeight !== cm.display.wrapper.clientHeight) {
          cm.refresh()
        }
      } else {
        state.timeout = window.setTimeout(check, state.delay)
      }
    }
    state.timeout = window.setTimeout(check, state.delay)
    state.hurry = () => {
      window.clearTimeout(state.timeout)
      state.timeout = window.setTimeout(check, 50)
    }
    cm.on(window, 'mouseup', state.hurry)
    cm.on(window, 'keyup', state.hurry)
  }

  stopListening (cm, state) {
    window.clearTimeout(state.timeout)
    cm.off(window, 'mouseup', state.hurry)
    cm.off(window, 'keyup', state.hurry)
  }
}
