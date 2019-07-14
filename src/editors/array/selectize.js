JSONEditor.defaults.editors.arraySelectize = JSONEditor.defaults.editors.multiselect.extend({
  setValue: function(value, initial) {
    if (this.selectize_instance) {
      var i, changed;
      value = value || [];
      if (!(Array.isArray(value))) value = [value];

      // Make sure we are dealing with an array of strings so we can check for strict equality
      value = value.map(function(e) {return e + '';});

      changed = this.updateValue(value); // Sets this.value to sanitized value

      this.selectize_instance.setValue(this.value);

      this.onChange(true);
    }
    else this._super(value, initial);

  },
  addNewOptions: function(value) {
    value = [].concat(value); // Make sure value is an array
    var self = this,
        // Is the values added new or exists in enum list?
        new_items = value.filter(function(n) { return self.option_keys.indexOf(n) === -1;});

    if (new_items.length > 0 && this.schema.items && this.schema.items.enum) {
      new_items.forEach(function(key) {
        // Add new key and value
        self.option_keys.push(key + '');
        self.option_titles.push(key + '');
        self.select_values[key + ''] = key;
        // Update Schema enum to prevent triggering "Value must be one of the enumerated values"
        self.schema.items.enum.push(key);
        //self.original_schema.items.enum.push(key);
        // Add key to selectize
        self.input.selectize.addOption({text: key, value: key});
      });
    }
  },
  afterInputReady: function() {
    var options, self = this;

    if (window.jQuery && window.jQuery.fn && window.jQuery.fn.selectize && !this.selectize_instance) {
      // Get options, either global options from "JSONEditor.defaults.options.selectize" or
      // single property options from schema "options.selectize"
      options = this.expandCallbacks($extend({}, {
        plugins: ["remove_button"],
        delimiter: false,
        createOnBlur: true,
        create: true
      },JSONEditor.defaults.options.selectize || {}, this.options.selectize || {}));

      // New items are allowed if option "create" is true and items type is "string"
      this.newEnumAllowed = options.create = !!options.create && this.schema.items && this.schema.items.type == 'string';

      //this.selectize_instance = window.jQuery(this.input).selectize(options);
      this.selectize_instance = (window.jQuery(this.input).selectize(options))[0].selectize;

      //this.control.removeEventListener('change', this.multiselectChangeHandler);

      this.selectize_instance.on('change', function(e) {
          var value = self.selectize_instance.getValue();
          self.updateValue(value);
          self.onChange(true);
      });

      if (this.newEnumAllowed) this.selectize_instance.on('option_add', function(value) {
        self.addNewOptions(value);
      });
    }
    this._super();
  },
  updateValue: function(value) {
    value = [].concat(value);
    var changed = false, new_value = [];
    for(var i=0; i<value.length; i++) {
//      if (!this.select_options[value[i]+'']) {
      if (!this.select_values[value[i]+'']) {
        changed = true;
        continue;
      }
      var sanitized = this.sanitize(this.select_values[value[i]]);
      new_value.push(sanitized);
      if (sanitized !== value[i]) changed = true;
    }
    this.value = new_value;

    return changed;
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