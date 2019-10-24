import { AbstractIconLib } from '../iconlib'

export var spectreIconlib = AbstractIconLib.extend({
  mapping: {
    collapse: 'arrow-down',
    expand: 'arrow-right',
    'delete': 'delete',
    edit: 'edit',
    add: 'plus',
    subtract: 'minus',
    cancel: 'cross',
    save: 'check',
    moveup: 'upward',
    moveright: 'forward',
    movedown: 'downward',
    moveleft: 'back',
    copy: 'copy',
    clear: 'close',
    time: 'time',
    calendar: 'bookmark',
    edit_properties: 'menu'
  },
  icon_prefix: 'icon icon-'
})
