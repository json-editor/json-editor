import { AbstractEditor } from '../editor.js'
import { extend, generateUUID, trigger, checkBooleanOption } from '../utilities.js'
import rules from './array.css.js'

/*
 * Objectifying the row cache may help the gateway to get better
 * array performance in subclasses
 */
class SimpleRowCache {
  constructor () {
    this.cache = []
  }

  replaceAll (rows) {
    if (Array.isArray(rows)) {
      rows.forEach((row, i) => {
        this.cache[i] = row
      })
    }
  }

  addItem (row) {
    this.cache[row.arrayItemIndex] = row
  }

  removeItem (id) {
    this.cache[id] = null
  }

  getItemById (id) {
    return this.cache[id]
  }

  getItemByIndexOrValue (index, _value) {
    return this.cache[index]
  }

  /* removes and returns excess items */
  trimItems (max) {
    return this.cache.splice(max)
  }
}

export class ArrayEditor extends AbstractEditor {
  createRowCache () {
    return new SimpleRowCache()
  }

  askConfirmation (all) {
    if (this.jsoneditor.options.prompt_before_delete === true) {
      if (window.confirm(this.translate(all ? 'button_delete_all_nodes_warning' : 'button_delete_node_warning')) === false) {
        return false
      }
    }
    return true
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
      this.refreshRowButtons()
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
    this.row_cache = this.createRowCache()

    this.hide_delete_buttons = checkBooleanOption(this.options.disable_array_delete, this.jsoneditor.options.disable_array_delete, false)
    this.hide_delete_all_rows_button = this.hide_delete_buttons || checkBooleanOption(this.options.disable_array_delete_all_rows, this.jsoneditor.options.disable_array_delete_all_rows, false)
    this.hide_delete_last_row_button = this.hide_delete_buttons || checkBooleanOption(this.options.disable_array_delete_last_row, this.jsoneditor.options.disable_array_delete_last_row, false)
    this.hide_move_buttons = checkBooleanOption(this.options.disable_array_reorder, this.jsoneditor.options.disable_array_reorder, false)
    this.hide_add_button = checkBooleanOption(this.options.disable_array_add, this.jsoneditor.options.disable_array_add, false)
    this.remove_button_labels = checkBooleanOption(this.options.remove_button_labels, this.jsoneditor.options.remove_button_labels, false)
    this.show_copy_button = checkBooleanOption(this.options.enable_array_copy, this.jsoneditor.options.enable_array_copy, false)
    this.array_controls_top = checkBooleanOption(this.options.array_controls_top, this.jsoneditor.options.array_controls_top, false)
    this.copy_in_place = checkBooleanOption(this.copy_in_place, checkBooleanOption(this.options.array_copy_in_place, this.jsoneditor.options.array_copy_in_place, false), false)
  }

