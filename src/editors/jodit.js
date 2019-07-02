JSONEditor.defaults.editors.jodit = JSONEditor.defaults.editors.string.extend({
  setValue: function(value,initial,from_template) {
    var res = this._super(value,initial,from_template);
    if (res !== undefined && res.changed && this.jodit_instance) this.jodit_instance.setEditorValue(res.value);
  },
  build: function() {
    this.format = 'textarea'; // Force format into "textarea"
    this._super();
  },
  afterInputReady: function() {
    var self = this, options;

    if (window.Jodit) {
      // Get options, either global options from "JSONEditor.defaults.options.jodit" or
      // single property options from schema "options.jodit"
      options = $extend({}, {
        height: 300
      }, JSONEditor.defaults.options.jodit || {}, this.options.jodit || {});

      this.jodit_instance = new window.Jodit(this.input, options);

      if(this.schema.readOnly || this.schema.readonly || this.schema.template) {
        this.jodit_instance.setReadOnly(true);
      }

      this.jodit_instance.events.on("change",function() {
        self.value = self.jodit_instance.getEditorValue();
        self.is_dirty = true;
        self.onChange(true);
      });

      self.theme.afterInputReady(self.input);
    }
    else this._super();  // Library not loaded, so just treat this as a string
  },
  enable: function() {
    if (!this.always_disabled && this.jodit_instance) this.jodit_instance.setReadOnly(false);
    this._super();
  },
  disable: function(always_disabled) {
    if (this.jodit_instance) this.jodit_instance.setReadOnly(true);
    this._super(always_disabled);
  },
  destroy: function() {
    if (this.jodit_instance) {
      this.jodit_instance.destruct();
      this.jodit_instance = null;
    }
    this._super();
  }
});