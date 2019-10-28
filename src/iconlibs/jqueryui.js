import { AbstractIconLib } from '../iconlib'

export var jqueryuiIconlib = AbstractIconLib.extend({
  mapping: {
    collapse: 'triangle-1-s',
    expand: 'triangle-1-e',
    'delete': 'trash',
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
  },
  icon_prefix: 'ui-icon ui-icon-'
})