  build () {
    if (!this.options.compact) {
      this.header = document.createElement('span')
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

  postBuild () {
    super.postBuild()

    if (this.schema.readOnly || this.schema.readonly) {
      this.disable()
    }
  }

  onChildEditorChange (editor, eventData) {
    this.refreshValue()
    this.refreshTabs(true)
    this.is_dirty = true
    super.onChildEditorChange(editor, eventData)
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

  getEditorId (i) {
    return i
  }

  getElementEditor (i) {
    const itemInfo = this.getItemInfo(i)
    const editorId = this.getEditorId(i)
    let schema = this.getItemSchema(i)
    schema = this.jsoneditor.expandRefs(schema)
    schema.title = `${itemInfo.title} ${editorId + 1}`

    const editor = this.jsoneditor.getEditorClass(schema)

    let holder
    if (this.tabs_holder) {
      if (this.schema.format === 'tabs-top') {
        holder = this.theme.getTopTabContent()
      } else {
        holder = this.theme.getTabContent()
      }
      holder.id = `${this.path}.${editorId}`
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
      path: `${this.path}.${editorId}`,
      parent: this,
      required: true
    })
    ret.arrayItemId = editorId
    ret.arrayItemIndex = i
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
    if (this.rows === null) return

    this.rows.forEach((row, i) => {
      if (hard) {
        if (this.checkParent(row.tab)) row.tab.parentNode.removeChild(row.tab)
        this.row_cache.removeItem(row.arrayItemId)
        this.destroyRow(row, true)
      }
      this.rows[i] = null
    })
    if (hard) {
      this.row_cache.trimItems(this.rows.length).forEach(cachedRow => {
        if (cachedRow) this.destroyRow(cachedRow, true)
      })
    }
    this.rows = []
    if (hard) this.row_cache = this.createRowCache()
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
    return this.schema.maxItems ?? Infinity
  }

  getMin () {
    if ((Array.isArray(this.schema.items)) && this.schema.additionalItems === false) {
      return Math.min(this.schema.items.length, this.schema.minItems ?? 0)
    }
    return this.schema.minItems ?? 0
  }

  refreshTabs (refreshHeaders) {
    this.rows.forEach(row => {
      if (!row.tab) return

      if (refreshHeaders) {
        row.tab_text.textContent = row.getHeaderText()
      }
      if (row.tab === this.active_tab) {
        this.theme.markTabActive(row)
      } else {
        this.theme.markTabInactive(row)
      }
    })
  }

  ensureArraySize (value) {
    if (!(Array.isArray(value))) value = [value]

    const min = this.getMin()
    while (value.length < min) {
      value.push(this.getItemInfo(value.length).default)
    }
    const max = this.getMax()
    if (value.length > max) {
      value = value.slice(0, max)
    }
    return value
  }

  setRowValue (val, i, initial) {
    const cached_row = this.row_cache.getItemByIndexOrValue(i, val)

    if (this.rows[i]) {
      /* TODO: don't set the row's value if it hasn't changed */
      this.rows[i].setValue(val, initial)
    } else if (cached_row) {
      this.rows[i] = cached_row
      this.rows[i].setValue(val, initial)
      this.rows[i].container.style.display = ''
      if (this.rows[i].tab) this.rows[i].tab.style.display = ''
      this.rows[i].register()
    } else {
      this.addRow(val, initial)
    }
  }

  setValue (value = [], initial) {
    value = this.applyConstFilter(value)
    /* Make sure value has between minItems and maxItems items in it */
    value = this.ensureArraySize(value)

    const serialized = JSON.stringify(value)
    if (serialized === this.serialized) {
      if (initial) {
        this.refreshValue(initial)
      }
      return
    }

    value.forEach((val, i) => this.setRowValue(val, i, initial))

    this.rows.splice(value.length).forEach(row => this.destroyRow(row))

    this.refreshValue(initial)
    this.setActiveItem(-1)
    this.onChange()

    /* TODO: sortable */
  }

  setButtonState (element, display, hide) {
    if (!element) return
    const buttonStateMode = hide ? -1 : (this.options.button_state_mode || this.jsoneditor.options.button_state_mode)

    switch (buttonStateMode) {
      case 2:
        element.disabled = !display
        break
      default:
        element.style.display = display ? '' : 'none'
    }
  }

  refreshArrayButtons (minItems) {
    let need = false

    if (this.rows.length === 0) {
      this.setButtonState(this.delete_last_row_button, false, this.hide_delete_last_row_button)
      this.setButtonState(this.remove_all_rows_button, false, this.hide_delete_all_rows_button)
    } else if (this.rows.length === 1) {
      this.setButtonState(this.remove_all_rows_button, false, this.hide_delete_all_rows_button)

      /* If there are minItems items in the array, or configured to hide the delete_last_row button, hide the delete button beneath the rows */
      const display = !(minItems || this.hide_delete_last_row_button)
      this.setButtonState(this.delete_last_row_button, display, this.hide_delete_last_row_button)
      need = need || display
    } else {
      const display1 = !(minItems || this.hide_delete_last_row_button)
      this.setButtonState(this.delete_last_row_button, display1, this.hide_delete_last_row_button)
      need = need || display1

      const display2 = !(minItems || this.hide_delete_all_rows_button)
      this.setButtonState(this.remove_all_rows_button, display2, this.hide_delete_all_rows_button)
      need = need || display2
    }

    /* If there are maxItems in the array, hide the add button beneath the rows */
    const display = !(this.getMax() <= this.rows.length || this.hide_add_button)
    this.setButtonState(this.add_row_button, display, this.hide_add_button)
    need = need || display

    return need
  }

  refreshRowButtons () {
    /* If we currently have minItems items in the array */
    const isMinItems = this.getMin() >= this.rows.length
    /* If we currently have maxItems items in the array */
    const isMaxItems = this.getMax() <= this.rows.length

    let need = false

    this.rows.forEach((editor, i) => {
      editor.arrayItemIndex = i
      /* Hide the delete button if we have minItems items */
      if (editor.delete_button) {
        this.setButtonState(editor.delete_button, !isMinItems)
        need = need || !isMinItems
      }

      /* Hide the copy button if we have maxItems items */
      if (editor.copy_button) {
        this.setButtonState(editor.copy_button, !isMaxItems)
        need = need || !isMaxItems
      }

      /* Hide the move up button for the first row */
      if (editor.moveup_button) {
        const display = (i !== 0)
        this.setButtonState(editor.moveup_button, display)
        need = need || display
      }

      /* Hide the movedown button for the last row */
      if (editor.movedown_button) {
        const display = (i !== this.rows.length - 1)
        this.setButtonState(editor.movedown_button, display)
        need = need || display
      }
    })

    need = this.refreshArrayButtons(isMinItems) || need

    this.refreshButtonContainers(need)

    return need
  }

  refreshButtonContainers (need) {
    if (need && !this.collapsed) {
      this.controls.style.display = 'inline-block'
    } else {
      this.controls.style.display = 'none'
    }
  }

  refreshValue (force) {
    this.value = this.rows.map((editor, i) => { editor.arrayItemIndex = i; return editor.getValue() })
    this.refreshRowButtons()
    this.serialized = JSON.stringify(this.value)
  }

  addRowViaCache () {
    const i = this.rows.length
    let editor
    const cachedRow = this.row_cache.getItemByIndexOrValue(i)
    if (cachedRow) {
      editor = this.rows[i] = cachedRow
      this.rows[i].setValue(this.rows[i].getDefault(), true)
      // override cached value, so optional properties are not checked.
      if (typeof this.rows[i].deactivateNonRequiredProperties === 'function') {
        this.rows[i].deactivateNonRequiredProperties(true)
      }
      this.rows[i].container.style.display = ''
      if (this.rows[i].tab) this.rows[i].tab.style.display = ''
      this.rows[i].register()
    } else {
      editor = this.addRow()
    }
    return editor
  }

  setActiveItem (i) {
    i = i ?? -1
    if (i < 0) {
      // Ensure that the current tab, if any, is actually live
      if (this.active_tab && this.active_tab.offsetParent) return
      i = 0
    }
    this.active_tab = this.rows[i]?.tab || this.rows[i - 1]?.tab
    this.refreshTabs(true)
  }

  addRowButtons (i, controlsHolder) {
    /* Buttons to delete row, move row up, and move row down */
    const row = this.rows[i]
    if (!this.hide_delete_buttons) {
      row.delete_button = this._createDeleteButton(i, controlsHolder)
    }

    /* Button to copy an array element and add it as last element */
    if (this.show_copy_button) {
      row.copy_button = this._createCopyButton(i, controlsHolder)
    }

    if (!this.hide_move_buttons) {
      row.moveup_button = this._createMoveUpButton(i, controlsHolder)
      row.movedown_button = this._createMoveDownButton(i, controlsHolder)
    }
  }

  itemLinkClicked (e) {
    this.setActiveItem(this.getValueIndex(e))
  }

  addRow (value, initial) {
    const newI = this.rows.length
    const newRow = this.getElementEditor(newI)
    this.rows.push(newRow)

    if (this.tabs_holder) {
      newRow.tab_text = document.createElement('span')
      newRow.tab_text.textContent = newRow.getHeaderText()
      if (this.schema.format === 'tabs-top') {
        newRow.tab = this.theme.getTopTab(newRow.tab_text, this.getValidId(newRow.path))
        this.theme.addTopTab(this.tabs_holder, newRow.tab)
      } else {
        newRow.tab = this.theme.getTab(newRow.tab_text, this.getValidId(newRow.path))
        this.theme.addTab(this.tabs_holder, newRow.tab)
      }
      newRow.tab.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.itemLinkClicked(e)
      })
      this._supportDragDrop(newRow.tab)
    } else {
      this._supportDragDrop(newRow.container, true)
    }

    this.addRowButtons(newI, newRow.title_controls || newRow.array_controls)

    if (typeof value !== 'undefined') newRow.setValue(value, initial)
    if (!this.active_tab) this.setActiveItem(newI)
    this.refreshTabs()

    this.row_cache.addItem(newRow)

    return newRow
  }

