import { AbstractIconLib } from '../iconlib.js'

const iconPrefix = 'icon-'
const mapping = {
  collapse: 'chevron-down',
  expand: 'chevron-right',
  delete: 'trash',
  edit: 'pencil',
  add: 'plus',
  subtract: 'minus',
  cancel: 'ban-circle',
  save: 'save',
  moveup: 'arrow-up',
  moveright: 'arrow-right',
  movedown: 'arrow-down',
  moveleft: 'arrow-left',
  copy: 'copy',
  clear: 'remove-circle',
  time: 'time',
  calendar: 'calendar',
  edit_properties: 'list'
}

export class fontawesome3Iconlib extends AbstractIconLib {
  constructor () {
    super(iconPrefix, mapping)
  }
}
