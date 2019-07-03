JSONEditor.defaults.editors.select2 = JSONEditor.defaults.editors.select.extend({
  setValue: function(value,initial) {
    var res = this._super(value,initial);
    if(res !== undefined && res.changed && this.select2_instance) {
      if(this.select2v4) this.select2_instance.val(res.value).trigger("change");
      else this.select2_instance.select2('val',res.value);
    }
  },
  setupSelect2: function() {
    var options, self = this, select2Handler;

    if (window.jQuery && window.jQuery.fn && window.jQuery.fn.select2) {

      // Get options, either global options from "JSONEditor.defaults.options.select2" or
      // single property options from schema "options.select2"
      options = $extend({}, JSONEditor.defaults.options.select2 || {}, this.options.select2 || {});

      this.select2_instance = window.jQuery(this.input).select2(options);
      this.select2v4 = this.select2_instance.select2.hasOwnProperty("amd");

      select2Handler = function() {
        if(self.select2v4) self.input.value = self.select2_instance.val();
        else self.input.value = self.select2_instance.select2('val');
        self.onInputChange();
      };
      this.select2_instance.on('select2-blur',select2Handler);
      this.select2_instance.on('change',select2Handler);
    }

  },
  onWatchedFieldChange: function() {
    var res = this._super();
    if (res !== undefined && res.changed) {
      if(this.select2_instance) {
        this.select2_instance.select2('destroy');
        this.setupSelect2();
      }
    }
  },
  postBuild: function() {
    this._super();
    //this.theme.afterInputReady(this.input);
    this.setupSelect2();
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