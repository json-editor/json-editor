import { AbstractTheme } from '../theme.js'
import rules from './html.css.js'

export class htmlTheme extends AbstractTheme {
  getFormInputLabel (text, req) {
    const el = super.getFormInputLabel(text, req)
    el.classList.add('je-form-input-label')
    return el
  }

  getFormInputDescription (text) {
    const el = super.getFormInputDescription(text)
    el.classList.add('je-form-input-label')
    return el
  }

  getIndentedPanel () {
    const el = super.getIndentedPanel()
    el.classList.add('je-indented-panel')
    return el
  }

  getTopIndentedPanel () {
    return this.getIndentedPanel()
  }

  getChildEditorHolder () {
    const el = super.getChildEditorHolder()
    el.classList.add('je-child-editor-holder')
    return el
  }

  getHeaderButtonHolder () {
    const el = this.getButtonHolder()
    el.classList.add('je-header-button-holder')
    return el
  }

  getTable () {
    const el = super.getTable()
    el.classList.add('je-table')
    return el
  }

  isDOMElement (o) {
    return (typeof HTMLElement === 'object' ? o instanceof HTMLElement
      : o && typeof o === 'object' && o !== null && o.nodeType === 1 && typeof o.nodeName === 'string')
  }

  addInputError (input, text) {
    const isDomEl = this.isDOMElement(input)
    if (typeof input === 'object' && isDomEl === false) {
      const objectKeys = Object.keys(input)
      if (!input[objectKeys[0]].errmsg) {
        input[objectKeys[0]].style.borderColor = 'red'
        input[objectKeys[0]].errmsg = document.createElement('div')
        input[objectKeys[0]].errmsg.setAttribute('class', 'errmsg')
        input[objectKeys[0]].errmsg.style = input[objectKeys[0]].errmsg.style || {}
        input[objectKeys[0]].errmsg.style.color = 'red'
        const groupObj = this.closest(input[objectKeys[0]], '.control-group')
        groupObj.appendChild(input[objectKeys[0]].errmsg)
        input[objectKeys[0]].errmsg.innerHTML = ''
        input[objectKeys[0]].errmsg.appendChild(document.createTextNode(text))
      } else {
        input[objectKeys[0]].errmsg.style.display = 'block'
      }
    }

    if (isDomEl === true) {
      if (!input.errmsg) {
        const group = this.closest(input, '.form-control')
        input.style.borderColor = 'red'
        input.errmsg = document.createElement('div')
        input.errmsg.setAttribute('class', 'errmsg')
        input.errmsg.style = input.errmsg.style || {}
        input.errmsg.style.color = 'red'
        group.appendChild(input.errmsg)
        input.errmsg.innerHTML = ''
        input.errmsg.appendChild(document.createTextNode(text))
      } else {
        input.errmsg.style.display = 'block'
      }
    }
  }

  removeInputError (input) {
    if (typeof input === 'object' && this.isDOMElement(input) === false) {
      for (const elementKey in input) {
        if (elementKey !== 'controlgroup' && elementKey !== 'controls') {
          if (input[elementKey].style) {
            input[elementKey].style.borderColor = ''
          }
          if (input[elementKey].errmsg) input[elementKey].errmsg.style.display = 'none'
        }
      }
    } else {
      if (input.style) {
        input.style.borderColor = ''
      }
      if (input.errmsg) input.errmsg.style.display = 'none'
    }
  }
}

/* Custom stylesheet rules. format: "selector" : "CSS rules" */
htmlTheme.rules = rules
