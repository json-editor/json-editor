import { AbstractIconLib } from '../iconlib.js'

const iconPrefix = 'ui-icon ui-icon-'
const mapping = {
  collapse: 'triangle-1-s',
  expand: 'triangle-1-e',
  delete: 'trash',
  edit: 'pencil',
  add: 'plusthick',
  subtract: 'minusthick',
  cancel: 'closethick',
  save: 'disk',
  moveup: 'arrowthick-1-n',
  moveright: 'arrowthick-1-e',
  movedown: 'arrowthick-1-s',
  moveleft: 'arrowthick-1-w',
  copy: 'copy',
  clear: 'circle-close',
  time: 'time',
  calendar: 'calendar',
  edit_properties: 'note'
}

export class jqueryuiIconlib extends AbstractIconLib {
  constructor () {
    super(iconPrefix, mapping)
  }
}
