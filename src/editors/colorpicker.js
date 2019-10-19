/*

Edtended handling of date, time and datetime-local type fields.

Works with both string and integer data types. (default only support string type)

Has optional support for using flatpickr datepicker.
All flatpickr options is supported with a few minor differences.
- "enableTime" and "noCalendar" are set automatically, based on the data type.
- Extra config option "errorDateFormat". If this is set, it will replace the format displayed in error messages.
- It is not possible to use "inline" and "wrap" options together.
- When using the "wrap" option, "toggle" and "clear" buttons are automatically added to markup. 2 extra boolean options ("showToggleButton" and "showClearButton") are available to control which buttons to display. Note: not all frameworks supports this. (Works in: Bootstrap and Foundation)
- When using the "inline" option, an extra boolean option ("inlineHideInput") is available to hide the original input field.
- If "mode" is set to either "multiple" or "range", only string data type is supported. Also the result from these is returned as a string not an array.

ToDo:
 - Improve Handling of flatpicker "multiple" and "range" modes. (Currently the values are just added as string values, but the optimal scenario would be to save those as array if possible)

*/
import { StringEditor } from './string'
import {$extend} from '../utilities'

export var ColorEditor = StringEditor.extend({

  build: function () {
    this._super()
    if (!this.input) return

    if (window.$ && window.$.prototype.colorPicker && typeof this.options.ColorPicker === 'object') {
      this.input.setAttribute('type', 'text')
      const options = this.options.ColorPicker
      var self = this
      this.isAlpha = false
      options.mode = options.mode.toLowerCase()
      if (options.mode && options.mode.substr(3, 1).indexOf('a')) {
        options.mode = options.mode.replace(/a/g, '')
        this.isAlpha = true
      }
      // create color picker container
      window.$(this.input).colorPicker($extend({
        color: this.schema.default || '#000',
        readOnly: this.schema.readOnly || this.schema.template,
        // this callback change the value and color of the input
        renderCallback: function (colors, mode) {
          var options = this
          var input = self.input
          var patch = options.patch
          var RGB = colors.RND.rgb
          var HSL = colors.RND.hsl
          var AHEX = options.isIE8 ? (colors.alpha < 0.16 ? '0' : '') + (Math.round(colors.alpha * 100)).toString(16).toUpperCase() + colors.HEX : ''
          var RGBInnerText = RGB.r + ', ' + RGB.g + ', ' + RGB.b
          var RGBAText = 'rgba(' + RGBInnerText + ', ' + colors.alpha + ')'

          patch.style.cssText =
              'color:' + (colors.rgbaMixCustom.luminance > 0.22 ? '#222' : '#ddd') + ';' + // Black...???
              'background-color:' + RGBAText + ';' +
              'filter:' + (options.isIE8 ? 'progid:DXImageTransform.Microsoft.gradient(' + // IE<9
              'startColorstr=#' + AHEX + ',' + 'endColorstr=#' + AHEX + ')' : '')

          input.value = (mode.type.toLowerCase() === 'hex' ? '#' + (options.isIE8 ? AHEX : colors.HEX + colors.Apl) : ( mode.type + ( self.isAlpha ? 'a' : '') +|| (colorMode === 'HEX' && isAlpha) ?
                      (!isAlpha ? 'rgb(' + RGBInnerText + ')' : RGBAText) :
                      ('hsl' + (isAlpha ? 'a(' : '(') + HSL.h + ', ' + HSL.s + '%, ' + HSL.l + '%' +
                          (isAlpha ? ', ' + colors.alpha : '') + ')')
          )

          if (options.displayCallback) {
            options.displayCallback(colors, mode, options);
          }
        },
        // set the initial background color
        init: function (elm, colors) { // colors is a different instance (not connected to colorPicker)
          elm.style.backgroundColor = elm.value
          elm.style.color = colors.rgbaMixCustom.luminance > 0.22 ? '#222' : '#ddd'
        }
      }, options))
    }
  },
  getValue: function () {
    if (!this.dependenciesFulfilled) {
      return undefined
    }
    return this.value
  },
  setValue: function (value, initial, fromTemplate) {
    if (this.schema.type === 'string') {
      this._super(value, initial, fromTemplate)
    }
  },
  destroy: function () {
    window.jsColorPicker(this.input, 'destroy')
    this._super()
  },
  // helper function
  zeroPad: function (value) {
    return ('0' + value).slice(-2)
  }
})
