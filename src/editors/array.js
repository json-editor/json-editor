import { AbstractEditor } from '../editor.js'
import { extend, generateUUID, trigger } from '../utilities.js'
import rules from './array.css.js'

export class ArrayEditor extends AbstractEditor {
  askConfirmation () {
    if (this.jsoneditor.options.prompt_before_delete === true) {
      if (window.confirm(this.translate('button_delete_node_warning')) === false) {
        return false
      }
    }
    return true
  }

  getDefault () {
    return this.schema.default || []
  }

  register () {
    super.register()
    if (this.rows) {
      this.rows.forEach(row => row.register())
    }
  }

  unregister () {
    super.unregister()
    if (this.rows) {
      this.rows.forEach(row => row.unregister())
    }
  }

  getNumColumns () {
    const info = this.getItemInfo(0)
    /* Tabs require extra horizontal space */
    if (this.tabs_holder && this.schema.format !== 'tabs-top') {
      return Math.max(Math.min(12, info.width + 2), 4)
    }
    return info.width
  }

  enable () {
    if (!this.always_disabled) {
      this.setAvailability(this, false)

      if (this.rows) {
        this.rows.forEach(row => {
          row.enable()
          this.setAvailability(row, false)
        })
      }
      super.enable()
    }
  }

  disable (alwaysDisabled) {
    if (alwaysDisabled) this.always_disabled = true
    this.setAvailability(this, true)

    if (this.rows) {
      this.rows.forEach(row => {
        row.disable(alwaysDisabled)
        this.setAvailability(row, true)
      })
    }
    super.disable()
  }

  setAvailability (element, val) {
    if (element.add_row_button) element.add_row_button.disabled = val
    if (element.remove_all_rows_button) element.remove_all_rows_button.disabled = val
    if (element.delete_last_row_button) element.delete_last_row_button.disabled = val
    if (element.copy_button) element.copy_button.disabled = val
    if (element.delete_button) element.delete_button.disabled = val
    if (element.moveup_button) element.moveup_button.disabled = val
    if (element.movedown_button) element.movedown_button.disabled = val
  }

  preBuild () {
    super.preBuild()

    this.rows = []
    this.row_cache = []

    this.hide_delete_buttons = this.options.disable_array_delete || this.jsoneditor.options.disable_array_delete
    this.hide_delete_all_rows_buttons = this.hide_delete_buttons || this.options.disable_array_delete_all_rows || this.jsoneditor.options.disable_array_delete_all_rows
    this.hide_delete_last_row_buttons = this.hide_delete_buttons || this.options.disable_array_delete_last_row || this.jsoneditor.options.disable_array_delete_last_row
    this.hide_move_buttons = this.options.disable_array_reorder || this.jsoneditor.options.disable_array_reorder
    this.hide_add_button = this.options.disable_array_add || this.jsoneditor.options.disable_array_add
    this.show_copy_button = this.options.enable_array_copy || this.jsoneditor.options.enable_array_copy
    this.array_controls_top = this.options.array_controls_top || this.jsoneditor.options.array_controls_top
  }

  build () {
    if (!this.options.compact) {
      this.header = document.createElement('label')
      this.header.textContent = this.getTitle()
      this.title = this.theme.getHeader(this.header, this.getPathDepth())
      this.container.appendChild(this.title)
      if (this.options.infoText) {
        this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText))
        this.container.appendChild(this.infoButton)
      }
      this.title_controls = this.theme.getHeaderButtonHolder()
      this.title.appendChild(this.title_controls)
      if (this.schema.description) {
        this.description = this.theme.getDescription(this.translateProperty(this.schema.description))
        this.container.appendChild(this.description)
      }
      this.error_holder = document.createElement('div')
      this.container.appendChild(this.error_holder)

