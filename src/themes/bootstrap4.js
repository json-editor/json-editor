import { AbstractTheme } from '../theme'

export var bootstrap4Theme = AbstractTheme.extend({
  /* Theme config options that allows changing various aspects of the output */
  options: {
    'disable_theme_rules': false
  },
  /* Custom stylesheet rules. format: "selector" : "CSS rules" */
  rules: {
    '.jsoneditor-twbs4-text-button': 'background: none;padding: 0;border: 0',
    'td>.form-group': 'margin-bottom: 0',
    'div[data-schemaid="root"]:after': 'position:relative;color:red;margin:10px 0;font-weight:600;display:block;width:100%;text-align:center;content:"This is an old JSON-Editor 1.x Theme and might not display elements correctly when used with the 2.x version"'
  },

  getSelectInput: function (options, multiple) {
    var el = this._super(options)
    el.classList.add('form-control')
    // el.style.width = 'auto';
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

    input.controlgroup = this.closest(input, '.form-group')

    // TODO: use bootstrap slider
  },

  getTextareaInput: function () {
    var el = document.createElement('textarea')
    el.classList.add('form-control')
    return el
  },

  getRangeInput: function (min, max, step) {
    // TODO: use better slider
    return this._super(min, max, step)
  },

  getFormInputField: function (type) {
    var el = this._super(type)
    if (type !== 'checkbox' && type !== 'radio') {
      el.classList.add('form-control')
    }
    return el
  },

  getFormControl: function (label, input, description) {
    var group = document.createElement('div')
    group.classList.add('form-group')

    if (label && (input.type === 'checkbox' || input.type === 'radio')) {
      var check = document.createElement('div')
      check.classList.add('form-check')

      input.classList.add('form-check-input')
      label.classList.add('form-check-label')

      // todo: nest input under label? not bootstrap default, can we set an unique ID here?
      input.id = input.name // no name yet available?
      label.for = input.id

      check.appendChild(input)
      check.appendChild(label)

      group.appendChild(check)
    } else {
      if (label) {
        group.appendChild(label)
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

    var tooltip = document.createElement('div')
    tooltip.classList.add('tooltip', 'bs-tooltip-top')
    tooltip.setAttribute('role', 'tooltip')

    if (window.jQuery) {
      // arrow is only usefull if positioned by popover.js
      var arrow = document.createElement('div')
      arrow.classList.add('arrow')
      tooltip.appendChild(arrow)

      window.jQuery(button).tooltip()
    } else {
      // better fallback for non-js / no twbs js situtions?
      // for now just rely on browser native [title]
    }

    return button
  },

  /**
   * Multiple checkboxes in a row.
   *
   */
  getMultiCheckboxHolder: function (controls, label, description, infoText) {
    var el = document.createElement('div')
    el.classList.add('form-group')

    if (label) {
      label.style.display = 'block'
      el.appendChild(label)

      if (infoText) {
        label.appendChild(infoText)
      }
    }

    for (var i in controls) {
      if (!controls.hasOwnProperty(i)) {
        continue
      }

      // controls are already parsed by getFormControl() so they have an .form-group
      // wrapper we need to get rid of...
      var ctrl = controls[i].firstChild

      ctrl.classList.add('form-check-inline')
      el.appendChild(ctrl)
    }

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

    el.classList.add('form-check-input')

    return el
  },

  /**
   * Add the <label> for the single radio from getFormRadio()
   *
   */
  getFormRadioLabel: function (text, req) {
    var el = document.createElement('label')
    el.classList.add('form-check-label')
    el.appendChild(document.createTextNode(text))
    return el
  },

  /**
   * Stack the radios from getFormRadio()/getFormRadioLabel()
   *
   */
  getFormRadioControl: function (label, input, compact) {
    var el = document.createElement('div')
    el.classList.add('form-check')

    el.appendChild(input)
    el.appendChild(label)

    if (compact) {
      el.classList.add('form-check-inline')
    }

    return el
  },

  getIndentedPanel: function () {
    var el = document.createElement('div')
    el.classList.add('card', 'card-body', 'bg-light', 'mb-3')

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
      text.classList.add('pr-3')
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
    // todo: we dont want to use div.btn-group until we can wrap all buttons inside it
    // single button inside a group get's it's corners cut off
    var el = document.createElement('span')
    // el.classList.add('btn-group')
    // el.classList.add('ml-2')
    return el
  },
  getButton: function (text, icon, title) {
    var el = this._super(text, icon, title)
    el.classList.add('btn', 'btn-secondary', 'btn-sm', 'mr-2')
    return el
  },

  getTable: function () {
    var el = document.createElement('table')
    el.classList.add('table', 'table-bordered', 'table-sm')
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
  getInputGroup: function (input, buttons) {
    if (!input) return

    var inputGroupContainer = document.createElement('div')
    inputGroupContainer.classList.add('input-group')
    inputGroupContainer.appendChild(input)

    var inputGroup = document.createElement('div')
    inputGroup.classList.add('input-group-prepend')
    inputGroupContainer.appendChild(inputGroup)

    for (var i = 0; i < buttons.length; i++) {
      inputGroup.appendChild(buttons[i])
    }

    return inputGroupContainer
  }
})
