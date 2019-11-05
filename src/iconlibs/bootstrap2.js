import { AbstractIconLib } from '../iconlib'

export var bootstrap2Iconlib = AbstractIconLib.extend({
  mapping: {
    collapse: 'chevron-down',
    expand: 'chevron-up',
    'delete': 'trash',
    edit: 'pencil',
    add: 'plus',
    subtract: 'minus',
    cancel: 'ban-circle',
    save: 'ok',
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
