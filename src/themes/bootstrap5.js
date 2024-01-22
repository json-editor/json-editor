import { AbstractTheme } from '../theme.js'
import rules from './bootstrap5.css.js'
import { trigger } from '../utilities'

/* Theme config options that allows changing various aspects of the output */
const options = {
  disable_theme_rules: false,
  input_size: 'normal', /* Size of input and select elements. "small", "normal", "large" */
  object_indent: true, /* Indent nested object elements (use nested .card layout) */
  object_background: 'bg-light', /* Bootstrap 4 card background modifier class */
  object_text: '', /* Bootstrap 5 card text color modifier class */
  table_border: false, /* Add border to array "table" row and cells */
  table_zebrastyle: false, /* Add "zebra style" to array "table" rows */
  tooltip: 'bootstrap' /* how to display tooltips (infoText). Can be `browser` for native `title`, `css` for simple CSS Styling, or `bootstrap` for TWBS/Popper.js handling */
}

export class bootstrap5Theme extends AbstractTheme {
  constructor (jsoneditor) {
    super(jsoneditor, options)
  }

  getSelectInput (options, multiple) {
    const el = super.getSelectInput(options)
    el.classList.add('form-control')
    el.classList.add('form-select')
    if (this.options.input_size === 'small') el.classList.add('form-control-sm')
    if (this.options.input_size === 'large') el.classList.add('form-control-lg')

    return el
  }

  getContainer () {
    const el = document.createElement('div')
    if (!this.options.object_indent) el.classList.add('je-noindent')
    return el
  }

  setGridColumnSize (el, size, offset) {
    el.classList.add(`col-md-${size}`)

    if (offset) {
      el.classList.add(`offset-md-${offset}`)
    }
  }

  afterInputReady (input) {
    if (input.controlgroup) return

    /* set id/for */
    /* is not working for: [type=file], [type=checkbox] */
    const id = input.name
    input.id = id
    /* 2x parentNode, b/c range input has an <div> wrapper */
    const label = input.parentNode.parentNode.getElementsByTagName('label')[0]
    if (label) {
      label.classList.add('form-label')
      label.htmlFor = id
    }

    input.controlgroup = this.closest(input, '.form-group')
  }

  getTextareaInput () {
    const el = document.createElement('textarea')
    el.classList.add('form-control')
    if (this.options.input_size === 'small') el.classList.add('form-control-sm')
    if (this.options.input_size === 'large') el.classList.add('form-control-lg')
    return el
  }

  getRangeInput (min, max, step, description, formName) {
    const el = super.getRangeInput(min, max, step, description, formName)
    el.classList.remove('form-control')
    el.classList.add('form-range')
    return el
  }

  getStepperButtons (input) {
    const inputGroup = document.createElement('div')

    const minusBtn = document.createElement('button')
    minusBtn.setAttribute('type', 'button')

    const plusBtn = document.createElement('button')
    plusBtn.setAttribute('type', 'button')

    inputGroup.appendChild(minusBtn)
    inputGroup.appendChild(input)
    inputGroup.appendChild(plusBtn)

    inputGroup.classList.add('input-group')
    minusBtn.classList.add('btn')
    minusBtn.classList.add('btn-secondary')
    minusBtn.classList.add('stepper-down')
    plusBtn.classList.add('btn')
    plusBtn.classList.add('btn-secondary')
    plusBtn.classList.add('stepper-up')

    const readonly = input.getAttribute('readonly')

    if (readonly) {
      minusBtn.setAttribute('disabled', true)
      plusBtn.setAttribute('disabled', true)
    }

    minusBtn.textContent = '-'
    plusBtn.textContent = '+'

    const initialize = (input, min) => {
      if (min) {
        input.value = Number(min)
      } else {
        input.value = Number(input.value)
      }
      input.setAttribute('initialized', '1')
    }

    const min = input.getAttribute('min')
    const max = input.getAttribute('max')

    input.addEventListener('change', () => {
      if (!input.getAttribute('initialized')) {
        input.setAttribute('initialized', '1')
      }
    })

    minusBtn.addEventListener('click', () => {
      if (!input.getAttribute('initialized')) {
        initialize(input, min)
      } else if (min) {
        if (Number(input.value) > Number(min)) {
          input.stepDown()
        }
      } else {
        input.stepDown()
      }
      trigger(input, 'change')
    })

    plusBtn.addEventListener('click', () => {
      if (!input.getAttribute('initialized')) {
        initialize(input, min)
      } else if (max) {
        if (Number(input.value) < Number(max)) {
          input.stepUp()
        }
      } else {
        input.stepUp()
      }
      trigger(input, 'change')
    })

    return inputGroup
  }

