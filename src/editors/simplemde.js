JSONEditor.defaults.editors.simplemde = JSONEditor.defaults.editors.string.extend({
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

    // Update the SimpleMDE Editor
    if(this.simplemde_instance) this.simplemde_instance.value(sanitized);

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

    if (window.SimpleMDE) {
      // Get options, either global options from "JSONEditor.defaults.options.simplemde" or
      // single property options from schema "options.simplemde"
      options = $extend({}, {
        height: 300
      }, JSONEditor.defaults.options.simplemde || {}, this.options.simplemde || {}, {
        element: this.input
      });

      this.simplemde_instance = new window.SimpleMDE(options);

      if(this.schema.readOnly || this.schema.readonly || this.schema.template) {
        this.simplemde_instance.codemirror.options.readOnly = true;
      }

      // Listen for changes
      this.simplemde_instance.codemirror.on("change",function() {
        self.value = self.simplemde_instance.value();
        self.is_dirty = true;
        self.onChange(true);
      });

      self.theme.afterInputReady(self.input);
    }
    else this._super();  // Library not loaded, so just treat this as a string
  },
  enable: function() {
    if (!this.always_disabled && this.simplemde_instance) this.simplemde_instance.codemirror.options.readOnly = false;
    this._super();
  },
  disable: function(always_disabled) {
    if (this.simplemde_instance) this.simplemde_instance.codemirror.options.readOnly = true;
    this._super(always_disabled);
  },
  destroy: function() {
    if (this.simplemde_instance) {
      this.simplemde_instance.toTextArea();
      this.simplemde_instance = null;
    }
    this._super();
  }
});