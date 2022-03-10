import { AbstractTheme } from '../theme.js'
import rules from './bootstrap3.css'

export class bootstrap3Theme extends AbstractTheme {
  getSelectInput (options, multiple) {
    const el = super.getSelectInput(options)
    el.classList.add('form-control')
    /* el.style.width = 'auto'; */
    return el
  }

  setGridColumnSize (el, size, offset) {
    el.classList.add(`col-md-${size}`)
    if (offset) {
      el.classList.add(`col-md-offset-${offset}`)
    }
  }

  afterInputReady (input) {
    if (input.controlgroup) return
    input.controlgroup = this.closest(input, '.form-group')
    if (this.closest(input, '.compact')) {
      input.controlgroup.style.marginBottom = 0
    }
    if (this.queuedInputErrorText) {
      const text = this.queuedInputErrorText
      delete this.queuedInputErrorText
      this.addInputError(input, text)
    }

    /* TODO: use bootstrap slider */
  }

  getTextareaInput () {
    const el = document.createElement('textarea')
    el.classList.add('form-control')
    return el
  }

  getRangeInput (min, max, step) {
    /* TODO: use better slider */
    return super.getRangeInput(min, max, step)
  }

  getFormInputField (type) {
    const el = super.getFormInputField(type)
    if (type !== 'checkbox' && type !== 'radio') {
      el.classList.add('form-control')
    }
    return el
  }

  getFormControl (label, input, description, infoText) {
    const group = document.createElement('div')

    if (label && (input.type === 'checkbox' || input.type === 'radio')) {
      group.classList.add(input.type)
      if (infoText) label.appendChild(infoText)
      label.insertBefore(input, label.firstChild)
      group.appendChild(label)
    } else {
      group.classList.add('form-group')
      if (label) {
        label.classList.add('control-label')
        group.appendChild(label)
        if (infoText) label.appendChild(infoText)
      }
      group.appendChild(input)
    }

    if (description) group.appendChild(description)

    return group
  }

  getIndentedPanel () {
    const el = document.createElement('div')
    el.classList.add('well', 'well-sm')
    el.style.paddingBottom = 0
    return el
  }

  getInfoButton (text) {
    const icon = document.createElement('span')
    icon.classList.add('glyphicon', 'glyphicon-info-sign', 'pull-right')
    icon.style.padding = '.25rem'
    icon.style.position = 'relative'
    icon.style.display = 'inline-block'

    const tooltip = document.createElement('span')
    tooltip.style['font-family'] = 'sans-serif'
    tooltip.style.visibility = 'hidden'
    tooltip.style['background-color'] = 'rgba(50, 50, 50, .75)'
    tooltip.style.margin = '0 .25rem'
    tooltip.style.color = '#FAFAFA'
    tooltip.style.padding = '.5rem 1rem'
    tooltip.style['border-radius'] = '.25rem'
    tooltip.style.width = '25rem'
    tooltip.style.position = 'absolute'
    tooltip.innerText = text
    icon.onmouseover = () => {
      tooltip.style.visibility = 'visible'
    }
    icon.onmouseleave = () => {
      tooltip.style.visibility = 'hidden'
    }

    icon.appendChild(tooltip)

    return icon
  }

  getFormInputDescription (text) {
    const el = document.createElement('p')
    el.classList.add('help-block')
    if (window.DOMPurify) el.innerHTML = window.DOMPurify.sanitize(text)
    else el.textContent = this.cleanText(text)
    return el
  }

  getHeaderButtonHolder () {
    const el = this.getButtonHolder()
    el.style.marginLeft = '10px'
    return el
  }

  getButtonHolder () {
    const el = document.createElement('span')
    el.classList.add('btn-group')
    return el
  }

  getButton (text, icon, title) {
    const el = super.getButton(text, icon, title)
    el.classList.add('btn', 'btn-default')
    return el
  }

  getTable () {
    const el = document.createElement('table')
    el.classList.add('table', 'table-bordered')
    el.style.width = 'auto'
    el.style.maxWidth = 'none'
    return el
  }

  addInputError (input, text) {
    if (!input.controlgroup) {
      this.queuedInputErrorText = text
      return
    }
    input.controlgroup.classList.add('has-error')
    if (!input.errmsg) {
      input.errmsg = document.createElement('p')
      input.errmsg.classList.add('help-block', 'errormsg')
      input.controlgroup.appendChild(input.errmsg)
    } else {
      input.errmsg.style.display = ''
    }

    input.errmsg.textContent = text
  }

  removeInputError (input) {
    if (!input.controlgroup) {
      delete this.queuedInputErrorText
    }
    if (!input.errmsg) return
    input.errmsg.style.display = 'none'
    input.controlgroup.classList.remove('has-error')
  }

  getTabHolder (propertyName) {
    const pName = (typeof propertyName === 'undefined') ? '' : propertyName
    const el = document.createElement('div')
    el.innerHTML = `<ul class='col-md-2 nav nav-pills nav-stacked' id='${pName}' role='tablist'></ul><div class='col-md-10 tab-content active well well-small'  id='${pName}'></div>`
    return el
  }

  getTopTabHolder (propertyName) {
    const pName = (typeof propertyName === 'undefined') ? '' : propertyName
    const el = document.createElement('div')
    el.innerHTML = `<ul class='nav nav-tabs' id='${pName}' role='tablist'></ul><div class='tab-content active well well-small'  id='${pName}'></div>`
    return el
  }

  getTab (text, tabId) {
    const li = document.createElement('li')
    li.setAttribute('role', 'presentation')
    const a = document.createElement('a')
    a.setAttribute('href', `#${tabId}`)
    a.appendChild(text)
    a.setAttribute('aria-controls', tabId)
    a.setAttribute('role', 'tab')
    a.setAttribute('data-toggle', 'tab')
    li.appendChild(a)
    return li
  }

  getTopTab (text, tabId) {
    const li = document.createElement('li')
    li.setAttribute('role', 'presentation')
    const a = document.createElement('a')
    a.setAttribute('href', `#${tabId}`)
    a.appendChild(text)
    a.setAttribute('aria-controls', tabId)
    a.setAttribute('role', 'tab')
    a.setAttribute('data-toggle', 'tab')
    li.appendChild(a)
    return li
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
    row.tab.classList.add('active')

    if (typeof row.rowPane !== 'undefined') {
      row.rowPane.classList.add('active')
    } else {
      row.container.classList.add('active')
    }
  }

  markTabInactive (row) {
    row.tab.classList.remove('active')

    if (typeof row.rowPane !== 'undefined') {
      row.rowPane.classList.remove('active')
    } else {
      row.container.classList.remove('active')
    }
  }

  getProgressBar () {
    const min = 0; const max = 100; const start = 0

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

  getInputGroup (input, buttons) {
    if (!input) return

    const inputGroupContainer = document.createElement('div')
    inputGroupContainer.classList.add('input-group')
    inputGroupContainer.appendChild(input)

    const inputGroup = document.createElement('div')
    inputGroup.classList.add('input-group-btn')
    inputGroupContainer.appendChild(inputGroup)

    for (let i = 0; i < buttons.length; i++) {
      inputGroup.appendChild(buttons[i])
    }

    return inputGroupContainer
  }
}

/* Custom stylesheet rules. format: "selector" : "CSS rules" */
bootstrap3Theme.rules = rules
