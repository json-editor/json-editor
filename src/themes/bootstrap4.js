import { AbstractTheme } from '../theme'

export var bootstrap4Theme = AbstractTheme.extend({
  /* Theme config options that allows changing various aspects of the output */
  options: {
    disable_theme_rules: false,
    input_size: 'normal', // Size of input and select elements. "small", "normal", "large"
    custom_forms: false, // use twbs custom form stylings
    object_indent: true, // Indent nested object elements (use nested .card layout)
    object_background: 'bg-light', // Bootstrap 4 card background modifier class (https://getbootstrap.com/docs/4.1/getting-started/introduction/)
    object_text: '', // Bootstrap 4 card tect color modifier class (https://getbootstrap.com/docs/4.1/getting-started/introduction/)
    table_border: false, // Add border to array "table" row and cells
    table_zebrastyle: false, // Add "zebra style" to array "table" rows
    tooltip: 'bootstrap' // how to display tooltips (infoText). Can be `browser` for native `title`, `css` for simple CSS Styling, or `bootstrap` for TWBS/Popper.js handling
  },
  /* Custom stylesheet rules. format: "selector" : "CSS rules" */
  rules: {
    '.jsoneditor-twbs4-text-button': 'background: none;padding: 0;border: 0;color: currentColor;',
    'td>.form-group': 'margin-bottom: 0',
    '.json-editor-btn-upload': 'margin-top: 1rem',
    '.je-noindent .card': 'padding: 0; border: 0', // Option: object_indent

    // no-js handling of tooltips. Option: tooltip = 'css'

    '.je-tooltip:hover::before, .je-tooltip:hover::after': 'display:block;position:absolute;font-size:0.8em;color:#fff',
    '.je-tooltip:hover::before': 'border-radius:0.2em; content:attr(title);background-color:#000; margin-top:-2.5em;padding:0.3em',

    // bring select2 input size to default twbs4 size (only matched size for input_size: normal)
    '.select2-container--default .select2-selection--single, .select2-container--default .select2-selection--single .select2-selection__arrow': 'height: calc(1.5em + .75rem + 2px)',
    '.select2-container--default .select2-selection--single .select2-selection__rendered': 'line-height: calc(1.5em + .75rem + 2px);',

    // selectize
    '.selectize-control.form-control': 'padding: 0',
    '.selectize-dropdown.form-control': 'padding: 0;height: auto' // this cut off options can also be prohibited by setting `copyClassesToDropdown: true` in the slectize options
  },

  getSelectInput: function (options, multiple) {
    var el = this._super(options)
    el.classList.add('form-control')

    if (this.options.custom_forms === false) {
      if (this.options.input_size === 'small') el.classList.add('form-control-sm')
      if (this.options.input_size === 'large') el.classList.add('form-control-lg')
    } else {
      el.classList.remove('form-control')
      el.classList.add('custom-select')
      if (this.options.input_size === 'small') el.classList.add('custom-select-sm')
      if (this.options.input_size === 'large') el.classList.add('custom-select-lg')
    }

    return el
  },

  getContainer: function () {
    var el = document.createElement('div')
    if (!this.options.object_indent) el.classList.add('je-noindent')
    return el
  },

  setGridColumnSize: function (el, size, offset) {
    el.classList.add('col-md-' + size)

    if (offset) {
      el.classList.add('offset-md-' + offset)
    }
  },

  afterInputReady: function (input) {
    if (input.controlgroup) return

    // set id/for
    // is not working for: [type=file], [type=checkbox]
    var id = input.name
    input.id = id
    // 2x parentNode, b/c range input has an <div> wrapper
    var label = input.parentNode.parentNode.getElementsByTagName('label')[0]
    if (label) {
      label.htmlFor = id
    }

    input.controlgroup = this.closest(input, '.form-group')
  },

  getTextareaInput: function () {
    var el = document.createElement('textarea')
    el.classList.add('form-control')
    if (this.options.input_size === 'small') el.classList.add('form-control-sm')
    if (this.options.input_size === 'large') el.classList.add('form-control-lg')
    return el
  },

  getRangeInput: function (min, max, step) {
    var el = this._super(min, max, step)

    if (this.options.custom_forms === true) {
      el.classList.remove('form-control')
      el.classList.add('custom-range')
    }

    return el
  },

  getFormInputField: function (type) {
    var el = this._super(type)
    if (type !== 'checkbox' && type !== 'radio' && type !== 'file') {
      el.classList.add('form-control')
      if (this.options.input_size === 'small') el.classList.add('form-control-sm')
      if (this.options.input_size === 'large') el.classList.add('form-control-lg')
    }

    if (type === 'file') {
      // custom_form is not used on files, would be a bit ticky since we need more
      // markup. Also it contains language strings which would need be translateable?
      // and most of all, w/o JavaScript teh name of the file can't be displayed.
      el.classList.add('form-control-file')
    }

    return el
  },

  getFormControl: function (label, input, description, infoText) {
    var group = document.createElement('div')
    group.classList.add('form-group')

    if (label && (input.type === 'checkbox' || input.type === 'radio')) {
      var check = document.createElement('div')

      if (this.options.custom_forms === false) {
        check.classList.add('form-check')
        input.classList.add('form-check-input')
        label.classList.add('form-check-label')
      } else {
        check.classList.add('custom-control')
        input.classList.add('custom-control-input')
        label.classList.add('custom-control-label')

        if (input.type === 'checkbox') {
          check.classList.add('custom-checkbox')
        } else {
          check.classList.add('custom-radio')
        }
      }

      check.appendChild(input)
      check.appendChild(label)
      if (infoText) check.appendChild(infoText)

      group.appendChild(check)
    } else {
      if (label) {
        group.appendChild(label)

        if (infoText) group.appendChild(infoText)
      }

      group.appendChild(input)
    }

    if (description) {
      group.appendChild(description)
    }

    return group
  },

  getInfoButton: function (text) {
    var button = document.createElement('button') // shoud be a <button> but no fitting tbws style...
    button.type = 'button'
    button.classList.add('ml-3', 'jsoneditor-twbs4-text-button')
    button.setAttribute('data-toggle', 'tooltip')
    button.setAttribute('data-placement', 'auto')
    button.title = text

    var icon = document.createTextNode('ⓘ')
    button.appendChild(icon)

    if (this.options.tooltip === 'bootstrap') {
      if (window.jQuery && window.jQuery().tooltip) {
        window.jQuery(button).tooltip()
      } else {
        console.warn('Could not find popper jQuery plugin of Bootstrap.')
      }
    } else if (this.options.tooltip === 'css') {
      button.classList.add('je-tooltip')
    } // else -> nothing todo for native [title] handling

    return button
  },

  /**
   * Generates a checkbox...
   *
   * Overwriten from master theme to get rid of inline styles.
   */
  getCheckbox: function () {
    var el = this.getFormInputField('checkbox')
    return el
  },

  /**
   * Multiple checkboxes in a row.
   *
   */
  getMultiCheckboxHolder: function (controls, label, description, infoText) {
    var el = document.createElement('div')
    el.classList.add('form-group')

    if (label) {
      el.appendChild(label)

      if (infoText) {
        label.appendChild(infoText)
      }
    }

    // for inline view we need an container so it doesnt wrap in the "row" of the <label>
    var container = document.createElement('div')

    for (var i in controls) {
      if (!controls.hasOwnProperty(i)) {
        continue
      }

      // controls are already parsed by getFormControl() so they have an .form-group
      // wrapper we need to get rid of...
      var ctrl = controls[i].firstChild

      // we don't know if this should be an normal / compact view
      /* if (this.options.custom_forms === false) {
        ctrl.classList.add('form-check-inline')
      } else {
        ctrl.classList.add('custom-control-inline')
      } */

      container.appendChild(ctrl)
    }

    el.appendChild(container)

    if (description) el.appendChild(description)

    return el
  },

  /**
   * Single radio element
   */
  getFormRadio: function (attributes) {
    var el = this.getFormInputField('radio')

    for (var key in attributes) {
      el.setAttribute(key, attributes[key])
    }

    if (this.options.custom_forms === false) {
      el.classList.add('form-check-input')
    } else {
      el.classList.add('custom-control-input')
    }

    return el
  },

  /**
   * Add the <label> for the single radio from getFormRadio()
   *
   */
  getFormRadioLabel: function (text, req) {
    var el = document.createElement('label')

    if (this.options.custom_forms === false) {
      el.classList.add('form-check-label')
    } else {
      el.classList.add('custom-control-label')
    }

    el.appendChild(document.createTextNode(text))
    return el
  },

  /**
   * Stack the radios from getFormRadio()/getFormRadioLabel()
   *
   */
  getFormRadioControl: function (label, input, compact) {
    var el = document.createElement('div')

    if (this.options.custom_forms === false) {
      el.classList.add('form-check')
    } else {
      el.classList.add('custom-control', 'custom-radio')
    }

    el.appendChild(input)
    el.appendChild(label)

    if (compact) {
      if (this.options.custom_forms === false) {
        el.classList.add('form-check-inline')
      } else {
        el.classList.add('custom-control-inline')
      }
    }

    return el
  },

  getIndentedPanel: function () {
    var el = document.createElement('div')
    el.classList.add('card', 'card-body', 'mb-3')

    if (this.options.object_background) {
      el.classList.add(this.options.object_background)
    }

    if (this.options.object_text) {
      el.classList.add(this.options.object_text)
    }

    // for better twbs card styling we should be able to return a nested div

    return el
  },

  getFormInputDescription: function (text) {
    var el = document.createElement('small')
    el.classList.add('form-text')

    if (window.DOMPurify) {
      el.innerHTML = window.DOMPurify.sanitize(text)
    } else {
      el.textContent = this.cleanText(text)
    }

    return el
  },

  getHeader: function (text) {
    // var cardHeader = document.createElement('div')
    // cardHeader.classList.add('card-header')

    var el = document.createElement('h3')
    el.classList.add('card-title')

    if (typeof text === 'string') {
      el.textContent = text
    } else {
      el.appendChild(text)
    }

    // cardHeader.appendChild(el)

    return el
  },

  getHeaderButtonHolder: function () {
    var el = this.getButtonHolder()

    return el
  },
  getButtonHolder: function () {
    var el = document.createElement('span')
    el.classList.add('btn-group')
    return el
  },

  getFormButtonHolder: function (buttonAlign) {
    var el = this.getButtonHolder()
    el.classList.add('d-block')

    if (buttonAlign === 'center') el.classList.add('text-center')
    else if (buttonAlign === 'right') el.classList.add('text-right')

    return el
  },

  getButton: function (text, icon, title) {
    var el = this._super(text, icon, title)
    el.classList.add('btn', 'btn-secondary', 'btn-sm')
    return el
  },

  getTable: function () {
    var el = document.createElement('table')
    el.classList.add('table', 'table-sm')

    if (this.options.table_border) {
      el.classList.add('table-bordered')
    }

    if (this.options.table_zebrastyle) {
      el.classList.add('table-striped')
    }

    return el
  },

  getErrorMessage: function (text) {
    var el = document.createElement('div')
    el.classList.add('alert', 'alert-danger')
    el.setAttribute('role', 'alert')
    el.appendChild(document.createTextNode(text))
    return el
  },

  /**
   * input validation on <input>
   */
  addInputError: function (input, text) {
    if (!input.controlgroup) return

    input.classList.add('is-invalid')

    if (!input.errmsg) {
      input.errmsg = document.createElement('p')
      input.errmsg.classList.add('invalid-feedback')
      input.controlgroup.appendChild(input.errmsg)
    } else {
      input.errmsg.style.display = ''
    }

    input.errmsg.textContent = text
  },
  removeInputError: function (input) {
    if (!input.errmsg) return
    input.errmsg.style.display = 'none'
    input.classList.remove('is-invalid')
  },

  getTabHolder: function (propertyName) {
    var el = document.createElement('div')
    var pName = (typeof propertyName === 'undefined') ? '' : propertyName
    el.innerHTML = "<div class='col-md-2' id='" + pName + "'><ul class='nav flex-column nav-pills'></ul></div><div class='col-md-10'><div class='tab-content' id='" + pName + "'></div></div>"
    el.classList.add('row')
    return el
  },
  addTab: function (holder, tab) {
    holder.children[0].children[0].appendChild(tab)
  },
  getTabContentHolder: function (tabHolder) {
    return tabHolder.children[1].children[0]
  },

  getTopTabHolder: function (propertyName) {
    var pName = (typeof propertyName === 'undefined') ? '' : propertyName

    var el = document.createElement('div')
    el.classList.add('card')

    el.innerHTML = "<div class='card-header'><ul class='nav nav-tabs card-header-tabs' id='" + pName + "'></ul></div><div class='card-body'><div class='tab-content' id='" + pName + "'></div></div>"

    return el
  },
  getTab: function (text, tabId) {
    var liel = document.createElement('li')
    liel.classList.add('nav-item')

    var ael = document.createElement('a')
    ael.classList.add('nav-link')
    ael.setAttribute('href', '#' + tabId)
    ael.setAttribute('data-toggle', 'tab')
    ael.appendChild(text)

    liel.appendChild(ael)

    return liel
  },
  getTopTab: function (text, tabId) {
    var el = document.createElement('li')
    el.classList.add('nav-item')

    var a = document.createElement('a')
    a.classList.add('nav-link')
    a.setAttribute('href', '#' + tabId)
    a.setAttribute('data-toggle', 'tab')
    a.appendChild(text)

    el.appendChild(a)

    return el
  },
  getTabContent: function () {
    var el = document.createElement('div')
    el.classList.add('tab-pane')
    el.setAttribute('role', 'tabpanel')
    return el
  },
  getTopTabContent: function () {
    var el = document.createElement('div')
    el.classList.add('tab-pane')
    el.setAttribute('role', 'tabpanel')
    return el
  },
  markTabActive: function (row) {
    row.tab.firstChild.classList.add('active')

    if (typeof row.rowPane !== 'undefined') {
      row.rowPane.classList.add('active')
    } else {
      row.container.classList.add('active')
    }
  },
  markTabInactive: function (row) {
    row.tab.firstChild.classList.remove('active')

    if (typeof row.rowPane !== 'undefined') {
      row.rowPane.classList.remove('active')
    } else {
      row.container.classList.remove('active')
    }
  },

  addTopTab: function (holder, tab) {
    holder.children[0].children[0].appendChild(tab)
  },

  getTopTabContentHolder: function (tabHolder) {
    return tabHolder.children[1].children[0]
  },

  getProgressBar: function () {
    var min = 0
    var max = 100
    var start = 0

    var container = document.createElement('div')
    container.classList.add('progress')

    var bar = document.createElement('div')
    bar.classList.add('progress-bar')
    bar.setAttribute('role', 'progressbar')
    bar.setAttribute('aria-valuenow', start)
    bar.setAttribute('aria-valuemin', min)
    bar.setAttribute('aria-valuenax', max)
    bar.innerHTML = start + '%'
    container.appendChild(bar)

    return container
  },
  updateProgressBar: function (progressBar, progress) {
    if (!progressBar) return

    var bar = progressBar.firstChild
    var percentage = progress + '%'
    bar.setAttribute('aria-valuenow', progress)
    bar.style.width = percentage
    bar.innerHTML = percentage
  },
  updateProgressBarUnknown: function (progressBar) {
    if (!progressBar) return

    var bar = progressBar.firstChild
    progressBar.classList.add('progress', 'progress-striped', 'active')
    bar.removeAttribute('aria-valuenow')
    bar.style.width = '100%'
    bar.innerHTML = ''
  },

  getBlockLink: function () {
    var link = document.createElement('a')
    link.classList.add('mb-3', 'd-inline-block')
    return link
  },

  /**
   * Link after successfull upload
   */
  getLinksHolder: function () {
    var el = document.createElement('div')
    return el
  },

  getInputGroup: function (input, buttons) {
    if (!input) return

    var inputGroupContainer = document.createElement('div')
    inputGroupContainer.classList.add('input-group')

    inputGroupContainer.appendChild(input)

    var inputGroup = document.createElement('div')
    inputGroup.classList.add('input-group-append')
    inputGroupContainer.appendChild(inputGroup)

    for (var i = 0; i < buttons.length; i++) {
      // this uses the getButton() wrapper, so we have to remove the panel/ctrl spacing for this case
      buttons[i].classList.remove('mr-2', 'btn-secondary')
      buttons[i].classList.add('btn-outline-secondary')

      inputGroup.appendChild(buttons[i])
    }

    return inputGroupContainer
  }
})
