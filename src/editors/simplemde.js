JSONEditor.defaults.editors.simplemde = JSONEditor.defaults.editors.string.extend({
  setValue: function(value,initial,from_template) {
    var res = this._super(value,initial,from_template);
    if (res !== undefined && res.changed && this.simplemde_instance) this.simplemde_instance.value(res.value);
  },
  build: function() {
    this.options.format = 'textarea'; // Force format into "textarea"
    this._super();
    this.input_type = this.schema.format; // Restore original format
    this.input.setAttribute('data-schemaformat', this.input_type);
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
  getNumColumns: function() {
    return 6;
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