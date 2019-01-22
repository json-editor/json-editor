/*

Edtended handling of date, time and datetime-local type fields.

Works with both string and integer data types. (default only support string type)

Has optional support for using flatpickr datepicker.
All flatpickr options is supported with a few minor differences.
- "enableTime" and "noCalendar" are set automatically, based on the data type.
- Extra config option "errorDateFormat". If this is set, it will replace the format displayed in error messages.
- It is not possible to use "inline" and "wrap" options together.
- When using the "wrap" option, "toggle" and "clear" buttons are automatically added to markup. 2 extra boolean options ("showToggleButton" and "showClearButton") are available to control which buttons to display. Note: not all frameworks supports this. (Works in: Bootstrap and Foundation)
- When using the "inline" option, an extra boolean option ("inlineHideInput") is available to hide the original input field.
- If "mode" is set to either "multiple" or "range", only string data type is supported. Also the result from these is returned as a string not an array.

ToDo:
 - Improve Handling of flatpicker "multiple" and "range" modes. (Currently the values are just added as string values, but the optimal scenario would be to save those as array if possible)

*/
JSONEditor.defaults.editors.datetime = JSONEditor.defaults.editors.string.extend({
  build: function () {
    this._super();
    if(!this.input) return;

    if(window.flatpickr && typeof this.options.flatpickr == 'object') {

      // Make sure that flatpickr settings matches the input type
      this.options.flatpickr.enableTime = this.schema.format == 'date' ? false : true;
      this.options.flatpickr.noCalendar = this.schema.format == 'time' ? true : false;

      // Curently only string can contain range or multiple values
      if (this.schema.type == 'integer') this.options.flatpickr.mode = 'single';

      // Attribute for flatpicker
      this.input.setAttribute('data-input','');

      var input = this.input;

      if (this.options.flatpickr.wrap === true) {

        // Create buttons for input group
        var buttons = [];
        if (this.options.flatpickr.showToggleButton !== false) {
          var toggleButton = this.getButton('',this.schema.format == 'time' ? 'time' :'calendar', this.translate('flatpickr_toggle_button'));
          // Attribute for flatpicker
          toggleButton.setAttribute('data-toggle','');
          buttons.push(toggleButton);
        }
        if (this.options.flatpickr.showClearButton !== false) {
          var clearButton = this.getButton('','clear', this.translate('flatpickr_clear_button'));
          // Attribute for flatpicker
          clearButton.setAttribute('data-clear','');
          buttons.push(clearButton);
        }

        // Save position of input field
        var parentNode = this.input.parentNode, nextSibling = this.input.nextSibling;

        var buttonContainer = this.theme.getInputGroup(this.input, buttons);
        if (buttonContainer !== undefined) {
          // Make sure "inline" option is turned off
          this.options.flatpickr.inline = false;

          // Insert container at same position as input field
          parentNode.insertBefore(buttonContainer, nextSibling);

          input = buttonContainer;
        }
        else {
          this.options.flatpickr.wrap = false;
        }

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
      this._super(value, initial, from_template);
      if (this.flatpickr) this.flatpickr.setDate(value);
    }
    else if (value > 0) {
      var dateObj = new Date(value * 1000),
          year = dateObj.getFullYear(),
          month = this.zeroPad(dateObj.getMonth() + 1),
          day = this.zeroPad(dateObj.getDate()),
          hour = this.zeroPad(dateObj.getHours()),
          min = this.zeroPad(dateObj.getMinutes()),
          sec = this.zeroPad(dateObj.getSeconds()),
          date = [year, month, day].join('-'),
          time = [hour, min, sec].join(':'),
          dateValue = date + ' ' + time;

      if (this.schema.format == 'date') dateValue = date;
      else if (this.schema.format == 'time') dateValue = time;

      this.input.value = dateValue;
      if (this.flatpickr) this.flatpickr.setDate(dateValue);
    }
  },
  destroy: function() {
    if (this.flatpickr) this.flatpickr.destroy();
    this.flatpickr = null;
    this._super();
  },
  // helper function
  zeroPad: function(value) {
    return ('0' + value).slice(-2);
  }
});
