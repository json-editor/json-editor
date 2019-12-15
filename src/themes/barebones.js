import { AbstractTheme } from '../theme'

export var barebonesTheme = AbstractTheme.extend({
  /* Theme config options that allows changing various aspects of the output */
  options: {
    'disable_theme_rules': false
  },
  /* Custom stylesheet rules. format: "selector" : "CSS rules" */
  rules: {
    '.je-upload-preview img': 'float:left;margin:0 0.5rem 0.5rem 0;max-width:100%;max-height:5rem', // Upload Editor preview image
    '.je-dropzone': 'position:relative;margin:0.5rem 0;border 2px dashed black;width:100%;height:60px;background:teal;transition: all 0.5s',
    '.je-dropzone:before': 'position:absolute;content:attr(data-text);color:rgba(0,0,0,0.6);left:50%;top:50%;transform: translate(-50%,-50%)',
    '.je-dropzone.valid-dropzone': 'background:green',
    '.je-dropzone.invalid-dropzone': 'background:red'
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