  getValueIndex (e) {
    return e?.currentTarget?.getAttribute('data-i') ?? -1
  }

  deleteRow (i, e) {
    const arrayItems = this.getValue()
    arrayItems.splice(i, 1)
    this.setValue(arrayItems)
  }

  deleteRowButtonClicked (e, i) {
    i = i ?? this.getValueIndex(e)
    if (i < 0) return
    const editorValue = this.rows[i].getValue()

    if (!this.askConfirmation(false)) {
      return false
    }

    const actionAborted = this.deleteRow(i, e)
    if (actionAborted) return

    this.setActiveItem(i)
    this.onChange(true)
    this.jsoneditor.trigger('deleteRow', editorValue)
  }

  _createDeleteButton (i, holder) {
    const button = this.getButton(this.getItemTitle(), 'delete', 'button_delete_row_title', [this.getItemTitle()])
    button.classList.add('delete', 'json-editor-btntype-delete')
    button.setAttribute('data-i', i)

    button.addEventListener('click', e => {
      e.preventDefault()
      e.stopPropagation()
      this.deleteRowButtonClicked(e)
    })

    if (holder) holder.appendChild(button)
    return button
  }

  refreshUUIDs (value) {
    const schema = this.schema
    /* Force generation of new UUID if the item has been cloned. */
    if (schema.items.type === 'string' && schema.items.format === 'uuid') {
      value = generateUUID()
    } else if (schema.items.type === 'object' && schema.items.properties) {
      for (const key of Object.keys(value)) {
        if (schema.items.properties && schema.items.properties[key] && schema.items.properties[key].format === 'uuid') {
          // If we have more than one uuid, then we replace the value twice - no biggy
          // It DOESN'T handle deeply embedded UUIDs - biggy
          value = Object.assign({}, value)
          value[key] = generateUUID()
        }
      }
    }
    return value
  }

