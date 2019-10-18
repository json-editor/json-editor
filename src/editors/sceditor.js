import { StringEditor } from './string'
import { $extend } from '../utilities'
export var ScEditor = StringEditor.extend({

  setValue: function (value, initial, fromTemplate) {
    var res = this._super(value, initial, fromTemplate)
    if (res !== undefined && res.changed && this.sceditor_instance) this.sceditor_instance.val(res.value)
  },
  build: function () {
    this.options.format = 'textarea' // Force format into "textarea"
    this._super()
    this.input_type = this.schema.format // Restore original format
    this.input.setAttribute('data-schemaformat', this.input_type)
  },
  afterInputReady: function () {
    if (window.sceditor) {
      // Get options, either global options from "this.defaults.options.sceditor" or
      // single property options from schema "options.sceditor"
      var options = this.expandCallbacks('sceditor', $extend({}, {
        format: this.input_type === 'html' ? 'xhtml' : 'bbcode',
        emoticonsEnabled: false,
        width: '100%',
        height: 300,
        readOnly: this.schema.readOnly || this.schema.readonly || this.schema.template
      }, this.defaults.options.sceditor || {}, this.options.sceditor || {}, {
        element: this.input
      }))

      var instance = window.sceditor.instance(this.input)

      if (instance === undefined) {
        window.sceditor.create(this.input, options) // Create doesn't return instance.
      }

      this.sceditor_instance = instance || window.sceditor.instance(this.input)

      // Listen for changes
      this.sceditor_instance.blur(function () {
        this.value = this.sceditor_instance.val()
        this.sceditor_instance.updateOriginal()
        this.is_dirty = true
        this.onChange(true)
      }.bind(this))

      this.theme.afterInputReady(this.input)
    } else this._super() // Library not loaded, so just treat this as a string
  },
  getNumColumns: function () {
    return 6
  },
  enable: function () {
    if (!this.always_disabled && this.sceditor_instance) this.sceditor_instance.readOnly(false)
    this._super()
  },
  disable: function (alwaysDisabled) {
    if (this.sceditor_instance) this.sceditor_instance.readOnly(true)
    this._super(alwaysDisabled)
  },
  destroy: function () {
    if (this.sceditor_instance) {
      this.sceditor_instance.destroy()
      this.sceditor_instance = null
    }
    this._super()
  }
})
