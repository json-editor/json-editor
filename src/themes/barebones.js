import { AbstractTheme } from '../theme'

export var barebonesTheme = AbstractTheme.extend({
  /* Theme config options that allows changing various aspects of the output */
  options: {
    'disable_theme_rules': false
  },
  /* Custom stylesheet rules. format: "selector" : "CSS rules" */
  rules: {
  },
  addInputError: function (input, text) {
    if (!input.errmsg) {
      var group = this.closest(input, '.form-control')
      input.errmsg = document.createElement('div')
      input.errmsg.setAttribute('class', 'errmsg')
      group.appendChild(input.errmsg)
    } else {
      input.errmsg.style.display = 'block'
    }

    input.errmsg.innerHTML = ''
    input.errmsg.appendChild(document.createTextNode(text))
  },
  removeInputError: function (input) {
    if (input.style) {
      input.style.borderColor = ''
    }
    if (input.errmsg) input.errmsg.style.display = 'none'
  }
})
