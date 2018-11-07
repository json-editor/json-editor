JSONEditor.defaults.editors.starrating = JSONEditor.defaults.editors.string.extend({
  build: function () {
    var self = this;

    if(!this.options.compact) this.header = this.label = this.theme.getFormInputLabel(this.getTitle());
    if(this.schema.description) this.description = this.theme.getFormInputDescription(this.schema.description);
    if(this.options.infoText) this.infoButton = this.theme.getInfoButton(this.options.infoText);
    if(this.options.compact) this.container.classList.add('compact');

    this.ratingContainer = document.createElement('div');
    this.ratingContainer.classList.add('starrating');

    this.enum_values = this.schema.enum;
    this.radioGroup =[];

    var radioInputEventhandler = function(e) {
      e.preventDefault();
      e.stopPropagation();
      self.setValue(this.value);
      self.onChange(true);
    };

    for(var i = this.enum_values.length-1; i>-1; i--) {

      var id = this.key + '-' + i;

      // form radio elements
      var radioInput = this.theme.getFormInputField('radio');
      radioInput.name = this.formname + '[starrating]';
      radioInput.value = this.enum_values[i];
      radioInput.id = id;
      radioInput.addEventListener('change', radioInputEventhandler, false);
      this.radioGroup.push(radioInput);

      // form-label for radio elements
      var radioLabel = document.createElement('label');
      radioLabel.htmlFor = id;
      radioLabel.title = this.enum_values[i];
      if(this.options.displayValue) {
        radioLabel.classList.add('starrating-display-enabled');
      }

      this.ratingContainer.appendChild(radioInput);
      this.ratingContainer.appendChild(radioLabel);

    }

    if(this.options.displayValue) {
      this.displayRating = document.createElement('div');
      this.displayRating.classList.add('starrating-display');
      this.displayRating.innerText = this.enum_values[0];
      this.ratingContainer.appendChild(this.displayRating);
    }

    if(this.schema.readOnly || this.schema.readonly) {
      this.always_disabled = true;
      for (var j = 0; i<this.radioGroup.length; j++) {
        this.radioGroup[j].disabled = true;
      }
      this.ratingContainer.classList.add('readonly');
    }

    var ratingsContainerWrapper = this.theme.getContainer();
    ratingsContainerWrapper.appendChild(this.ratingContainer);

    this.input = ratingsContainerWrapper;
    
    this.control = this.theme.getFormControl(this.label, ratingsContainerWrapper, this.description, this.infoButton);
    this.container.appendChild(this.control);
  },
  enable: function() {
    if(!this.always_disabled) {
      for (var i = 0; i<this.radioGroup.length; i++) {
        this.radioGroup[i].disabled = false;
      }
      this.ratingContainer.classList.remove('readonly');
      this._super();
    }
  },
  disable: function(always_disabled) {
    if(always_disabled) this.always_disabled = true;
    for (var i = 0; i<this.radioGroup.length; i++) {
      this.radioGroup[i].disabled = true;
    }
    this.ratingContainer.classList.add('readonly');
    this._super();
  },
  destroy: function() {
    if(this.ratingContainer.parentNode && this.ratingContainer.parentNode.parentNode) this.ratingContainer.parentNode.parentNode.removeChild(this.ratingContainer.parentNode);
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
