JSONEditor.defaults.editors.datetime = JSONEditor.defaults.editors.string.extend({
  build: function () {
    this._super();
    if(!this.input) return;

    // Add placeholder text if available
    if (this.options.placeholder) this.input.setAttribute('placeholder', this.options.placeholder);

    // helper functions
    this.zeroPad = function(value) {
      return ('0' + value).slice(-2);
    };

    if(window.flatpickr && typeof this.options.flatpickr == 'object') {

      // Make sure that flatpickr settings matches the input type
      this.options.flatpickr.enableTime = this.schema.format == 'date' ? false : true;
      this.options.flatpickr.noCalendar = this.schema.format == 'time' ? true : false;

      // only string can contain range or multiple values
      if (this.schema.type == 'integer') this.options.flatpickr.mode = 'single';

      var input = this.input;

      if (this.options.flatpickr.wrap === true) {

        // Make sure "inline" option is turned off
        this.options.flatpickr.inline = false;

        // Create input-group container
        var buttonContainer = document.createElement('div');
        buttonContainer.className = 'input-group';

        // Insert container after input field
        this.input.parentNode.insertBefore(buttonContainer, this.input.nextSibling);

        // Move input into container
        buttonContainer.appendChild(this.input);

        // Attribute for flatpicker
        this.input.setAttribute('data-input','');

        // Create button group and button
        var buttonGroup = document.createElement('div');
        buttonGroup.className = 'input-group-btn';
        var button = this.getButton('',this.schema.format == 'time' ? 'time' :'calendar', this.translate('flatpickr_button'));

        // Attribute for flatpicker
        button.setAttribute('data-toggle','');

        buttonGroup.appendChild(button);
        buttonContainer.appendChild(buttonGroup);

        input = buttonContainer;
      }

      this.flatpickr = window.flatpickr(input, this.options.flatpickr);

      if (this.options.flatpickr.inline === true && this.options.flatpickr.inlineHideInput === true) {
          this.input.setAttribute('type','hidden');
      }
    }
  },
  getValue: function() {
    if (!this.dependenciesFulfilled) {
      return undefined;
    }
    if (this.schema.type == 'string') {
      return this.value;
    }
    if (this.value === '' || this.value === undefined) {
      return undefined;
    }

    var value =  this.schema.format == 'time' ? '1970-01-01 ' + this.value : this.value;
    return parseInt(new Date(value).getTime() / 1000);
  },
  setValue: function(value, initial, from_template) {
    if (this.schema.type == 'string') {
      this._super();
    }
    else {
      var dateValue, dateObj = new Date(value * 1000),
          year = dateObj.getFullYear(),
          month = this.zeroPad(dateObj.getMonth() + 1),
          day = this.zeroPad(dateObj.getDate()),
          hour = this.zeroPad(dateObj.getHours()),
          min = this.zeroPad(dateObj.getMinutes()),
          sec = this.zeroPad(dateObj.getSeconds()),
          date = [year, month, day].join('-'),
          time = [hour, min, sec].join(':');

      if (this.schema.format == 'date') dateValue = date;
      else if (this.schema.format == 'time') dateValue = time;
      else dateValue = date + ' ' + time;

      this.value = dateValue;
    }
  },
  destroy: function() {
    if (this.flatpickr) this.flatpickr.destroy();
    this.flatpickr = null;
    this._super();
  }
});

JSONEditor.defaults.custom_validators.push(function(schema, value, path) {
  var errors = [];

  if(['date', 'time', 'datetime-local'].indexOf(schema.format) != -1) {

    var validator = {
        'date': /^(\d{4}\D\d{2}\D\d{2})?$/,
        'time': /^(\d{2}:\d{2}(?::\d{2})?)?$/,
        'datetime-local': /^(\d{4}\D\d{2}\D\d{2} \d{2}:\d{2}(?::\d{2})?)?$/
    };
    var format = {
        'date': '"YYYY-MM-DD"',
        'time': '"HH:MM"',
        'datetime-local': '"YYYY-MM-DD HH:MM"'
    };

    var ed = this.jsoneditor.getEditor(path);

    if (schema.type == 'integer') {
      // The value is a timestamp
      // not much to check for, so we assume value is ok if it's a positive number
      if (value != Math.abs(parseInt(value))) {
        var dateFormat = ed.flatpickr ? ed.flatpickr.config.dateFormat : format[ed.format];
        errors.push({
          path: path,
          property: 'format',
          message: this.translate('error_' + ed.format.replace(/-/g, "_"), [dateFormat])
        });
      }
    }
    else if (!ed.flatpickr) {
      // Standard string input, without flatpickr
      if(!validator[ed.format].test(value)) {
        errors.push({
          path: path,
          property: 'format',
          message: this.translate('error_' + ed.format.replace(/-/g, "_"), [format[ed.format]])
        });
      }
    }
    else {
      // Flatpickr validation
      if (value !== '') {

        var compareValue;
        if(ed.flatpickr.config.mode != 'single') {
          var seperator = ed.flatpickr.config.mode == 'range' ? ed.flatpickr.l10n.rangeSeparator : ', ';
          var selectedDates = ed.flatpickr.selectedDates.map(function(val) {
              return ed.flatpickr.formatDate(val, ed.flatpickr.config.dateFormat);
          });
          compareValue = selectedDates.join(seperator);
        }

        try {
          if (compareValue) {
            // Not the best validation method, but range and multiple mode are special
            // Optimal solution would be if it is possible to change the field format from string/integer to array
            // in these 2 special cases.
            if (compareValue != value) throw ed.flatpickr.config.mode + ' mismatch';
          }
          else if (ed.flatpickr.formatDate(ed.flatpickr.parseDate(value, ed.flatpickr.config.dateFormat), ed.flatpickr.config.dateFormat) != value) throw 'mismatch';
        }
        catch(err) {
          errors.push({
            path: path,
            property: 'format',
            message: this.translate('error_' + ed.format.replace(/-/g, "_"), [ed.flatpickr.config.dateFormat])
          });
        }
      }
    }
  }

  return errors;
});