  copyRow (from, to, e) {
    const arrayItems = this.getValue()
    const newValue = this.refreshUUIDs(arrayItems[from])
    if (newValue) {
      arrayItems.splice(to, 0, newValue)
      this.setValue(arrayItems)
      return false
    } else {
      return true
    }
  }

  copyRowClicked (e) {
    const i = this.getValueIndex(e)
    if (i < 0) return

    const newI = this.copy_in_place ? i + 1 : this.rows.length

    const actionAborted = this.copyRow(i, newI, e)
    if (actionAborted === true) return

    this.setActiveItem(newI)

    this.onChange(true)

    const schema = this.schema
    if (schema.options?.on_copy_item_label_path) {
      const rowPath = this.rows[newI].path
      const labelEditor = this.jsoneditor.getEditor(`${rowPath}.${schema.options.on_copy_item_label_path}`)
      if (labelEditor.schema.type === 'string') {
        labelEditor.setValue(labelEditor.value + ' Copy')
      }
    }

    this.jsoneditor.trigger('copyRow', this.rows[newI])
  }

  _createCopyButton (i, holder) {
    const button = this.getButton(this.getItemTitle(), 'copy', 'button_copy_row_title', [this.getItemTitle()])
    button.classList.add('copy', 'json-editor-btntype-copy')
    button.setAttribute('data-i', i)
    button.addEventListener('click', e => {
      e.preventDefault()
      e.stopPropagation()
      this.copyRowClicked(e)
    })

    if (holder) holder.appendChild(button)
    return button
  }

