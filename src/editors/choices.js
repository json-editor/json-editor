JSONEditor.defaults.editors.choices = JSONEditor.AbstractEditor.extend({
    register: function() {
      this._super();
      if(!this.input) return;
      this.input.setAttribute('name',this.formname);
    },
    unregister: function() {
      this._super();
      if(!this.input) return;
      this.input.removeAttribute('name');
    },
    getNumColumns: function() {
      if(!this.enum_options) return 3;
      var longest_text = this.getTitle().length;
      for(var i=0; i<this.enum_options.length; i++) {
        longest_text = Math.max(longest_text,this.enum_options[i].length+4);
      }
      return Math.min(12,Math.max(longest_text/7,2));
    },
    typecast: function(value) {
      switch(this.schema.type) {
        case 'boolean':
          switch (value) {
            case 'true': return true;
            case 'false': return false;
          }
          return !!value;
        case 'number':
          return 1*value;
        case 'integer':
          return Math.floor(value*1);
        default:
          return ''+value;
      }
    },
    setValue: function(value, initial) {
      if(this.enum_options.length === 0) {
        return;
      }

      value = value || '';

      // Sanitize value before setting it
      var sanitized = '' + value;
      var index = this.enum_options.indexOf(sanitized);
      if(index === -1) {
        sanitized = this.enum_options[0];
        index = 0;
      }
      sanitized = this.typecast(sanitized);

      if(this.value === sanitized) {
        return;
      }

      this.input.value = this.enum_options[index];
      this.value = sanitized;

      if(this.choices) {
        this.choices.setChoiceByValue('' + sanitized);
      }

      this.onChange();
    },
    getValue: function() {
      if (!this.dependenciesFulfilled) {
        return undefined;
      }
      return this.value;
    },
    preBuild: function() {
      var self = this;
      this.input_type = 'select';
      this.enum_options = [];
      this.enum_titles = [];
      var i;

      // Enum options enumerated
      if(this.schema.enum) {
        var display = this.schema.options && this.schema.options.enum_titles || [];

        $each(this.schema.enum,function(i,option) {
          self.enum_options[i] = ''+option;
          self.enum_titles[i] = ''+(display[i] || option);
        });
      }
      // Boolean
      else if(this.schema.type === 'boolean') {
        self.enum_titles = this.schema.options && this.schema.options.enum_titles || ['true', 'false'];
        self.enum_options = ['true', 'false'];
      }
      // Dynamic Enum
      else if(this.schema.enumSource) {
        this.enumSource = [];
        this.enum_titles = [];
        this.enum_options = [];

        // Shortcut declaration for using a single array
        if(!(Array.isArray(this.schema.enumSource))) {
          if(this.schema.enumValue) {
            this.enumSource = [
              {
                source: this.schema.enumSource,
                value: this.schema.enumValue
              }
            ];
          }
          else {
            this.enumSource = [
              {
                source: this.schema.enumSource
              }
            ];
          }
        }
        else {
          for(i=0; i<this.schema.enumSource.length; i++) {
            // Shorthand for watched variable
            if(typeof this.schema.enumSource[i] === 'string') {
              this.enumSource[i] = {
                source: this.schema.enumSource[i]
              };
            }
            // Make a copy of the schema
            else if(!(Array.isArray(this.schema.enumSource[i]))) {
              this.enumSource[i] = $extend({},this.schema.enumSource[i]);
            }
            else {
              this.enumSource[i] = this.schema.enumSource[i];
            }
          }
        }

        // Now, enumSource is an array of sources
        // Walk through this array and fix up the values
        for(i=0; i<this.enumSource.length; i++) {
          if(this.enumSource[i].value) {
            this.enumSource[i].value = this.jsoneditor.compileTemplate(this.enumSource[i].value, this.template_engine);
          }
          if(this.enumSource[i].title) {
            this.enumSource[i].title = this.jsoneditor.compileTemplate(this.enumSource[i].title, this.template_engine);
          }
          if(this.enumSource[i].filter) {
            this.enumSource[i].filter = this.jsoneditor.compileTemplate(this.enumSource[i].filter, this.template_engine);
          }
        }
      }
      // Other, not supported
      else {
        throw "'select' editor requires the enum property to be set.";
      }
    },
    build: function() {
      var self = this;
      if(!this.options.compact) this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired());
      if(this.schema.description) this.description = this.theme.getFormInputDescription(this.schema.description);
      if(this.options.infoText) this.infoButton = this.theme.getInfoButton(this.options.infoText);

      if(this.options.compact) this.container.classList.add('compact');

      this.input = this.theme.getSelectInput(this.enum_options);
      this.theme.setSelectOptions(this.input,this.enum_options,this.enum_titles);

      if(this.schema.readOnly || this.schema.readonly) {
        this.always_disabled = true;
        this.input.disabled = true;
      }

      this.input.addEventListener('change',function(e) {
        e.preventDefault();
        e.stopPropagation();
        self.onInputChange();
      });

      this.control = this.theme.getFormControl(this.label, this.input, this.description, this.infoButton);
      this.container.appendChild(this.control);

      if(this.enum_options.length > 0) {
        this.value = this.typecast(this.enum_options[0]);
      }
    },
    onInputChange: function() {
      if(this.enum_options.length === 0) {
        return;
      }

      var index = this.enum_options.indexOf(this.input.value);
      if(index === -1) {
        this.input.value = this.enum_options[0];
        index = 0;
      }

      var value = this.typecast(this.enum_options[index]);

      if(value === this.value) {
        return;
      }

      this.value = value;
      this.onChange(true);
    },
    setupChoices: function() {
      if (window.Choices) {
        var options = $extend({}, JSONEditor.plugins.choices);
        if(this.schema.options && this.schema.options.choices_options) {
          options = $extend(options, this.schema.options.choices_options);
        }
        this.choices = new window.Choices(this.input, $extend(options, {
          searchEnabled: (options.searchEnabled === undefined ? this.enum_options.length > 2 : options.searchEnabled),
        }));
      }
      else {
        this.choices = null;
      }
    },
    postBuild: function() {
      this._super();
      this.theme.afterInputReady(this.input);
      this.setupChoices();
    },
    onWatchedFieldChange: function() {
      if(!this.enumSource) {
        return;
      }

      // If this editor uses a dynamic select box
      var vars = this.getWatchedFieldValues();
      var select_options = [];
      var select_titles = [];

      var j;
      for(var i=0; i<this.enumSource.length; i++) {
        // Constant values
        if(Array.isArray(this.enumSource[i])) {
          select_options = select_options.concat(this.enumSource[i]);
          select_titles = select_titles.concat(this.enumSource[i]);
        }
        // A watched field
        else if(vars[this.enumSource[i].source]) {
          var items = vars[this.enumSource[i].source];

          // Only use a predefined part of the array
          if(this.enumSource[i].slice) {
            items = Array.prototype.slice.apply(items,this.enumSource[i].slice);
          }
          // Filter the items
          if(this.enumSource[i].filter) {
            var new_items = [];
            for(j=0; j<items.length; j++) {
              if(this.enumSource[i].filter({i:j,item:items[j]})) new_items.push(items[j]);
            }
            items = new_items;
          }

          var item_titles = [];
          var item_values = [];
          for(j=0; j<items.length; j++) {
            var item = items[j];

            // Rendered value
            if(this.enumSource[i].value) {
              item_values[j] = this.enumSource[i].value({
                i: j,
                item: item
              });
            }
            // Use value directly
            else {
              item_values[j] = items[j];
            }

            // Rendered title
            if(this.enumSource[i].title) {
              item_titles[j] = this.enumSource[i].title({
                i: j,
                item: item
              });
            }
            // Use value as the title also
            else {
              item_titles[j] = item_values[j];
            }
          }

          select_options = select_options.concat(item_values);
          select_titles = select_titles.concat(item_titles);
        }
      }

      this.theme.setSelectOptions(this.input, select_options, select_titles);
      this.enum_options = select_options;
      this.enum_titles = select_titles;

      if (select_options.length > 0) {
        // if the previous value is not in the new select options, set the value to the first option
        if (this.value === undefined || select_options.indexOf('' + this.value) === -1) {
          this.input.value = select_options[0];
          this.value = this.typecast(select_options[0]);
          this.onChange(true);
        }
      }
      else if (this.value !== undefined) {
        this.input.value = '';
        this.value = undefined;
        this.onChange(true);
      }

      if(this.choices) {
        this.updateChoicesOptions(select_options);
      }

      this._super();
    },
    updateChoicesOptions: function(select_options) {
      if (select_options.length > 0) {
        var choices_list = select_options.map(function(x) { return {value: x, label: x}; });
        this.choices.setChoices(choices_list, 'value', 'label', true);
        this.choices.setChoiceByValue('' + this.value);
      } else {
        this.choices.clearStore();
      }
    },
    enable: function() {
      if(!this.always_disabled) {
        this.input.disabled = false;
        if(this.choices) {
          this.choices.enable();
        }
        this._super();
      }
    },
    disable: function(always_disabled) {
      if(always_disabled) this.always_disabled = true;
      this.input.disabled = true;
      if(this.choices) {
        this.choices.disable();
      }
      this._super();
    },
    destroy: function() {
      if(this.label && this.label.parentNode) this.label.parentNode.removeChild(this.label);
      if(this.description && this.description.parentNode) this.description.parentNode.removeChild(this.description);
      if(this.input && this.input.parentNode) this.input.parentNode.removeChild(this.input);
      if(this.choices) {
        this.choices.destroy();
        this.choices = null;
      }
      this._super();
    }
});
