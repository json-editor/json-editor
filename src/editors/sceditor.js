JSONEditor.defaults.editors.sceditor = JSONEditor.defaults.editors.string.extend({
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

    // Update the SCEditor
    if (this.sceditor_instance) this.sceditor_instance.val(sanitized);

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

    if (window.jQuery && window.jQuery.fn && window.jQuery.fn.sceditor) {
      // Get options, either global options from "JSONEditor.defaults.options.sceditor" or
      // single property options from schema "options.sceditor"
      options = $extend({}, {
        plugins: self.input_type,
        emoticonsEnabled: false,
        width: '100%',
        height: 300
      }, JSONEditor.defaults.options.sceditor || {}, this.options.sceditor || {}, {
        element: this.input
      });

      window.jQuery(self.input).sceditor(options);
      this.sceditor_instance = window.jQuery(self.input).sceditor('instance');

      if(this.schema.readOnly || this.schema.readonly || this.schema.template) {
        this.sceditor_instance.readOnly(true);
      }

      // Listen for changes
      self.sceditor_instance.blur(function() {
        // Get editor's value
        var val = window.jQuery("<div>"+self.sceditor_instance.val()+"</div>");
        // Remove sceditor spans/divs
        window.jQuery('#sceditor-start-marker,#sceditor-end-marker,.sceditor-nlf',val).remove();
        // Set the value and update
        self.input.value = val.html();
        self.value = self.input.value;
        self.is_dirty = true;
        self.onChange(true);
      });

      self.theme.afterInputReady(self.input);
    }
    else this._super();  // Library not loaded, so just treat this as a string
  },
  enable: function() {
    if (!this.always_disabled && this.sceditor_instance) this.sceditor_instance.readOnly(false);
    this._super();
  },
  disable: function(always_disabled) {
    if (this.sceditor_instance) this.sceditor_instance.readOnly(true);
    this._super(always_disabled);
  },
  destroy: function() {
    if (this.sceditor_instance) {
      this.sceditor_instance.destroy();
      this.sceditor_instance = null;
    }
    this._super();
  }
});