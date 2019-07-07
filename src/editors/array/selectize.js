JSONEditor.defaults.editors.arraySelectize = JSONEditor.defaults.editors.multiselect.extend({
  setValue: function(value, initial) {
    var self = this, new_items;
    // Update the array's value, adding/removing rows when necessary
    value = value || [];
    if(!(Array.isArray(value))) value = [value];

    if (this.selectize_instance) {

      this.addNewItems(value);

      this._super(value, initial);

      this.input.selectize.setValue(value);

    }

    //this.refreshValue(initial);

    this.updateValue(value);
    this.onChange();
  },
  addNewItems: function(value) {
    if (this.selectize_instance) {

      var self = this,
          // Is the values added new or exists in enum list?
          new_items = value.filter(function(n) { return self.option_keys.indexOf(n) === -1;});

      if (new_items.length > 0 && this.newEnumAllowed && this.schema.items.enum) {
        new_items.forEach(function(key) {
          // Add new key and value
          self.option_keys.push(key + '');
          self.option_titles.push(key + '');
          self.select_values[key + ''] = key;
          // Update Schema enum to prevent triggering "Value must be one of the enumerated values"
          self.schema.items.enum.push(key);
          self.original_schema.items.enum.push(key);
          // Add key to selectize
          self.input.selectize.addOption({text: key, value: key});
        });
      }
    }
  },
  refreshValue: function(force) {
    this.value = this.input.selectize.getValue();
    this.addNewItems(this.value);
  },
  afterInputReady: function() {
    var options, self = this;

    if (window.jQuery && window.jQuery.fn && window.jQuery.fn.selectize && !this.selectize_instance) {
      // Get options, either global options from "JSONEditor.defaults.options.selectize" or
      // single property options from schema "options.selectize"
      options = $extend({}, {
        delimiter: false,
        createOnBlur: true,
        create: true
      },JSONEditor.defaults.options.selectize || {}, this.options.selectize || {});

      this.selectize_instance = window.jQuery(this.input).selectize(options);

      this.newEnumAllowed = !!options.create;

      this.input.selectize.on('change', function(e) {
          self.refreshValue();
          self.onChange(true);
      });
    }
    this._super();
  },
  updateValue: function(value) {
    this._super(value);
    if (this.selectize_instance) {
      this.value = this.input.selectize.getValue();
    }
  },
  enable: function() {
    if (!this.always_disabled && this.selectize_instance) this.input.selectize[0].selectize.unlock();
    this._super();
  },
  disable: function(always_disabled) {
    if(this.selectize_instance) this.input.selectize[0].selectize.lock();
    this._super(always_disabled);
  },
  destroy: function() {
    if(this.selectize_instance) {
      this.input.selectize[0].selectize.destroy();
      this.selectize_instance = null;
    }
    this._super();
  }
});