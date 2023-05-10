import { AbstractIconLib } from '../iconlib.js'

const iconPrefix = 'bi bi-'
const mapping = {
  collapse: 'chevron-down',
  expand: 'chevron-right',
  delete: 'trash',
  edit: 'pencil',
  add: 'plus',
  subtract: 'dash',
  cancel: 'x-circle',
  save: 'save',
  moveup: 'arrow-up',
  moveright: 'arrow-right',
  movedown: 'arrow-down',
  moveleft: 'arrow-left',
  copy: 'clipboard',
  clear: 'x-circle',
  time: 'clock',
  calendar: 'calendar',
  edit_properties: 'list-ul'
}

export class bootstrapIconlib extends AbstractIconLib {
  constructor () {
    super(iconPrefix, mapping)
  }
}
