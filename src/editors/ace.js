JSONEditor.defaults.editors.ace = JSONEditor.defaults.editors.string.extend({
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

    // Update the Ace Editor
    if(this.ace_editor_instance) {
      console.log('Ace set');
      this.ace_editor_instance.setValue(sanitized);
      this.ace_editor_instance.session.getSelection().clearSelection();
      this.ace_editor_instance.resize();
    }

    var changed = from_template || this.getValue() !== value;

    this.refreshValue();

    if(initial) this.is_dirty = false;
    else if(this.jsoneditor.options.show_errors === "change") this.is_dirty = true;

    if(this.adjust_height) this.adjust_height(this.input);

    // Bubble this setValue to parents if the value changed
    this.onChange(changed);
  },
  build: function() {
    var format = this.format;
    this.format = 'textarea'; // Force format into "textarea"
    this._super();
    this.input.setAttribute('data-schemaformat',format);
  },
  afterInputReady: function() {
    var self = this, options;

    if (window.ace) {

      var mode = this.input_type;
        // aliases for c/cpp
      if(mode === 'cpp' || mode === 'c++' || mode === 'c') mode = 'c_cpp';

      // Get options, either global options from "JSONEditor.defaults.options.ace" or
      // single property options from schema "options.ace"
      options = $extend({}, {
        selectionStyle: 'text',
        minLines: 30,
        maxLines: 30
      }, JSONEditor.defaults.options.ace || {}, this.options.ace || {}, {
        mode: 'ace/mode/' + mode
      });

      this.ace_container = document.createElement('div');
      this.ace_container.style.width = '100%';
      this.ace_container.style.position = 'relative';
      //this.ace_container.style.height = '400px';
      this.input.parentNode.insertBefore(this.ace_container,this.input);
      this.input.style.display = 'none';

      this.ace_editor_instance = window.ace.edit(this.ace_container, options);

      this.ace_editor_instance.setValue(this.getValue());
      this.ace_editor_instance.session.getSelection().clearSelection();
      this.ace_editor_instance.resize();

      if(this.schema.readOnly || this.schema.readonly || this.schema.template) {
        this.ace_editor_instance.setReadOnly(true);
      }

      // Listen for changes
      this.ace_editor_instance.on('change',function() {
        self.input.value = self.ace_editor_instance.getValue();
        self.refreshValue();
        self.is_dirty = true;
        self.onChange(true);
      });

      self.theme.afterInputReady(self.input);
    }
    else this._super();  // Library not loaded, so just treat this as a string
  },
  enable: function() {
    if (!this.always_disabled && this.ace_editor_instance) this.ace_editor_instance.setReadOnly(false);
    this._super();
  },
  disable: function(always_disabled) {
    if (this.ace_editor_instance) this.ace_editor_instance.setReadOnly(true);
    this._super(always_disabled);
  },
  destroy: function() {
    if (this.ace_editor_instance) {
      this.ace_editor_instance.destroy();
      this.ace_editor_instance = null;
    }
    this._super();
  }
});