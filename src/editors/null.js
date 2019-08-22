import { AbstractEditor } from '../editor';

export var NullEditor = AbstractEditor.extend({

  getValue: function() {
    if (!this.dependenciesFulfilled) {
      return undefined;
    }
    return null;
  },
  setValue: function() {
    this.onChange();
  },
  getNumColumns: function() {
    return 2;
  }
});
