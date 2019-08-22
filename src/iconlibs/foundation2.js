import { AbstractIconLib } from '../iconlib';

export var foundation2Iconlib = AbstractIconLib.extend({
  mapping: {
    collapse: 'minus',
    expand: 'plus',
    "delete": 'remove',
    edit: 'edit',
    add: 'add-doc',
    cancel: 'error',
    save: 'checkmark',
    moveup: 'up-arrow',
    movedown: 'down-arrow',
    clear: 'remove',
    time: 'clock',
    calendar: 'calendar'
  },
  icon_prefix: 'foundicon-'
});
