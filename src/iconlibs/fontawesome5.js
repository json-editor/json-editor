import { AbstractIconLib } from '../iconlib'

export var fontawesome5Iconlib = AbstractIconLib.extend({
  mapping: {
    collapse: 'caret-down',
    expand: 'caret-right',
    'delete': 'trash',
    edit: 'pen',
    add: 'plus',
    subtract: 'minus',
    cancel: 'ban',
    save: 'save',
    moveup: 'arrow-up',
    moveright: 'arrow-right',
    movedown: 'arrow-down',
    moveleft: 'arrow-left',
    copy: 'copy',
    clear: 'times-circle',
    time: 'clock',
    calendar: 'calendar',
    edit_properties: 'list'
  },
  icon_prefix: 'fas fa-'
})
