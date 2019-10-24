import { AbstractEditor } from '../editor'
import { $extend, $each, $trigger } from '../utilities'
export var ObjectEditor = AbstractEditor.extend({

  getDefault: function () {
    return $extend({}, this.schema['default'] || {})
  },
  getChildEditors: function () {
    return this.editors
  },
  register: function () {
    this._super()
    if (this.editors) {
      for (var i in this.editors) {
        if (!this.editors.hasOwnProperty(i)) continue
        this.editors[i].register()
      }
    }
  },
  unregister: function () {
    this._super()
    if (this.editors) {
      for (var i in this.editors) {
        if (!this.editors.hasOwnProperty(i)) continue
        this.editors[i].unregister()
      }
    }
  },
  getNumColumns: function () {
    return Math.max(Math.min(12, this.maxwidth), 3)
  },
  enable: function () {
    if (!this.always_disabled) {
      if (this.editjson_control) this.editjson_control.disabled = false
      if (this.addproperty_button) this.addproperty_button.disabled = false

      this._super()
      if (this.editors) {
        for (var i in this.editors) {
          if (!this.editors.hasOwnProperty(i)) continue
          if (this.editors[i].isActive()) {
            this.editors[i].enable()
          }
          this.editors[i].optInCheckbox.disabled = false
        }
      }
    }
  },
  disable: function (alwaysDisabled) {
    if (alwaysDisabled) this.always_disabled = true
    if (this.editjson_control) this.editjson_control.disabled = true
    if (this.addproperty_button) this.addproperty_button.disabled = true
    this.hideEditJSON()

    this._super()
    if (this.editors) {
      for (var i in this.editors) {
        if (!this.editors.hasOwnProperty(i)) continue
        if (this.editors[i].isActive()) {
          this.editors[i].disable(alwaysDisabled)
        }
        this.editors[i].optInCheckbox.disabled = true
      }
    }
  },
  layoutEditors: function () {
    var self = this; var i; var j

    if (!this.row_container) return

    // Sort editors by propertyOrder
    this.property_order = Object.keys(this.editors)
    this.property_order = this.property_order.sort(function (a, b) {
      var ordera = self.editors[a].schema.propertyOrder
      var orderb = self.editors[b].schema.propertyOrder
      if (typeof ordera !== 'number') ordera = 1000
      if (typeof orderb !== 'number') orderb = 1000

      return ordera - orderb
    })

    var container
    var isCategoriesFormat = (this.format === 'categories')
    var rows = []
    var key = null
    var editor = null
    var row

    if (this.format === 'grid-strict') {
      var rowIndex = 0
      row = []

      $each(this.property_order, function (j, key) {
        var editor = self.editors[key]
        if (editor.property_removed) {
          return
        }
        var width = editor.options.hidden ? 0 : (editor.options.grid_columns || editor.getNumColumns())
        var offset = editor.options.hidden ? 0 : (editor.options.grid_offset || 0)
        var gridBreak = editor.options.hidden ? false : (editor.options.grid_break || false)
        var height = editor.options.hidden ? 0 : editor.container.offsetHeight

        var column = {
          key: key,
          width: width,
          offset: offset,
          height: height
        }

        row.push(column)

        rows[rowIndex] = row

        if (gridBreak) {
          rowIndex++
          row = []
        }
      })

      // layout hasn't changed
      if (this.layout === JSON.stringify(rows)) return false
      this.layout = JSON.stringify(rows)

      // Layout the form
      container = document.createElement('div')
      for (i = 0; i < rows.length; i++) {
        row = this.theme.getGridRow()
        container.appendChild(row)
        for (j = 0; j < rows[i].length; j++) {
          key = rows[i][j].key
          editor = this.editors[key]
          if (editor.options.hidden) {
            editor.container.style.display = 'none'
          } else {
            this.theme.setGridColumnSize(editor.container, rows[i][j].width, rows[i][j].offset)
          }
          row.appendChild(editor.container)
        }
      }
    } else if (this.format === 'grid') {
      $each(this.property_order, function (j, key) {
        var editor = self.editors[key]
        if (editor.property_removed) return
        var found = false
        var width = editor.options.hidden ? 0 : (editor.options.grid_columns || editor.getNumColumns())
        var height = editor.options.hidden ? 0 : editor.container.offsetHeight
        // See if the editor will fit in any of the existing rows first
        for (var i = 0; i < rows.length; i++) {
          // If the editor will fit in the row horizontally
          if (rows[i].width + width <= 12) {
            // If the editor is close to the other elements in height
            // i.e. Don't put a really tall editor in an otherwise short row or vice versa
            if (!height || (rows[i].minh * 0.5 < height && rows[i].maxh * 2 > height)) {
              found = i
            }
          }
        }

        // If there isn't a spot in any of the existing rows, start a new row
        if (found === false) {
          rows.push({
            width: 0,
            minh: 999999,
            maxh: 0,
            editors: []
          })
          found = rows.length - 1
        }

        rows[found].editors.push({
          key: key,
          // editor: editor,
          width: width,
          height: height
        })
        rows[found].width += width
        rows[found].minh = Math.min(rows[found].minh, height)
        rows[found].maxh = Math.max(rows[found].maxh, height)
      })

      // Make almost full rows width 12
      // Do this by increasing all editors' sizes proprotionately
      // Any left over space goes to the biggest editor
      // Don't touch rows with a width of 6 or less
      for (i = 0; i < rows.length; i++) {
        if (rows[i].width < 12) {
          var biggest = false
          var newWidth = 0
          for (j = 0; j < rows[i].editors.length; j++) {
            if (biggest === false) biggest = j
            else if (rows[i].editors[j].width > rows[i].editors[biggest].width) biggest = j
            rows[i].editors[j].width *= 12 / rows[i].width
            rows[i].editors[j].width = Math.floor(rows[i].editors[j].width)
            newWidth += rows[i].editors[j].width
          }
          if (newWidth < 12) rows[i].editors[biggest].width += 12 - newWidth
          rows[i].width = 12
        }
      }

      // layout hasn't changed
      if (this.layout === JSON.stringify(rows)) return false
      this.layout = JSON.stringify(rows)

      // Layout the form
      container = document.createElement('div')
      for (i = 0; i < rows.length; i++) {
        row = this.theme.getGridRow()
        container.appendChild(row)
        for (j = 0; j < rows[i].editors.length; j++) {
          key = rows[i].editors[j].key
          editor = this.editors[key]

          if (editor.options.hidden) editor.container.style.display = 'none'
          else this.theme.setGridColumnSize(editor.container, rows[i].editors[j].width)
          row.appendChild(editor.container)
        }
      }
    // Normal layout
    } else {
      container = document.createElement('div')

      if (isCategoriesFormat) {
        // A container for properties not object nor arrays
        var containerSimple = document.createElement('div')
        // This will be the place to (re)build tabs and panes
        // tabs_holder has 2 childs, [0]: ul.nav.nav-tabs and [1]: div.tab-content
        var newTabsHolder = this.theme.getTopTabHolder(this.schema.title)
        // child [1] of previous, stores panes
        var newTabPanesContainer = this.theme.getTopTabContentHolder(newTabsHolder)

        $each(this.property_order, function (i, key) {
          var editor = self.editors[key]
          if (editor.property_removed) return
          var aPane = self.theme.getTabContent()
          var isObjOrArray = editor.schema && (editor.schema.type === 'object' || editor.schema.type === 'array')
          // mark the pane
          aPane.isObjOrArray = isObjOrArray
          var gridRow = self.theme.getGridRow()

          // this happens with added properties, they don't have a tab
          if (!editor.tab) {
            // Pass the pane which holds the editor
            if (typeof self.basicPane === 'undefined') {
              // There is no basicPane yet, so aPane will be it
              self.addRow(editor, newTabsHolder, aPane)
            } else {
              self.addRow(editor, newTabsHolder, self.basicPane)
            }
          }

          aPane.id = self.getValidId(editor.tab_text.textContent)

          // For simple properties, add them on the same panel (Basic)
          if (!isObjOrArray) {
            containerSimple.appendChild(gridRow)
            // There are already some panes
            if (newTabPanesContainer.childElementCount > 0) {
              // If first pane is object or array, insert before a simple pane
              if (newTabPanesContainer.firstChild.isObjOrArray) {
                // Append pane for simple properties
                aPane.appendChild(containerSimple)
                newTabPanesContainer.insertBefore(aPane, newTabPanesContainer.firstChild)
                // Add "Basic" tab
                self.theme.insertBasicTopTab(editor.tab, newTabsHolder)
                // newTabs_holder.firstChild.insertBefore(editor.tab,newTabs_holder.firstChild.firstChild);
                // Update the basicPane
                editor.basicPane = aPane
              } else {
                // We already have a first "Basic" pane, just add the new property to it, so
                // do nothing;
              }
            // There is no pane, so add the first (simple) pane
            } else {
              // Append pane for simple properties
              aPane.appendChild(containerSimple)
              newTabPanesContainer.appendChild(aPane)
              // Add "Basic" tab
              // newTabs_holder.firstChild.appendChild(editor.tab);
              self.theme.addTopTab(newTabsHolder, editor.tab)
              // Update the basicPane
              editor.basicPane = aPane
            }
          // Objects and arrays earn their own panes
          } else {
            aPane.appendChild(gridRow)
            newTabPanesContainer.appendChild(aPane)
            // newTabs_holder.firstChild.appendChild(editor.tab);
            self.theme.addTopTab(newTabsHolder, editor.tab)
          }

          if (editor.options.hidden) editor.container.style.display = 'none'
          else self.theme.setGridColumnSize(editor.container, 12)
          // Now, add the property editor to the row
          gridRow.appendChild(editor.container)
          // Update the rowPane (same as self.rows[x].rowPane)
          editor.rowPane = aPane
        })

        // Erase old panes
        while (this.tabPanesContainer.firstChild) {
          this.tabPanesContainer.removeChild(this.tabPanesContainer.firstChild)
        }

        // Erase old tabs and set the new ones
        var parentTabsHolder = this.tabs_holder.parentNode
        parentTabsHolder.removeChild(parentTabsHolder.firstChild)
        parentTabsHolder.appendChild(newTabsHolder)

        this.tabPanesContainer = newTabPanesContainer
        this.tabs_holder = newTabsHolder

        // Activate the first tab
        var firstTab = this.theme.getFirstTab(this.tabs_holder)
        if (firstTab) {
          $trigger(firstTab, 'click')
        }
        return
      // Normal layout
      } else {
        $each(this.property_order, function (i, key) {
          var editor = self.editors[key]
          if (editor.property_removed) return
          row = self.theme.getGridRow()
          container.appendChild(row)

          if (editor.options.hidden) editor.container.style.display = 'none'
          else self.theme.setGridColumnSize(editor.container, 12)
          row.appendChild(editor.container)
        })
      }
    }
    // for grid and normal layout
    while (this.row_container.firstChild) {
      this.row_container.removeChild(this.row_container.firstChild)
    }
    this.row_container.appendChild(container)
  },
  getPropertySchema: function (key) {
    // Schema declared directly in properties
    var schema = this.schema.properties[key] || {}
    schema = $extend({}, schema)
    var matched = !!this.schema.properties[key]

    // Any matching patternProperties should be merged in
    if (this.schema.patternProperties) {
      for (var i in this.schema.patternProperties) {
        if (!this.schema.patternProperties.hasOwnProperty(i)) continue
        var regex = new RegExp(i)
        if (regex.test(key)) {
          schema.allOf = schema.allOf || []
          schema.allOf.push(this.schema.patternProperties[i])
          matched = true
        }
      }
    }

    // Hasn't matched other rules, use additionalProperties schema
    if (!matched && this.schema.additionalProperties && typeof this.schema.additionalProperties === 'object') {
      schema = $extend({}, this.schema.additionalProperties)
    }

    return schema
  },
  preBuild: function () {
    this._super()

    this.editors = {}
    this.cached_editors = {}
    var self = this

    this.format = this.options.layout || this.options.object_layout || this.schema.format || this.jsoneditor.options.object_layout || 'normal'

    this.schema.properties = this.schema.properties || {}

    this.minwidth = 0
    this.maxwidth = 0

    // If the object should be rendered as a table row
    if (this.options.table_row) {
      $each(this.schema.properties, function (key, schema) {
        var editor = self.jsoneditor.getEditorClass(schema)
        self.editors[key] = self.jsoneditor.createEditor(editor, {
          jsoneditor: self.jsoneditor,
          schema: schema,
          path: self.path + '.' + key,
          parent: self,
          compact: true,
          required: true
        })
        self.editors[key].preBuild()

        var width = self.editors[key].options.hidden ? 0 : (self.editors[key].options.grid_columns || self.editors[key].getNumColumns())

        self.minwidth += width
        self.maxwidth += width
      })
      this.no_link_holder = true
    // If the object should be rendered as a table
    } else if (this.options.table) {
      // TODO: table display format
      throw new Error('Not supported yet')
    // If the object should be rendered as a div
    } else {
      if (!this.schema.defaultProperties) {
        if (this.jsoneditor.options.display_required_only || this.options.display_required_only) {
          this.schema.defaultProperties = []
          $each(this.schema.properties, function (k, s) {
            if (self.isRequired({key: k, schema: s})) {
              self.schema.defaultProperties.push(k)
            }
          })
        } else {
          self.schema.defaultProperties = Object.keys(self.schema.properties)
        }
      }

      // Increase the grid width to account for padding
      self.maxwidth += 1

      $each(this.schema.defaultProperties, function (i, key) {
        self.addObjectProperty(key, true)

        if (self.editors[key]) {
          self.minwidth = Math.max(self.minwidth, (self.editors[key].options.grid_columns || self.editors[key].getNumColumns()))
          self.maxwidth += (self.editors[key].options.grid_columns || self.editors[key].getNumColumns())
        }
      })
    }

    // Sort editors by propertyOrder
    this.property_order = Object.keys(this.editors)
    this.property_order = this.property_order.sort(function (a, b) {
      var ordera = self.editors[a].schema.propertyOrder
      var orderb = self.editors[b].schema.propertyOrder
      if (typeof ordera !== 'number') ordera = 1000
      if (typeof orderb !== 'number') orderb = 1000

      return ordera - orderb
    })
  },
  // "Borrow" from arrays code
  addTab: function (idx) {
    var self = this
    var isObjOrArray = self.rows[idx].schema && (self.rows[idx].schema.type === 'object' || self.rows[idx].schema.type === 'array')
    if (self.tabs_holder) {
      self.rows[idx].tab_text = document.createElement('span')

      if (!isObjOrArray) {
        self.rows[idx].tab_text.textContent = (typeof self.schema.basicCategoryTitle === 'undefined') ? 'Basic' : self.schema.basicCategoryTitle
      } else {
        self.rows[idx].tab_text.textContent = self.rows[idx].getHeaderText()
      }
      self.rows[idx].tab = self.theme.getTopTab(self.rows[idx].tab_text, this.getValidId(self.rows[idx].tab_text.textContent))
      self.rows[idx].tab.addEventListener('click', function (e) {
        self.active_tab = self.rows[idx].tab
        self.refreshTabs()
        e.preventDefault()
        e.stopPropagation()
      })
    }
  },
  addRow: function (editor, tabHolder, aPane) {
    var self = this
    var rowsLen = this.rows.length
    var isObjOrArray = editor.schema.type === 'object' || editor.schema.type === 'array'

    // Add a row
    self.rows[rowsLen] = editor
    // rowPane stores the editor corresponding pane to set the display style when refreshing Tabs
    self.rows[rowsLen].rowPane = aPane

    if (!isObjOrArray) {
      // This is the first simple property to be added,
      // add a ("Basic") tab for it and save it's row number
      if (typeof self.basicTab === 'undefined') {
        self.addTab(rowsLen)
        // Store the index row of the first simple property added
        self.basicTab = rowsLen
        self.basicPane = aPane
        self.theme.addTopTab(tabHolder, self.rows[rowsLen].tab)
      } else {
        // Any other simple property gets the same tab (and the same pane) as the first one,
        // so, when 'click' event is fired from a row, it gets the correct ("Basic") tab
        self.rows[rowsLen].tab = self.rows[self.basicTab].tab
        self.rows[rowsLen].tab_text = self.rows[self.basicTab].tab_text
        self.rows[rowsLen].rowPane = self.rows[self.basicTab].rowPane
      }
    } else {
      self.addTab(rowsLen)
      self.theme.addTopTab(tabHolder, self.rows[rowsLen].tab)
    }
  },
  // Mark the active tab and make visible the corresponding pane, hide others
  refreshTabs: function (refreshHeaders) {
    var self = this
    var basicTabPresent = typeof self.basicTab !== 'undefined'
    var basicTabRefreshed = false

    $each(this.rows, function (i, row) {
      // If it's an orphan row (some property which has been deleted), return
      if (!row.tab || !row.rowPane || !row.rowPane.parentNode) return

      if (basicTabPresent && row.tab === self.rows[self.basicTab].tab && basicTabRefreshed) return

      if (refreshHeaders) {
        row.tab_text.textContent = row.getHeaderText()
      } else {
        // All rows of simple properties point to the same tab, so refresh just once
        if (basicTabPresent && row.tab === self.rows[self.basicTab].tab) basicTabRefreshed = true

        if (row.tab === self.active_tab) {
          self.theme.markTabActive(row)
        } else {
          self.theme.markTabInactive(row)
        }
      }
    })
  },
  build: function () {
    var self = this

    var isCategoriesFormat = (this.format === 'categories')
    this.rows = []
    this.active_tab = null

    // If the object should be rendered as a table row
    if (this.options.table_row) {
      this.editor_holder = this.container
      $each(this.editors, function (key, editor) {
        var holder = self.theme.getTableCell()
        self.editor_holder.appendChild(holder)

        editor.setContainer(holder)
        editor.build()
        editor.postBuild()
        editor.setOptInCheckbox(editor.header)

        if (self.editors[key].options.hidden) {
          holder.style.display = 'none'
        }
        if (self.editors[key].options.input_width) {
          holder.style.width = self.editors[key].options.input_width
        }
      })
    // If the object should be rendered as a table
    } else if (this.options.table) {
      // TODO: table display format
      throw new Error('Not supported yet')
    // If the object should be rendered as a div
    } else {
      this.header = ''
      if (!this.options.compact) {
        this.header = document.createElement('label')
        this.header.textContent = this.getTitle()
      }
      this.title = this.theme.getHeader(this.header)
      this.controls = this.theme.getButtonHolder()
      this.controls.style.margin = '0 0 0 10px'

      this.container.appendChild(this.title)
      this.title.appendChild(this.controls)
      this.container.style.position = 'relative'

      // Edit JSON modal
      this.editjson_holder = this.theme.getModal()
      this.editjson_textarea = this.theme.getTextareaInput()
      this.editjson_textarea.style.height = '170px'
      this.editjson_textarea.style.width = '300px'
      this.editjson_textarea.style.display = 'block'
      this.editjson_save = this.getButton('Save', 'save', 'Save')
      this.editjson_save.classList.add('json-editor-btntype-save')
      this.editjson_save.addEventListener('click', function (e) {
        e.preventDefault()
        e.stopPropagation()
        self.saveJSON()
      })
      this.editjson_copy = this.getButton('Copy', 'copy', 'Copy')
      this.editjson_copy.classList.add('json-editor-btntype-copy')
      this.editjson_copy.addEventListener('click', function (e) {
        e.preventDefault()
        e.stopPropagation()
        self.copyJSON()
      })
      this.editjson_cancel = this.getButton('Cancel', 'cancel', 'Cancel')
      this.editjson_cancel.classList.add('json-editor-btntype-cancel')
      this.editjson_cancel.addEventListener('click', function (e) {
        e.preventDefault()
        e.stopPropagation()
        self.hideEditJSON()
      })
      this.editjson_holder.appendChild(this.editjson_textarea)
      this.editjson_holder.appendChild(this.editjson_save)
      this.editjson_holder.appendChild(this.editjson_copy)
      this.editjson_holder.appendChild(this.editjson_cancel)

      // Manage Properties modal
      this.addproperty_holder = this.theme.getModal()
      this.addproperty_list = document.createElement('div')
      this.addproperty_list.style.width = '295px'
      this.addproperty_list.style.maxHeight = '160px'
      this.addproperty_list.style.padding = '5px 0'
      this.addproperty_list.style.overflowY = 'auto'
      this.addproperty_list.style.overflowX = 'hidden'
      this.addproperty_list.style.paddingLeft = '5px'
      this.addproperty_list.setAttribute('class', 'property-selector')
      this.addproperty_add = this.getButton('add', 'add', 'add')
      this.addproperty_add.classList.add('json-editor-btntype-add')
      this.addproperty_input = this.theme.getFormInputField('text')
      this.addproperty_input.setAttribute('placeholder', 'Property name...')
      this.addproperty_input.style.width = '220px'
      this.addproperty_input.style.marginBottom = '0'
      this.addproperty_input.style.display = 'inline-block'
      this.addproperty_add.addEventListener('click', function (e) {
        e.preventDefault()
        e.stopPropagation()
        if (self.addproperty_input.value) {
          if (self.editors[self.addproperty_input.value]) {
            window.alert('there is already a property with that name')
            return
          }

          self.addObjectProperty(self.addproperty_input.value)
          if (self.editors[self.addproperty_input.value]) {
            self.editors[self.addproperty_input.value].disable()
          }
          self.onChange(true)
        }
      })
      this.addproperty_holder.appendChild(this.addproperty_list)
      this.addproperty_holder.appendChild(this.addproperty_input)
      this.addproperty_holder.appendChild(this.addproperty_add)
      var spacer = document.createElement('div')
      spacer.style.clear = 'both'
      this.addproperty_holder.appendChild(spacer)

      // Close properties modal if clicked outside modal
      document.addEventListener('click', this.onOutsideModalClick)

      // Description
      if (this.schema.description) {
        this.description = this.theme.getDescription(this.schema.description)
        this.container.appendChild(this.description)
      }

      // Validation error placeholder area
      this.error_holder = document.createElement('div')
      this.container.appendChild(this.error_holder)

      // Container for child editor area
      this.editor_holder = this.theme.getIndentedPanel()
      this.container.appendChild(this.editor_holder)

      // Container for rows of child editors
      this.row_container = this.theme.getGridContainer()

      if (isCategoriesFormat) {
        this.tabs_holder = this.theme.getTopTabHolder(this.getValidId(this.schema.title))
        this.tabPanesContainer = this.theme.getTopTabContentHolder(this.tabs_holder)
        this.editor_holder.appendChild(this.tabs_holder)
      } else {
        this.tabs_holder = this.theme.getTabHolder(this.getValidId(this.schema.title))
        this.tabPanesContainer = this.theme.getTabContentHolder(this.tabs_holder)
        this.editor_holder.appendChild(this.row_container)
      }

      $each(this.editors, function (key, editor) {
        var aPane = self.theme.getTabContent()
        var holder = self.theme.getGridColumn()
        var isObjOrArray = !!((editor.schema && (editor.schema.type === 'object' || editor.schema.type === 'array')))
        aPane.isObjOrArray = isObjOrArray

        if (isCategoriesFormat) {
          if (isObjOrArray) {
            var singleRowContainer = self.theme.getGridContainer()
            singleRowContainer.appendChild(holder)
            aPane.appendChild(singleRowContainer)
            self.tabPanesContainer.appendChild(aPane)
            self.row_container = singleRowContainer
          } else {
            if (typeof self.row_container_basic === 'undefined') {
              self.row_container_basic = self.theme.getGridContainer()
              aPane.appendChild(self.row_container_basic)
              if (self.tabPanesContainer.childElementCount === 0) {
                self.tabPanesContainer.appendChild(aPane)
              } else {
                self.tabPanesContainer.insertBefore(aPane, self.tabPanesContainer.childNodes[1])
              }
            }
            self.row_container_basic.appendChild(holder)
          }

          self.addRow(editor, self.tabs_holder, aPane)

          aPane.id = self.getValidId(editor.schema.title) // editor.schema.path//tab_text.textContent
        } else {
          self.row_container.appendChild(holder)
        }

        editor.setContainer(holder)
        editor.build()
        editor.postBuild()
        editor.setOptInCheckbox(editor.header)
      })

      if (this.rows[0]) {
        $trigger(this.rows[0].tab, 'click')
      }

      // Show/Hide button
      this.collapsed = false
      this.collapse_control = this.getButton('', 'collapse', this.translate('button_collapse'))
      this.collapse_control.style.margin = '0 10px 0 0'
      this.collapse_control.classList.add('json-editor-btntype-toggle')
      this.title.insertBefore(this.collapse_control, this.title.childNodes[0])

      this.collapse_control.addEventListener('click', function (e) {
        e.preventDefault()
        e.stopPropagation()
        if (self.collapsed) {
          self.editor_holder.style.display = ''
          self.collapsed = false
          self.setButtonText(self.collapse_control, '', 'collapse', self.translate('button_collapse'))
        } else {
          self.editor_holder.style.display = 'none'
          self.collapsed = true
          self.setButtonText(self.collapse_control, '', 'expand', self.translate('button_expand'))
        }
      })

      // If it should start collapsed
      if (this.options.collapsed) {
        $trigger(this.collapse_control, 'click')
      }

      // Collapse button disabled
      if (this.schema.options && typeof this.schema.options.disable_collapse !== 'undefined') {
        if (this.schema.options.disable_collapse) this.collapse_control.style.display = 'none'
      } else if (this.jsoneditor.options.disable_collapse) {
        this.collapse_control.style.display = 'none'
      }

      // Edit JSON Button
      this.editjson_control = this.getButton('JSON', 'edit', 'Edit JSON')
      this.editjson_control.classList.add('json-editor-btntype-editjson')
      this.editjson_control.addEventListener('click', function (e) {
        e.preventDefault()
        e.stopPropagation()
        self.toggleEditJSON()
      })
      this.controls.appendChild(this.editjson_control)
      this.controls.insertBefore(this.editjson_holder, this.controls.childNodes[1])

      // Edit JSON Buttton disabled
      if (this.schema.options && typeof this.schema.options.disable_edit_json !== 'undefined') {
        if (this.schema.options.disable_edit_json) this.editjson_control.style.display = 'none'
      } else if (this.jsoneditor.options.disable_edit_json) {
        this.editjson_control.style.display = 'none'
      }

      // Object Properties Button
      this.addproperty_button = this.getButton('Properties', 'edit_properties', self.translate('button_object_properties'))
      this.addproperty_button.classList.add('json-editor-btntype-properties')
      this.addproperty_button.addEventListener('click', function (e) {
        e.preventDefault()
        e.stopPropagation()
        self.toggleAddProperty()
      })
      this.controls.appendChild(this.addproperty_button)
      this.controls.insertBefore(this.addproperty_holder, this.controls.childNodes[1])

      this.refreshAddProperties()

      // non required properties start deactivated
      this.deactivateNonRequiredProperties()
    }

    // Fix table cell ordering
    if (this.options.table_row) {
      this.editor_holder = this.container
      $each(this.property_order, function (i, key) {
        self.editor_holder.appendChild(self.editors[key].container)
      })
    // Layout object editors in grid if needed
    } else {
      // Initial layout
      this.layoutEditors()
      // Do it again now that we know the approximate heights of elements
      this.layoutEditors()
    }
  },
  deactivateNonRequiredProperties: function () {
    var self = this
    // the show_opt_in editor option is for backward compatibility
    if (this.jsoneditor.options.show_opt_in || this.options.show_opt_in) {
      $each(this.editors, function (key, editor) {
        if (!self.isRequired(editor)) {
          self.editors[key].deactivate()
        }
      })
    }
  },
  showEditJSON: function () {
    if (!this.editjson_holder) return
    this.hideAddProperty()

    // Position the form directly beneath the button
    // TODO: edge detection
    this.editjson_holder.style.left = this.editjson_control.offsetLeft + 'px'
    this.editjson_holder.style.top = this.editjson_control.offsetTop + this.editjson_control.offsetHeight + 'px'

    // Start the textarea with the current value
    this.editjson_textarea.value = JSON.stringify(this.getValue(), null, 2)

    // Disable the rest of the form while editing JSON
    this.disable()

    this.editjson_holder.style.display = ''
    this.editjson_control.disabled = false
    this.editing_json = true
  },
  hideEditJSON: function () {
    if (!this.editjson_holder) return
    if (!this.editing_json) return

    this.editjson_holder.style.display = 'none'
    this.enable()
    this.editing_json = false
  },
  copyJSON: function () {
    if (!this.editjson_holder) return
    var ta = document.createElement('textarea')
    ta.value = this.editjson_textarea.value
    ta.setAttribute('readonly', '')
    ta.style.position = 'absolute'
    ta.style.left = '-9999px'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
  },
  saveJSON: function () {
    if (!this.editjson_holder) return

    try {
      var json = JSON.parse(this.editjson_textarea.value)
      this.setValue(json)
      this.hideEditJSON()
      this.onChange(true)
    } catch (e) {
      window.alert('invalid JSON')
      throw e
    }
  },
  toggleEditJSON: function () {
    if (this.editing_json) this.hideEditJSON()
    else this.showEditJSON()
  },
  insertPropertyControlUsingPropertyOrder: function (property, control, container) {
    var propertyOrder
    if (this.schema.properties[property]) { propertyOrder = this.schema.properties[property].propertyOrder }
    if (typeof propertyOrder !== 'number') propertyOrder = 1000
    control.propertyOrder = propertyOrder

    for (var i = 0; i < container.childNodes.length; i++) {
      var child = container.childNodes[i]
      if (control.propertyOrder < child.propertyOrder) {
        this.addproperty_list.insertBefore(control, child)
        control = null
        break
      }
    }
    if (control) {
      this.addproperty_list.appendChild(control)
    }
  },
  addPropertyCheckbox: function (key) {
    var self = this
    var checkbox, label, labelText, control

    checkbox = self.theme.getCheckbox()
    checkbox.style.width = 'auto'

    if (this.schema.properties[key] && this.schema.properties[key].title) { labelText = this.schema.properties[key].title } else { labelText = key }

    label = self.theme.getCheckboxLabel(labelText)

    control = self.theme.getFormControl(label, checkbox)
    control.style.paddingBottom = control.style.marginBottom = control.style.paddingTop = control.style.marginTop = 0
    control.style.height = 'auto'
    // control.style.overflowY = 'hidden';

    this.insertPropertyControlUsingPropertyOrder(key, control, this.addproperty_list)

    checkbox.checked = key in this.editors
    checkbox.addEventListener('change', function () {
      if (checkbox.checked) {
        self.addObjectProperty(key)
      } else {
        self.removeObjectProperty(key)
      }
      self.onChange(true)
    })
    self.addproperty_checkboxes[key] = checkbox

    return checkbox
  },
  showAddProperty: function () {
    if (!this.addproperty_holder) return
    this.hideEditJSON()

    // Position the form directly beneath the button
    // TODO: edge detection
    this.addproperty_holder.style.left = this.addproperty_button.offsetLeft + 'px'
    this.addproperty_holder.style.top = this.addproperty_button.offsetTop + this.addproperty_button.offsetHeight + 'px'

    // Disable the rest of the form while editing JSON
    this.disable()

    this.adding_property = true
    this.addproperty_button.disabled = false
    this.addproperty_holder.style.display = ''
    this.refreshAddProperties()
  },
  hideAddProperty: function () {
    if (!this.addproperty_holder) return
    if (!this.adding_property) return

    this.addproperty_holder.style.display = 'none'
    this.enable()

    this.adding_property = false
  },
  toggleAddProperty: function () {
    if (this.adding_property) this.hideAddProperty()
    else this.showAddProperty()
  },
  removeObjectProperty: function (property) {
    if (this.editors[property]) {
      this.editors[property].unregister()
      delete this.editors[property]

      this.refreshValue()
      this.layoutEditors()
    }
  },
  addObjectProperty: function (name, prebuildOnly) {
    var self = this

    // Property is already added
    if (this.editors[name]) return

    // Property was added before and is cached
    if (this.cached_editors[name]) {
      this.editors[name] = this.cached_editors[name]
      if (prebuildOnly) return
      this.editors[name].register()
    // New property
    } else {
      if (!this.canHaveAdditionalProperties() && (!this.schema.properties || !this.schema.properties[name])) {
        return
      }

      var schema = self.getPropertySchema(name)
      if (typeof schema.propertyOrder !== 'number') {
        // if the propertyOrder undefined, then set a smart default value.
        schema.propertyOrder = Object.keys(self.editors).length + 1000
      }

      // Add the property
      var editor = self.jsoneditor.getEditorClass(schema)

      self.editors[name] = self.jsoneditor.createEditor(editor, {
        jsoneditor: self.jsoneditor,
        schema: schema,
        path: self.path + '.' + name,
        parent: self
      })
      self.editors[name].preBuild()

      if (!prebuildOnly) {
        var holder = self.theme.getChildEditorHolder()
        self.editor_holder.appendChild(holder)
        self.editors[name].setContainer(holder)
        self.editors[name].build()
        self.editors[name].postBuild()
        self.editors[name].setOptInCheckbox(editor.header)
        self.editors[name].activate()
      }

      self.cached_editors[name] = self.editors[name]
    }

    // If we're only prebuilding the editors, don't refresh values
    if (!prebuildOnly) {
      self.refreshValue()
      self.layoutEditors()
    }
  },
  onOutsideModalClick: function (e) {
    if (this.addproperty_holder && !this.addproperty_holder.contains(e.target) && this.adding_property) {
      e.preventDefault()
      e.stopPropagation()
      this.toggleAddProperty()
    }
  },
  onChildEditorChange: function (editor) {
    this.refreshValue()
    this._super(editor)
  },
  canHaveAdditionalProperties: function () {
    if (typeof this.schema.additionalProperties === 'boolean') {
      return this.schema.additionalProperties
    }
    return !this.jsoneditor.options.no_additional_properties
  },
  destroy: function () {
    $each(this.cached_editors, function (i, el) {
      el.destroy()
    })
    if (this.editor_holder) this.editor_holder.innerHTML = ''
    if (this.title && this.title.parentNode) this.title.parentNode.removeChild(this.title)
    if (this.error_holder && this.error_holder.parentNode) this.error_holder.parentNode.removeChild(this.error_holder)

    this.editors = null
    this.cached_editors = null
    if (this.editor_holder && this.editor_holder.parentNode) this.editor_holder.parentNode.removeChild(this.editor_holder)
    this.editor_holder = null
    document.removeEventListener('click', this.onOutsideModalClick)

    this._super()
  },
  getValue: function () {
    if (!this.dependenciesFulfilled) {
      return undefined
    }
    var result = this._super()
    if (this.jsoneditor.options.remove_empty_properties || this.options.remove_empty_properties) {
      for (var i in result) {
        if (result.hasOwnProperty(i)) {
          if ((typeof result[i] === 'undefined' || result[i] === '' || result[i] === Object(result[i])) && Object.keys(result[i]).length === 0 && result[i].constructor === Object) {
            delete result[i]
          }
        }
      }
    }

    return result
  },
  refreshValue: function () {
    this.value = {}

    for (var i in this.editors) {
      if (!this.editors.hasOwnProperty(i)) continue
      if (this.editors[i].isActive()) {
        this.value[i] = this.editors[i].getValue()
      }
    }

    if (this.adding_property) this.refreshAddProperties()
  },
  refreshAddProperties: function () {
    if (this.options.disable_properties || (this.options.disable_properties !== false && this.jsoneditor.options.disable_properties)) {
      this.addproperty_button.style.display = 'none'
      return
    }

    var canAdd = false; var numProps = 0; var i; var showModal = false

    // Get number of editors
    for (i in this.editors) {
      if (!this.editors.hasOwnProperty(i)) continue
      numProps++
    }

    // Determine if we can add back removed properties
    canAdd = this.canHaveAdditionalProperties() && !(typeof this.schema.maxProperties !== 'undefined' && numProps >= this.schema.maxProperties)

    if (this.addproperty_checkboxes) {
      this.addproperty_list.innerHTML = ''
    }
    this.addproperty_checkboxes = {}

    // Check for which editors can't be removed or added back
    for (i in this.cached_editors) {
      if (!this.cached_editors.hasOwnProperty(i)) continue

      this.addPropertyCheckbox(i)

      if (this.isRequired(this.cached_editors[i]) && i in this.editors) {
        this.addproperty_checkboxes[i].disabled = true
      }

      if (typeof this.schema.minProperties !== 'undefined' && numProps <= this.schema.minProperties) {
        this.addproperty_checkboxes[i].disabled = this.addproperty_checkboxes[i].checked
        if (!this.addproperty_checkboxes[i].checked) showModal = true
      } else if (!(i in this.editors)) {
        if (!canAdd && !this.schema.properties.hasOwnProperty(i)) {
          this.addproperty_checkboxes[i].disabled = true
        } else {
          this.addproperty_checkboxes[i].disabled = false
          showModal = true
        }
      } else {
        showModal = true
      }
    }

    if (this.canHaveAdditionalProperties()) {
      showModal = true
    }

    // Additional addproperty checkboxes not tied to a current editor
    for (i in this.schema.properties) {
      if (!this.schema.properties.hasOwnProperty(i)) continue
      if (this.cached_editors[i]) continue
      showModal = true
      this.addPropertyCheckbox(i)
    }

    // If no editors can be added or removed, hide the modal button
    if (!showModal) {
      this.hideAddProperty()
      this.addproperty_button.style.display = 'none'
    // If additional properties are disabled
    } else if (!this.canHaveAdditionalProperties()) {
      this.addproperty_add.style.display = 'none'
      this.addproperty_input.style.display = 'none'
    // If no new properties can be added
    } else if (!canAdd) {
      this.addproperty_add.disabled = true
    // If new properties can be added
    } else {
      this.addproperty_add.disabled = false
    }
  },
  isRequired: function (editor) {
    if (!editor) {
      return
    }
    if (typeof editor.schema.required === 'boolean') return editor.schema.required
    else if (Array.isArray(this.schema.required)) return this.schema.required.indexOf(editor.key) > -1
    else if (this.jsoneditor.options.required_by_default) return true
    else return false
  },
  setValue: function (value, initial) {
    var self = this
    value = value || {}

    if (typeof value !== 'object' || Array.isArray(value)) value = {}

    // First, set the values for all of the defined properties
    $each(this.cached_editors, function (i, editor) {
      // Value explicitly set
      if (typeof value[i] !== 'undefined') {
        self.addObjectProperty(i)
        editor.setValue(value[i], initial)
      // Otherwise, remove value unless this is the initial set or it's required
      } else if (!initial && !self.isRequired(editor)) {
        self.removeObjectProperty(i)
      // Otherwise, set the value to the default
      } else {
        editor.setValue(editor.getDefault(), initial)
      }
    })

    $each(value, function (i, val) {
      if (!self.cached_editors[i]) {
        self.addObjectProperty(i)
        if (self.editors[i]) self.editors[i].setValue(val, initial)
      }
    })

    this.refreshValue()
    this.layoutEditors()
    this.onChange()
  },
  showValidationErrors: function (errors) {
    var self = this

    // Get all the errors that pertain to this editor
    var myErrors = []
    var otherErrors = []
    $each(errors, function (i, error) {
      if (error.path === self.path) {
        myErrors.push(error)
      } else {
        otherErrors.push(error)
      }
    })

    // Show errors for this editor
    if (this.error_holder) {
      if (myErrors.length) {
        this.error_holder.innerHTML = ''
        this.error_holder.style.display = ''
        $each(myErrors, function (i, error) {
          if (error.errorcount && error.errorcount > 1) error.message += ' (' + error.errorcount + ' errors)'
          self.error_holder.appendChild(self.theme.getErrorMessage(error.message))
        })
      // Hide error area
      } else {
        this.error_holder.style.display = 'none'
      }
    }

    // Show error for the table row if this is inside a table
    if (this.options.table_row) {
      if (myErrors.length) {
        this.theme.addTableRowError(this.container)
      } else {
        this.theme.removeTableRowError(this.container)
      }
    }

    // Show errors for child editors
    $each(this.editors, function (i, editor) {
      editor.showValidationErrors(otherErrors)
    })
  }
})
