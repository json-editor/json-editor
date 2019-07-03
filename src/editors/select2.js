JSONEditor.defaults.editors.select2 = JSONEditor.defaults.editors.select.extend({
  setValue: function(value,initial) {
    var res = this._super(value,initial);
    if(res !== undefined && res.changed && this.select2) {
      if(this.select2v4) this.select2.val(res.value).trigger("change");
      else this.select2.select2('val',res.value);
    }
  },
  setupSelect2: function() {
    var options, self = this, select2Handler;

    if (window.jQuery && window.jQuery.fn && window.jQuery.fn.select2) {

      // Get options, either global options from "JSONEditor.defaults.options.ace" or
      // single property options from schema "options.ace"
      options = $extend({}, JSONEditor.defaults.options.select2 || {}, this.options.select2 || {});

      this.select2 = window.jQuery(this.input).select2(options);
      this.select2v4 = this.select2.select2.hasOwnProperty("amd");

      select2Handler = function() {
        if(self.select2v4) self.input.value = self.select2.val();
        else self.input.value = self.select2.select2('val');
        self.onInputChange();
      };
      this.select2.on('select2-blur',select2Handler);
      this.select2.on('change',select2Handler);
    }
    else this._super();

  },
  onWatchedFieldChange: function() {
    var res = this._super();
    if (res) {
      if(this.select2) this.select2.select2('destroy');
      this.setupSelect2();
    }
  },
  postBuild: function() {
    this._super();
    this.theme.afterInputReady(this.input);
    this.setupSelect2();
  },
  enable: function() {
    if (!this.always_disabled) {
      if(this.select2) {
        if(this.select2v4) this.select2.prop("disabled",false);
        else this.select2.select2("enable",true);
      }
    }
    this._super();
  },
  disable: function(always_disabled) {
    if (this.select2) {
      if (this.select2v4) this.select2.prop("disabled",true);
      else this.select2.select2("enable",false);
    }
    this._super(always_disabled);
  },
  destroy: function() {
    if(this.select2) {
      this.select2.select2('destroy');
      this.select2 = null;
    }
    this._super();
  }
});