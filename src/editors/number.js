JSONEditor.defaults.editors.number = JSONEditor.defaults.editors.string.extend({
  build: function() {
    this._super();

    if (typeof this.schema.minimum !== "undefined") {
      var minimum = this.schema.minimum;

      if (typeof this.schema.exclusiveMinimum !== "undefined") {
        minimum += 1;
      }

      this.input.setAttribute("min", minimum);
    }

    if (typeof this.schema.maximum !== "undefined") {
      var maximum = this.schema.maximum;

      if (typeof this.schema.exclusiveMaximum !== "undefined") {
        maximum -= 1;
      }

      this.input.setAttribute("max", maximum);
    }

    if (typeof this.schema.step !== "undefined") {
      var step = this.schema.step || 1;
      this.input.setAttribute("step", step);
    }

    // Set custom attributes on input element. Parameter is array of protected keys. Empty array if none.
    this.setInputAttributes(['maxlength', 'pattern', 'readonly', 'min', 'max', 'step']);

  },
  sanitize: function(value) {
    return (value+"").replace(/[^0-9\.\-eE]/g,'');
  },
  getNumColumns: function() {
    return 2;
  },
  getValue: function() {
    if (!this.dependenciesFulfilled) {
      return undefined;
    }
    return this.value===''?undefined:this.value*1;
  }
});
