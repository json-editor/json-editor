JSONEditor.defaults.editors.selectize = JSONEditor.defaults.editors.select.extend({
  setValue: function(value,initial) {
    var res = this._super(value,initial);
    if(res !== undefined && res.changed && this.selectize_instance) {
      this.selectize_instance[0].selectize.addItem(res.value);
    }
  },
  afterInputReady: function() {
    var options, self = this;

    if (window.jQuery && window.jQuery.fn && window.jQuery.fn.selectize && !self.selectize_instance) {

      // Get options, either global options from "JSONEditor.defaults.options.selectize" or
      // single property options from schema "options.selectize"
      options = $extend({}, {
        create: true
      },JSONEditor.defaults.options.selectize || {}, self.options.selectize || {},{
        onChange : function() { self.onInputChange(); }
      });

      self.selectize_instance = window.jQuery(self.input).selectize(options);
    }
    self._super();
  },
  updateSelectizeOptions: function(select_options) {
    var selectized = this.selectize_instance[0].selectize,
        self = this;

    selectized.off();
    selectized.clearOptions();
    for(var n in select_options) {
      selectized.addOption({value:select_options[n],text:select_options[n]});
    }
    selectized.addItem(this.value);
    selectized.on('change',function() {
      self.onInputChange();
    });
  },
  onWatchedFieldChange: function() {
    var res = this._super();
    if (res !== undefined && res.changed) {
      if(this.selectize_instance) {
        // Update the Selectize options
        this.updateSelectizeOptions(res.select_options);
      }
      else {
        this.afterInputReady();
      }
    }
  },
  enable: function() {
    if (!this.always_disabled && this.selectize_instance) this.selectize_instance[0].selectize.unlock();
    this._super();
  },
  disable: function(always_disabled) {
    if(this.selectize_instance) this.selectize_instance[0].selectize.lock();
    this._super(always_disabled);
  },
  destroy: function() {
    if(this.selectize_instance) {
      this.selectize_instance[0].selectize.destroy();
      this.selectize_instance = null;
    }
    this._super();
  }
});