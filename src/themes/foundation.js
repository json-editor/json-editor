/* Base Foundation theme */
import { AbstractTheme } from '../theme.js'

export class foundationTheme extends AbstractTheme {
  getChildEditorHolder () {
    const el = document.createElement('div')
    el.style.marginBottom = '15px'
    return el
  }

  getSelectInput (options, multiple) {
    const el = super.getSelectInput(options)
    el.style.minWidth = 'none'
    el.style.padding = '5px'
    el.style.marginTop = '3px'
    return el
  }

  getSwitcher (options) {
    const el = super.getSwitcher(options)
    el.style.paddingRight = '8px'
    return el
  }

  afterInputReady (input) {
    if (input.group) return
    if (this.closest(input, '.compact')) {
      input.style.marginBottom = 0
    }
    input.group = this.closest(input, '.form-control')
    if (this.queuedInputErrorText) {
      const text = this.queuedInputErrorText
      delete this.queuedInputErrorText
      this.addInputError(input, text)
    }
  }

  getFormInputLabel (text, req) {
    const el = super.getFormInputLabel(text, req)
    el.style.display = 'inline-block'
    return el
  }

  getFormInputField (type) {
    const el = super.getFormInputField(type)
    el.style.width = '100%'
    el.style.marginBottom = (type === 'checkbox' || type === 'radio') ? '0' : '12px'
    return el
  }

  getFormInputDescription (text) {
    const el = document.createElement('p')
    if (window.DOMPurify) el.innerHTML = window.DOMPurify.sanitize(text)
    else el.textContent = this.cleanText(text)
    el.style.marginTop = '-10px'
    el.style.fontStyle = 'italic'
    return el
  }

  getIndentedPanel () {
    const el = document.createElement('div')
    el.classList.add('panel')
    el.style.paddingBottom = 0
    return el
  }

  getHeaderButtonHolder () {
    const el = this.getButtonHolder()
    el.style.display = 'inline-block'
    el.style.marginLeft = '10px'
    el.style.verticalAlign = 'middle'
    return el
  }

  getButtonHolder () {
    const el = document.createElement('span')
    el.classList.add('button-group')
    return el
  }

  getButton (text, icon, title) {
    const el = super.getButton(text, icon, title)
    el.classList.add('small', 'button')
    return el
  }

  addInputError (input, text) {
    if (!input.group) {
      this.queuedInputErrorText = text
      return
    }
    input.group.classList.add('error')

    if (!input.errmsg) {
      input.insertAdjacentHTML('afterend', '<small class="error"></small>')
      input.errmsg = input.parentNode.getElementsByClassName('error')[0]
    } else {
      input.errmsg.style.display = ''
    }

    input.errmsg.textContent = text
  }

  removeInputError (input) {
    if (!input.group) {
      delete this.queuedInputErrorText
    }
    if (!input.errmsg) return
    input.group.classList.remove('error')
    input.errmsg.style.display = 'none'
  }

  getProgressBar () {
    const progressBar = document.createElement('div')
    progressBar.classList.add('progress')

    const meter = document.createElement('span')
    meter.classList.add('meter')
    meter.style.width = '0%'
    progressBar.appendChild(meter)
    return progressBar
  }

  updateProgressBar (progressBar, progress) {
    if (!progressBar) return
    progressBar.firstChild.style.width = `${progress}%`
  }

  updateProgressBarUnknown (progressBar) {
    if (!progressBar) return
    progressBar.firstChild.style.width = '100%'
  }

  getInputGroup (input, buttons) {
    if (!input) return undefined

    const inputGroupContainer = document.createElement('div')
    inputGroupContainer.classList.add('input-group')
    input.classList.add('input-group-field')
    inputGroupContainer.appendChild(input)

    for (let i = 0; i < buttons.length; i++) {
      const inputGroup = document.createElement('div')
      inputGroup.classList.add('input-group-button')
      inputGroup.style.verticalAlign = 'top'
      buttons[i].classList.remove('small')
      inputGroup.appendChild(buttons[i])
      inputGroupContainer.appendChild(inputGroup)
    }

    return inputGroupContainer
  }
}