  getFormInputField (type) {
    const el = super.getFormInputField(type)
    if (type !== 'checkbox' && type !== 'radio') {
      el.classList.add('form-control')
      if (this.options.input_size === 'small') el.classList.add('form-control-sm')
      if (this.options.input_size === 'large') el.classList.add('form-control-lg')
    }
    return el
  }

  getFormControl (label, input, description, infoText, formName) {
    const group = document.createElement('div')
    group.classList.add('form-group')

    if (label && (input.type === 'checkbox' || input.type === 'radio')) {
      const check = document.createElement('div')

      check.classList.add('form-check')
      input.classList.add('form-check-input')
      label.classList.add('form-check-label')

      if (input.tagName.toLowerCase() !== 'div' && input && label && formName) {
        label.setAttribute('for', formName)
        input.setAttribute('id', formName)
      }

      if (input.tagName.toLowerCase() !== 'div' && input && description) {
        description.setAttribute('id', formName + '-description')
        input.setAttribute('aria-describedby', formName + '-description')
      }

      check.appendChild(input)
      check.appendChild(label)
      if (infoText) check.appendChild(infoText)

      group.appendChild(check)
    } else {
      if (label) {
        label.classList.add('form-label')
        group.appendChild(label)

        if (infoText) group.appendChild(infoText)
      }

      group.appendChild(input)
    }

    if (description) {
      group.appendChild(description)
    }

    return group
  }

  getHiddenLabel (text) {
    const el = document.createElement('label')
    el.textContent = text
    el.classList.add('visually-hidden')
    return el
  }

  visuallyHidden (element) {
    if (!element) {
      return
    }

    element.classList.add('visually-hidden')
  }

  getHiddenText (text) {
    const el = document.createElement('span')
    el.textContent = text
    el.classList.add('sr-only')
    return el
  }

  getInfoButton (text) {
    const button = document.createElement('button') /* shoud be a <button> but no fitting tbws style... */
    button.type = 'button'
    button.classList.add('ms-3', 'jsoneditor-twbs5-text-button')
    button.setAttribute('data-toggle', 'tooltip')
    button.setAttribute('data-placement', 'auto')
    button.title = text

    const icon = document.createTextNode('ⓘ')
    button.appendChild(icon)

    if (this.options.tooltip === 'bootstrap') {
      if (window.jQuery && window.jQuery().tooltip) {
        window.jQuery(button).tooltip()
      } else {
        // eslint-disable-next-line no-console
        console.warn('Could not find popper jQuery plugin of Bootstrap.')
      }
    } else if (this.options.tooltip === 'css') {
      button.classList.add('je-tooltip')
    } /* else -> nothing todo for native [title] handling */

    return button
  }

  /**
   * Generates a checkbox...
   *
   * Overwriten from master theme to get rid of inline styles.
   */
  getCheckbox () {
    const el = this.getFormInputField('checkbox')
    return el
  }

  /**
   * Multiple checkboxes in a row.
   *
   */
  getMultiCheckboxHolder (controls, label, description, infoText) {
    const el = document.createElement('div')
    el.classList.add('form-group')

    if (label) {
      el.appendChild(label)

      if (infoText) {
        label.appendChild(infoText)
      }
    }

    /* for inline view we need an container so it doesnt wrap in the "row" of the <label> */
    const container = document.createElement('div')

    Object.values(controls).forEach(c => {
      /* controls are already parsed by getFormControl() so they have an .form-group */
      /* wrapper we need to get rid of... */
      const ctrl = c.firstChild

      container.appendChild(ctrl)
    })

    el.appendChild(container)

    if (description) el.appendChild(description)

    return el
  }

  /**
   * Single radio element
   */
  getFormRadio (attributes) {
    const el = this.getFormInputField('radio')

    for (const key in attributes) {
      el.setAttribute(key, attributes[key])
    }
    el.classList.add('form-check-input')

    return el
  }

