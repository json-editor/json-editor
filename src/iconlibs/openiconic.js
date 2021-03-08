import { AbstractIconLib } from '../iconlib.js'

const iconPrefix = 'oi oi-'
const mapping = {
  collapse: 'collapse-down',
  expand: 'expand-right',
  delete: 'trash',
  edit: 'pencil',
  add: 'plus',
  subtract: 'minus',
  cancel: 'ban',
  save: 'file',
  moveup: 'arrow-thick-top',
  moveright: 'arrow-thick-right',
  movedown: 'arrow-thick-bottom',
  moveleft: 'arrow-thick-left',
  copy: 'clipboard',
  clear: 'circle-x',
  time: 'clock',
  calendar: 'calendar',
  edit_properties: 'list'
}

export class openiconicIconlib extends AbstractIconLib {
  constructor () {
    super(iconPrefix, mapping)
  }
}