  moveRowUp (i, e) {
    if (i <= 0) return
    const arrayItems = this.getValue()
    const tmp = arrayItems[i - 1]
    arrayItems[i - 1] = arrayItems[i]
    arrayItems[i] = tmp

    this.setValue(arrayItems)
  }

  moveRowUpClicked (e, i) {
    i = i ?? this.getValueIndex(e)
    if (i < 0) return

    const actionAborted = this.moveRowUp(i, e)
    if (actionAborted === true) return

    this.setActiveItem(i - 1)

    this.onChange(true)

    this.jsoneditor.trigger('moveRow', this.rows[i - 1])
  }

  _createMoveUpButton (i, holder) {
    const button = this.getButton('', (this.schema.format === 'tabs-top' ? 'moveleft' : 'moveup'), 'button_move_up_title')
    button.classList.add('moveup', 'json-editor-btntype-move')
    button.setAttribute('data-i', i)
    button.addEventListener('click', e => {
      e.preventDefault()
      e.stopPropagation()
      this.moveRowUpClicked(e)
    })

    if (holder) holder.appendChild(button)
    return button
  }

  moveRowDown (i, e) {
    const arrayItems = this.getValue()
    if (i >= arrayItems.length - 1) return
    const tmp = arrayItems[i + 1]
    arrayItems[i + 1] = arrayItems[i]
    arrayItems[i] = tmp

    this.setValue(arrayItems)
  }

  moveRowDownClicked (e, i) {
    i = i ?? this.getValueIndex(e)
    if (i < 0) return

    const actionAborted = this.moveRowDown(i, e)
    if (actionAborted === true) return

    this.setActiveItem(i + 1)
    this.onChange(true)

    this.jsoneditor.trigger('moveRow', this.rows[i + 1])
  }

  _createMoveDownButton (i, holder) {
    const button = this.getButton('', (this.schema.format === 'tabs-top' ? 'moveright' : 'movedown'), 'button_move_down_title')
    button.classList.add('movedown', 'json-editor-btntype-move')
    button.setAttribute('data-i', i)
    button.addEventListener('click', e => {
      e.preventDefault()
      e.stopPropagation()
      this.moveRowDownClicked(e)
    })

    if (holder) holder.appendChild(button)
    return button
  }

  dropRow (from, to) {
    const arrayItems = this.getValue()
    const tmp = arrayItems[from]
    arrayItems.splice(from, 1)
    arrayItems.splice(to, 0, tmp)

    this.setValue(arrayItems)
  }

  _supportDragDrop (tab, useTrigger) {
    supportDragDrop(tab, (i, j) => {
      const actionAborted = this.dropRow(i, j)
      if (actionAborted === true) return

      this.setActiveItem(j)
      this.onChange(true)

      this.jsoneditor.trigger('moveRow', this.rows[j])
    }, { useTrigger })
  }

