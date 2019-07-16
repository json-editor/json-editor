JSONEditor.defaults.editors.arraySelect2 = JSONEditor.defaults.editors.multiselect.extend({
  setValue: function(value, initial) {
    if (this.select2_instance) {

      // Make sure we are dealing with an array of strings so we can check for strict equality
      value = [].concat(value).map(function(e) {return e + '';});

      this.updateValue(value); // Sets this.value to sanitized value

      if (this.select2v4) this.select2_instance.val(this.value).change();
      else this.select2_instance.select2('val', this.value);

      this.onChange(true);
    }
    else this._super(value, initial);

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

      this.selectChangeHandler = function() {
        var value = self.select2v4 ? self.select2_instance.val(): self.select2_instance.select2('val');
        self.updateValue(value);
        self.onChange(true);
      };

      // Add event handler.
      // Note: Must use the "on()" method and not addEventListener()
      this.select2_instance.on('select2-blur', this.selectChangeHandler);
      this.select2_instance.on('change', this.selectChangeHandler);
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

    var option_tag = this.input.querySelector('option[value="' + value + '"]');
    // Remove data attribute to make option tag permanent. (user input)
    if (option_tag) option_tag.removeAttribute('data-select2-tag');
    // Create new option tag (setValue)
    else this.input.appendChild(new Option(value, value, false, false)).trigger('change');

    return true;
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