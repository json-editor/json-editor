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
 * The cost of doing business - we disable the cache (for now)
 */
class NullRowCache {
  replaceAll (rows) { }

  addItem (row) { }

  removeItem (id) { }

  getItemById (id) {
    return undefined
  }

  getItemByIndexOrValue (index, _value) {
    return undefined
  }

  trimItems (max) {
    return []
  }
}

export class FastModArrayEditor extends ArrayEditor {
  createRowCache () {
    return new NullRowCache()
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

  deleteRow (i, e) {
    if (i < 0 || i >= this.rows.length) return true
    this.getValue().splice(i, 1)
    this.rows.splice(i, 1)
    this.row_holder.removeChild(this.row_holder.children[i])
    this.links_holder.removeChild(this.links_holder.children[i])
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
}
