/*

Edtended handling of  oolor type fields.

Has optional support for using https://github.com/PitPik/colorPicker.

*/
import { StringEditor } from './string'

var currInstance = null // curent ColorEditor
var currentColorPicker = null
function createColorPicker () {
  const colorPickerOption = {
    isIE8: !!document.all && !document.addEventListener, // Opera???
    animationSpeed: 200,
    margin: {left: -1, top: 2},
    customBG: '#FFFFFF',
    // displayCallback: displayCallback,
    /* --- regular colorPicker options from this point --- */
    initStyle: 'display: none',
    // this callback change the value and color of the input
    renderCallback: function (colors, mode) {
      if (currInstance) {
        var options = this
        var patch = currInstance.input
        var RGB = colors.RND.rgb
        var HSL = colors.RND.hsl
        var RGBInnerText = RGB.r + ', ' + RGB.g + ', ' + RGB.b
        var RGBAText = 'rgba(' + RGBInnerText + ', ' + colors.alpha + ')'
        patch.style.cssText =
            'color:' + (colors.rgbaMixCustom.luminance > 0.22 ? '#222' : '#ddd') + ';' + // Black...???
            'background-color:' + RGBAText + ';' +
            'filter:' + (options.isIE8 ? 'progid:DXImageTransform.Microsoft.gradient(' + // IE<9
            'startColorstr=#' + colors.hex + ',' + 'endColorstr=#' + colors.hex + ')' : '')
        currInstance.setValue((currInstance.format === 'hex' ? '#' + colors.HEX : currInstance.format === 'rgb' ? (!currInstance.isAlpha ? 'rgb(' + RGBInnerText + ')' : RGBAText) : ('hsl' + (currInstance.isAlpha ? 'a(' : '(') + HSL.h + ', ' + HSL.s + '%, ' + HSL.l + '%' +
            (currInstance.isAlpha ? ', ' + colors.alpha : '') + ')')))
        if (options.displayCallback) {
          options.displayCallback(colors, mode, options)
        }
      }
    }
  }
  currentColorPicker = new window.ColorPicker(colorPickerOption)
  window.addEventListener('mousedown', mouseDownListener) // listen the mouseevent of window
}

function mouseDownListener (e) {
  var colorPicker = currentColorPicker
  // return the colorpciker root dom element or false
  var isColorPicker = colorPicker && (function (elm) {
    while (elm) {
      if ((elm.className || '').indexOf('cp-app') !== -1) return elm
      elm = elm.parentNode
    }
    return false
  })(e.target)
  if (isColorPicker) {
    if (e.target === colorPicker.nodes.exit) {
      colorPicker.node.colorPicker.style.display = 'none'
      document.activeElement.blur()
    }
  } else if (currInstance && e.target !== currInstance.input) {
    colorPicker.nodes.colorPicker.style.display = 'none'
  }
}
export var ColorEditor = StringEditor.extend({

  build: function () {
    this._super()
    if (!this.input) return

    if (window.ColorPicker) {
      this.input.setAttribute('type', 'text')
      const options = (this.options || {}).ColorPicker || {}
      this.isAlpha = false
      this.format = 'hex'
      if (options.format) {
        this.format = options.format.toLowerCase()
        if (options.format.indexOf('a') !== -1) {
          this.isAlpha = true
        }
        this.format = this.format.replace(/a/g, '')
      }
      if (!this.created) {
        if (!currentColorPicker) {
          createColorPicker()
        }
        this.input.style.backgroundColor = this.value
        this.created = true
        this.doEventListeners(false) // listen focus event
      }
    }
  },
  doEventListeners: function (off) {
    var onOff = off ? 'removeEventListener' : 'addEventListener'
    var self = this
    // do when colorpicker input is focusing
    var focusListener = function (e) {
      var input = this
      var position = window.ColorPicker.getOrigin(input)
      var options = currentColorPicker.color.options
      var colorPickerUI = currentColorPicker.nodes.colorPicker
      var appendTo = document.body
      var isStatic = /static/.test(window.getComputedStyle(appendTo).position)
      var atrect = isStatic ? {left: 0, top: 0} : appendTo.getBoundingClientRect()
      var waitTimer = 0
      options.color = self.value // brings color to default on reset
      currInstance = self
      colorPickerUI.style.cssText =
              'position: absolute;' + (!currentColorPicker.cssIsReady ? 'display: none;' : '') +
              'left:' + (position.left + options.margin.left - atrect.left) + 'px;' +
              'top:' + (position.top + input.offsetHeight + options.margin.top - atrect.top) + 'px;'
      currentColorPicker.setColor(self.value || '#000000', undefined, undefined, true)
      waitTimer = setInterval(function () { // compensating late style on onload in colorPicker
        if (currentColorPicker.cssIsReady) {
          waitTimer = clearInterval(waitTimer)
          colorPickerUI.style.display = 'block'
        }
      }, 10)
    }
    self.input[onOff]('focus', focusListener)
  },
  getValue: function () {
    if (!this.dependenciesFulfilled) {
      return undefined
    }
    return this.value
  },
  destroy: function () {
    if (this.created) {
      this.created = false
      this.doEventListeners(true) // remove event listener
    }
    this._super()
  },
  // helper function
  zeroPad: function (value) {
    return ('0' + value).slice(-2)
  }
})
