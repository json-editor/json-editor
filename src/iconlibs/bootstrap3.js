import { AbstractIconLib } from '../iconlib.js'

const iconPrefix = 'glyphicon glyphicon-'
const mapping = {
  collapse: 'chevron-down',
  expand: 'chevron-right',
  delete: 'trash',
  edit: 'pencil',
  add: 'plus',
  subtract: 'minus',
  cancel: 'floppy-remove',
  save: 'floppy-saved',
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

export class bootstrap3Iconlib extends AbstractIconLib {
  constructor () {
    super(iconPrefix, mapping)
  }
}
