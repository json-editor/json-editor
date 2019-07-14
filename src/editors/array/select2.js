JSONEditor.defaults.editors.arraySelect2 = JSONEditor.defaults.editors.multiselect.extend({
  setValue: function(value, initial) {
    this._super(value, initial);
    if (this.select2_instance) {
      if (this.select2v4) this.select2_instance.val(this.value).change();
      else this.select2_instance.select2('val', this.value);
    }
  },
  addNewOptions: function(value) {
    var self = this, new_option,
        // Is the values added new or exists in enum list?
        new_items = value.filter(function(n) { return self.option_keys.indexOf(n) === -1;});

    if (new_items.length > 0) {
      new_items.forEach(function(key) {
        if (self.option_keys.indexOf(key) < 0) {
          // Add to list of valid enum values
          self.option_keys.push(key);
          self.option_titles.push(key);
          self.select_values[key] = key;
          // Update Schema enum to prevent triggering error
          // "Value must be one of the enumerated values"
          self.schema.items.enum.push(key);
          //this.original_schema.enum.push(key);

          new_option = self.input.querySelector('option[value="' + key + '"]');
          if (new_option) {
            // Remove data attribute to make option tag permanent.
            new_option.removeAttribute('data-select2-tag');
            self.select_options[key] = new_option;
          }
         }
      });
    }
  },
  afterInputReady: function() {

    var options, self = this, select2Handler;

    if (window.jQuery && window.jQuery.fn && window.jQuery.fn.select2 && !this.select2_instance) {

      // Get options, either global options from "JSONEditor.defaults.options.select2" or
      // single property options from schema "options.select2"
      options = this.expandCallbacks($extend({}, {
        tags: true,
        width: '100%'
      }, JSONEditor.defaults.options.select2 || {}, this.options.select2 || {}));

      // New items are allowed if option "tags" is true and items type is "string"
      this.newEnumAllowed = options.tags = !!options.tags && this.schema.items && this.schema.items.type == 'string';

      this.select2_instance = window.jQuery(this.input).select2(options);
      this.select2v4 = this.select2_instance.select2.hasOwnProperty("amd");

      select2Handler = function() {
        var value = self.select2v4 ? self.select2_instance.val(): self.select2_instance.select2('val');
        if (self.newEnumAllowed) self.addNewOptions(value); // Add new enum options if "tags" is enabled
        self.value = value;
        self.onChange(true);
      };

      this.select2_instance.on('select2-blur', select2Handler);
      this.select2_instance.on('change', select2Handler);
    }
    this._super();
  },
  enable: function() {
    if(!this.always_disabled && this.select2_instance) {
      if(this.select2v4) this.select2_instance.prop("disabled",false);
      else this.select2_instance.select2("enable",true);
    }
    this._super();
  },
  disable: function(always_disabled) {
    if(this.select2_instance) {
      if(this.select2v4) this.select2_instance.prop("disabled",true);
      else this.select2_instance.select2("enable",false);
    }
    this._super();
  },
  destroy: function() {
    if(this.select2_instance) {
        this.select2_instance.select2('destroy');
        this.select2_instance = null;
    }
    this._super();
  }
});