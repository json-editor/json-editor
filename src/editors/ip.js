JSONEditor.defaults.editors.ip = JSONEditor.defaults.editors.string.extend({
  preBuild: function() {
    this._super();
    var pattern, patternmessage;

    if (this.schema.format == 'hostname') {
      // https://www.regextester.com/103452
      pattern = '(?=^.{4,253}$)(^((?!-)[a-zA-Z0-9-]{0,62}[a-zA-Z0-9]\.)+[a-zA-Z]{2,63}$)';
      patternmessage = this.options.patternmessage || this.translate('error_hostname');
    }
    else if (this.schema.format == 'ipv6') {
      pattern = '^(?:(?:(?:[a-fA-F0-9]{1,4}:){6}|(?=(?:[a-fA-F0-9]{0,4}:){2,6}(?:[0-9]{1,3}\.){3}[0-9]{1,3}$)(([0-9a-fA-F]{1,4}:){1,5}|:)((:[0-9a-fA-F]{1,4}){1,5}:|:)|::(?:[a-fA-F0-9]{1,4}:){5})(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])|(?:[a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4}|(?=(?:[a-fA-F0-9]{0,4}:){0,7}[a-fA-F0-9]{0,4}$)(([0-9a-fA-F]{1,4}:){1,7}|:)((:[0-9a-fA-F]{1,4}){1,7}|:)|(?:[a-fA-F0-9]{1,4}:){7}:|:(:[a-fA-F0-9]{1,4}){7})$';
      patternmessage = this.options.patternmessage || this.translate('error_ipv6');
      // Set cleave options if no existing options is present
      if (this.schema.options && !this.schema.options.cleave) this.schema.options.cleave = {
          delimiters: [':'],
          blocks: [4, 4, 4, 4, 4, 4, 4, 4],
          uppercase: true
        };
    }
    else {
      pattern = '^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$';
      patternmessage = this.options.patternmessage || this.translate('error_ipv4');
      // Set cleave options if no existing options is present
      if (this.schema.options && !this.schema.options.cleave) this.schema.options.cleave = {
          delimiters: ['.'],
          blocks: [3, 3, 3, 3],
          numericOnly: true
        };
    }

    // Set custom pattern error validation message
    if (!this.jsoneditor.validator.schema.properties[this.key].options) this.jsoneditor.validator.schema.properties[this.key].options = {};
    this.options.patternmessage = this.jsoneditor.validator.schema.properties[this.key].options.patternmessage = patternmessage;

    // Force pattern validation
    this.jsoneditor.validator.schema.properties[this.key].pattern = this.schema.pattern = pattern;

  }
});
