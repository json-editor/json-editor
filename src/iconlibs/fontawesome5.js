import { AbstractIconLib } from '../iconlib.js'

const iconPrefix = 'fas fa-'
const mapping = {
  collapse: 'caret-down',
  expand: 'caret-right',
  delete: 'trash',
  edit: 'pen',
  add: 'plus',
  subtract: 'minus',
  cancel: 'ban',
  save: 'save',
  moveup: 'arrow-up',
  moveright: 'arrow-right',
  movedown: 'arrow-down',
  moveleft: 'arrow-left',
  copy: 'copy',
  clear: 'times-circle',
  time: 'clock',
  calendar: 'calendar',
  edit_properties: 'list'
}

export class fontawesome5Iconlib extends AbstractIconLib {
  constructor () {
    super(iconPrefix, mapping)
  }
}
