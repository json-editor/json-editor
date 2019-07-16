JSONEditor.defaults.editors.selectize = JSONEditor.defaults.editors.select.extend({
  setValue: function(value, initial) {
    if (this.selectize_instance) {

      if(initial) this.is_dirty = false;
      else if(this.jsoneditor.options.show_errors === "change") this.is_dirty = true;

      var sanitized = this.updateValue(value); // Sets this.value to sanitized value

      this.input.value = sanitized;

      this.selectize_instance.clear(true);
      this.selectize_instance.setValue(sanitized);

      this.onChange(true);
    }
    else this._super(value, initial);

  },
  afterInputReady: function() {

    if (window.jQuery && window.jQuery.fn && window.jQuery.fn.selectize && !this.selectize_instance) {

      // Get options, either global options from "JSONEditor.defaults.options.selectize" or
      // single property options from schema "options.selectize"
      var self = this, options = this.expandCallbacks($extend({}, JSONEditor.defaults.options.selectize || {}, this.options.selectize || {}));

      // New items are allowed if option "create" is true and type is "string"
      this.newEnumAllowed = options.create = !!options.create && this.schema.type == 'string';

      this.selectize_instance = (window.jQuery(this.input).selectize(options))[0].selectize;

      // Remove change handler set in parent class (src/multiselect.js)
      this.control.removeEventListener('change', this.multiselectChangeHandler);

      // Create a new change handler
      this.multiselectChangeHandler = function(value) {
        //var value = self.selectize_instance.getValue(true);
        //self.value = value;
        self.updateValue(value);
        self.onChange(true);
      };

      // Add new event handler.
      //Note: Must use the "on()" method and not addEventListener()
      this.selectize_instance.on('change', this.multiselectChangeHandler);

    }
    this._super();

  },
  updateValue: function(value) {
    var sanitized = this.enum_values[0];
    value = this.typecast(value || '');
    if (this.enum_values.indexOf(value) === -1) {
      if (this.newEnumAllowed) {
        sanitized = this.addNewOption(value) ? value : sanitized;
      }
    }
    else sanitized = value;
    this.value = sanitized;
    return sanitized;
  },
  addNewOption: function(value) {
    var sanitized = this.typecast(value), res = false;

    if (this.enum_values.indexOf(sanitized) < 0 && sanitized !== '') {
      // Add to list of valid enum values
      this.enum_options.push('' + sanitized);
      this.enum_display.push('' + sanitized);
      this.enum_values.push(sanitized);
      // Update Schema enum to prevent triggering error
      // "Value must be one of the enumerated values"
      this.schema.enum.push(sanitized);

      // Add selectize item
      this.selectize_instance.addItem(sanitized);
      this.selectize_instance.refreshOptions(false);

      res = true;
    }
    return res;
  },
  onWatchedFieldChange: function() {
    this._super();
    if (this.selectize_instance) {
      var self = this;
      this.selectize_instance.clear(true); // Clear selection
      this.selectize_instance.clearOptions(true); // Remove all options
      this.enum_options.forEach(function(value,i) {
        self.selectize_instance.addOption({value: value, text: self.enum_display[i]});
      });
      this.selectize_instance.addItem(this.value + '', true); // Set new selection
    }
  },
  enable: function() {
    if (!this.always_disabled && this.selectize_instance) this.selectize_instance.unlock();
    this._super();
  },
  disable: function(always_disabled) {
    if(this.selectize_instance) this.selectize_instance.lock();
    this._super(always_disabled);
  },
  destroy: function() {
    if(this.selectize_instance) {
      this.selectize_instance.destroy();
      this.selectize_instance = null;
    }
    this._super();
  }
});