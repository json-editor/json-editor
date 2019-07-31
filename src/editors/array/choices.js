JSONEditor.defaults.editors.arrayChoices = JSONEditor.AbstractEditor.extend({
  preBuild: function() {
    var self = this;
    this.enum_options = [];
    this.enum_values = [];
    this.enum_display = [];

    // Enum options enumerated
    if(this.schema.items.enum) {
      var display = this.schema.options && this.schema.options.enum_titles || [];

      $each(this.schema.items.enum,function(i,option) {
        self.enum_options[i] = ""+option;
        self.enum_display[i] = ""+(display[i] || option);
        self.enum_values[i] = self.typecast(option);
      });
    }
    // Dynamic Enum for arrays is not specified in docs
  },
  build: function() {
    this.title = this.theme.getFormInputLabel(this.getTitle(), this.isRequired());

    this.title_controls = this.theme.getHeaderButtonHolder();
    this.title.appendChild(this.title_controls);
    this.error_holder = document.createElement('div');

    if(this.schema.description) {
      this.description = this.theme.getDescription(this.schema.description);
    }

    var is_enum = this.schema.items.enum && this.enum_options && this.enum_options.length > 0;
    if (is_enum) {
      this.input = this.theme.getSelectInput(this.enum_options);
      this.input.setAttribute('multiple', 'multiple');
    } else {
      this.input = this.theme.getFormInputField('text');
    }
    var group = this.theme.getFormControl(this.title, this.input, this.description);

    this.container.appendChild(group);
    this.container.appendChild(this.error_holder);

    //apply global options to array Choices
    var options = $extend({},JSONEditor.plugins.choices);
    if(this.schema.options && this.schema.options.choices_options) options = $extend(options,this.schema.options.choices_options);
    this.choices = new window.Choices(this.input, $extend(options, {
      removeItemButton: (options.removeItemButton === undefined ? true : options.removeItemButton),
      duplicateItemsAllowed: (options.duplicateItemsAllowed === undefined ? !this.schema.uniqueItems : options.duplicateItemsAllowed),
      editItems: (options.editItems === undefined ? !is_enum : options.editItems),
      maxItemCount: (options.maxItemCount === undefined ? (this.schema.maxItems > 0 ? this.schema.maxItems : -1) : options.maxItemCount),
      placeholder: (options.placeholder === undefined ? !is_enum : options.placeholder),
      placeholderValue: (options.placeholderValue === undefined ? this.translate('choices_placeholder_text') : options.placeholderValue),
    }));
  },
  postBuild: function() {
      this._super();
      var self = this;

      this.input.addEventListener('change', function(e) {
        e.preventDefault();
        e.stopPropagation();
        self.refreshValue();
        self.onChange(true);
      });
  },
  destroy: function() {
    this.empty(true);
    if(this.title && this.title.parentNode) this.title.parentNode.removeChild(this.title);
    if(this.description && this.description.parentNode) this.description.parentNode.removeChild(this.description);
    if(this.input && this.input.parentNode) this.input.parentNode.removeChild(this.input);

    this.choices.destroy();
    this.choices = null;

    this._super();
  },
  empty: function(hard) {},
  setValue: function(value, initial) {
    // Update the array's value, adding/removing rows when necessary
    value = value || [];
    if(!(Array.isArray(value))) value = [value];

    this.choices.clearStore();

    // var choice_values;
    if (this.schema.items.enum && this.enum_options && this.enum_options.length > 0) {
      var titles = this.enum_titles || [];
      var enum_options = this.enum_options;
      if (!this.choices.config.duplicateItemsAllowed) {
        enum_options = enum_options.filter(function(x) {
          return !value.includes(x);
        });
      }
      var choices_list = enum_options.map(function(x, idx) { return {value: x, label: titles[idx] || x}; });
      this.choices.setChoices(choices_list, 'value', 'label');
    }

    this.choices.setValue(value);

    this.refreshValue(initial);
  },
  refreshValue: function(force) {
    this.value = this.choices.getValue(true);
  },
  showValidationErrors: function(errors) {
    var self = this;

    // Get all the errors that pertain to this editor
    var my_errors = [];
    var other_errors = [];
    $each(errors, function(i,error) {
      if(error.path === self.path) {
        my_errors.push(error);
      }
      else {
        other_errors.push(error);
      }
    });

    // Show errors for this editor
    if(this.error_holder) {
      if(my_errors.length) {
        this.error_holder.innerHTML = '';
        this.error_holder.style.display = '';
        $each(my_errors, function(i,error) {
          self.error_holder.appendChild(self.theme.getErrorMessage(error.message));
        });
      }
      // Hide error area
      else {
        this.error_holder.style.display = 'none';
      }
    }
  },
  typecast: function(value) {
    if(this.schema.type === "boolean") {
      return !!value;
    }
    else if(this.schema.type === "number") {
      return 1*value;
    }
    else if(this.schema.type === "integer") {
      return Math.floor(value*1);
    }
    else {
      return ""+value;
    }
  }
});