  /**
   * Add the <label> for the single radio from getFormRadio()
   *
   */
  getFormRadioLabel (text, req) {
    const el = document.createElement('label')

    el.classList.add('form-check-label')
    el.appendChild(document.createTextNode(text))
    return el
  }

  /**
   * Stack the radios from getFormRadio()/getFormRadioLabel()
   *
   */
  getFormRadioControl (label, input, compact) {
    const el = document.createElement('div')

    el.classList.add('form-check')

    el.appendChild(input)
    el.appendChild(label)

    if (compact) {
      el.classList.add('form-check-inline')
    }

    return el
  }

  getIndentedPanel () {
    const el = document.createElement('div')
    el.classList.add('card', 'card-body', 'my-3')

    if (this.options.object_background) {
      el.classList.add(this.options.object_background)
    }

    if (this.options.object_text) {
      el.classList.add(this.options.object_text)
    }

    /* for better twbs card styling we should be able to return a nested div */

    return el
  }

  getFormInputDescription (text) {
    const el = document.createElement('small')
    el.classList.add('form-text')
    el.classList.add('d-block')

    if (window.DOMPurify) {
      el.innerHTML = window.DOMPurify.sanitize(text)
    } else {
      el.textContent = this.cleanText(text)
    }

    return el
  }

  getHeader (text, pathDepth) {
    const el = document.createElement('span')
    el.classList.add('h3')
    el.classList.add('card-title')
    el.classList.add('level-' + pathDepth)

    if (typeof text === 'string') {
      el.textContent = text
    } else {
      el.appendChild(text)
    }

    el.style.display = 'inline-block'

    return el
  }

  getHeaderButtonHolder () {
    const el = this.getButtonHolder()

    return el
  }

  getButtonHolder () {
    const el = document.createElement('span')
    el.classList.add('btn-group')
    return el
  }

  getFormButtonHolder (buttonAlign) {
    const el = this.getButtonHolder()
    el.classList.add('d-block')

    if (buttonAlign === 'center') el.classList.add('text-center')
    else if (buttonAlign === 'right') el.classList.add('text-end')

    return el
  }

  getButton (text, icon, title) {
    const el = super.getButton(text, icon, title)
    el.classList.add('btn', 'btn-secondary', 'btn-sm')
    return el
  }

  getTableContainer () {
    const el = super.getTableContainer()
    el.classList.add('table-responsive')
    return el
  }

  getTable () {
    const el = document.createElement('table')
    el.classList.add('table', 'table-sm')

    if (this.options.table_border) {
      el.classList.add('table-bordered')
    }

    if (this.options.table_zebrastyle) {
      el.classList.add('table-striped')
    }

    return el
  }

  getErrorMessage (text) {
    const el = document.createElement('div')
    el.classList.add('alert', 'alert-danger')
    el.setAttribute('role', 'alert')
    el.appendChild(document.createTextNode(text))
    return el
  }

  /**
   * input validation on <input>
   */
  addInputError (input, text) {
    if (!input.controlgroup) return

    input.controlgroup.classList.add('is-invalid')

    if (!input.errmsg) {
      input.errmsg = document.createElement('p')
      input.errmsg.classList.add('invalid-feedback')
      input.controlgroup.appendChild(input.errmsg)
      input.errmsg.style.display = 'block'
    }

    input.errmsg.style.display = 'block'
    input.errmsg.textContent = text
    input.errmsg.setAttribute('role', 'alert')
  }

  removeInputError (input) {
    if (!input.errmsg) return
    input.errmsg.style.display = 'none'
    input.controlgroup.classList.remove('is-invalid')
  }

  getTabHolder (propertyName) {
    const el = document.createElement('div')
    const pName = (typeof propertyName === 'undefined') ? '' : propertyName
    el.innerHTML = `<div class='col-md-2' id='${pName}'><ul class='nav flex-column nav-pills'></ul></div><div class='col-md-10'><div class='tab-content' id='${pName}'></div></div>`
    el.classList.add('row')
    return el
  }

  addTab (holder, tab) {
    holder.children[0].children[0].appendChild(tab)
  }

  getTabContentHolder (tabHolder) {
    return tabHolder.children[1].children[0]
  }

