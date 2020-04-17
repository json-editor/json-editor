import { ArrayEditor } from './array.js'
import { extend, trigger } from '../utilities.js'

export class TableEditor extends ArrayEditor {
  register () {
    super.register()
    if (this.rows) {
      for (let i = 0; i < this.rows.length; i++) {
        this.rows[i].register()
      }
    }
  }

  unregister () {
    super.unregister()
    if (this.rows) {
      for (let i = 0; i < this.rows.length; i++) {
        this.rows[i].unregister()
      }
    }
  }

  getNumColumns () {
    return Math.max(Math.min(12, this.width), 3)
  }

  preBuild () {
    const itemSchema = this.jsoneditor.expandRefs(this.schema.items || {})

    this.item_title = itemSchema.title || 'row'
    this.item_default = itemSchema.default || null
    this.item_has_child_editors = itemSchema.properties || itemSchema.items
    this.width = 12
    super.preBuild()
  }

  build () {
    this.table = this.theme.getTable()
    this.container.appendChild(this.table)
    this.thead = this.theme.getTableHead()
    this.table.appendChild(this.thead)
    this.header_row = this.theme.getTableRow()
    this.thead.appendChild(this.header_row)
    this.row_holder = this.theme.getTableBody()
    this.table.appendChild(this.row_holder)

    /* Determine the default value of array element */
    const tmp = this.getElementEditor(0, true)
    this.item_default = tmp.getDefault()
    this.width = tmp.getNumColumns() + 2

    if (!this.options.compact) {
      this.header = document.createElement('label')
      this.header.textContent = this.getTitle()
      this.title = this.theme.getHeader(this.header)
      this.container.appendChild(this.title)
      this.title_controls = this.theme.getHeaderButtonHolder()
      this.title.appendChild(this.title_controls)
      if (this.schema.description) {
        this.description = this.theme.getDescription(this.schema.description)
        this.container.appendChild(this.description)
      }
      this.panel = this.theme.getIndentedPanel()
      this.container.appendChild(this.panel)
      this.error_holder = document.createElement('div')
      this.panel.appendChild(this.error_holder)
    } else {
      this.panel = document.createElement('div')
      this.container.appendChild(this.panel)
    }

    this.panel.appendChild(this.table)
    this.controls = this.theme.getButtonHolder()
    this.panel.appendChild(this.controls)

    if (this.item_has_child_editors) {
      const ce = tmp.getChildEditors()
      const order = tmp.property_order || Object.keys(ce)
      for (let i = 0; i < order.length; i++) {
        const th = this.theme.getTableHeaderCell(ce[order[i]].getTitle())
        if (ce[order[i]].options.hidden) th.style.display = 'none'
        this.header_row.appendChild(th)
      }
    } else {
      this.header_row.appendChild(this.theme.getTableHeaderCell(this.item_title))
    }

    tmp.destroy()
    this.row_holder.innerHTML = ''

    /* Row Controls column */
    this.controls_header_cell = this.theme.getTableHeaderCell(' ')
    this.header_row.appendChild(this.controls_header_cell)

    /* Add controls */
    this.addControls()
  }

  onChildEditorChange (editor) {
    this.refreshValue()
    super.onChildEditorChange()
  }

  getItemDefault () {
    return extend({}, { default: this.item_default }).default
  }

  getItemTitle () {
    return this.item_title
  }

  getElementEditor (i, ignore) {
    const schemaCopy = extend({}, this.schema.items)
    const editor = this.jsoneditor.getEditorClass(schemaCopy, this.jsoneditor)
    const row = this.row_holder.appendChild(this.theme.getTableRow())
    let holder = row
    if (!this.item_has_child_editors) {
      holder = this.theme.getTableCell()
      row.appendChild(holder)
    }

    const ret = this.jsoneditor.createEditor(editor, {
      jsoneditor: this.jsoneditor,
      schema: schemaCopy,
      container: holder,
      path: `${this.path}.${i}`,
      parent: this,
      compact: true,
      table_row: true
    })

    ret.preBuild()
    if (!ignore) {
      ret.build()
      ret.postBuild()

      ret.controls_cell = row.appendChild(this.theme.getTableCell())
      ret.row = row
      ret.table_controls = this.theme.getButtonHolder()
      ret.controls_cell.appendChild(ret.table_controls)
      ret.table_controls.style.margin = 0
      ret.table_controls.style.padding = 0
    }

    return ret
  }

  destroy () {
    this.innerHTML = ''
    if (this.title && this.title.parentNode) this.title.parentNode.removeChild(this.title)
    if (this.description && this.description.parentNode) this.description.parentNode.removeChild(this.description)
    if (this.row_holder && this.row_holder.parentNode) this.row_holder.parentNode.removeChild(this.row_holder)
    if (this.table && this.table.parentNode) this.table.parentNode.removeChild(this.table)
    if (this.panel && this.panel.parentNode) this.panel.parentNode.removeChild(this.panel)

    this.rows = this.title = this.description = this.row_holder = this.table = this.panel = null

    super.destroy()
  }