/* Foundation 3 Specific Theme */
export class foundation3Theme extends foundationTheme {
  getHeaderButtonHolder () {
    const el = super.getHeaderButtonHolder()
    el.style.fontSize = '.6em'
    return el
  }

  getFormInputLabel (text, req) {
    const el = super.getFormInputLabel(text, req)
    el.style.fontWeight = 'bold'
    return el
  }

  getTabHolder (propertyName) {
    const pName = (typeof propertyName === 'undefined') ? '' : propertyName
    const el = document.createElement('div')
    el.classList.add('row')
    el.innerHTML = `<dl class="tabs vertical two columns" id="${pName}"></dl><div class="tabs-content ten columns" id="${pName}"></div>`
    return el
  }

  getTopTabHolder (propertyName) {
    const pName = (typeof propertyName === 'undefined') ? '' : propertyName
    const el = document.createElement('div')
    el.classList.add('row')
    el.innerHTML = `<dl class="tabs horizontal" style="padding-left: 10px; margin-left: 10px;" id="${pName}"></dl><div class="tabs-content twelve columns" style="padding: 10px; margin-left: 10px;" id="${pName}"></div>`
    return el
  }

  setGridColumnSize (el, size, offset) {
    const sizes = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve']
    el.classList.add('columns', sizes[size])
    if (offset && offset < 11) {
      el.classList.add(`offset-by-${sizes[offset]}`)
    }
  }

  getTab (text, tabId) {
    const el = document.createElement('dd')
    const a = document.createElement('a')
    a.setAttribute('href', `#${tabId}`)
    a.appendChild(text)
    el.appendChild(a)
    return el
  }

  getTopTab (text, tabId) {
    const el = document.createElement('dd')
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
    el.classList.add('content', 'active')
    el.style.paddingLeft = '5px'
    return el
  }

  getTopTabContent () {
    const el = document.createElement('div')
    el.classList.add('content', 'active')
    el.style.paddingLeft = '5px'
    return el
  }

  markTabActive (row) {
    row.tab.classList.add('active')

    if (typeof row.rowPane !== 'undefined') {
      row.rowPane.style.display = ''
    } else {
      row.container.style.display = ''
    }
  }

  markTabInactive (row) {
    row.tab.classList.remove('active')

    if (typeof row.rowPane !== 'undefined') {
      row.rowPane.style.display = 'none'
    } else {
      row.container.style.display = 'none'
    }
  }

  addTab (holder, tab) {
    holder.children[0].appendChild(tab)
  }

  addTopTab (holder, tab) {
    holder.children[0].appendChild(tab)
  }
}

/* Foundation 4 Specific Theme */
export class foundation4Theme extends foundationTheme {
  getHeaderButtonHolder () {
    const el = super.getHeaderButtonHolder()
    el.style.fontSize = '.6em'
    return el
  }

  setGridColumnSize (el, size, offset) {
    el.classList.add('columns', `large-${size}`)
    if (offset) {
      el.classList.add(`large-offset-${offset}`)
    }
  }

  getFormInputDescription (text) {
    const el = super.getFormInputDescription(text)
    el.style.fontSize = '.8rem'
    return el
  }

  getFormInputLabel (text, req) {
    const el = super.getFormInputLabel(text, req)
    el.style.fontWeight = 'bold'
    return el
  }
}

/* Foundation 5 Specific Theme */
export class foundation5Theme extends foundationTheme {
  getFormInputDescription (text) {
    const el = super.getFormInputDescription(text)
    el.style.fontSize = '.8rem'
    return el
  }

  setGridColumnSize (el, size, offset) {
    el.classList.add('columns', `medium-${size}`)
    if (offset) {
      el.classList.add(`medium-offset-${offset}`)
    }
  }

