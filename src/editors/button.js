JSONEditor.defaults.editors.button = JSONEditor.AbstractEditor.extend({
  init: function(options) {
    this._super(options);
    this.active = false;
  },
  build: function() {

    if (typeof this.options.compact === 'undefined') this.options.compact = true;
    if(!this.options.compact) this.header = this.label = this.theme.getFormInputLabel(this.getTitle());
    if(this.schema.description) this.description = this.theme.getFormInputDescription(this.schema.description);

      // Get options, either global options from "JSONEditor.defaults.options.button" or
      // single property options from schema "options.button"
    var options = this.expandCallbacks('button', $extend({}, {
      'text': this.key,
      'icon': '',
      'action': function(jseditor, e) {
        alert('No button action defined for "' + jseditor.path + '"');
      }.bind(null, this)
    }, JSONEditor.defaults.options.button || {}, this.options.button || {}));

    this.input = this.getButton(options.text, options.icon, options.text);
    this.input.addEventListener('click', options.action, false);
    this.control = this.theme.getFormControl(this.label, this.input, this.description);
    this.container.appendChild(this.control);

  },
  getNumColumns: function() {
    return 2;
  }
});