  setValue (value = [], initial) {
    /* Make sure value has between minItems and maxItems items in it */
    if (this.schema.minItems) {
      while (value.length < this.schema.minItems) {
        value.push(this.getItemDefault())
      }
    }
    if (this.schema.maxItems && value.length > this.schema.maxItems) {
      value = value.slice(0, this.schema.maxItems)
    }

    const serialized = JSON.stringify(value)
    if (serialized === this.serialized) return

    let numrowsChanged = false

    value.forEach((val, i) => {
      if (this.rows[i]) {
        /* TODO: don't set the row's value if it hasn't changed */
        this.rows[i].setValue(val)
      } else {
        this.addRow(val)
        numrowsChanged = true
      }
    })

    for (let j = value.length; j < this.rows.length; j++) {
      const holder = this.rows[j].container
      if (!this.item_has_child_editors) {
        this.rows[j].row.parentNode.removeChild(this.rows[j].row)
      }
      this.rows[j].destroy()
      if (holder.parentNode) holder.parentNode.removeChild(holder)
      this.rows[j] = null
      numrowsChanged = true
    }
    this.rows = this.rows.slice(0, value.length)

    this.refreshValue()
    if (numrowsChanged || initial) this.refreshRowButtons()

    this.onChange()

    /* TODO: sortable */
  }

  refreshRowButtons () {
    /* If we currently have minItems items in the array */
    const minItems = this.schema.minItems && this.schema.minItems >= this.rows.length
    /* If we currently have maxItems items in the array */
    const maxItems = this.schema.maxItems && this.schema.maxItems <= this.rows.length

    let needRowButtons = false
    this.rows.forEach((editor, i) => {
      if (editor.delete_button) {
        /* Hide the delete button if we have minItems items */
        if (minItems) {
          editor.delete_button.style.display = 'none'
        } else {
          needRowButtons = true
          editor.delete_button.style.display = ''
        }
      }

      if (editor.copy_button) {
        /* Hide the copy button if we have maxItems items */
        if (maxItems) {
          editor.copy_button.style.display = 'none'
        } else {
          needRowButtons = true
          editor.copy_button.style.display = ''
        }
      }

      if (editor.moveup_button) {
        /* Hide the moveup button for the first row */
        if (i === 0) {
          editor.moveup_button.style.display = 'none'
        } else {
          needRowButtons = true
          editor.moveup_button.style.display = ''
        }
      }

      if (editor.movedown_button) {
        /* Hide the movedown button for the last row */
        if (i === this.rows.length - 1) {
          editor.movedown_button.style.display = 'none'
        } else {
          needRowButtons = true
          editor.movedown_button.style.display = ''
        }
      }
    })

    /* Show/hide controls column in table */
    this.rows.forEach(editor => {
      if (needRowButtons) {
        editor.controls_cell.style.display = ''
      } else {
        editor.controls_cell.style.display = 'none'
      }
    })
    if (needRowButtons) {
      this.controls_header_cell.style.display = ''
    } else {
      this.controls_header_cell.style.display = 'none'
    }

    if (!this.value.length) {
      this.table.style.display = 'none'
    } else {
      this.table.style.display = ''
    }

    let controlsNeeded = false

    /* If there are maxItems items in the array, or configured to hide the add_row_button button, hide the button beneath the rows */
    if (maxItems || this.hide_add_button) {
      this.add_row_button.style.display = 'none'
    } else {
      this.add_row_button.style.display = ''
      controlsNeeded = true
    }

    /* If there are minItems items in the array, or configured to hide the delete_last_row button, hide the button beneath the rows */
    if (!this.value.length || minItems || this.hide_delete_last_row_buttons) {
      this.delete_last_row_button.style.display = 'none'
    } else {
      this.delete_last_row_button.style.display = ''
      controlsNeeded = true
    }

    /* If there are minItems items in the array, or configured to hide the remove_all_rows_button button, hide the button beneath the rows */
    if (this.value.length <= 1 || minItems || this.hide_delete_all_rows_buttons) {
      this.remove_all_rows_button.style.display = 'none'
    } else {
      this.remove_all_rows_button.style.display = ''
      controlsNeeded = true
    }

    if (!controlsNeeded) {
      this.controls.style.display = 'none'
    } else {
      this.controls.style.display = ''
    }
  }

  refreshValue () {
    this.value = []

    this.rows.forEach((editor, i) => {
      /* Get the value for this editor */
      this.value[i] = editor.getValue()
    })
    this.serialized = JSON.stringify(this.value)
  }

