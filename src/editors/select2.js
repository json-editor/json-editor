JSONEditor.defaults.editors.select2 = JSONEditor.defaults.editors.select.extend({
  setValue: function(value,initial) {

    if (this.select2_instance) {

      // Sanitize value before setting it
      var sanitized = this.typecast(value || '');

      if(this.enum_values.indexOf(sanitized) < 0) sanitized = this.enum_values[0];

      if(this.value === sanitized) return;

      if(initial) this.is_dirty = false;
      else if(this.jsoneditor.options.show_errors === "change") this.is_dirty = true;

      this.input.value = this.enum_options[this.enum_values.indexOf(sanitized)];

      if(this.select2v4) this.select2_instance.val(sanitized).trigger("change");
      else this.select2_instance.select2('val',sanitized);

      this.value = sanitized;
      this.onChange();
      this.change();

    }
    else this._super(value,initial);
  },
  addNewOption: function(value) {
    var sanitized = this.typecast(value);

    if (this.enum_values.indexOf(sanitized) < 0) {
      // Add to list of valid enum values
      this.enum_options.push("" + sanitized);
      this.enum_display.push("" + sanitized);
      this.enum_values.push(sanitized);

      // Update Schema enum to prevent triggering error
      // "Value must be one of the enumerated values"
      this.schema.enum.push(sanitized);
      //this.original_schema.enum.push(sanitized);

      // Remove data attribute to make option tag permanent.
      this.input.querySelector('option[value="' + sanitized + '"]').removeAttribute('data-select2-tag');
    }
  },
  afterInputReady: function() {

    if (window.jQuery && window.jQuery.fn && window.jQuery.fn.select2 && !this.select2_instance) {

      // Get options, either global options from "JSONEditor.defaults.options.select2" or
      // single property options from schema "options.select2"
      var self = this, options = this.expandCallbacks($extend({}, JSONEditor.defaults.options.select2 || {}, this.options.select2 || {}));

      // New items are allowed if option "tags" is true and type is "string"
      this.newEnumAllowed = options.tags = !!options.tags && this.schema.type == 'string';

      this.select2_instance = window.jQuery(this.input).select2(options);
      this.select2v4 = this.select2_instance.select2.hasOwnProperty("amd");

      this.select2_eventhandler = function() {
        var value = self.select2v4 ? self.select2_instance.val(): self.select2_instance.select2('val');
        if (self.newEnumAllowed) self.addNewOption(value); // Add new enum option if "tags" is enabled
        self.input.value = value;
        self.onInputChange();
      };

      this.select2_instance.on('change',this.select2_eventhandler);
      this.select2_instance.on('select2-blur',this.select2_eventhandler);

    }
    this._super();
  },
  enable: function() {
    if (!this.always_disabled) {
      if(this.select2_instance) {
        if(this.select2v4) this.select2_instance.prop("disabled",false);
        else this.select2_instance.select2("enable",true);
      }
    }
    this._super();
  },
  disable: function(always_disabled) {
    if (this.select2_instance) {
      if (this.select2v4) this.select2_instance.prop("disabled",true);
      else this.select2_instance.select2("enable",false);
    }
    this._super(always_disabled);
  },
  destroy: function() {
    if(this.select2_instance) {
      this.select2_instance.select2('destroy');
      this.select2_instance = null;
    }
    this._super();
  }
});