  addControls () {
    this.collapsed = false
    this.toggle_button = this._createToggleButton()

    /* If it should start collapsed */
    if (this.options.collapsed) {
      trigger(this.toggle_button, 'click')
    }

    /* Collapse button disabled */
    if (typeof this.schema?.options?.disable_collapse !== 'undefined') {
      if (this.schema.options.disable_collapse) this.toggle_button.style.display = 'none'
    } else if (this.jsoneditor.options?.disable_collapse) {
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

  toggleClicked (e) {
    const rowHolderDisplay = this.row_holder.style.display
    const controlsDisplay = this.controls.style.display

    if (this.panel) this.setButtonState(this.panel, this.collapsed)
    if (this.tabs_holder) this.setButtonState(this.tabs_holder, this.collapsed)
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
  }

  _createToggleButton () {
    const button = this.getButton('', 'collapse', 'button_collapse')
    button.classList.add('json-editor-btntype-toggle')
    this.title.insertBefore(button, this.title.childNodes[0])

    button.addEventListener('click', e => {
      e.preventDefault()
      e.stopPropagation()
      this.toggleClicked(e)
    })
    return button
  }

  addRowClicked (e) {
    const i = this.rows.length
    const editor = this.addRowViaCache()
    if (editor) {
      this.refreshValue()
      this.setActiveItem(i)
      this.refreshRowButtons()
      this.onChange(true)
      this.jsoneditor.trigger('addRow', editor)
    }
  }

  _createAddRowButton () {
    const button = this.getButton(this.getItemTitle(), 'add', 'button_add_row_title', [this.getItemTitle()])
    button.classList.add('json-editor-btntype-add')
    button.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      this.addRowClicked(e)
    })
    this.controls.appendChild(button)
    return button
  }

  deleteLastRowClicked (e) {
    if (!this.askConfirmation(false)) {
      return false
    }
    const i = this.rows.length - 1
    const editorValue = this.rows[i]

    const actionAborted = this.deleteRow(i, e)
    if (actionAborted) return

    this.setActiveItem(i - 1)

    this.onChange(true)
    this.jsoneditor.trigger('deleteRow', editorValue)
  }

  _createDeleteLastRowButton () {
    const button = this.getButton('button_delete_last', 'subtract', 'button_delete_last_title', [this.getItemTitle()])
    button.classList.add('json-editor-btntype-deletelast')
    button.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()

      this.deleteLastRowClicked(e)
    })
    this.controls.appendChild(button)
    return button
  }

  deleteAllRows (e) {
    this.empty(true)
    this.setValue([])
  }

  deleteAllRowsClicked (e) {
    const values = this.getValue()

    if (!this.askConfirmation(true)) {
      return false
    }

    const actionAborted = this.deleteAllRows(e)
    if (!actionAborted) {
      this.onChange(true)
      this.jsoneditor.trigger('deleteAllRows', values)
    }
  }

  _createRemoveAllRowsButton () {
    const button = this.getButton('button_delete_all', 'delete', 'button_delete_all_title')
    button.classList.add('json-editor-btntype-deleteall')
    button.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      this.deleteAllRowsClicked(e)
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

// drag/drop array item to adjust order
// handler(fromIdx, toIdx, fromDom, toDom), opt={useTrigger}
// useTrigger=true: pressing ctrl to enable drag
export function supportDragDrop (tab, handler, opt = {}) {
  if (opt.useTrigger) {
    tab.addEventListener('mousedown', e => {
      if (e.ctrlKey) {
        // window.console.log('enable drag')
        tab.draggable = true
        const fn = e => {
          tab.draggable = false
          // window.console.log('disable drag')
          document.removeEventListener('dragend', fn)
          document.removeEventListener('mouseup', fn)
        }
        document.addEventListener('dragend', fn)
        document.addEventListener('mouseup', fn)
      }
    })
  } else {
    tab.draggable = true
  }
  tab.addEventListener('dragstart', e => {
    window.curDrag = tab
  })
  tab.addEventListener('dragover', e => {
    if (window.curDrag === null || window.curDrag === tab || window.curDrag.parentElement !== tab.parentElement) {
      e.dataTransfer.dropEffect = 'none'
    } else {
      e.dataTransfer.dropEffect = 'move'
    }
    e.preventDefault()
  })
  tab.addEventListener('drop', e => {
    e.preventDefault()
    e.stopPropagation()
    if (window.curDrag === null || window.curDrag === tab || window.curDrag.parentElement !== tab.parentElement) {
      return
    }
    const getPos = item => {
      let i = 0
      let a = item.parentElement.firstElementChild
      while (a !== item && a !== null) {
        a = a.nextSibling
        ++i
      }
      return i
    }
    const i = getPos(window.curDrag)
    const j = getPos(tab)
    handler(i, j, window.curDrag, tab)
    window.curDrag = null
  })
}
