
import { Class } from './class'

var matchKey = (function () {
  var elem = document.documentElement

  if (elem.matches) return 'matches'
  else if (elem.webkitMatchesSelector) return 'webkitMatchesSelector'
  else if (elem.mozMatchesSelector) return 'mozMatchesSelector'
  else if (elem.msMatchesSelector) return 'msMatchesSelector'
  else if (elem.oMatchesSelector) return 'oMatchesSelector'
})()

export var AbstractTheme = Class.extend({

  init: function (jsoneditor) {
    this.jsoneditor = jsoneditor
  },

  /* Theme config options that allows changing various aspects of the output */
  options: {
    'disable_theme_rules': false
  },
  /* Custom stylesheet rules. format: "selector" : "CSS rules" */
  rules: {},
  getContainer: function () {
    return document.createElement('div')
  },
  getFloatRightLinkHolder: function () {
    var el = document.createElement('div')
    el.style = el.style || {}
    el.style.cssFloat = 'right'
    el.style.marginLeft = '10px'
    return el
  },
  getModal: function () {
    var el = document.createElement('div')
    el.style.backgroundColor = 'white'
    el.style.border = '1px solid black'
    el.style.boxShadow = '3px 3px black'
    el.style.position = 'absolute'
    el.style.zIndex = '10'
    el.style.display = 'none'
    return el
  },
  getGridContainer: function () {
    var el = document.createElement('div')
    return el
  },
  getGridRow: function () {
    var el = document.createElement('div')
    el.classList.add('row')
    return el
  },
  getGridColumn: function () {
    var el = document.createElement('div')
    return el
  },
  setGridColumnSize: function (el, size) {

  },
  getLink: function (text) {
    var el = document.createElement('a')
    el.setAttribute('href', '#')
    el.appendChild(document.createTextNode(text))
    return el
  },
  disableHeader: function (header) {
    header.style.color = '#ccc'
  },
  disableLabel: function (label) {
    label.style.color = '#ccc'
  },
  enableHeader: function (header) {
    header.style.color = ''
  },
  enableLabel: function (label) {
    label.style.color = ''
  },
  getInfoButton: function (text) {
    var icon = document.createElement('span')
    icon.innerText = 'ⓘ'
    icon.style.fontSize = '16px'
    icon.style.fontWeight = 'bold'
    icon.style.padding = '.25rem'
    icon.style.position = 'relative'
    icon.style.display = 'inline-block'

    var tooltip = document.createElement('span')
    tooltip.style.fontSize = '12px'
    icon.style.fontWeight = 'normal'
    tooltip.style['font-family'] = 'sans-serif'
    tooltip.style.visibility = 'hidden'
    tooltip.style['background-color'] = 'rgba(50, 50, 50, .75)'
    tooltip.style.margin = '0 .25rem'
    tooltip.style.color = '#FAFAFA'
    tooltip.style.padding = '.5rem 1rem'
    tooltip.style['border-radius'] = '.25rem'
    tooltip.style.width = '20rem'
    tooltip.style.position = 'absolute'
    tooltip.innerText = text
    icon.onmouseover = function () {
      tooltip.style.visibility = 'visible'
    }
    icon.onmouseleave = function () {
      tooltip.style.visibility = 'hidden'
    }

    icon.appendChild(tooltip)

    return icon
  },
  getFormInputLabel: function (text, req) {
    var el = document.createElement('label')
    el.appendChild(document.createTextNode(text))
    if (req) el.classList.add('required')
    return el
  },
  getHeader: function (text) {
    var el = document.createElement('h3')
    if (typeof text === 'string') {
      el.textContent = text
    } else {
      el.appendChild(text)
    }

    return el
  },
  getCheckbox: function () {
    var el = this.getFormInputField('checkbox')
    el.style.display = 'inline-block'
    el.style.width = 'auto'
    return el
  },
  getCheckboxLabel: function (text, req) {
    var el = document.createElement('label')
    el.appendChild(document.createTextNode('\u00A0' + text))
    if (req) el.classList.add('required')
    return el
  },
  getMultiCheckboxHolder: function (controls, label, description, infoText) {
    var el = document.createElement('div')
    el.classList.add('control-group')

    if (label) {
      label.style.display = 'block'
      el.appendChild(label)
      if (infoText) label.appendChild(infoText)
    }

    for (var i in controls) {
      if (!controls.hasOwnProperty(i)) continue
      controls[i].style.display = 'inline-block'
      controls[i].style.marginRight = '20px'
      el.appendChild(controls[i])
    }

    if (description) el.appendChild(description)

    return el
  },
  getFormCheckboxControl: function (label, input, compact) {
    var el = document.createElement('div')
    el.appendChild(label)
    input.style.width = 'auto'
    label.insertBefore(input, label.firstChild)
    if (compact) {
      this.applyStyles(el, {
        display: 'inline-block',
        marginRight: '1rem'
      })
    }

    return el
  },

  getFormRadio: function (attributes) {
    var el = this.getFormInputField('radio')
    for (var key in attributes) {
      el.setAttribute(key, attributes[key])
    }
    el.style.display = 'inline-block'
    el.style.width = 'auto'
    return el
  },
  getFormRadioLabel: function (text, req) {
    var el = document.createElement('label')
    el.appendChild(document.createTextNode('\u00A0' + text))
    if (req) el.classList.add('required')
    return el
  },
  getFormRadioControl: function (label, input, compact) {
    var el = document.createElement('div')
    el.appendChild(label)
    input.style.width = 'auto'
    label.insertBefore(input, label.firstChild)
    if (compact) {
      this.applyStyles(el, {
        display: 'inline-block',
        marginRight: '1rem'
      })
    }

    return el
  },
  getSelectInput: function (options, multiple) {
    var select = document.createElement('select')
    if (options) this.setSelectOptions(select, options)
    return select
  },
  getSwitcher: function (options) {
    var switcher = this.getSelectInput(options, false)
    switcher.style.backgroundColor = 'transparent'
    switcher.style.display = 'inline-block'
    switcher.style.fontStyle = 'italic'
    switcher.style.fontWeight = 'normal'
    switcher.style.height = 'auto'
    switcher.style.marginBottom = 0
    switcher.style.marginLeft = '5px'
    switcher.style.padding = '0 0 0 3px'
    switcher.style.width = 'auto'
    return switcher
  },
  getSwitcherOptions: function (switcher) {
    return switcher.getElementsByTagName('option')
  },
  setSwitcherOptions: function (switcher, options, titles) {
    this.setSelectOptions(switcher, options, titles)
  },
  setSelectOptions: function (select, options, titles) {
    titles = titles || []
    select.innerHTML = ''
    for (var i = 0; i < options.length; i++) {
      var option = document.createElement('option')
      option.setAttribute('value', options[i])
      option.textContent = titles[i] || options[i]
      select.appendChild(option)
    }
  },
  getTextareaInput: function () {
    var el = document.createElement('textarea')
    el.style = el.style || {}
    el.style.width = '100%'
    el.style.height = '300px'
    el.style.boxSizing = 'border-box'
    return el
  },
  getRangeInput: function (min, max, step) {
    var el = this.getFormInputField('range')
    el.setAttribute('min', min)
    el.setAttribute('max', max)
    el.setAttribute('step', step)
    return el
  },
  getRangeOutput: function (input, startvalue) {
    var output = document.createElement('output')
    output.value = startvalue || 0

    var updateOutput = function () { output.value = this.value }
    input.addEventListener('change', updateOutput, false)
    input.addEventListener('input', updateOutput, false)
    return output
  },
  getRangeControl: function (input, output) {
    var el = document.createElement('div')
    el.style.textAlign = 'center'
    if (output) el.appendChild(output)
    el.appendChild(input)
    return el
  },
  getFormInputField: function (type) {
    var el = document.createElement('input')
    el.setAttribute('type', type)
    return el
  },
  afterInputReady: function (input) {

  },
  getFormControl: function (label, input, description, infoText) {
    var el = document.createElement('div')
    el.classList.add('form-control')
    if (label) el.appendChild(label)
    if ((input.type === 'checkbox' || input.type === 'radio') && label) {
      input.style.width = 'auto'
      label.insertBefore(input, label.firstChild)
      if (infoText) label.appendChild(infoText)
    } else {
      if (infoText) label.appendChild(infoText)
      el.appendChild(input)
    }

    if (description) el.appendChild(description)
    return el
  },
  getIndentedPanel: function () {
    var el = document.createElement('div')
    el.style = el.style || {}
    el.style.paddingLeft = '10px'
    el.style.marginLeft = '10px'
    el.style.borderLeft = '1px solid #ccc'
    return el
  },
  getTopIndentedPanel: function () {
    var el = document.createElement('div')
    el.style = el.style || {}
    el.style.paddingLeft = '10px'
    el.style.marginLeft = '10px'
    return el
  },
  getChildEditorHolder: function () {
    return document.createElement('div')
  },
  getDescription: function (text) {
    var el = document.createElement('p')
    if (window.DOMPurify) el.innerHTML = window.DOMPurify.sanitize(text)
    else el.textContent = this.cleanText(text)
    return el
  },
  getCheckboxDescription: function (text) {
    return this.getDescription(text)
  },
  getFormInputDescription: function (text) {
    return this.getDescription(text)
  },
  getButtonHolder: function () {
    return document.createElement('div')
  },
  getHeaderButtonHolder: function () {
    return this.getButtonHolder()
  },
  getFormButtonHolder: function (buttonAlign) {
    return this.getButtonHolder()
  },
  getButton: function (text, icon, title) {
    var el = document.createElement('button')
    el.type = 'button'
    this.setButtonText(el, text, icon, title)
    return el
  },
  getFormButton: function (text, icon, title) {
    return this.getButton(text, icon, title)
  },
  setButtonText: function (button, text, icon, title) {
    // Clear previous contents. https://jsperf.com/innerhtml-vs-removechild/37
    while (button.firstChild) {
      button.removeChild(button.firstChild)
    }
    if (icon) {
      button.appendChild(icon)
      text = ' ' + text
    }
    if (!this.jsoneditor.options.iconlib || !this.jsoneditor.options.remove_button_labels || !icon) {
      var spanEl = document.createElement('span')
      spanEl.appendChild(document.createTextNode(text))
      button.appendChild(spanEl)
    }
    if (title) button.setAttribute('title', title)
  },

  // Table functions
  getTable: function () {
    return document.createElement('table')
  },
  getTableRow: function () {
    return document.createElement('tr')
  },
  getTableHead: function () {
    return document.createElement('thead')
  },
  getTableBody: function () {
    return document.createElement('tbody')
  },
  getTableHeaderCell: function (text) {
    var el = document.createElement('th')
    el.textContent = text
    return el
  },
  getTableCell: function () {
    var el = document.createElement('td')
    return el
  },
  getErrorMessage: function (text) {
    var el = document.createElement('p')
    el.style = el.style || {}
    el.style.color = 'red'
    el.appendChild(document.createTextNode(text))
    return el
  },
  addInputError: function (input, text) {
  },
  removeInputError: function (input) {
  },
  addTableRowError: function (row) {
  },
  removeTableRowError: function (row) {
  },
  getTabHolder: function (propertyName) {
    var pName = (typeof propertyName === 'undefined') ? '' : propertyName
    var el = document.createElement('div')
    el.innerHTML = "<div style='float: left; width: 130px;' class='tabs'></div><div class='content' style='margin-left: 120px;' id='" + pName + "'></div><div style='clear:both;'></div>"
    return el
  },
  getTopTabHolder: function (propertyName) {
    var pName = (typeof propertyName === 'undefined') ? '' : propertyName
    var el = document.createElement('div')
    el.innerHTML = "<div class='tabs' style='margin-left: 10px;'></div><div style='clear:both;'></div><div class='content' id='" + pName + "'></div>"
    return el
  },
  applyStyles: function (el, styles) {
    for (var i in styles) {
      if (!styles.hasOwnProperty(i)) continue
      el.style[i] = styles[i]
    }
  },
  closest: function (elem, selector) {
    while (elem && elem !== document) {
      if (elem[matchKey]) {
        if (elem[matchKey](selector)) {
          return elem
        } else {
          elem = elem.parentNode
        }
      } else {
        return false
      }
    }
    return false
  },
  insertBasicTopTab: function (tab, newTabsHolder) {
    newTabsHolder.firstChild.insertBefore(tab, newTabsHolder.firstChild.firstChild)
  },
  getTab: function (span, tabId) {
    var el = document.createElement('div')
    el.appendChild(span)
    el.id = tabId
    el.style = el.style || {}
    this.applyStyles(el, {
      border: '1px solid #ccc',
      borderWidth: '1px 0 1px 1px',
      textAlign: 'center',
      lineHeight: '30px',
      borderRadius: '5px',
      borderBottomRightRadius: 0,
      borderTopRightRadius: 0,
      fontWeight: 'bold',
      cursor: 'pointer'
    })
    return el
  },
  getTopTab: function (span, tabId) {
    var el = document.createElement('div')
    el.id = tabId
    el.appendChild(span)
    el.style = el.style || {}
    this.applyStyles(el, {
      float: 'left',
      border: '1px solid #ccc',
      borderWidth: '1px 1px 0px 1px',
      textAlign: 'center',
      lineHeight: '30px',
      borderRadius: '5px',
      paddingLeft: '5px',
      paddingRight: '5px',
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
      fontWeight: 'bold',
      cursor: 'pointer'
    })
    return el
  },
  getTabContentHolder: function (tabHolder) {
    return tabHolder.children[1]
  },
  getTopTabContentHolder: function (tabHolder) {
    return tabHolder.children[1]
  },
  getTabContent: function () {
    return this.getIndentedPanel()
  },
  getTopTabContent: function () {
    return this.getTopIndentedPanel()
  },
  markTabActive: function (row) {
    this.applyStyles(row.tab, {
      opacity: 1,
      background: 'white'
    })
    if (typeof row.rowPane !== 'undefined') {
      row.rowPane.style.display = ''
    } else {
      row.container.style.display = ''
    }
  },
  markTabInactive: function (row) {
    this.applyStyles(row.tab, {
      opacity: 0.5,
      background: ''
    })
    if (typeof row.rowPane !== 'undefined') {
      row.rowPane.style.display = 'none'
    } else {
      row.container.style.display = 'none'
    }
  },
  addTab: function (holder, tab) {
    holder.children[0].appendChild(tab)
  },
  addTopTab: function (holder, tab) {
    holder.children[0].appendChild(tab)
  },
  getBlockLink: function () {
    var link = document.createElement('a')
    link.style.display = 'block'
    return link
  },
  getBlockLinkHolder: function () {
    var el = document.createElement('div')
    return el
  },
  getLinksHolder: function () {
    var el = document.createElement('div')
    return el
  },
  createMediaLink: function (holder, link, media) {
    holder.appendChild(link)
    media.style.width = '100%'
    holder.appendChild(media)
  },
  createImageLink: function (holder, link, image) {
    holder.appendChild(link)
    link.appendChild(image)
  },
  getFirstTab: function (holder) {
    return holder.firstChild.firstChild
  },
  getInputGroup: function (input, buttons) {
    return undefined
  },
  cleanText: function (txt) {
    // Clean out HTML tags from txt
    var tmp = document.createElement('div')
    tmp.innerHTML = txt
    return (tmp.textContent || tmp.innerText)
  },
  getProgressBar: function () {
    var max = 100; var start = 0

    var progressBar = document.createElement('progress')
    progressBar.setAttribute('max', max)
    progressBar.setAttribute('value', start)
    return progressBar
  },
  updateProgressBar: function (progressBar, progress) {
    if (!progressBar) return
    progressBar.setAttribute('value', progress)
  },
  updateProgressBarUnknown: function (progressBar) {
    if (!progressBar) return
    progressBar.removeAttribute('value')
  }
})
