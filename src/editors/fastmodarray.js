import { ArrayEditor } from './array.js'
/*
 * This is essentially the standard Array editor with a tweak to the "Editor ID" that
 * then allows it to NOT fully reset the value when simply modifying the order of the items
 * in the array, making such reordering perform better, and to not experience degraded performance
 * as the array grows in size.
 *
 * The key "innovation" is to not tie the editor ID to its position in the array. Technically this
 * would be possible with most of the functionality of the Array editor, even with the initial reliance
 * on array index for the editor ID. However it is such a major change in semantics that it is felt
 * to implement the innovations via a subclass.
 *
 * The major semantics change is, of course, that you cannot "construct" the path of an item editor
 * based upon its position in the array. Instead you have to get the array editor, then index into the
 * rows array, then obtain the path from that row (or the "id" from that editor and apend it to the
 * path of the array editor).
 *
 * Also, technically the cache SHOULD still work with a few tweaks - but for now we completely disable
 * the cache.
 *
 * As part of developing this subclass, the array editor itself was refactored quite a bit so that it
 * didn't rely upon array position for so many of its operations where it didn't need to, even though
 * it still does gaurantee the tie between item index and item editor path.
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
  constructor () {
    super()
    this.nextEditorId = 0
  }

  createRowCache () {
    return new NullRowCache()
  }

  build () {
    super.build()
    this.links_holder = this.tabs_holder.children[0].children[0]
  }

  getEditorId (i) {
    return this.nextEditorId++
  }

  addRowViaCache () {
    this.addRow()
  }

  moveRowUp (i) {
    if (i < 1) return
    this._moveRow(i, i - 1)
  }

  moveRowDown (i) {
    const from = i + 1
    if (from >= this.rows.length) return
    this._moveRow(from, i)
  }

  dropRow (from, to) {
    if (to === from) return
    this._moveRow(from, to)
  }

  _moveRow (from, to) {
    const arrayItems = this.getValue()
    const rows = this.rows
    const item = arrayItems.splice(from, 1)[0]
    const row = this.rows.splice(from, 1)[0]

    arrayItems.splice(to, 0, item)
    rows.splice(to, 0, row)

    const rowHolder = this.row_holder
    const linkHolder = this.links_holder

    const toNode = rowHolder.children[to]
    const ui = rowHolder.children[from]
    rowHolder.insertBefore(ui, toNode)

    const toLink = linkHolder.children[to]
    const link = linkHolder.children[from]
    linkHolder.insertBefore(link, toLink)
    this.refreshValue(true)
  }
}
