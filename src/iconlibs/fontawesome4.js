import { AbstractIconLib } from '../iconlib'

export var fontawesome4Iconlib = AbstractIconLib.extend({
  mapping: {
    collapse: 'caret-square-o-down',
    expand: 'caret-square-o-right',
    'delete': 'times',
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
  },
  icon_prefix: 'fa fa-'
})
