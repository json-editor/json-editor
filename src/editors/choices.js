JSONEditor.defaults.editors.choices = JSONEditor.defaults.editors.select.extend({
  setValue: function(value,initial) {
    var res = this._super(value,initial);
    if(res !== undefined && res.changed && this.choices_instance) {
      this.choices_instance.setValue(res.value);
    }
  },
  setupChoices: function() {
    var options, self = this;

    if (this.choices_instance) return;
    if (window.Choices) {

      // Get options, either global options from "JSONEditor.defaults.options.choices" or
      // single property options from schema "options.choices"
      options = $extend({},JSONEditor.defaults.options.choices || {}, this.options.choices || {});

      this.choices_instance = new window.Choices(this.input, options);

/*      this.choices_instance.passedElement.element.addEventListener('change', function() {
        self.onInputChange();
      });*/

    }

  },
  updateChoicesOptions: function(select_options) {
    var choices_list = select_options.map(function(x) { return {value: x, label: x}; });
    this.choices_instance.setChoices(choices_list, 'value', 'label', true);
    this.choices_instance.setChoiceByValue(this.value);
  },
  onWatchedFieldChange: function() {
    var res = this._super();
    if (res !== undefined && res.changed) {
      if(this.choices_instance) {
        // Update the Choices options
                console.log('ff', res.select_options);
        this.updateChoicesOptions(res.select_options);
      }
      else {
        this.setupChoices();
      }
    }
  },
  postBuild: function() {
    this._super();
    this.setupChoices();
  },
  enable: function() {
    if (!this.always_disabled && this.choices_instance) this.choices_instance.enable();
    this._super();
  },
  disable: function(always_disabled) {
    if(this.choices_instance) this.choices_instance.disable();
    this._super(always_disabled);
  },
  destroy: function() {
    if(this.choices_instance) {
        this.choices_instance.destroy();
        this.choices_instance = null;
    }
    this._super();
  }
});