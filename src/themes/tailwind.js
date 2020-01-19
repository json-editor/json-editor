import { AbstractTheme } from '../theme'
import rules from './tailwind.json'

export var tailwindTheme = AbstractTheme.extend({
  // Config options that allows changing various aspects of the output
  options: {
    disable_theme_rules: false, // Disable creation of Inline Style Rules
    label_bold: false, // Element labels bold
    object_panel_default: true, // Indicates whether to use rules as default or alternate style
    object_indent: true, // Indent nested object elements
    object_border: false, // Add border around object elements
    table_border: false, // Add border to array "table" row and cells
    table_hdiv: false, // Add bottom-border to array "table" cells
    table_zebrastyle: false, // Add "zebra style" to array "table" rows
    input_size: 'small', // Size of input and select elements. "small", "normal", "large"
    enable_compact: false
  },
  // Custom stylesheet rules. (Does not suppert comma separated selectors)
  //  Will create a stylesheet in document head with the id "theme-spectre" if not exists.
  rules: rules,

  getGridContainer: function () {
    var el = document.createElement('div')
    el.classList.add('flex', 'flex-col', 'w-full')
    if (!this.options.object_indent) el.classList.add('je-noindent')
    return el
  },
  getGridRow: function () {
    var el = document.createElement('div')
    el.classList.add('flex', 'flex-wrap', 'w-full')
    return el
  },
  getGridColumn: function () {
    var el = document.createElement('div')
    el.classList.add('flex', 'flex-col')
    return el
  },
  setGridColumnSize: function (el, size, offset) {
    if (size > 0 && size < 12) { el.classList.add('w-' + size + '/12', 'px-1') } else el.classList.add('w-full', 'px-1')

    if (offset) el.style.marginLeft = (100 / 12) * offset + '%'
  },
  getIndentedPanel: function () {
    var el = document.createElement('div')
    if (this.options.object_panel_default) { el.classList.add('w-full', 'p-1') } else { el.classList.add('relative', 'flex', 'flex-col', 'rounded', 'break-words', 'border', 'bg-white', 'border-0', 'border-blue-400', 'p-1', 'shadow-md') }
    if (this.options.object_border) el.classList.add('je-border')
    return el
  },
  // Used for "type: array" with "format: tabs-top"
  getTopIndentedPanel: function () {
    var el = document.createElement('div')
    if (this.options.object_panel_default) { el.classList.add('w-full', 'm-2') } else { el.classList.add('relative', 'flex', 'flex-col', 'rounded', 'break-words', 'border', 'bg-white', 'border-0', 'border-blue-400', 'p-1', 'shadow-md') }
    if (this.options.object_border) el.classList.add('je-border')
    return el
  },
  getTitle: function () {
    return this.schema.title
  },
  getSelectInput: function (options, multiple) {
    var el = this._super(options)
    if (multiple) el.classList.add('form-multiselect', 'block', 'py-0', 'h-auto', 'w-full', 'px-1', 'text-sm', 'text-black', 'leading-normal', 'bg-white', 'border', 'border-grey', 'rounded')
    else el.classList.add('form-select', 'block', 'py-0', 'h-6', 'w-full', 'px-1', 'text-sm', 'text-black', 'leading-normal', 'bg-white', 'border', 'border-grey', 'rounded')
    if (this.options.enable_compact) el.classList.add('compact')
    return el
  },
  afterInputReady: function (input) {
    if (input.controlgroup) return
    input.controlgroup = this.closest(input, '.form-group')
    if (this.closest(input, '.compact')) {
      input.controlgroup.style.marginBottom = 0
    }
  },
  getTextareaInput: function () {
    var el = this._super()
    el.classList.add('block', 'w-full', 'px-1', 'text-sm', 'leading-normal', 'bg-white', 'text-black', 'border', 'border-grey', 'rounded')
    if (this.options.enable_compact) el.classList.add('compact')
    el.style.height = 0
    return el
  },
  // Create input field for type="range"
  getRangeInput: function (min, max, step) {
    var el = this.getFormInputField('range')
    el.classList.add('slider')
    if (this.options.enable_compact) el.classList.add('compact')
    el.setAttribute('oninput', 'this.setAttribute("value", this.value)')
    el.setAttribute('min', min)
    el.setAttribute('max', max)
    el.setAttribute('step', step)
    return el
  },
  getRangeControl: function (input, output) {
    var el = this._super(input, output)
    el.classList.add('text-center', 'text-black')
    return el
  },
  // Checkbox elements
  getCheckbox: function () {
    var el = this.getFormInputField('checkbox')
    el.classList.add('form-checkbox', 'text-red-600')
    return el
  },
  getCheckboxLabel: function (text, req) {
    var el = this._super(text, req)
    el.classList.add('inline-flex', 'items-center')
    return el
  },
  getFormCheckboxControl: function (label, input, compact) {
    label.insertBefore(input, label.firstChild) // Move input into label element
    if (compact) label.classList.add('inline-flex flex-row')
    return label
  },
  getMultiCheckboxHolder: function (controls, label, description, infoText) {
    var el = this._super(controls, label, description, infoText)
    el.classList.add('inline-flex', 'flex-col')
    return el
  },
  // Radio elements
  getFormRadio: function (attributes) {
    var el = this.getFormInputField('radio')
    el.classList.add('form-radio', 'text-red-600')
    for (var key in attributes) {
      el.setAttribute(key, attributes[key])
    }
    return el
  },
  getFormRadioLabel: function (text, req) {
    var el = this._super(text, req)
    el.classList.add('inline-flex', 'items-center', 'mr-2')
    return el
  },
  getFormRadioControl: function (label, input, compact) {
    label.insertBefore(input, label.firstChild) // Move input into label element
    if (compact) label.classList.add('form-radio')
    return label
  },
  getRadioHolder: function (schema, controls, label, description, infoText) {
    var el = this._super(controls, label, description, infoText)
    if (schema.options.layout === 'h') el.classList.add('inline-flex', 'flex-row')
    else el.classList.add('inline-flex', 'flex-col')
    return el
  },
  getFormInputLabel: function (text, req) {
    var el = this._super(text, req)
    if (this.options.label_bold) el.classList.add('font-bold')
    else el.classList.add('required')
    return el
  },
  getFormInputField: function (type) {
    var el = this._super(type)
    if (['checkbox', 'radio'].indexOf(type) < 0) el.classList.add('block', 'w-full', 'px-1', 'text-black', 'text-sm', 'leading-normal', 'bg-white', 'border', 'border-grey', 'rounded')
    if (this.options.enable_compact) el.classList.add('compact')
    return el
  },
  getFormInputDescription: function (text) {
    var el = document.createElement('p')
    el.classList.add('block', 'mt-1', 'text-xs')
    if (window.DOMPurify) el.innerHTML = window.DOMPurify.sanitize(text)
    else el.textContent = this.cleanText(text)
    return el
  },
  getFormControl: function (label, input, description, infoText) {
    var group = document.createElement('div')
    group.classList.add('form-group', 'mb-1', 'w-full')
    if (label) {
      label.classList.add('text-xs')

      if (input.type === 'checkbox') {
        input.classList.add('form-checkbox', 'text-xs', 'text-red-600', 'mr-1')
        label.classList.add('items-center', 'flex')
        label = this.getFormCheckboxControl(label, input, false, infoText)
      }

      if (input.type === 'radio') {
        input.classList.add('form-radio', 'text-red-600', 'mr-1')
        label.classList.add('items-center', 'flex')
        label = this.getFormRadioControl(label, input, false, infoText)
      }
      group.appendChild(label)

      if (['checkbox', 'radio'].indexOf(input.type) < 0 && infoText) group.appendChild(infoText)
    }
    if (['checkbox', 'radio'].indexOf(input.type) < 0) {
      if (this.options.input_size === 'small') input.classList.add('text-xs')
      else if (this.options.input_size === 'normal') input.classList.add('text-base')
      else if (this.options.input_size === 'large') input.classList.add('text-xl')
      group.appendChild(input)
    }

    if (description) group.appendChild(description)

    return group
  },
  getHeaderButtonHolder: function () {
    var el = this.getButtonHolder()
    el.classList.add('text-sm')
    return el
  },
  getButtonHolder: function () {
    var el = document.createElement('div')
    el.classList.add('flex', 'relative', 'inline-flex', 'align-middle')
    return el
  },
  getButton: function (text, icon, title) {
    var el = this._super(text, icon, title)
    el.classList.add('inline-block', 'align-middle', 'text-center', 'text-sm', 'bg-blue-700', 'text-white', 'py-1', 'pr-1', 'm-2', 'shadow', 'select-none', 'whitespace-no-wrap', 'rounded')
    return el
  },
  // Button for displaying infotext tooltip
  getInfoButton: function (text) {
    var tooltip = document.createElement('a')
    tooltip.classList.add('tooltips', 'float-right')
    tooltip.innerHTML = 'ⓘ'
    var span = document.createElement('span')
    span.innerHTML = text
    tooltip.appendChild(span)

    return tooltip
  },
  getTable: function () {
    var el = this._super()
    if (this.options.table_border) el.classList.add('je-table-border')
    else el.classList.add('table', 'border', 'p-0')
    return el
  },
  getTableRow: function () {
    var el = this._super()
    if (this.options.table_border) el.classList.add('je-table-border')
    if (this.options.table_zebrastyle) el.classList.add('je-table-zebra')
    return el
  },
  getTableHeaderCell: function (text) {
    var el = this._super(text)
    if (this.options.table_border) el.classList.add('je-table-border')
    else if (this.options.table_hdiv) el.classList.add('je-table-hdiv')
    else el.classList.add('text-xs', 'border', 'p-0', 'm-0')
    return el
  },
  getTableCell: function () {
    var el = this._super()
    if (this.options.table_border) el.classList.add('je-table-border')
    else if (this.options.table_hdiv) el.classList.add('je-table-hdiv')
    else el.classList.add('border-0', 'p-0', 'm-0')
    return el
  },
  addInputError: function (input, text) {
    if (!input.controlgroup) return
    input.controlgroup.classList.add('has-error')
    input.classList.add('bg-red-600')
    if (!input.errmsg) {
      input.errmsg = document.createElement('p')
      input.errmsg.classList.add('block', 'mt-1', 'text-xs', 'text-red')
      input.controlgroup.appendChild(input.errmsg)
    } else {
      input.errmsg.style.display = ''
    }
    input.errmsg.textContent = text
  },
  removeInputError: function (input) {
    if (!input.errmsg) return
    input.errmsg.style.display = 'none'
    input.classList.remove('bg-red-600')
    input.controlgroup.classList.remove('has-error')
  },
  getTabHolder: function (propertyName) {
    var el = document.createElement('div')
    var pName = typeof propertyName === 'undefined' ? '' : propertyName
    el.innerHTML = "<div class='w-2/12' id='" + pName + "'><ul class='list-reset pl-0 mb-0'></ul></div><div class='w-10/12' id='" + pName + "'></div>"
    el.classList.add('flex')
    return el
  },
  addTab: function (holder, tab) {
    holder.children[0].children[0].appendChild(tab)
  },
  getTopTabHolder: function (propertyName) {
    var pName = typeof propertyName === 'undefined' ? '' : propertyName
    var el = document.createElement('div')
    el.innerHTML = "<ul class='nav-tabs flex list-reset pl-0 mb-0 border-b border-grey-light' id='" + pName + "'></ul><div class='p-6 block' id='" + pName + "'></div>"
    return el
  },
  getTab: function (text, tabId) {
    var liel = document.createElement('li')
    liel.classList.add('nav-item', 'flex-col', 'text-center', 'text-white', 'bg-blue-500', 'shadow-md', 'border', 'p-2', 'mb-2', 'mr-2', 'hover:bg-blue-400', 'rounded')
    var ael = document.createElement('a')
    ael.classList.add('nav-link', 'text-center')
    ael.setAttribute('href', '#' + tabId)
    ael.setAttribute('data-toggle', 'tab')
    ael.appendChild(text)
    liel.appendChild(ael)
    return liel
  },
  getTopTab: function (text, tabId) {
    var el = document.createElement('li')
    el.classList.add('nav-item', 'flex', 'border-l', 'border-t', 'border-r')
    var a = document.createElement('a')
    a.classList.add('nav-link', '-mb-px', 'flex-row', 'text-center', 'bg-white', 'p-2', 'hover:bg-blue-400', 'rounded-t')
    a.setAttribute('href', '#' + tabId)
    a.setAttribute('data-toggle', 'tab')
    a.appendChild(text)
    el.appendChild(a)
    return el
  },
  getTabContent: function () {
    var el = document.createElement('div')
    el.setAttribute('role', 'tabpanel')
    return el
  },
  getTopTabContent: function () {
    var el = document.createElement('div')
    el.setAttribute('role', 'tabpanel')
    return el
  },
  markTabActive: function (row) {
    row.tab.firstChild.classList.add('block')
    if (row.tab.firstChild.classList.contains('border-b') === true) {
      row.tab.firstChild.classList.add('border-b-0')
      row.tab.firstChild.classList.remove('border-b')
    } else {
      row.tab.firstChild.classList.add('border-b-0')
    }
    if (row.container.classList.contains('hidden') === true) {
      row.container.classList.remove('hidden')
      row.container.classList.add('block')
    } else {
      row.container.classList.add('block')
    }
  },
  markTabInactive: function (row) {
    if (row.tab.firstChild.classList.contains('border-b-0') === true) {
      row.tab.firstChild.classList.add('border-b')
      row.tab.firstChild.classList.remove('border-b-0')
    } else {
      row.tab.firstChild.classList.add('border-b')
    }
    if (row.container.classList.contains('block') === true) {
      row.container.classList.remove('block')
      row.container.classList.add('hidden')
    }
  },
  getProgressBar: function () {
    var min = 0
    var max = 100
    var start = 0

    var container = document.createElement('div')
    container.classList.add('progress')

    var bar = document.createElement('div')
    bar.classList.add('bg-blue', 'leading-none', 'py-1', 'text-xs', 'text-center', 'text-white')
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
    progressBar.classList.add('progress', 'bg-blue', 'leading-none', 'py-1', 'text-xs', 'text-center', 'text-white', 'block')
    bar.removeAttribute('aria-valuenow')
    bar.classList.add('w-full')
    bar.innerHTML = ''
  },
  getInputGroup: function (input, buttons) {
    if (!input) return

    var inputGroupContainer = document.createElement('div')
    inputGroupContainer.classList.add('relative', 'items-stretch', 'w-full')
    inputGroupContainer.appendChild(input)

    var inputGroup = document.createElement('div')
    inputGroup.classList.add('-mr-1')
    inputGroupContainer.appendChild(inputGroup)

    for (var i = 0; i < buttons.length; i++) {
      inputGroup.appendChild(buttons[i])
    }

    return inputGroupContainer
  }
})
