JSONEditor.defaults.editors.jodit = JSONEditor.defaults.editors.string.extend({
  setValue: function(value,initial,from_template) {

    if(this.template && !from_template) return;

    if(value === null || typeof value === 'undefined') value = "";
    else if(typeof value === "object") value = JSON.stringify(value);
    else if(typeof value !== "string") value = ""+value;

    if(value === this.serialized) return;

    // Sanitize value before setting it
    var sanitized = this.sanitize(value);

    if(this.input.value === sanitized) return;

    this.input.value = sanitized;

    // Update the WYSIWYG
    if(this.jodit_instance) this.jodit_instance.setEditorValue(sanitized);

    var changed = from_template || this.getValue() !== value;

    this.refreshValue();

    if(initial) this.is_dirty = false;
    else if(this.jsoneditor.options.show_errors === "change") this.is_dirty = true;

    if(this.adjust_height) this.adjust_height(this.input);

    // Bubble this setValue to parents if the value changed
    this.onChange(changed);
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