import { AbstractIconLib } from '../iconlib.js'

const iconPrefix = 'fa fa-'
const mapping = {
  collapse: 'caret-square-o-down',
  expand: 'caret-square-o-right',
  delete: 'times',
  edit: 'pencil',
  add: 'plus',
  subtract: 'minus',
  cancel: 'ban',
  save: 'save',
  moveup: 'arrow-up',
  moveright: 'arrow-right',
  movedown: 'arrow-down',
  moveleft: 'arrow-left',
  copy: 'files-o',
  clear: 'times-circle-o',
  time: 'clock-o',
  calendar: 'calendar',
  edit_properties: 'list'
}

export class fontawesome4Iconlib extends AbstractIconLib {
  constructor () {
    super(iconPrefix, mapping)
  }
}
