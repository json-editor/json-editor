import { AbstractTheme } from '../theme'

export var htmlTheme = AbstractTheme.extend({
  /* Theme config options that allows changing various aspects of the output */
  options: {
    'disable_theme_rules': false
  },
  /* Custom stylesheet rules. format: "selector" : "CSS rules" */
  rules: {
    'je-form-input-label': 'display:block;margin-bottom:3px;font-weight:bold;',
    'je-form-input-description': 'display:inline-block;margin:0;font-size:.8em;font-style:italic;',
    'je-indented-panel': 'padding:5px;margin:10px;border-radius:3px;border:1px solid #ddd;',
    'je-child-editor-holder': 'margin-bottom:8px;',
    'je-header-button-holder': 'display:inline-block;margin-left:10px;font-size:.8em;vertical-align:middle;',
    'je-table': 'margin-bottom:5px;border-bottom:1px solid #ccc;',
    '.je-upload-preview img': 'float:left;margin:0 0.5rem 0.5rem 0;max-width:100%;max-height:5rem', // Upload Editor preview image
    '.je-dropzone': 'position:relative;margin:0.5rem 0;border 2px dashed black;width:100%;height:60px;background:teal;transition: all 0.5s',
    '.je-dropzone:before': 'position:absolute;content:attr(data-text);color:rgba(0,0,0,0.6);left:50%;top:50%;transform: translate(-50%,-50%)',
    '.je-dropzone.valid-dropzone': 'background:green',
    '.je-dropzone.invalid-dropzone': 'background:red'
  },
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
