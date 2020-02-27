import { AbstractTheme } from '../theme'
import rules from './html.json'

export var htmlTheme = AbstractTheme.extend({
  /* Theme config options that allows changing various aspects of the output */
  options: {
    'disable_theme_rules': false
  },
  /* Custom stylesheet rules. format: "selector" : "CSS rules" */
  rules: rules,
  getFormInputLabel: function (text, req) {
    var el = this._super(text, req)
    el.classList.add('je-form-input-label')
    return el
  },
  getFormInputDescription: function (text) {
    var el = this._super(text)
    el.classList.add('je-form-input-label')
    return el
  },
  getIndentedPanel: function () {
    var el = this._super()
    el.classList.add('je-indented-panel')
    return el
  },
  getTopIndentedPanel: function () {
    return this.getIndentedPanel()
  },
  getChildEditorHolder: function () {
    var el = this._super()
    el.classList.add('je-child-editor-holder')
    return el
  },
  getHeaderButtonHolder: function () {
    var el = this.getButtonHolder()
    el.classList.add('je-header-button-holder')
    return el
  },
  getTable: function () {
    var el = this._super()
    el.classList.add('je-table')
    return el
  },
  addInputError: function (input, text) {
    input.style.borderColor = 'red'

    if (!input.errmsg) {
      var group = this.closest(input, '.form-control')
      input.errmsg = document.createElement('div')
      input.errmsg.setAttribute('class', 'errmsg')
      input.errmsg.style = input.errmsg.style || {}
      input.errmsg.style.color = 'red'
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
