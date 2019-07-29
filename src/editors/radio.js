JSONEditor.defaults.editors.radio = JSONEditor.defaults.editors.select.extend({
  build: function () {
    var self = this;

    if(!this.options.compact) this.header = this.label = this.theme.getFormInputLabel(this.getTitle());
    if(this.schema.description) this.description = this.theme.getFormInputDescription(this.schema.description);
    if(this.options.infoText) this.infoButton = this.theme.getInfoButton(this.options.infoText);
    if(this.options.compact) this.container.classList.add('compact');

    this.radioContainer = document.createElement('div');

    this.radioGroup = [];

    var radioInputEventhandler = function(e) {
      e.preventDefault();
      e.stopPropagation();
      self.setValue(this.value);
      self.onChange(true);
    };

    for(var i = 0; i < this.enum_values.length; i++) {

      var id = this.key + '-' + i;

      // form radio elements
      var radioInput = this.theme.getFormInputField('radio');
      radioInput.name = this.formname;
      radioInput.value = this.enum_values[i];
      radioInput.id = id;
      radioInput.classList.add('radio__field');
      radioInput.addEventListener('change', radioInputEventhandler, false);
      this.radioGroup.push(radioInput);

      // form-label for radio elements
      var radioLabel = document.createElement('label');
      radioLabel.htmlFor = id;
      radioLabel.classList.add('radio');

      // contains the displayed text to the label
      var radioLabelText = document.createElement('span');
      radioLabelText.innerText = this.enum_display[i];
      radioLabelText.classList.add('radio__label');

      // permits the addition of styles for the radio itself (if you want it to look differently than browser default)
      var radioLabelIcon = document.createElement('span');
      radioLabelIcon.classList.add('radio__icon');

      radioLabel.appendChild(radioInput);
      radioLabel.appendChild(radioLabelIcon);
      radioLabel.appendChild(radioLabelText);

      this.radioContainer.appendChild(radioLabel);
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
        if(this.options.displayValue) {
          this.displayRating.innerHTML = this.value;
        }
        this.onChange();
        break;
      }
    }
  }
});