      if (this.schema.format === 'tabs-top') {
        this.controls = this.theme.getHeaderButtonHolder()
        this.title.appendChild(this.controls)
        this.tabs_holder = this.theme.getTopTabHolder(this.getValidId(this.getItemTitle()))
        this.container.appendChild(this.tabs_holder)
        this.row_holder = this.theme.getTopTabContentHolder(this.tabs_holder)

        this.active_tab = null
      } else if (this.schema.format === 'tabs') {
        this.controls = this.theme.getHeaderButtonHolder()
        this.title.appendChild(this.controls)
        this.tabs_holder = this.theme.getTabHolder(this.getValidId(this.getItemTitle()))
        this.container.appendChild(this.tabs_holder)
        this.row_holder = this.theme.getTabContentHolder(this.tabs_holder)

        this.active_tab = null
      } else {
        this.panel = this.theme.getIndentedPanel()
        this.container.appendChild(this.panel)
        this.row_holder = document.createElement('div')
        this.panel.appendChild(this.row_holder)
        this.controls = this.theme.getButtonHolder()
        if (this.array_controls_top) {
          this.title.appendChild(this.controls)
        } else {
          this.panel.appendChild(this.controls)
        }
      }
    } else {
      /* compact mode */
      this.title = this.theme.getHeader('', this.getPathDepth())
      this.container.appendChild(this.title)
      this.panel = this.theme.getIndentedPanel()
      this.container.appendChild(this.panel)
      this.title_controls = this.theme.getHeaderButtonHolder()
      this.title.appendChild(this.title_controls)
      this.controls = this.theme.getHeaderButtonHolder()
      this.title.appendChild(this.controls)
      this.row_holder = document.createElement('div')
      this.panel.appendChild(this.row_holder)
    }

    /* Add controls */
    this.addControls()
  }

  onChildEditorChange (editor) {
    this.refreshValue()
    this.refreshTabs(true)
    super.onChildEditorChange(editor)
  }

  getItemTitle () {
    if (!this.item_title) {
      if (this.schema.items && !Array.isArray(this.schema.items)) {
        const tmp = this.jsoneditor.expandRefs(this.schema.items)
        this.item_title = this.translateProperty(tmp.title) || this.translate('default_array_item_title')
      } else {
        this.item_title = this.translate('default_array_item_title')
      }
    }
    return this.cleanText(this.item_title)
  }

  getItemSchema (i) {
    if (Array.isArray(this.schema.items)) {
      if (i >= this.schema.items.length) {
        if (this.schema.additionalItems === true) {
          return {}
        } else if (this.schema.additionalItems) {
          return extend({}, this.schema.additionalItems)
        }
      } else {
        return extend({}, this.schema.items[i])
      }
    } else if (this.schema.items) {
      return extend({}, this.schema.items)
    } else {
      return {}
    }
  }

  getItemInfo (i) {
    let schema = this.getItemSchema(i)

    /* Check if it's cached */
    this.item_info = this.item_info || {}
    const stringified = JSON.stringify(schema)
    if (typeof this.item_info[stringified] !== 'undefined') return this.item_info[stringified]

    /* Get the schema for this item */
    schema = this.jsoneditor.expandRefs(schema)

    this.item_info[stringified] = {
      title: this.translateProperty(schema.title) || this.translate('default_array_item_title'),
      default: schema.default,
      width: 12,
      child_editors: schema.properties || schema.items
    }

    return this.item_info[stringified]
  }

  getElementEditor (i) {
    const itemInfo = this.getItemInfo(i)
    let schema = this.getItemSchema(i)
    schema = this.jsoneditor.expandRefs(schema)
    schema.title = `${itemInfo.title} ${i + 1}`

    const editor = this.jsoneditor.getEditorClass(schema)

    let holder
    if (this.tabs_holder) {
      if (this.schema.format === 'tabs-top') {
        holder = this.theme.getTopTabContent()
      } else {
        holder = this.theme.getTabContent()
      }
      holder.id = `${this.path}.${i}`
    } else if (itemInfo.child_editors) {
      holder = this.theme.getChildEditorHolder()
    } else {
      holder = this.theme.getIndentedPanel()
    }

    this.row_holder.appendChild(holder)

    const ret = this.jsoneditor.createEditor(editor, {
      jsoneditor: this.jsoneditor,
      schema,
      container: holder,
      path: `${this.path}.${i}`,
      parent: this,
      required: true
    })
    ret.preBuild()
    ret.build()
    ret.postBuild()

    if (!ret.title_controls) {
      ret.array_controls = this.theme.getButtonHolder()
      holder.appendChild(ret.array_controls)
    }

    return ret
  }

  checkParent (elem) {
    return elem && elem.parentNode
  }

  destroy () {
    this.empty(true)
    if (this.checkParent(this.title)) this.title.parentNode.removeChild(this.title)
    if (this.checkParent(this.description)) this.description.parentNode.removeChild(this.description)
    if (this.checkParent(this.row_holder)) this.row_holder.parentNode.removeChild(this.row_holder)
    if (this.checkParent(this.controls)) this.controls.parentNode.removeChild(this.controls)
    if (this.checkParent(this.panel)) this.panel.parentNode.removeChild(this.panel)

    this.rows = this.row_cache = this.title = this.description = this.row_holder = this.panel = this.controls = null

    super.destroy()
  }

  empty (hard) {
    if (!this.rows) return

    this.rows.forEach((row, i) => {
      if (hard) {
        if (this.checkParent(row.tab)) row.tab.parentNode.removeChild(row.tab)
        this.destroyRow(row, true)
        this.row_cache[i] = null
      }
      this.rows[i] = null
    })
    this.rows = []
    if (hard) this.row_cache = []
  }

  destroyRow (row, hard) {
    const holder = row.container
    if (hard) {
      row.destroy()
      if (holder.parentNode) holder.parentNode.removeChild(holder)
      if (this.checkParent(row.tab)) row.tab.parentNode.removeChild(row.tab)
    } else {
      if (row.tab) row.tab.style.display = 'none'
      holder.style.display = 'none'
      row.unregister()
    }
  }

  getMax () {
    if ((Array.isArray(this.schema.items)) && this.schema.additionalItems === false) {
      return Math.min(this.schema.items.length, this.schema.maxItems || Infinity)
    }
    return this.schema.maxItems || Infinity
  }

  refreshTabs (refreshHeaders) {
    this.rows.forEach(row => {
      if (!row.tab) return

      if (refreshHeaders) {
        row.tab_text.textContent = row.getHeaderText()
      } else if (row.tab === this.active_tab) {
        this.theme.markTabActive(row)
      } else {
        this.theme.markTabInactive(row)
      }
    })
  }

  ensureArraySize (value) {
    if (!(Array.isArray(value))) value = [value]

    if (this.schema.minItems) {
      while (value.length < this.schema.minItems) {
        value.push(this.getItemInfo(value.length).default)
      }
    }
    if (this.getMax() && value.length > this.getMax()) {
      value = value.slice(0, this.getMax())
    }
    return value
  }

  setValue (value = [], initial) {
    /* Make sure value has between minItems and maxItems items in it */
    value = this.ensureArraySize(value)

    const serialized = JSON.stringify(value)
    if (serialized === this.serialized) return

    value.forEach((val, i) => {
      if (this.rows[i]) {
        /* TODO: don't set the row's value if it hasn't changed */
        this.rows[i].setValue(val, initial)
      } else if (this.row_cache[i]) {
        this.rows[i] = this.row_cache[i]
        this.rows[i].setValue(val, initial)
        this.rows[i].container.style.display = ''
        if (this.rows[i].tab) this.rows[i].tab.style.display = ''
        this.rows[i].register()
        this.jsoneditor.trigger('addRow', this.rows[i])
      } else {
        const editor = this.addRow(val, initial)
        this.jsoneditor.trigger('addRow', editor)
      }
    })

    for (let j = value.length; j < this.rows.length; j++) {
      this.destroyRow(this.rows[j])
      this.rows[j] = null
    }
    this.rows = this.rows.slice(0, value.length)

    /* Set the active tab */
    const row = this.rows.find(row => row.tab === this.active_tab)
    let newActiveTab = typeof row !== 'undefined' ? row.tab : null
    if (!newActiveTab && this.rows.length) newActiveTab = this.rows[0].tab

    this.active_tab = newActiveTab

    this.refreshValue(initial)
    this.refreshTabs(true)
    this.refreshTabs()

    this.onChange()

    /* TODO: sortable */
  }

  setVisibility (element, display) {
    element.style.display = display ? '' : 'none'
  }

  setupButtons (minItems) {
    const controlsNeeded = []

    if (!this.value.length) {
      this.delete_last_row_button.style.display = 'none'
      this.remove_all_rows_button.style.display = 'none'
    } else if (this.value.length === 1) {
      this.remove_all_rows_button.style.display = 'none'

      /* If there are minItems items in the array, or configured to hide the delete_last_row button, hide the delete button beneath the rows */
      const display = !(minItems || this.hide_delete_last_row_buttons)
      this.setVisibility(this.delete_last_row_button, display)
      controlsNeeded.push(display)
    } else {
      const display1 = !(minItems || this.hide_delete_last_row_buttons)
      this.setVisibility(this.delete_last_row_button, display1)
      controlsNeeded.push(display1)

      const display2 = !(minItems || this.hide_delete_all_rows_buttons)
      this.setVisibility(this.remove_all_rows_button, display2)
      controlsNeeded.push(display2)
    }

    /* If there are maxItems in the array, hide the add button beneath the rows */
    const display = !((this.getMax() && this.getMax() <= this.rows.length) || this.hide_add_button)
    this.setVisibility(this.add_row_button, display)
    controlsNeeded.push(display)

    return controlsNeeded.some(e => e)
  }

  refreshValue (force) {
    const oldi = this.value ? this.value.length : 0
    /* Get the value for this editor */
    this.value = this.rows.map(editor => editor.getValue())

    if (oldi !== this.value.length || force) {
      /* If we currently have minItems items in the array */
      const minItems = this.schema.minItems && this.schema.minItems >= this.rows.length

      this.rows.forEach((editor, i) => {
        /* Hide the move down button for the last row */
        if (editor.movedown_button) {
          const display = (i !== this.rows.length - 1)
          this.setVisibility(editor.movedown_button, display)
        }

        /* Hide the delete button if we have minItems items */
        if (editor.delete_button) {
          this.setVisibility(editor.delete_button, !minItems)
        }

        /* Get the value for this editor */
        this.value[i] = editor.getValue()
      })

      if (!this.collapsed && this.setupButtons(minItems)) {
        this.controls.style.display = 'inline-block'
      } else {
        this.controls.style.display = 'none'
      }
    }
    this.serialized = JSON.stringify(this.value)
  }

  addRow (value, initial) {
    const i = this.rows.length

    this.rows[i] = this.getElementEditor(i)
    this.row_cache[i] = this.rows[i]

    if (this.tabs_holder) {
      this.rows[i].tab_text = document.createElement('span')
      this.rows[i].tab_text.textContent = this.rows[i].getHeaderText()
      if (this.schema.format === 'tabs-top') {
        this.rows[i].tab = this.theme.getTopTab(this.rows[i].tab_text, this.getValidId(this.rows[i].path))
        this.theme.addTopTab(this.tabs_holder, this.rows[i].tab)
      } else {
        this.rows[i].tab = this.theme.getTab(this.rows[i].tab_text, this.getValidId(this.rows[i].path))
        this.theme.addTab(this.tabs_holder, this.rows[i].tab)
      }
      this.rows[i].tab.addEventListener('click', (e) => {
        this.active_tab = this.rows[i].tab
        this.refreshTabs()
        e.preventDefault()
        e.stopPropagation()
      })
    }

    const controlsHolder = this.rows[i].title_controls || this.rows[i].array_controls

    /* Buttons to delete row, move row up, and move row down */
    if (!this.hide_delete_buttons) {
      this.rows[i].delete_button = this._createDeleteButton(i, controlsHolder)
    }

    /* Button to copy an array element and add it as last element */
    if (this.show_copy_button) {
      this.rows[i].copy_button = this._createCopyButton(i, controlsHolder)
    }

    if (i && !this.hide_move_buttons) {
      this.rows[i].moveup_button = this._createMoveUpButton(i, controlsHolder)
    }

    if (!this.hide_move_buttons) {
      this.rows[i].movedown_button = this._createMoveDownButton(i, controlsHolder)
    }

    if (typeof value !== 'undefined') this.rows[i].setValue(value, initial)
    this.refreshTabs()

    return this.rows[i]
  }

  _createDeleteButton (i, holder) {
    const button = this.getButton(this.getItemTitle(), 'delete', 'button_delete_row_title', [this.getItemTitle()])
    button.classList.add('delete', 'json-editor-btntype-delete')
    button.setAttribute('data-i', i)
    button.addEventListener('click', e => {
      e.preventDefault()
      e.stopPropagation()

      if (!this.askConfirmation()) {
        return false
      }

      const i = e.currentTarget.getAttribute('data-i') * 1
      const newval = this.getValue().filter((row, j) => j !== i)
      let newActiveTab = null

      const editor = this.rows[i]

      this.setValue(newval)

      if (this.rows[i]) {
        newActiveTab = this.rows[i].tab
      } else if (this.rows[i - 1]) {
        newActiveTab = this.rows[i - 1].tab
      }

      if (newActiveTab) {
        this.active_tab = newActiveTab
        this.refreshTabs()
      }

      this.onChange(true)
      this.jsoneditor.trigger('deleteRow', editor)
    })

    if (holder) {
      holder.appendChild(button)
    }
    return button
  }

  _createCopyButton (i, holder) {
    const button = this.getButton(this.getItemTitle(), 'copy', 'button_copy_row_title', [this.getItemTitle()])
    const schema = this.schema
    button.classList.add('copy', 'json-editor-btntype-copy')
    button.setAttribute('data-i', i)
    button.addEventListener('click', e => {
      const value = this.getValue()
      e.preventDefault()
      e.stopPropagation()
      const i = e.currentTarget.getAttribute('data-i') * 1

      value.forEach((row, j) => {
        if (j === i) {
          /* Force generation of new UUID if the item has been cloned. */
          if (schema.items.type === 'string' && schema.items.format === 'uuid') {
            row = generateUUID()
          } else if (schema.items.type === 'object' && schema.items.properties) {
            for (const key of Object.keys(row)) {
              if (schema.items.properties && schema.items.properties[key] && schema.items.properties[key].format === 'uuid') {
                row[key] = generateUUID()
              }
            }
          }
          value.push(row)
        }
      })

      this.setValue(value)
      this.refreshValue(true)
      this.onChange(true)
    })

    holder.appendChild(button)
    return button
  }

  _createMoveUpButton (i, holder) {
    const button = this.getButton('', (this.schema.format === 'tabs-top' ? 'moveleft' : 'moveup'), 'button_move_up_title')
    button.classList.add('moveup', 'json-editor-btntype-move')
    button.setAttribute('data-i', i)
    button.addEventListener('click', e => {
      e.preventDefault()
      e.stopPropagation()
      const i = e.currentTarget.getAttribute('data-i') * 1

      if (i <= 0) return
      const rows = this.getValue()
      const tmp = rows[i - 1]
      rows[i - 1] = rows[i]
      rows[i] = tmp

      this.setValue(rows)
      this.active_tab = this.rows[i - 1].tab
      this.refreshTabs()

      this.onChange(true)

      this.jsoneditor.trigger('moveRow', this.rows[i - 1])
    })

    if (holder) {
      holder.appendChild(button)
    }
    return button
  }

  _createMoveDownButton (i, holder) {
    const button = this.getButton('', (this.schema.format === 'tabs-top' ? 'moveright' : 'movedown'), 'button_move_down_title')
    button.classList.add('movedown', 'json-editor-btntype-move')
    button.setAttribute('data-i', i)
    button.addEventListener('click', e => {
      e.preventDefault()
      e.stopPropagation()
      const i = e.currentTarget.getAttribute('data-i') * 1

      const rows = this.getValue()
      if (i >= rows.length - 1) return
      const tmp = rows[i + 1]
      rows[i + 1] = rows[i]
      rows[i] = tmp

      this.setValue(rows)
      this.active_tab = this.rows[i + 1].tab
      this.refreshTabs()
      this.onChange(true)

      this.jsoneditor.trigger('moveRow', this.rows[i + 1])
    })

    if (holder) {
      holder.appendChild(button)
    }
    return button
  }

  addControls () {
    this.collapsed = false
    this.toggle_button = this._createToggleButton()

    /* If it should start collapsed */
    if (this.options.collapsed) {
      trigger(this.toggle_button, 'click')
    }

    /* Collapse button disabled */
    if (this.schema.options && typeof this.schema.options.disable_collapse !== 'undefined') {
      if (this.schema.options.disable_collapse) this.toggle_button.style.display = 'none'
    } else if (this.jsoneditor.options.disable_collapse) {
      this.toggle_button.style.display = 'none'
    }

    /* Add "new row" and "delete last" buttons below editor */
    this.add_row_button = this._createAddRowButton()
    this.delete_last_row_button = this._createDeleteLastRowButton()
    this.remove_all_rows_button = this._createRemoveAllRowsButton()

    if (this.tabs) {
      this.add_row_button.classList.add('je-array-control-btn')
      this.delete_last_row_button.classList.add('je-array-control-btn')
      this.remove_all_rows_button.classList.add('je-array-control-btn')
    }
  }

  _createToggleButton () {
    const button = this.getButton('', 'collapse', 'button_collapse')
    button.classList.add('json-editor-btntype-toggle')
    this.title.insertBefore(button, this.title.childNodes[0])

    const rowHolderDisplay = this.row_holder.style.display
    const controlsDisplay = this.controls.style.display
    button.addEventListener('click', e => {
      e.preventDefault()
      e.stopPropagation()
      if (this.panel) this.setVisibility(this.panel, this.collapsed)
      if (this.tabs_holder) this.setVisibility(this.tabs_holder, this.collapsed)
      if (this.collapsed) {
        this.collapsed = false
        this.row_holder.style.display = rowHolderDisplay
        this.controls.style.display = controlsDisplay
        this.setButtonText(e.currentTarget, '', 'collapse', 'button_collapse')
      } else {
        this.collapsed = true
        this.row_holder.style.display = 'none'
        this.controls.style.display = 'none'
        this.setButtonText(e.currentTarget, '', 'expand', 'button_expand')
      }
    })
    return button
  }

  _createAddRowButton () {
    const button = this.getButton(this.getItemTitle(), 'add', 'button_add_row_title', [this.getItemTitle()])
    button.classList.add('json-editor-btntype-add')
    button.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      const i = this.rows.length
      let editor
      if (this.row_cache[i]) {
        editor = this.rows[i] = this.row_cache[i]
        this.rows[i].setValue(this.rows[i].getDefault(), true)
        this.rows[i].container.style.display = ''
        if (this.rows[i].tab) this.rows[i].tab.style.display = ''
        this.rows[i].register()
      } else {
        editor = this.addRow()
      }
      this.active_tab = this.rows[i].tab
      this.refreshTabs()
      this.refreshValue()
      this.onChange(true)
      this.jsoneditor.trigger('addRow', editor)
    })
    this.controls.appendChild(button)
    return button
  }

  _createDeleteLastRowButton () {
    const button = this.getButton('button_delete_last', 'subtract', 'button_delete_last_title', [this.getItemTitle()])
    button.classList.add('json-editor-btntype-deletelast')
    button.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()

      if (!this.askConfirmation()) {
        return false
      }

      const rows = this.getValue()
      let newActiveTab = null

      const editor = rows.pop()

      this.setValue(rows)

      if (this.rows[this.rows.length - 1]) {
        newActiveTab = this.rows[this.rows.length - 1].tab
      }

      if (newActiveTab) {
        this.active_tab = newActiveTab
        this.refreshTabs()
      }

      this.onChange(true)
      this.jsoneditor.trigger('deleteRow', editor)
    })
    this.controls.appendChild(button)
    return button
  }

  _createRemoveAllRowsButton () {
    const button = this.getButton('button_delete_all', 'delete', 'button_delete_all_title')
    button.classList.add('json-editor-btntype-deleteall')
    button.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()

      if (!this.askConfirmation()) {
        return false
      }

      this.empty(true)
      this.setValue([])
      this.onChange(true)
      this.jsoneditor.trigger('deleteAllRows')
    })
    this.controls.appendChild(button)
    return button
  }

  showValidationErrors (errors) {
    /* Get all the errors that pertain to this editor */
    const myErrors = []
    const otherErrors = []
    errors.forEach(error => {
      if (error.path === this.path) {
        myErrors.push(error)
      } else {
        otherErrors.push(error)
      }
    })

    /* Show errors for this editor */
    if (this.error_holder) {
      if (myErrors.length) {
        this.error_holder.innerHTML = ''
        this.error_holder.style.display = ''
        myErrors.forEach(error => {
          this.error_holder.appendChild(this.theme.getErrorMessage(error.message))
        })
        /* Hide error area */
      } else {
        this.error_holder.style.display = 'none'
      }
    }

    /* Show errors for child editors */
    this.rows.forEach(row =>
      row.showValidationErrors(otherErrors)
    )
  }
}
ArrayEditor.rules = rules
