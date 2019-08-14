import { MultiSelectEditor } from '../multiselect';

export var ArrayChoicesEditor = MultiSelectEditor.extend({
  setValue: function(value, initial) {
    if (this.choices_instance) {

      // Make sure we are dealing with an array of strings so we can check for strict equality
      value = [].concat(value).map(function(e) {return e + '';});

      this.updateValue(value); // Sets this.value to sanitized value

      this.choices_instance.removeActiveItems(); // Remove existing selection
      this.choices_instance.setChoiceByValue(this.value); // Set new selection

      this.onChange(true);
    }
    else this._super(value, initial);

  },
  afterInputReady: function() {

    if (window.Choices && !this.choices_instance) {
      var options, self = this;
      // Get options, either global options from "JSONEditor.defaults.options.choices" or
      // single property options from schema "options.choices"
      options = this.expandCallbacks('choices', $extend({}, {
        removeItems: true,
        removeItemButton: true
      }, JSONEditor.defaults.options.choices || {}, this.options.choices || {}, {
        addItems: true,
        editItems: false,
        duplicateItemsAllowed: false
      }));

      // New items are allowed if option "addItems" is true and items type is "string"
      //this.newEnumAllowed = options.addItems = !!options.addItems && this.schema.items && this.schema.items.type == 'string';

      // Choices doesn't support adding new items to select type input
      this.newEnumAllowed = false;

      this.choices_instance = new window.Choices(this.input, options);

      // Remove change handler set in parent class (src/multiselect.js)
      this.control.removeEventListener('change', this.multiselectChangeHandler);

      // Create a new change handler
      this.multiselectChangeHandler = function(e) {
        var value = self.choices_instance.getValue(true);
        self.updateValue(value);
        self.onChange(true);
      };
      this.control.addEventListener('change', this.multiselectChangeHandler, false);

    }
    this._super();
  },
  updateValue: function(value) {
    value = [].concat(value);
    var changed = false, new_value = [];
    for(var i=0; i<value.length; i++) {
      if (!this.select_values[value[i]+'']) {
        changed = true;
        if (this.newEnumAllowed) {
          if (!this.addNewOption(value[i])) continue;
        }
        else continue;
      }
      var sanitized = this.sanitize(this.select_values[value[i]]);
      new_value.push(sanitized);
      if (sanitized !== value[i]) changed = true;
    }
    this.value = new_value;

    return changed;
  },
  addNewOption: function(value) {
    // Add new value and label
    this.option_keys.push(value + '');
    this.option_titles.push(value + '');
    this.select_values[value + ''] = value;
    // Update Schema enum to prevent triggering "Value must be one of the enumerated values"
    this.schema.items.enum.push(value);
    // Add new value and label to choices
    this.choices_instance.setChoices([{value: value + '', label: value + ''}], 'value', 'label', false);

    return true;
  },
  enable: function() {
    if (!this.always_disabled && this.choices_instance) this.choices_instance.enable();
    this._super();
  },
  disable: function(always_disabled) {
    if(this.choices_instance) this.choices_instance.disable();
    this._super(always_disabled);
  },
  destroy: function() {
    if(this.choices_instance) {
        this.choices_instance.destroy();
        this.choices_instance = null;
    }
    this._super();
  }
});