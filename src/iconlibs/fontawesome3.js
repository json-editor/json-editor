import { AbstractIconLib } from '../iconlib'

export var fontawesome3Iconlib = AbstractIconLib.extend({
  mapping: {
    collapse: 'chevron-down',
    expand: 'chevron-right',
    'delete': 'trash',
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
  },
  icon_prefix: 'icon-'
})
