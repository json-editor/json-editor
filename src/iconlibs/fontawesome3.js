import { AbstractIconLib } from '../iconlib'

export var fontawesome3Iconlib = AbstractIconLib.extend({
  mapping: {
    collapse: 'chevron-down',
    expand: 'chevron-right',
    'delete': 'remove',
    edit: 'pencil',
    add: 'plus',
    cancel: 'ban-circle',
    save: 'save',
    moveup: 'arrow-up',
    movedown: 'arrow-down',
    copy: 'copy',
    clear: 'remove-circle',
    time: 'time',
    calendar: 'calendar'
  },
  icon_prefix: 'icon-'
})
