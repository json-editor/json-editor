import { ArrayEditor } from './array.js'
import { findIndexInParent } from '../utilities.js'

/*
 * This is essentially the standard Array editor with a tweak to the "Editor ID" that
 * then allows it to NOT fully reset the value when simply modifying the order of the items
 * in the array, making such reordering perform better, and to not experience degraded performance
 * as the array grows in size.
 *
 * The key "innovation" is to not tie the editor ID to its position in the array. Technically this
 * would be possible with most of the functionality of the Array editor, even with the initial reliance
 * on array index for the editor ID. However it is such a major change in semantics that it is felt
 * better to implement the innovations via a subclass.
 *
 * The major semantics change is, of course, that you cannot "construct" the path of an item editor
 * based upon its position in the array. Instead you have to get the array editor, then index into the
 * rows array, then obtain the path from that row (or the "id" from that editor and apend it to the
 * path of the array editor).
 *
 * Also, technically the cache SHOULD still work with a few tweaks - but for now we completely disable
 * the cache.
 *
 * As part of developing this subclass, the array editor itself was substantially refactored in order
 * to make it easier to subclass - the Table editor was also refactored to take advantage of the
 * improved adaptability of the array editor.
 *
 * The bottom line, if you have a big array and you don't need to find item editors based upon their
 * position in the array, then this subclass may afford you better performance when modifying the
 * array, especially if such modifications are predominantly order changes.
 */

/*
 * The cache is a stack cache that bears no relation to the order of items in the array
 * (unlike that of the superclass)
 */
class StackRowCache {
  constructor () {
    this.stack = []
  }

  replaceAll (rows) { }

  // We use the cache differently
  addItem (row) { }

  pushItem (row) {
    this.stack.push(row)
  }

  removeItem (id) { }

  getItemById (id) {
    return this.stack.pop()
  }

  getItemByIndexOrValue (index, _value) {
    return this.stack.pop()
  }

  trimItems (max) {
    return []
  }
}

export class FastModArrayEditor extends ArrayEditor {
  createRowCache () {
    return new StackRowCache()
  }

  preBuild () {
    super.preBuild()
    this.nextEditorId = 0
  }

  build () {
    super.build()
    this.links_holder = this.tabs_holder?.children[0]?.children[0]
  }

  getValueIndex (e) {
    return this.active_tab ? findIndexInParent(this.active_tab) : -1
  }

  // The default implementation uses getValueIndex, but our implementation
  // of that method isn't suitable for the item click, so we override that
  itemLinkClicked (e) {
    this.setActiveItem(findIndexInParent(e.currentTarget))
  }

  getEditorId (i) {
    return this.nextEditorId++
  }

  moveRowUp (i) {
    if (i < 1 || i >= this.rows.length) return true
    this._moveRow(i, i - 1)
  }

  moveRowDown (i) {
    if (i < 0 || (i + 1) >= this.rows.length) return true
    this._moveRow(i, i + 1)
  }

  dropRow (from, to) {
    if (to === from) return true
    this._moveRow(from, to)
  }

  // The errors have the true schema path in them
  // We, of course, do not! So we have to change all the
  // messages that pertain to sub-parts of this to see the
  // 'fake' path - then they'll properly match - we hope.
  showValidationErrors (errors) {
    const myPath = `${this.path}.`
    const l = myPath.length
    const mappedErrors = errors.map(error => {
      if (error.path.startsWith(myPath) && error.path.length > l) {
        const errorPathTail = error.path.substring(l)
        const schemaIndex = Number.parseInt(errorPathTail)
        if (isNaN(schemaIndex)) {
          // eslint-disable-next-line no-console
          console.error(`unexpected non-index in error ${error}`)
          return error
        }
        const row = this.rows[schemaIndex]
        if (!row) return error
        const fakeIndex = row.arrayItemId ?? NaN
        if (isNaN(fakeIndex)) {
          // eslint-disable-next-line no-console
          console.error(`unexpected non-index in editor ID ${row.arrayItemId} (index: ${schemaIndex})`)
          return error
        }
        if (schemaIndex !== fakeIndex) {
          error.path = myPath + errorPathTail.replace('' + schemaIndex, '' + fakeIndex)
        }
      }
      return error
    })
    super.showValidationErrors(mappedErrors)
  }

  copyRow (from, to) {
    const arrayItems = this.getValue()
    const originalLength = arrayItems.length
    const newValue = this.refreshUUIDs(window.structuredClone(arrayItems[from]))

    if (newValue) {
      arrayItems.splice(to, 0, newValue)

      this.addRow(newValue)
      if (to >= originalLength) {
        this.refreshValue(true)
      } else {
        this._moveRow(originalLength, to)
      }
      return false
    } else {
      return true
    }
  }

  destroyRow (row, hard) {
    super.destroyRow(row, hard)
    if (!hard) {
      this.row_cache.pushItem(row)
    }
  }

  removeRowFromUI (row) {
    this.row_holder.removeChild(row.container)
    this.links_holder.removeChild(row.tab)
  }

  addRowToUI (row) {
    const beforeRow = this.row_holder.children[row.arrayItemIndex]
    const beforeLink = this.links_holder.children[row.arrayItemIndex]
    this.row_holder.insertBefore(row.container, beforeRow)
    this.links_holder.insertBefore(row.tab, beforeLink)
  }

  deleteRow (i, e) {
    if (i < 0 || i >= this.rows.length) return true
    this.getValue().splice(i, 1)
    const [row] = this.rows.splice(i, 1)
    this.destroyRow(row, false)
    this.refreshValue(true)
  }

  //
  // The semantics are 'let the element at fromIndex be moved so that it is at toIndex'
  //
  _moveRow (fromIndex, toIndex) {
    const arrayItems = this.getValue()
    const rowHolder = this.row_holder
    const linkHolder = this.links_holder
    const rows = this.rows

    if (!(arrayItems && rowHolder && linkHolder && rows)) return
    if (!(fromIndex >= 0 && fromIndex < rows.length && toIndex >= 0 && toIndex < rows.length)) return

    // Remove the the item and row from their arrays
    const [item] = arrayItems.splice(fromIndex, 1)
    const [row] = rows.splice(fromIndex, 1)

    // Reinsert where they should go
    arrayItems.splice(toIndex, 0, item)
    rows.splice(toIndex, 0, row)

    // Get the indexed node
    const fromLink = linkHolder.children[fromIndex]
    const fromNode = rowHolder.children[fromIndex]

    // There are many ways to do this, but this is certainly the clearest!
    const realToIndex = fromIndex > toIndex ? toIndex : toIndex + 1
    const toNode = rowHolder.children[realToIndex] || null
    const toLink = linkHolder.children[realToIndex] || null
    rowHolder.insertBefore(fromNode, toNode)
    linkHolder.insertBefore(fromLink, toLink)

    this.refreshValue(true)
  }

  _refreshIndices () {
    this.rows.forEach((r, i) => { r.arrayItemIndex = i })
  }
}
