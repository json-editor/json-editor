import { ArrayEditor } from './array.js'
import { extend, checkBooleanOption } from '../utilities.js'

export class TableEditor extends ArrayEditor {
  getNumColumns () {
    return Math.max(Math.min(12, this.width), 3)
  }

  preBuild () {
    const itemSchema = this.jsoneditor.expandRefs(this.schema.items || {})

    this.item_title = itemSchema.title || 'row'
    this.item_default = itemSchema.default || null
    this.item_has_child_editors = itemSchema.properties || itemSchema.items
    this.width = 12
    this.copy_in_place = checkBooleanOption(this.options.array_copy_in_place, this.jsoneditor.options.array_copy_in_place, true)
    super.preBuild()
  }

  build () {
    this.tableContainer = this.theme.getTableContainer()
    this.table = this.theme.getTable()
    this.tableContainer.appendChild(this.table)

    this.container.appendChild(this.tableContainer)
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
      this.panel = this.theme.getIndentedPanel()
      this.container.appendChild(this.panel)
      this.error_holder = document.createElement('div')
      this.panel.appendChild(this.error_holder)
    } else {
      this.panel = document.createElement('div')
      this.container.appendChild(this.panel)
    }

    this.panel.appendChild(this.tableContainer)
    this.controls = this.theme.getButtonHolder()
    if (this.array_controls_top) {
      this.title.appendChild(this.controls)
    } else {
      this.panel.appendChild(this.controls)
    }

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
    this.controls_header_cell = this.theme.getTableHeaderCell(this.translate('table_controls'))
    this.controls_header_cell.setAttribute('aria-hidden', 'true')
    this.controls_header_cell.style.visibility = 'hidden'
    this.header_row.appendChild(this.controls_header_cell)

    /* Add controls */
    this.addControls()
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

  setActiveItem (i) {
    // We don't have the concept of an active item
  }

  destroy () {
    this.innerHTML = ''
    if (this.checkParent(this.title)) this.title.parentNode.removeChild(this.title)
    if (this.checkParent(this.description)) this.description.parentNode.removeChild(this.description)
    if (this.checkParent(this.row_holder)) this.row_holder.parentNode.removeChild(this.row_holder)
    if (this.checkParent(this.table)) this.table.parentNode.removeChild(this.table)
    if (this.checkParent(this.panel)) this.panel.parentNode.removeChild(this.panel)

    this.rows = this.title = this.description = this.row_holder = this.table = this.panel = null

    super.destroy()
  }

  destroyRow (row, hard) {
    const holder = row.container
    if (!this.item_has_child_editors) {
      row.row.parentNode.removeChild(row.row)
    }
    row.destroy()
    if (holder.parentNode) holder.parentNode.removeChild(holder)
  }

  refreshButtonContainers (need) {
    const valueLength = this.rows.length
    this.setButtonState(this.controls_header_cell, need)
    this.setButtonState(this.table, valueLength)
    this.setButtonState(this.controls, need)
  }

  addRow (value) {
    const i = this.rows.length

    this.rows[i] = this.getElementEditor(i)
    this.addRowButtons(i, this.rows[i].table_controls)

    this._supportDragDrop(this.rows[i].row)

    if (typeof value !== 'undefined') this.rows[i].setValue(value)

    return this.rows[i]
  }

  toggleClicked (e) {
    this.setButtonState(this.panel, this.collapsed)
    if (this.collapsed) {
      this.collapsed = false
      this.setButtonText(e.currentTarget, '', 'collapse', 'button_collapse')
    } else {
      this.collapsed = true
      this.setButtonText(e.currentTarget, '', 'expand', 'button_expand')
    }
  }
}
