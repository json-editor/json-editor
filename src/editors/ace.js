JSONEditor.defaults.editors.ace = JSONEditor.defaults.editors.string.extend({
  setValue: function(value,initial,from_template) {
    var res = this._super(value,initial,from_template);
    if (res !== undefined && res.changed && this.ace_editor_instance) {
      this.ace_editor_instance.setValue(res.value);
      this.ace_editor_instance.session.getSelection().clearSelection();
      this.ace_editor_instance.resize();
    }
  },
  build: function() {
    var format = this.schema.format;
    this.schema.format = 'textarea'; // Force format into "textarea"
    this._super();
    this.input_type = this.schema.format = format;
    if(format) this.input.setAttribute('data-schemaformat', format);
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