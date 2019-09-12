import { StringEditor } from './string';
import { $extend, $each } from '../utilities';

export var IpEditor = StringEditor.extend({

  getPattern: function (format) {
    switch (format) {
      case 'hostname':
        return '(?=^.{4,253}$)(^((?!-)[a-zA-Z0-9-]{0,62}[a-zA-Z0-9]\.)+[a-zA-Z]{2,63}$)';
      case 'ipv6':
        return '^(?:(?:(?:[a-fA-F0-9]{1,4}:){6}|(?=(?:[a-fA-F0-9]{0,4}:){2,6}(?:[0-9]{1,3}\.){3}[0-9]{1,3}$)(([0-9a-fA-F]{1,4}:){1,5}|:)((:[0-9a-fA-F]{1,4}){1,5}:|:)|::(?:[a-fA-F0-9]{1,4}:){5})(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])|(?:[a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4}|(?=(?:[a-fA-F0-9]{0,4}:){0,7}[a-fA-F0-9]{0,4}$)(([0-9a-fA-F]{1,4}:){1,7}|:)((:[0-9a-fA-F]{1,4}){1,7}|:)|(?:[a-fA-F0-9]{1,4}:){7}:|:(:[a-fA-F0-9]{1,4}){7})$';
      case 'ipv4':
      default:
        return '^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$';
    }
  },

  getPatternMessage: function (format) {
    switch (format) {
      case 'hostname':
        return this.options.patternmessage || this.translate('error_hostname');
      case 'ipv6':
        return this.options.patternmessage || this.translate('error_ipv6');
      case 'ipv4':
      default:
        return this.options.patternmessage || this.translate('error_ipv4');
    }
  },

  getCleaveOptions: function (format) {
    switch (format) {
      case 'ipv6':
        return {
          delimiters: [':'],
          blocks: [4, 4, 4, 4, 4, 4, 4, 4],
          uppercase: true
        };
      case 'ipv4':
      default:
        return {
          delimiters: ['.'],
          blocks: [3, 3, 3, 3],
          numericOnly: true
        };
    }
  },

  preBuild: function () {
    this._super();

    // Create schema options object if deesn't exist
    if (!this.schema.options) {
      this.schema.options = {};
    }

    // Get the patterns
    var pattern = this.getPattern(this.schema.format);
    var patternmessage = this.getPatternMessage(this.schema.format);

    // Create cleave options if they don't exist
    if (!this.schema.options.cleave) {
      this.schema.options.cleave = this.getCleaveOptions(this.schema.format);
    }

    // Set up the validator
    if (this.jsoneditor.validator.schema["extends"]) this.setPatternsForInherited(this.jsoneditor.validator.schema["extends"], pattern, patternmessage);
    else if (this.jsoneditor.validator.schema.allOf) this.setPatternsForInherited(this.jsoneditor.validator.schema.allOf, pattern, patternmessage);
    else if (this.jsoneditor.validator.schema.anyOf) this.setPatternsForInherited(this.jsoneditor.validator.schema.anyOf, pattern, patternmessage);
    else if (this.jsoneditor.validator.schema.oneOf) this.setPatternsForInherited(this.jsoneditor.validator.schema.oneOf, pattern, patternmessage);
    else if (this.jsoneditor.validator.schema.properties) this.setPatternsForProperties(pattern, patternmessage);

    // Update options object
    this.options = $extend(this.options, this.schema.options || {});
  },

  // Set patterns for non-inheritance schema
  setPatternsForProperties: function (pattern, patternmessage) {
    // Set custom pattern error validation message
    if (!this.jsoneditor.validator.schema.properties[this.key].options) this.jsoneditor.validator.schema.properties[this.key].options = {};
    this.options.patternmessage = this.jsoneditor.validator.schema.properties[this.key].options.patternmessage = patternmessage;
    // Force pattern validation
    this.jsoneditor.validator.schema.properties[this.key].pattern = this.schema.pattern = pattern;

  },

  // Set validator pattern for: extends, allOf, anyOf and oneOf 
  setPatternsForInherited: function (validator, pattern, patternmessage) {
    if (!validator) return;
    for (var i = 0; i < validator.length; i++) {
      // Set custom pattern error validation message
      if (!validator[i].properties[this.key].options) validator[i].properties[this.key].options = {};
      this.options.patternmessage = validator[i].properties[this.key].options.patternmessage = patternmessage;
      // Force pattern validation
      validator[i].properties[this.key].pattern = this.schema.pattern = pattern;
    }
  }
});
