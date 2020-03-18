import { AbstractIconLib } from '../iconlib.js'

const iconClass = 'material-icons'
const iconPrefix = ''
const mapping = {
  collapse: 'arrow_drop_up',
  expand: 'arrow_drop_down',
  delete: 'delete',
  edit: 'edit',
  add: 'add',
  subtract: 'remove',
  cancel: 'cancel',
  save: 'save',
  moveup: 'arrow_upward',
  movedown: 'arrow_downward',
  moveright: 'arrow_forward',
  moveleft: 'arrow_back',
  copy: 'content_copy',
  clear: 'highlight_off',
  time: 'access_time',
  calendar: 'calendar_today',
  upload: 'cloud_upload',
  edit_properties: 'list'
}

export class materialiconsIconlib extends AbstractIconLib {
  constructor () {
    super(iconPrefix, mapping)
    this.icon_class = iconClass
  }

  getIconClass (key) {
    /* This method is unused. */
    return this.icon_class
  }

  getIcon (key) {
    /* Get the mapping. */
    const mapping = this.mapping[key]
    if (!mapping) return null

    /* @see http://materializecss.com/icons.html */
    const i = document.createElement('i')
    i.classList.add(this.icon_class)
    const t = document.createTextNode(mapping)
    i.appendChild(t)
    return i
  }
}
