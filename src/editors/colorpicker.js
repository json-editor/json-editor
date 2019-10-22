/*

Edtended handling of  oolor type fields.

Has optional support for using https://github.com/PitPik/colorPicker. The https://github.com/hybtalented/colorPicker is
 a fork, which fix the multiple cases did'nt create ColorPicker appropriately.

*/
import { StringEditor } from './string'
import {$extend} from '../utilities'
const colorPickers = []
var currentColorPicker = null // current focused colorpicker
var windowListener = null
export var ColorEditor = StringEditor.extend({

  build: function () {
    this._super()
    if (!this.input) return

    if (window.ColorPicker && typeof this.options.ColorPicker === 'object') {
      this.input.setAttribute('type', 'text')
      const options = this.options.ColorPicker
      this.isAlpha = false
      options.mode = options.mode.toLowerCase()
      if (options.mode) {
        if (options.mode.indexOf('a') !== -1) {
          this.isAlpha = true
        }
        options.mode = options.mode.replace(/a/g, '')
      }
      const self = this
      const colorPickerOption = $extend({
        isIE8: !!document.all && !document.addEventListener, // Opera???
        animationSpeed: 200,
        margin: {left: -1, top: 2},
        customBG: '#FFFFFF',
        noAlpha: !self.isAlpha,
        // displayCallback: displayCallback,
        /* --- regular colorPicker options from this point --- */
        initStyle: 'display: none',
        color: this.schema.default || '#000',
        readOnly: this.schema.readOnly || this.schema.template,
        // this callback change the value and color of the input
        renderCallback: function (colors, mode) {
          var options = this
          var patch = self.input
          var RGB = colors.RND.rgb
          var HSL = colors.RND.hsl
          var RGBInnerText = RGB.r + ', ' + RGB.g + ', ' + RGB.b
          var RGBAText = 'rgba(' + RGBInnerText + ', ' + colors.alpha + ')'
          patch.style.cssText =
              'color:' + (colors.rgbaMixCustom.luminance > 0.22 ? '#222' : '#ddd') + ';' + // Black...???
              'background-color:' + RGBAText + ';' +
              'filter:' + (options.isIE8 ? 'progid:DXImageTransform.Microsoft.gradient(' + // IE<9
              'startColorstr=#' + colors.hex + ',' + 'endColorstr=#' + colors.hex + ')' : '')
          self.setValue((mode.type.toLowerCase() === 'hex' ? '#' + colors.hex : mode.type === 'rgb' ? (!self.isAlpha ? 'rgb(' + RGBInnerText + ')' : RGBAText) : ('hsl' + (self.isAlpha ? 'a(' : '(') + HSL.h + ', ' + HSL.s + '%, ' + HSL.l + '%' +
                  (self.isAlpha ? ', ' + colors.alpha : '') + ')')
          ))
          if (options.displayCallback) {
            options.displayCallback(colors, mode, options)
          }
        },
        // set the initial background color
        init: function (elm, colors) { // colors is a different instance (not connected to colorPicker)
          elm.style.backgroundColor = elm.value
          elm.style.color = colors.rgbaMixCustom.luminance > 0.22 ? '#222' : '#ddd'
        }
      }, options)
      // create color picker container
      this.colorPicker = new window.ColorPicker(colorPickerOption)
      self.doEventListeners(false) // listen events
    }
  },
  removeColorPicker: function () {
    var appendTo = (this.colorPicker.color.options.appendTo || document.body)
    appendTo.removeChild(this.colorPicker.nodes.colorPicker)
  },
  doEventListeners: function (off) {
    var onOff = off ? 'removeEventListener' : 'addEventListener'
    var self = this
    // do when colorpicker input is focusing
    var focusListener = function (e) {
      var input = this
      var position = window.ColorPicker.getOrigin(input)
      var options = self.colorPicker.color.options
      var colorPickerUI = self.colorPicker.nodes.colorPicker
      var appendTo = (self.colorPicker.color.options.appendTo || document.body)
      var isStatic = /static/.test(window.getComputedStyle(appendTo).position)
      var atrect = isStatic ? {left: 0, top: 0} : appendTo.getBoundingClientRect()
      var waitTimer = 0
      options.color = self.value // brings color to default on reset
      colorPickerUI.style.cssText =
              'position: absolute;' + (!self.colorPicker.cssIsReady ? 'display: none;' : '') +
              'left:' + (position.left + options.margin.left - atrect.left) + 'px;' +
              'top:' + (position.top + +input.offsetHeight + options.margin.top - atrect.top) + 'px;'
      appendTo.appendChild(colorPickerUI)
      currentColorPicker = self
      waitTimer = setInterval(function () { // compensating late style on onload in colorPicker
        if (self.colorPicker.cssIsReady) {
          waitTimer = clearInterval(waitTimer)
          colorPickerUI.style.display = 'block'
        }
      }, 10)
    }
    var mouseDownListener = function (e) {
      if (currentColorPicker) {
        var colorPicker = currentColorPicker.colorPicker
        var isColorPicker = colorPicker && (function (elm) {
          while (elm) {
            if ((elm.className || '').indexOf('cp-app') !== -1) return elm
            elm = elm.parentNode
          }
          return false
        })(e.target)

        if (isColorPicker) {
          if (e.target === colorPicker.nodes.exit) {
            currentColorPicker.removeColorPicker()
            currentColorPicker = null
            document.activeElement.blur()
          }
        } else if (e.target !== currentColorPicker.input) {
          currentColorPicker.removeColorPicker()
          currentColorPicker = null
        }
      }
    }
    self.input[onOff]('focus', focusListener)

    if (!windowListener || off) {
      if (off) {
        mouseDownListener = windowListener
      } else {
        windowListener = mouseDownListener
      }
      window[onOff]('mousedown', mouseDownListener)
    }
    if (!off) {
      colorPickers.push(this)
    }
  },
  getValue: function () {
    if (!this.dependenciesFulfilled) {
      return undefined
    }
    return this.value
  },
  destroy: function () {
    var index = colorPickers.indexOf(this)
    if (index !== -1) {
      colorPickers.splice(index, 1)
    }
    if (currentColorPicker === this) {
      currentColorPicker.removeColorPicker()
      currentColorPicker = null
    }
    if (this.colorPicker) {
      this.doEventListeners(true) // remove event listener
      this.colorPicker.destroyAll()
    }
    this._super()
  },
  // helper function
  zeroPad: function (value) {
    return ('0' + value).slice(-2)
  }
})