  getButton (text, icon, title) {
    const el = super.getButton(text, icon, title)
    el.className = `${el.className.replace(/\s*small/g, '')} tiny`
    return el
  }

  getTabHolder (propertyName) {
    const pName = (typeof propertyName === 'undefined') ? '' : propertyName
    const el = document.createElement('div')
    el.innerHTML = `<dl class="tabs vertical" id="${pName}"></dl><div class="tabs-content vertical" id="${pName}"></div>`
    return el
  }

  getTopTabHolder (propertyName) {
    const pName = (typeof propertyName === 'undefined') ? '' : propertyName
    const el = document.createElement('div')
    el.classList.add('row')
    el.innerHTML = `<dl class="tabs horizontal" style="padding-left: 10px;" id="${pName}"></dl><div class="tabs-content horizontal" style="padding: 10px;" id="${pName}"></div>`
    return el
  }

  getTab (text, tabId) {
    const el = document.createElement('dd')
    const a = document.createElement('a')
    a.setAttribute('href', `#${tabId}`)
    a.appendChild(text)
    el.appendChild(a)
    return el
  }

  getTopTab (text, tabId) {
    const el = document.createElement('dd')
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
    el.classList.add('tab-content', 'active')
    el.style.paddingLeft = '5px'
    return el
  }

  getTopTabContent () {
    const el = document.createElement('div')
    el.classList.add('tab-content', 'active')
    el.style.paddingLeft = '5px'
    return el
  }

  markTabActive (row) {
    row.tab.classList.add('active')

    if (typeof row.rowPane !== 'undefined') {
      row.rowPane.style.display = ''
    } else {
      row.container.style.display = ''
    }
  }

  markTabInactive (row) {
    row.tab.classList.remove('active')

    if (typeof row.rowPane !== 'undefined') {
      row.rowPane.style.display = 'none'
    } else {
      row.container.style.display = 'none'
    }
  }

  addTab (holder, tab) {
    holder.children[0].appendChild(tab)
  }

  addTopTab (holder, tab) {
    holder.children[0].appendChild(tab)
  }
}

export class foundation6Theme extends foundation5Theme {
  getIndentedPanel () {
    const el = document.createElement('div')
    el.classList.add('callout', 'secondary')
    el.style = 'padding-left: 10px; margin-left: 10px;'
    return el
  }

  getButtonHolder () {
    const el = document.createElement('span')
    el.classList.add('button-group', 'tiny')
    el.style.marginBottom = 0
    return el
  }

  getFormInputLabel (text, req) {
    const el = super.getFormInputLabel(text, req)
    el.style.display = 'block'
    return el
  }

  getFormControl (label, input, description, infoText) {
    const el = document.createElement('div')
    el.classList.add('form-control')
    if (label) el.appendChild(label)
    if (input.type === 'checkbox' || input.type === 'radio') {
      input.style.width = 'auto'
      label.insertBefore(input, label.firstChild)
    } else if (label) {
      if (infoText) label.appendChild(infoText)
      label.appendChild(input)
    } else {
      if (infoText) el.appendChild(infoText)
      el.appendChild(input)
    }

    if (description && label) label.appendChild(description)
    return el
  }

  addInputError (input, text) {
    if (!input.group) return
    input.group.classList.add('error')

    if (!input.errmsg) {
      const errorEl = document.createElement('span')
      errorEl.classList.add('form-error', 'is-visible')
      input.group.getElementsByTagName('label')[0].appendChild(errorEl)

      input.classList.add('is-invalid-input')

      input.errmsg = errorEl
    } else {
      input.errmsg.style.display = ''
      input.className = ''
    }

    input.errmsg.textContent = text
  }

  removeInputError (input) {
    if (!input.errmsg) return
    input.classList.remove('is-invalid-input')
    if (input.errmsg.parentNode) {
      input.errmsg.parentNode.removeChild(input.errmsg)
    }
  }

