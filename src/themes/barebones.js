import { AbstractTheme } from '../theme.js'
import rules from './barebones.css.js'

export class barebonesTheme extends AbstractTheme {
  addInputError (input, text) {
    if (!input.errmsg) {
      const group = this.closest(input, '.form-control')
      input.errmsg = document.createElement('div')
      input.errmsg.setAttribute('class', 'errmsg')
      group.appendChild(input.errmsg)
    } else {
      input.errmsg.style.display = 'block'
    }

    input.errmsg.innerHTML = ''
    input.errmsg.appendChild(document.createTextNode(text))
  }

  removeInputError (input) {
    if (input.style) {
      input.style.borderColor = ''
    }
    if (input.errmsg) input.errmsg.style.display = 'none'
  }
}

/* Custom stylesheet rules. format: "selector" : "CSS rules" */
barebonesTheme.rules = rules