  addRow (value) {
    const i = this.rows.length

    this.rows[i] = this.getElementEditor(i)

    const controlsHolder = this.rows[i].table_controls

    /* Buttons to delete row, copy row, move row up, and move row down */
    if (!this.hide_delete_buttons) {
      this.rows[i].delete_button = this.getButton('', 'delete', this.translate('button_delete_row_title_short'))
      this.rows[i].delete_button.classList.add('delete', 'json-editor-btntype-delete')
      this.rows[i].delete_button.setAttribute('data-i', i)
      this.rows[i].delete_button.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()

        if (!this.askConfirmation()) {
          return false
        }

        const j = e.currentTarget.getAttribute('data-i') * 1
        const value = this.getValue()

        value.splice(j, 1)

        this.setValue(value)
        this.onChange(true)
        this.jsoneditor.trigger('deleteRow', this.rows[j])
      })
      controlsHolder.appendChild(this.rows[i].delete_button)
    }

    if (this.show_copy_button) {
      this.rows[i].copy_button = this.getButton('', 'copy', this.translate('button_copy_row_title_short'))
      this.rows[i].copy_button.classList.add('copy', 'json-editor-btntype-copy')
      this.rows[i].copy_button.setAttribute('data-i', i)
      this.rows[i].copy_button.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()

        const j = e.currentTarget.getAttribute('data-i') * 1
        const value = this.getValue()

        value.splice(j + 1, 0, value[j])

        this.setValue(value)
        this.onChange(true)
        this.jsoneditor.trigger('copyRow', this.rows[j + 1])
      })
      controlsHolder.appendChild(this.rows[i].copy_button)
    }

    if (!this.hide_move_buttons) {
      this.rows[i].moveup_button = this.getButton('', 'moveup', this.translate('button_move_up_title'))
      this.rows[i].moveup_button.classList.add('moveup', 'json-editor-btntype-move')
      this.rows[i].moveup_button.setAttribute('data-i', i)
      this.rows[i].moveup_button.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()

        const j = e.currentTarget.getAttribute('data-i') * 1
        const value = this.getValue()

        value.splice(j - 1, 0, value.splice(j, 1)[0])

        this.setValue(value)
        this.onChange(true)
        this.jsoneditor.trigger('moveRow', this.rows[j - 1])
      })
      controlsHolder.appendChild(this.rows[i].moveup_button)
    }

    if (!this.hide_move_buttons) {
      this.rows[i].movedown_button = this.getButton('', 'movedown', this.translate('button_move_down_title'))
      this.rows[i].movedown_button.classList.add('movedown', 'json-editor-btntype-move')
      this.rows[i].movedown_button.setAttribute('data-i', i)
      this.rows[i].movedown_button.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()

        const j = e.currentTarget.getAttribute('data-i') * 1
        const value = this.getValue()

        value.splice(j + 1, 0, value.splice(j, 1)[0])

        this.setValue(value)
        this.onChange(true)
        this.jsoneditor.trigger('moveRow', this.rows[j + 1])
      })
      controlsHolder.appendChild(this.rows[i].movedown_button)
    }

    if (value) this.rows[i].setValue(value)
  }

  addControls () {
    this.collapsed = false
    this.toggle_button = this.getButton('', 'collapse', this.translate('button_collapse'))
    this.toggle_button.classList.add('json-editor-btntype-toggle')
    this.toggle_button.style.margin = '0 10px 0 0'
    if (this.title_controls) {
      this.title.insertBefore(this.toggle_button, this.title.childNodes[0])
      this.toggle_button.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()

        if (this.collapsed) {
          this.collapsed = false
          this.panel.style.display = ''
          this.setButtonText(e.currentTarget, '', 'collapse', this.translate('button_collapse'))
        } else {
          this.collapsed = true
          this.panel.style.display = 'none'
          this.setButtonText(e.currentTarget, '', 'expand', this.translate('button_expand'))
        }
      })

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
    }

    /* Add "new row" and "delete last" buttons below editor */
    this.add_row_button = this.getButton(this.getItemTitle(), 'add', this.translate('button_add_row_title', [this.getItemTitle()]))
    this.add_row_button.classList.add('json-editor-btntype-add')
    this.add_row_button.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()

      const editor = this.addRow()
      this.refreshValue()
      this.refreshRowButtons()
      this.onChange(true)
      this.jsoneditor.trigger('addRow', editor)
    })
    this.controls.appendChild(this.add_row_button)

    this.delete_last_row_button = this.getButton(this.translate('button_delete_last', [this.getItemTitle()]), 'subtract', this.translate('button_delete_last_title', [this.getItemTitle()]))
    this.delete_last_row_button.classList.add('json-editor-btntype-deletelast')
    this.delete_last_row_button.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()

      if (!this.askConfirmation()) {
        return false
      }

      const rows = this.getValue()
      const editor = rows.pop()
      this.setValue(rows)
      this.onChange(true)
      this.jsoneditor.trigger('deleteRow', editor)
    })
    this.controls.appendChild(this.delete_last_row_button)

    this.remove_all_rows_button = this.getButton(this.translate('button_delete_all'), 'delete', this.translate('button_delete_all_title'))
    this.remove_all_rows_button.classList.add('json-editor-btntype-deleteall')
    this.remove_all_rows_button.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()

      if (!this.askConfirmation()) {
        return false
      }

      this.setValue([])
      this.onChange(true)
      this.jsoneditor.trigger('deleteAllRows')
    })
    this.controls.appendChild(this.remove_all_rows_button)
  }
}