  getTabHolder (propertyName) {
    const pName = (typeof propertyName === 'undefined') ? '' : propertyName
    const el = document.createElement('div')
    el.classList.add('grid-x')
    el.innerHTML = `<div class="medium-2 cell" style="float: left;"><ul class="vertical tabs" data-tabs id="${pName}"></ul></div><div class="medium-10 cell" style="float: left;"><div class="tabs-content" data-tabs-content="${pName}"></div></div>`
    return el
  }

  getTopTabHolder (propertyName) {
    const pName = (typeof propertyName === 'undefined') ? '' : propertyName
    const el = document.createElement('div')
    el.classList.add('grid-y')
    el.innerHTML = `<div className="cell"><ul class="tabs" data-tabs id="${pName}"></ul><div class="tabs-content" data-tabs-content="${pName}"></div></div>`
    return el
  }

  insertBasicTopTab (tab, newTabsHolder) {
    newTabsHolder.firstChild.firstChild.insertBefore(tab, newTabsHolder.firstChild.firstChild.firstChild)
  }

  getTab (text, tabId) {
    const el = document.createElement('li')
    el.classList.add('tabs-title')
    const a = document.createElement('a')
    a.setAttribute('href', `#${tabId}`)
    a.appendChild(text)
    el.appendChild(a)
    return el
  }

  getTopTab (text, tabId) {
    const el = document.createElement('li')
    el.classList.add('tabs-title')
    const a = document.createElement('a')
    a.setAttribute('href', `#${tabId}`)
    a.appendChild(text)
    el.appendChild(a)
    return el
  }

  getTabContentHolder (tabHolder) {
    return tabHolder.children[1].firstChild
  }

  getTopTabContentHolder (tabHolder) {
    return tabHolder.firstChild.children[1]
  }

  getTabContent () {
    const el = document.createElement('div')
    el.classList.add('tabs-panel')
    el.style.paddingLeft = '5px'
    return el
  }

  getTopTabContent () {
    const el = document.createElement('div')
    el.classList.add('tabs-panel')
    el.style.paddingLeft = '5px'
    return el
  }

  markTabActive (row) {
    row.tab.classList.add('is-active')
    row.tab.firstChild.setAttribute('aria-selected', 'true')

    if (typeof row.rowPane !== 'undefined') {
      row.rowPane.classList.add('is-active')
      row.rowPane.setAttribute('aria-selected', 'true')
    } else {
      row.container.classList.add('is-active')
      row.container.setAttribute('aria-selected', 'true')
    }
  }

  markTabInactive (row) {
    row.tab.classList.remove('is-active')
    row.tab.firstChild.removeAttribute('aria-selected')

    if (typeof row.rowPane !== 'undefined') {
      row.rowPane.classList.remove('is-active')
      row.rowPane.removeAttribute('aria-selected')
    } else {
      row.container.classList.remove('is-active')
      row.container.removeAttribute('aria-selected')
    }
  }

  addTab (holder, tab) {
    holder.children[0].firstChild.appendChild(tab)
  }

  addTopTab (holder, tab) {
    holder.firstChild.children[0].appendChild(tab)
  }

  getFirstTab (holder) {
    return holder.firstChild.firstChild.firstChild
  }
}

/* Custom stylesheet rules. format: "selector" : "CSS rules" */
foundationTheme.rules = { 'div[data-schemaid="root"]:after': 'position:relative;color:red;margin:10px 0;font-weight:600;display:block;width:100%;text-align:center;content:"This is an old JSON-Editor 1.x Theme and might not display elements correctly when used with the 2.x version"' }
foundation3Theme.rules = foundationTheme.rules
foundation4Theme.rules = foundationTheme.rules
foundation5Theme.rules = foundationTheme.rules
foundation6Theme.rules = foundationTheme.rules
