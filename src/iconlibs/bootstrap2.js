import { AbstractIconLib } from '../iconlib';

export var bootstrap2Iconlib = AbstractIconLib.extend({
  mapping: {
    collapse: 'chevron-down',
    expand: 'chevron-up',
    "delete": 'trash',
    edit: 'pencil',
    add: 'plus',
    cancel: 'ban-circle',
    save: 'ok',
    moveup: 'arrow-up',
    movedown: 'arrow-down',
    clear: 'remove-circle',
    time: 'time',
    calendar: 'calendar'
  },
  icon_prefix: 'icon-'
});
