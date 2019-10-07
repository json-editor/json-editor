import { AbstractIconLib } from '../iconlib'

export var fontawesome4Iconlib = AbstractIconLib.extend({
  mapping: {
    collapse: 'caret-square-o-down',
    expand: 'caret-square-o-right',
    'delete': 'times',
    edit: 'pencil',
    add: 'plus',
    cancel: 'ban',
    save: 'save',
    moveup: 'arrow-up',
    movedown: 'arrow-down',
    copy: 'files-o',
    clear: 'times-circle-o',
    time: 'clock-o',
    calendar: 'calendar'
  },
  icon_prefix: 'fa fa-'
})
