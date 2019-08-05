JSONEditor.defaults.editors.radio = JSONEditor.defaults.editors.select.extend({
  preBuild: function() {
    this.schema.required = true; // force editor into required mode to prevent creation of empty radio button
    this._super();
  },
  build: function () {
    var self = this;
    this.label = '';
    if(!this.options.compact) this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired());
    if(this.schema.description) this.description = this.theme.getFormInputDescription(this.schema.description);
    if(this.options.infoText) this.infoButton = this.theme.getInfoButton(this.options.infoText);
    if(this.options.compact) this.container.classList.add('compact');

    this.radioContainer = document.createElement('div');

    this.radioGroup = [];

    var radioInputEventhandler = function(e) {
      self.setValue(this.value);
      self.onChange(true);
    };

    for(var i = 0; i < this.enum_values.length; i++) {

      // form radio elements
      this.input = this.theme.getFormRadio({
        name: this.formname,
        id: this.formname + '[' + i + ']',
        value: this.enum_values[i]
      });

      // Set custom attributes on input element. Parameter is array of protected keys. Empty array if none.
      this.setInputAttributes(['id', 'value', 'name']);

      this.input.addEventListener('change', radioInputEventhandler, false);
      this.radioGroup.push(this.input);

      // form-label for radio elements
      var radioLabel = this.theme.getFormRadioLabel(this.enum_display[i]);
      radioLabel.htmlFor = this.input.id;

      var control = this.theme.getFormRadioControl(radioLabel, this.input, this.options.compact);

      this.radioContainer.appendChild(control);

    }

    if(this.schema.readOnly || this.schema.readonly) {
      this.always_disabled = true;
      for (var j = 0; j < this.radioGroup.length; j++) {
        this.radioGroup[j].disabled = true;
      }
      this.radioContainer.classList.add('readonly');
    }

    var radioContainerWrapper = this.theme.getContainer();
    radioContainerWrapper.appendChild(this.radioContainer);

    this.input = radioContainerWrapper;

    this.control = this.theme.getFormControl(this.label, radioContainerWrapper, this.description, this.infoButton);
    this.container.appendChild(this.control);
  },
  enable: function() {
    if(!this.always_disabled) {
      for (var i = 0; i<this.radioGroup.length; i++) {
        this.radioGroup[i].disabled = false;
      }
      this.radioContainer.classList.remove('readonly');
      this._super();
    }
  },
  disable: function(always_disabled) {
    if(always_disabled) this.always_disabled = true;
    for (var i = 0; i<this.radioGroup.length; i++) {
      this.radioGroup[i].disabled = true;
    }
    this.radioContainer.classList.add('readonly');
    this._super();
  },
  destroy: function() {
    if(this.radioContainer.parentNode && this.radioContainer.parentNode.parentNode) this.radioContainer.parentNode.parentNode.removeChild(this.radioContainer.parentNode);
    if(this.label && this.label.parentNode) this.label.parentNode.removeChild(this.label);
    if(this.description && this.description.parentNode) this.description.parentNode.removeChild(this.description);
    this._super();
  },
  getNumColumns: function() {
    return 2;
  },
  setValue: function (val) {
    for(var i = 0; i < this.radioGroup.length; i++) {
      if(this.radioGroup[i].value == val) {
        this.radioGroup[i].checked = true;
        this.value = val;
        this.onChange();
        break;
      }
    }
  }
});
