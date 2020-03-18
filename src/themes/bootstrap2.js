import { AbstractTheme } from '../theme.js'

export class bootstrap2Theme extends AbstractTheme {
  getRangeInput (min, max, step) {
    /* TODO: use bootstrap slider */
    return super.getRangeInput(min, max, step)
  }

  getGridContainer () {
    const el = document.createElement('div')
    el.classList.add('container-fluid')
    return el
  }

  getGridRow () {
    const el = document.createElement('div')
    el.classList.add('row-fluid')
    return el
  }

  getFormInputLabel (text, req) {
    const el = super.getFormInputLabel(text, req)
    el.style.display = 'inline-block'
    el.style.fontWeight = 'bold'
    return el
  }

  setGridColumnSize (el, size) {
    el.classList.add(`span${size}`)
  }

  getSelectInput (options, multiple) {
    const input = super.getSelectInput(options)
    input.style.width = 'auto'
    input.style.maxWidth = '98%'
    return input
  }

  getFormInputField (type) {
    const el = super.getFormInputField(type)
    el.style.width = '98%'
    return el
  }

  afterInputReady (input) {
    if (input.controlgroup) return
    input.controlgroup = this.closest(input, '.control-group')
    input.controls = this.closest(input, '.controls')
    if (this.closest(input, '.compact')) {
      input.controlgroup.className = input.controlgroup.className.replace(/control-group/g, '').replace(/[ ]{2,}/g, ' ')
      input.controls.className = input.controlgroup.className.replace(/controls/g, '').replace(/[ ]{2,}/g, ' ')
      input.style.marginBottom = 0
    }
    if (this.queuedInputErrorText) {
      const text = this.queuedInputErrorText
      delete this.queuedInputErrorText
      this.addInputError(input, text)
    }

    /* TODO: use bootstrap slider */
  }

  getIndentedPanel () {
    const el = document.createElement('div')
    el.classList.add('well', 'well-small')
    el.style.paddingBottom = 0
    return el
  }

  getInfoButton (text) {
    const icon = document.createElement('span')
    icon.classList.add('icon-info-sign', 'pull-right')
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
    tooltip.style.transform = 'translateX(-27rem) translateY(-.5rem)'
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
    el.classList.add('help-inline')
    if (window.DOMPurify) el.innerHTML = window.DOMPurify.sanitize(text)
    else el.textContent = this.cleanText(text)
    return el
  }

  getFormControl (label, input, description, infoText) {
    const ret = document.createElement('div')

    const controls = document.createElement('div')

    if (label && (input.getAttribute('type') === 'checkbox' || input.getAttribute('type') === 'radio')) {
      ret.appendChild(controls)
      controls.classList.add('form-check')
      label.classList.add('form-check-label')
      input.classList.add('form-check-input')
      input.style.margin = '0 4px 4px 0'
      input.style.width = 'auto'
      controls.appendChild(input)
      controls.appendChild(label)
      if (infoText) controls.appendChild(infoText)
      controls.style.height = '30px'
    } else {
      ret.classList.add('control-group')
      if (label) {
        label.classList.add('control-label')
        ret.appendChild(label)
      }
      if (infoText) controls.appendChild(infoText)
      controls.appendChild(input)
      ret.appendChild(controls)
    }

    if (description) controls.appendChild(description)

    return ret
  }

  getHeaderButtonHolder () {
    const el = this.getButtonHolder()
    el.style.marginLeft = '10px'
    return el
  }

  getButtonHolder () {
    const el = document.createElement('div')
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
    if (!input.controlgroup || !input.controls) return
    input.controlgroup.classList.add('error')
    if (!input.errmsg) {
      input.errmsg = document.createElement('p')
      input.errmsg.classList.add('help-block', 'errormsg')
      input.controls.appendChild(input.errmsg)
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
    input.controlgroup.classList.remove('error')
  }

  getTabHolder (propertyName) {
    const pName = (typeof propertyName === 'undefined') ? '' : propertyName
    const el = document.createElement('div')
    el.classList.add('tabbable', 'tabs-left')
    el.innerHTML = `<ul class='nav nav-tabs'  id='${pName}'></ul><div class='tab-content well well-small' id='${pName}'></div>`
    return el
  }

  getTopTabHolder (propertyName) {
    const pName = (typeof propertyName === 'undefined') ? '' : propertyName
    const el = document.createElement('div')
    el.classList.add('tabbable', 'tabs-over')
    el.innerHTML = `<ul class='nav nav-tabs' id='${pName}'></ul><div class='tab-content well well-small'  id='${pName}'></div>`
    return el
  }

  getTab (text, tabId) {
    const el = document.createElement('li')
    el.classList.add('nav-item')
    const a = document.createElement('a')
    a.setAttribute('href', `#${tabId}`)
    a.appendChild(text)
    el.appendChild(a)
    return el
  }

  getTopTab (text, tabId) {
    const el = document.createElement('li')
    el.classList.add('nav-item')
    const a = document.createElement('a')
    a.setAttribute('href', `#${tabId}`)
    a.appendChild(text)
    el.appendChild(a)
    return el
  }

  getTabContentHolder (tabHolder) {
    return tabHolder.children[1]
  }

  getTopTabContentHolder (tabHolder) {
    return tabHolder.children[1]
  }

  getTabContent () {
    const el = document.createElement('div')
    el.classList.add('tab-pane')
    return el
  }

  getTopTabContent () {
    const el = document.createElement('div')
    el.classList.add('tab-pane')
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

  addTab (holder, tab) {
    holder.children[0].appendChild(tab)
  }

  addTopTab (holder, tab) {
    holder.children[0].appendChild(tab)
  }

  getProgressBar () {
    const container = document.createElement('div')
    container.classList.add('progress')

    const bar = document.createElement('div')
    bar.classList.add('bar')
    bar.style.width = '0%'
    container.appendChild(bar)

    return container
  }

  updateProgressBar (progressBar, progress) {
    if (!progressBar) return

    progressBar.firstChild.style.width = `${progress}%`
  }

  updateProgressBarUnknown (progressBar) {
    if (!progressBar) return

    progressBar.classList.add('progress', 'progress-striped', 'active')
    progressBar.firstChild.style.width = '100%'
  }

  getInputGroup (input, buttons) {
    if (!input) return

    const inputGroupContainer = document.createElement('div')
    inputGroupContainer.classList.add('input-append')
    inputGroupContainer.appendChild(input)

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.add('btn')
      inputGroupContainer.appendChild(buttons[i])
    }

    return inputGroupContainer
  }
}

/* Custom stylesheet rules. format: "selector" : "CSS rules" */
bootstrap2Theme.rules = { 'div[data-schemaid="root"]:after': 'position:relative;color:red;margin:10px 0;font-weight:600;display:block;width:100%;text-align:center;content:"This is an old JSON-Editor 1.x Theme and might not display elements correctly when used with the 2.x version"' }