  getTopTabHolder (propertyName) {
    const pName = (typeof propertyName === 'undefined') ? '' : propertyName

    const el = document.createElement('div')
    el.classList.add('card')

    el.innerHTML = `<div class='card-header'><ul class='nav nav-tabs card-header-tabs' id='${pName}'></ul></div><div class='card-body'><div class='tab-content' id='${pName}'></div></div>`

    return el
  }

  getTab (text, tabId) {
    const liel = document.createElement('li')
    liel.classList.add('nav-item')

    const ael = document.createElement('a')
    ael.classList.add('nav-link')
    ael.setAttribute('href', `#${tabId}`)
    ael.setAttribute('data-toggle', 'tab')
    ael.appendChild(text)

    liel.appendChild(ael)

    return liel
  }

  getTopTab (text, tabId) {
    const el = document.createElement('li')
    el.classList.add('nav-item')

    const a = document.createElement('a')
    a.classList.add('nav-link')
    a.setAttribute('href', `#${tabId}`)
    a.setAttribute('data-toggle', 'tab')
    a.appendChild(text)

    el.appendChild(a)

    return el
  }

  getTabContent () {
    const el = document.createElement('div')
    el.classList.add('tab-pane')
    el.setAttribute('role', 'tabpanel')
    return el
  }

  getTopTabContent () {
    const el = document.createElement('div')
    el.classList.add('tab-pane')
    el.setAttribute('role', 'tabpanel')
    return el
  }

  markTabActive (row) {
    row.tab.firstChild.classList.add('active')

    if (typeof row.rowPane !== 'undefined') {
      row.rowPane.classList.add('active')
    } else {
      row.container.classList.add('active')
    }
  }

  markTabInactive (row) {
    row.tab.firstChild.classList.remove('active')

    if (typeof row.rowPane !== 'undefined') {
      row.rowPane.classList.remove('active')
    } else {
      row.container.classList.remove('active')
    }
  }

  insertBasicTopTab (tab, newTabsHolder) {
    newTabsHolder.children[0].children[0].insertBefore(tab, newTabsHolder.children[0].children[0].firstChild)
  }

  addTopTab (holder, tab) {
    holder.children[0].children[0].appendChild(tab)
  }

  getTopTabContentHolder (tabHolder) {
    return tabHolder.children[1].children[0]
  }

  getFirstTab (holder) {
    return holder.firstChild.firstChild.firstChild
  }

  getProgressBar () {
    const min = 0
    const max = 100
    const start = 0

    const container = document.createElement('div')
    container.classList.add('progress')

    const bar = document.createElement('div')
    bar.classList.add('progress-bar')
    bar.setAttribute('role', 'progressbar')
    bar.setAttribute('aria-valuenow', start)
    bar.setAttribute('aria-valuemin', min)
    bar.setAttribute('aria-valuenax', max)
    bar.innerHTML = `${start}%`
    container.appendChild(bar)

    return container
  }

  updateProgressBar (progressBar, progress) {
    if (!progressBar) return

    const bar = progressBar.firstChild
    const percentage = `${progress}%`
    bar.setAttribute('aria-valuenow', progress)
    bar.style.width = percentage
    bar.innerHTML = percentage
  }

  updateProgressBarUnknown (progressBar) {
    if (!progressBar) return

    const bar = progressBar.firstChild
    progressBar.classList.add('progress', 'progress-striped', 'active')
    bar.removeAttribute('aria-valuenow')
    bar.style.width = '100%'
    bar.innerHTML = ''
  }

  getBlockLink () {
    const link = document.createElement('a')
    link.classList.add('mb-3', 'd-inline-block')
    return link
  }

  /**
   * Link after successfull upload
   */
  getLinksHolder () {
    const el = document.createElement('div')
    return el
  }

  getInputGroup (input, buttons) {
    if (!input) return

    const inputGroupContainer = document.createElement('div')
    inputGroupContainer.classList.add('input-group')

    inputGroupContainer.appendChild(input)

    for (let i = 0; i < buttons.length; i++) {
      /* this uses the getButton() wrapper, so we have to remove the panel/ctrl spacing for this case */
      buttons[i].classList.remove('me-2', 'btn-secondary')
      buttons[i].classList.add('btn-outline-secondary')

      inputGroupContainer.appendChild(buttons[i])
    }

    return inputGroupContainer
  }
}

/* Custom stylesheet rules. format: "selector" : "CSS rules" */
bootstrap5Theme.rules = rules
