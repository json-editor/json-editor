import { StringEditor } from './string';
import { $extend, $each } from '../utilities';

export var IpEditor = StringEditor.extend({

  preBuild: function() {
    this._super();
    this.pattern = '';
    this.patternmessage = '';

    if (this.schema.format == 'hostname') {
      // https://www.regextester.com/103452
      this.pattern = '(?=^.{4,253}$)(^((?!-)[a-zA-Z0-9-]{0,62}[a-zA-Z0-9]\.)+[a-zA-Z]{2,63}$)';
      this.patternmessage = this.options.patternmessage || this.translate('error_hostname');
    }
    else if (this.schema.format == 'ipv6') {
      this.pattern = '^(?:(?:(?:[a-fA-F0-9]{1,4}:){6}|(?=(?:[a-fA-F0-9]{0,4}:){2,6}(?:[0-9]{1,3}\.){3}[0-9]{1,3}$)(([0-9a-fA-F]{1,4}:){1,5}|:)((:[0-9a-fA-F]{1,4}){1,5}:|:)|::(?:[a-fA-F0-9]{1,4}:){5})(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])|(?:[a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4}|(?=(?:[a-fA-F0-9]{0,4}:){0,7}[a-fA-F0-9]{0,4}$)(([0-9a-fA-F]{1,4}:){1,7}|:)((:[0-9a-fA-F]{1,4}){1,7}|:)|(?:[a-fA-F0-9]{1,4}:){7}:|:(:[a-fA-F0-9]{1,4}){7})$';
      this.patternmessage = this.options.patternmessage || this.translate('error_ipv6');
      // Set cleave options if no existing options is present
      if (this.schema.options && !this.schema.options.cleave) this.schema.options.cleave = {
          delimiters: [':'],
          blocks: [4, 4, 4, 4, 4, 4, 4, 4],
          uppercase: true
        };
    }
    else {
      this.pattern = '^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$';
      this.patternmessage = this.options.patternmessage || this.translate('error_ipv4');
      // Set cleave options if no existing options is present
      if (this.schema.options && !this.schema.options.cleave) this.schema.options.cleave = {
          delimiters: ['.'],
          blocks: [3, 3, 3, 3],
          numericOnly: true
        };
    }

    if (this.jsoneditor.validator.schema["extends"] ) this.setValidatorPatterns(this.jsoneditor.validator.schema["extends"]);
    else if (this.jsoneditor.validator.schema.allOf) this.setValidatorPatterns(this.jsoneditor.validator.schema.allOf);
    else if (this.jsoneditor.validator.schema.anyOf) this.setValidatorPatterns(this.jsoneditor.validator.schema.anyOf);
    else if (this.jsoneditor.validator.schema.oneOf) this.setValidatorPatterns(this.jsoneditor.validator.schema.oneOf);
    else if (this.jsoneditor.validator.schema.properties) {
      // Set custom pattern error validation message
      if (!this.jsoneditor.validator.schema.properties[this.key].options) this.jsoneditor.validator.schema.properties[this.key].options = {};
      this.options.patternmessage = this.jsoneditor.validator.schema.properties[this.key].options.patternmessage = this.patternmessage;
      // Force pattern validation
      this.jsoneditor.validator.schema.properties[this.key].pattern = this.schema.pattern = this.pattern;
    }

    // Update options object
    this.options = $extend(this.options, this.schema.options || {});
  },
  setValidatorPatterns: function(validator) {
    for (var i=0;i<validator.length;i++) {
      // Set custom pattern error validation message
      if (!validator[i].properties[this.key].options) validator[i].properties[this.key].options = {};
      this.options.patternmessage = validator[i].properties[this.key].options.patternmessage = this.patternmessage;
      // Force pattern validation
      validator[i].properties[this.key].pattern = this.schema.pattern = this.pattern;
    }
  }
});
