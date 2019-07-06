JSONEditor.defaults.editors.arraySelect2 = JSONEditor.defaults.editors.multiselect.extend({
  afterInputReady: function() {

    var options, self = this, select2Handler;

    if (window.jQuery && window.jQuery.fn && window.jQuery.fn.select2 && !this.select2_instance) {

      // Get options, either global options from "JSONEditor.defaults.options.select2" or
      // single property options from schema "options.select2"
      options = $extend({}, JSONEditor.defaults.options.select2 || {}, this.options.select2 || {});

      this.select2_instance = window.jQuery(this.input).select2(options);
      this.select2v4 = this.select2_instance.select2.hasOwnProperty("amd");

      select2Handler = function() {
        if(self.select2v4) self.value = self.select2_instance.val();
        else self.value = self.select2_instance.select2('val');
        self.onChange(true);
      };
      this.select2_instance.on('select2-blur', select2Handler);
      this.select2_instance.on('change', select2Handler);
    }
    this._super();
  },
  updateValue: function(value) {
    this._super(value);
    if (this.select2_instance) {
      if(this.select2v4) this.select2_instance.val(this.value).trigger("change");
      else this.select2_instance.select2('val',this.value);
    }
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