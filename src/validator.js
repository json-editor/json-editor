import { Class } from './class'
import { ipValidator } from './validators/ip-validator'
import { $extend, $each } from './utilities'

export const Validator = Class.extend({
  init: function (jsoneditor, schema, options, defaults) {
    this.jsoneditor = jsoneditor
    this.schema = schema || this.jsoneditor.schema
    this.options = options || {}
    this.translate = this.jsoneditor.translate || defaults.translate
    this.defaults = defaults
  },
  fitTest: function (value, givenSchema, weight) {
    weight = typeof weight === 'undefined' ? 10000000 : weight
    var matchedProperties = 0
    var extraProperties = 0
    if (typeof value === 'object' && value !== null) {
      // Work on a copy of the schema
      var schema = typeof givenSchema === 'undefined' ? $extend({}, this.jsoneditor.expandRefs(this.schema)) : givenSchema

      for (var i in schema.properties) {
        if (!schema.properties.hasOwnProperty(i)) {
          extraProperties += weight
          continue
        }
        if (typeof value[i] === 'object' && typeof schema.properties[i] === 'object' && typeof schema.properties[i].properties === 'object') {
          var result = this.fitTest(value[i], schema.properties[i], weight / 100)
          matchedProperties += result.match
          extraProperties += result.extra
        }
        if (typeof value[i] !== 'undefined') {
          matchedProperties += weight
        }
      }
    }
    return {
      match: matchedProperties, extra: extraProperties
    }
  },
  validate: function (value) {
    return this._validateSchema(this.schema, value)
  },
  _validateSchema: function (schema, value, path) {
    var self = this
    var errors = []
    var valid, i, j
    var stringified = JSON.stringify(value)

    path = path || 'root'

    // Work on a copy of the schema
    schema = $extend({}, this.jsoneditor.expandRefs(schema))

    /*
     * Type Agnostic Validation
     */

    // Version 3 `required` and `required_by_default`
    if (typeof value === 'undefined') {
      return this._validateV3Required(schema, value, path)
    }

    Object.keys(schema).forEach(key => {
      if (this._validateSubSchema[key]) {
        errors.push(...this._validateSubSchema[key].call(self, schema, value, path))
      }
    })

    /*
     * Type Specific Validation
     */

    // Number Specific Validation
    if (typeof value === 'number') {
      // `multipleOf` and `divisibleBy`
      // `maximum`
      // `minimum`
      Object.keys(schema).forEach(key => {
        if (this._validateNumberSubSchema[key]) {
          errors.push(...this._validateNumberSubSchema[key].call(self, schema, value, path))
        }
      })
    // String specific validation
    } else if (typeof value === 'string') {
      // `maxLength`
      // `minLength`
      // `pattern`
      Object.keys(schema).forEach(key => {
        if (this._validateStringSubSchema[key]) {
          errors.push(...this._validateStringSubSchema[key].call(self, schema, value, path))
        }
      })
    // Array specific validation
    } else if (typeof value === 'object' && value !== null && Array.isArray(value)) {
      // `items` and `additionalItems`
      // `maxItems`
      // `minItems`
      // `uniqueItems`
      Object.keys(schema).forEach(key => {
        if (this._validateArraySubSchema[key]) {
          errors.push(...this._validateArraySubSchema[key].call(self, schema, value, path))
        }
      })
    // Object specific validation
    } else if (typeof value === 'object' && value !== null) {
      const validatedProperties = {}
      // `maxProperties`
      // `minProperties`
      //  Version 4 `required`
      // `properties`
      // `patternProperties`
      Object.keys(schema).forEach(key => {
        if (this._validateObjectSubSchema[key]) {
          errors.push(...this._validateObjectSubSchema[key].call(self, schema, value, path, validatedProperties))
        }
      })

      // The no_additional_properties option currently doesn't work with extended schemas that use oneOf or anyOf
      if (typeof schema.additionalProperties === 'undefined' && this.jsoneditor.options.no_additional_properties && !schema.oneOf && !schema.anyOf) {
        schema.additionalProperties = false
      }

      // `additionalProperties`
      // `dependencies`
      Object.keys(schema).forEach(key => {
        if (typeof this._validateObjectSubSchema2[key] !== 'undefined') {
          errors.push(...this._validateObjectSubSchema2[key].call(self, schema, value, path, validatedProperties))
        }
      })
    }

    if (schema.links) {
      for (var m = 0; m < schema.links.length; m++) {
        if (schema.links[m].rel && schema.links[m].rel.toLowerCase() === 'describedby') {
          var href = schema.links[m].href
          var data = this.jsoneditor.root.getValue()
          // var template = new UriTemplate(href); //preprocessURI(href));
          // var ref = template.fillFromObject(data);
          var template = this.jsoneditor.compileTemplate(href, this.jsoneditor.template)
          var ref = document.location.origin + document.location.pathname + template(data)

          schema.links = schema.links.slice(0, m).concat(schema.links.slice(m + 1))

          schema = $extend({}, schema, this.jsoneditor.refs[ref])

          errors = errors.concat(this._validateSchema(schema, value, path, this.translate))
        }
      }
    }

    // date, time and datetime-local validation
    if (['date', 'time', 'datetime-local'].indexOf(schema.format) !== -1) {
      var validatorRx = {
        'date': /^(\d{4}\D\d{2}\D\d{2})?$/,
        'time': /^(\d{2}:\d{2}(?::\d{2})?)?$/,
        'datetime-local': /^(\d{4}\D\d{2}\D\d{2}[ T]\d{2}:\d{2}(?::\d{2})?)?$/
      }
      var format = {
        'date': '"YYYY-MM-DD"',
        'time': '"HH:MM"',
        'datetime-local': '"YYYY-MM-DD HH:MM"'
      }

      var ed = this.jsoneditor.getEditor(path)
      var dateFormat = (ed && ed.flatpickr) ? ed.flatpickr.config.dateFormat : format[schema.format]

      if (schema.type === 'integer') {
        // The value is a timestamp
        if (value * 1 < 1) {
          // If value is less than 1, then it's an invalid epoch date before 00:00:00 UTC Thursday, 1 January 1970
          errors.push({
            path: path,
            property: 'format',
            message: this.translate('error_invalid_epoch')
          })
        } else if (value !== Math.abs(parseInt(value))) {
          // not much to check for, so we assume value is ok if it's a positive number
          errors.push({
            path: path,
            property: 'format',
            message: this.translate('error_' + schema.format.replace(/-/g, '_'), [dateFormat])
          })
        }
      } else if (!ed || !ed.flatpickr) {
        // Standard string input, without flatpickr
        if (!validatorRx[schema.format].test(value)) {
          errors.push({
            path: path,
            property: 'format',
            message: this.translate('error_' + schema.format.replace(/-/g, '_'), [dateFormat])
          })
        }
      } else if (ed) {
        // Flatpickr validation
        if (value !== '') {
          var compareValue
          if (ed.flatpickr.config.mode !== 'single') {
            var seperator = ed.flatpickr.config.mode === 'range' ? ed.flatpickr.l10n.rangeSeparator : ', '
            var selectedDates = ed.flatpickr.selectedDates.map(function (val) {
              return ed.flatpickr.formatDate(val, ed.flatpickr.config.dateFormat)
            })
            compareValue = selectedDates.join(seperator)
          }

          try {
            if (compareValue) {
              // Not the best validation method, but range and multiple mode are special
              // Optimal solution would be if it is possible to change the return format from string/integer to array
              if (compareValue !== value) throw new Error(ed.flatpickr.config.mode + ' mismatch')
            } else if (ed.flatpickr.formatDate(ed.flatpickr.parseDate(value, ed.flatpickr.config.dateFormat), ed.flatpickr.config.dateFormat) !== value) {
              throw new Error('mismatch')
            }
          } catch (err) {
            var errorDateFormat = ed.flatpickr.config.errorDateFormat !== undefined ? ed.flatpickr.config.errorDateFormat : ed.flatpickr.config.dateFormat
            errors.push({
              path: path,
              property: 'format',
              message: this.translate('error_' + ed.format.replace(/-/g, '_'), [errorDateFormat])
            })
          }
        }
      }
    }

    // Internal validators using the custom validator format
    errors = errors.concat(ipValidator.call(self, schema, value, path, self.translate))

    // Custom type validation (global)
    $each(self.defaults.custom_validators, function (i, validator) {
      errors = errors.concat(validator.call(self, schema, value, path))
    })
    // Custom type validation (instance specific)
    if (this.options.custom_validators) {
      $each(this.options.custom_validators, function (i, validator) {
        errors = errors.concat(validator.call(self, schema, value, path))
      })
    }

    // Remove duplicate errors and add "errorcount" property
    errors = this._removeDuplicateErrors(errors)

    return errors
  },
  _validateV3Required: function (schema, value, path) {
    const errors = []
    if ((typeof schema.required !== 'undefined' && schema.required === true) || (typeof schema.required === 'undefined' && this.jsoneditor.options.required_by_default === true)) {
      errors.push({
        path: path,
        property: 'required',
        message: this.translate('error_notset')
      })
    }
    return errors
  },
  _validateSubSchema: {
    enum: function (schema, value, path) {
      let valid = false
      const stringified = JSON.stringify(value)
      const errors = []
      for (let i = 0; i < schema['enum'].length; i++) {
        if (stringified === JSON.stringify(schema['enum'][i])) valid = true
      }
      if (!valid) {
        errors.push({
          path: path,
          property: 'enum',
          message: this.translate('error_enum')
        })
      }
      return errors
    },
    extends: function (schema, value, path) {
      const errors = []
      for (let i = 0; i < schema['extends'].length; i++) {
        errors.push(...this._validateSchema(schema['extends'][i], value, path))
      }
      return errors
    },
    allOf: function (schema, value, path) {
      const errors = []
      for (let i = 0; i < schema.allOf.length; i++) {
        errors.push(...this._validateSchema(schema.allOf[i], value, path))
      }
      return errors
    },
    anyOf: function (schema, value, path) {
      let valid = false
      const errors = []
      for (let i = 0; i < schema.anyOf.length; i++) {
        if (!this._validateSchema(schema.anyOf[i], value, path).length) {
          valid = true
          break
        }
      }
      if (!valid) {
        errors.push({
          path: path,
          property: 'anyOf',
          message: this.translate('error_anyOf')
        })
      }
      return errors
    },
    oneOf: function (schema, value, path) {
      let valid = 0
      const oneofErrors = []
      const errors = []
      for (let i = 0; i < schema.oneOf.length; i++) {
        // Set the error paths to be path.oneOf[i].rest.of.path
        const tmp = this._validateSchema(schema.oneOf[i], value, path)
        if (!tmp.length) {
          valid++
        }

        for (let j = 0; j < tmp.length; j++) {
          tmp[j].path = path + '.oneOf[' + i + ']' + tmp[j].path.substr(path.length)
        }
        oneofErrors.push(...tmp)
      }
      if (valid !== 1) {
        errors.push({
          path: path,
          property: 'oneOf',
          message: this.translate('error_oneOf', [valid])
        })
        errors.push(...oneofErrors)
      }
      return errors
    },
    not: function (schema, value, path) {
      const errors = []
      if (!this._validateSchema(schema.not, value, path).length) {
        errors.push({
          path: path,
          property: 'not',
          message: this.translate('error_not')
        })
      }
      return errors
    },
    type: function (schema, value, path) {
      const errors = []
      let valid
      // Union type
      if (Array.isArray(schema.type)) {
        valid = false
        for (let i = 0; i < schema.type.length; i++) {
          if (this._checkType(schema.type[i], value)) {
            valid = true
            break
          }
        }
        if (!valid) {
          errors.push({
            path: path,
            property: 'type',
            message: this.translate('error_type_union')
          })
        }
      } else {
      // Simple type
        if (['date', 'time', 'datetime-local'].indexOf(schema.format) !== -1 && schema.type === 'integer') {
          // Hack to get validator to validate as string even if value is integer
          // As validation of 'date', 'time', 'datetime-local' is done in separate validator
          if (!this._checkType('string', '' + value)) {
            errors.push({
              path: path,
              property: 'type',
              message: this.translate('error_type', [schema.format])
            })
          }
        } else if (!this._checkType(schema.type, value)) {
          errors.push({
            path: path,
            property: 'type',
            message: this.translate('error_type', [schema.type])
          })
        }
      }
      return errors
    },
    disallow: function (schema, value, path) {
      const errors = []
      // Union type
      if (Array.isArray(schema.disallow)) {
        let valid = true
        for (let i = 0; i < schema.disallow.length; i++) {
          if (this._checkType(schema.disallow[i], value)) {
            valid = false
            break
          }
        }
        if (!valid) {
          errors.push({
            path: path,
            property: 'disallow',
            message: this.translate('error_disallow_union')
          })
        }
      } else {
        // Simple type
        if (this._checkType(schema.disallow, value)) {
          errors.push({
            path: path,
            property: 'disallow',
            message: this.translate('error_disallow', [schema.disallow])
          })
        }
      }
      return errors
    }
  },
  _validateNumberSubSchema: {
    multipleOf: function (schema, value, path) { return this._validateNumberSubSchemaMultipleDivisible(schema, value, path) },
    divisibleBy: function (schema, value, path) { return this._validateNumberSubSchemaMultipleDivisible(schema, value, path) },
    maximum: function (schema, value, path) {
      // Vanilla JS, prone to floating point rounding errors (e.g. .999999999999999 == 1)
      let valid = schema.exclusiveMaximum ? (value < schema.maximum) : (value <= schema.maximum)
      const errors = []

      // Use math.js is available
      if (window.math) {
        valid = window.math[schema.exclusiveMaximum ? 'smaller' : 'smallerEq'](
          window.math.bignumber(value),
          window.math.bignumber(schema.maximum)
        )
      } else if (window.Decimal) {
        // Use Decimal.js if available
        valid = (new window.Decimal(value))[schema.exclusiveMaximum ? 'lt' : 'lte'](new window.Decimal(schema.maximum))
      }

      if (!valid) {
        errors.push({
          path: path,
          property: 'maximum',
          message: this.translate(
            (schema.exclusiveMaximum ? 'error_maximum_excl' : 'error_maximum_incl'),
            [schema.maximum]
          )
        })
      }
      return errors
    },
    minimum: function (schema, value, path) {
      // Vanilla JS, prone to floating point rounding errors (e.g. .999999999999999 == 1)
      let valid = schema.exclusiveMinimum ? (value > schema.minimum) : (value >= schema.minimum)
      const errors = []

      // Use math.js is available
      if (window.math) {
        valid = window.math[schema.exclusiveMinimum ? 'larger' : 'largerEq'](
          window.math.bignumber(value),
          window.math.bignumber(schema.minimum)
        )
        // Use Decimal.js if available
      } else if (window.Decimal) {
        valid = (new window.Decimal(value))[schema.exclusiveMinimum ? 'gt' : 'gte'](new window.Decimal(schema.minimum))
      }

      if (!valid) {
        errors.push({
          path: path,
          property: 'minimum',
          message: this.translate(
            (schema.exclusiveMinimum ? 'error_minimum_excl' : 'error_minimum_incl'),
            [schema.minimum]
          )
        })
      }
      return errors
    }
  },
  _validateNumberSubSchemaMultipleDivisible: function (schema, value, path) {
    const divisor = schema.multipleOf || schema.divisibleBy
    const errors = []
    // Vanilla JS, prone to floating point rounding errors (e.g. 1.14 / .01 == 113.99999)
    let valid = (value / divisor === Math.floor(value / divisor))

    // Use math.js is available
    if (window.math) {
      valid = window.math.mod(window.math.bignumber(value), window.math.bignumber(divisor)).equals(0)
    } else if (window.Decimal) {
      // Use decimal.js is available
      valid = (new window.Decimal(value)).mod(new window.Decimal(divisor)).equals(0)
    }

    if (!valid) {
      errors.push({
        path: path,
        property: schema.multipleOf ? 'multipleOf' : 'divisibleBy',
        message: this.translate('error_multipleOf', [divisor])
      })
    }
    return errors
  },
  _validateStringSubSchema: {
    maxLength: function (schema, value, path) {
      const errors = []
      if (schema.maxLength) {
        if ((value + '').length > schema.maxLength) {
          errors.push({
            path: path,
            property: 'maxLength',
            message: this.translate('error_maxLength', [schema.maxLength])
          })
        }
      }
      return errors
    },
    // `minLength`
    minLength: function (schema, value, path) {
      const errors = []
      if (schema.minLength) {
        if ((value + '').length < schema.minLength) {
          errors.push({
            path: path,
            property: 'minLength',
            message: this.translate((schema.minLength === 1 ? 'error_notempty' : 'error_minLength'), [schema.minLength])
          })
        }
      }
      return errors
    },
    // `pattern`
    pattern: function (schema, value, path) {
      const errors = []
      if (schema.pattern) {
        if (!(new RegExp(schema.pattern)).test(value)) {
          errors.push({
            path: path,
            property: 'pattern',
            message: (schema.options && schema.options.patternmessage) ? schema.options.patternmessage : this.translate('error_pattern', [schema.pattern])
          })
        }
      }
      return errors
    }
  },
  _validateArraySubSchema: {
    items: function (schema, value, path) {
      const errors = []
      if (Array.isArray(schema.items)) {
        for (let i = 0; i < value.length; i++) {
          // If this item has a specific schema tied to it
          // Validate against it
          if (schema.items[i]) {
            errors.push(...this._validateSchema(schema.items[i], value[i], path + '.' + i))
          // If all additional items are allowed
          } else if (schema.additionalItems === true) {
            break
          // If additional items is a schema
          // TODO: Incompatibility between version 3 and 4 of the spec
          } else if (schema.additionalItems) {
            errors.push(...this._validateSchema(schema.additionalItems, value[i], path + '.' + i))
          // If no additional items are allowed
          } else if (schema.additionalItems === false) {
            errors.push({
              path: path,
              property: 'additionalItems',
              message: this.translate('error_additionalItems')
            })
            break
          // Default for `additionalItems` is an empty schema
          } else {
            break
          }
        }
      // `items` is a schema
      } else {
        // Each item in the array must validate against the schema
        for (let i = 0; i < value.length; i++) {
          errors.push(...this._validateSchema(schema.items, value[i], path + '.' + i))
        }
      }
      return errors
    },
    maxItems: function (schema, value, path) {
      const errors = []
      if (value.length > schema.maxItems) {
        errors.push({
          path: path,
          property: 'maxItems',
          message: this.translate('error_maxItems', [schema.maxItems])
        })
      }
      return errors
    },
    minItems: function (schema, value, path) {
      const errors = []
      if (value.length < schema.minItems) {
        errors.push({
          path: path,
          property: 'minItems',
          message: this.translate('error_minItems', [schema.minItems])
        })
      }
      return errors
    },
    uniqueItems: function (schema, value, path) {
      const errors = []
      const seen = {}
      let valid
      for (let i = 0; i < value.length; i++) {
        valid = JSON.stringify(value[i])
        if (seen[valid]) {
          errors.push({
            path: path,
            property: 'uniqueItems',
            message: this.translate('error_uniqueItems')
          })
          break
        }
        seen[valid] = true
      }
      return errors
    }
  },
  _validateObjectSubSchema: {
    maxProperties: function (schema, value, path) {
      const errors = []
      let valid = 0
      for (let i in value) {
        if (!value.hasOwnProperty(i)) continue
        valid++
      }
      if (valid > schema.maxProperties) {
        errors.push({
          path: path,
          property: 'maxProperties',
          message: this.translate('error_maxProperties', [schema.maxProperties])
        })
      }
      return errors
    },
    minProperties: function (schema, value, path) {
      const errors = []
      let valid = 0
      for (let i in value) {
        if (!value.hasOwnProperty(i)) continue
        valid++
      }
      if (valid < schema.minProperties) {
        errors.push({
          path: path,
          property: 'minProperties',
          message: this.translate('error_minProperties', [schema.minProperties])
        })
      }
      return errors
    },
    required: function (schema, value, path) {
      const errors = []
      if (Array.isArray(schema.required)) {
        for (let i = 0; i < schema.required.length; i++) {
          if (typeof value[schema.required[i]] === 'undefined') {
            var editor = this.jsoneditor.getEditor(path + '.' + schema.required[i])
            // Ignore required error if editor is of type "button" or "info"
            if (editor && ['button', 'info'].indexOf(editor.schema.format || editor.schema.type) !== -1) continue
            errors.push({
              path: path,
              property: 'required',
              message: this.translate('error_required', [schema.required[i]])
            })
          }
        }
      }
      return errors
    },
    properties: function (schema, value, path, validatedProperties) {
      const errors = []
      for (let i in schema.properties) {
        if (!schema.properties.hasOwnProperty(i)) continue
        validatedProperties[i] = true
        errors.push(...this._validateSchema(schema.properties[i], value[i], path + '.' + i))
      }
      return errors
    },
    patternProperties: function (schema, value, path, validatedProperties) {
      const errors = []
      for (let i in schema.patternProperties) {
        if (!schema.patternProperties.hasOwnProperty(i)) continue
        var regex = new RegExp(i)

        // Check which properties match
        for (let j in value) {
          if (!value.hasOwnProperty(j)) continue
          if (regex.test(j)) {
            validatedProperties[j] = true
            errors.push(...this._validateSchema(schema.patternProperties[i], value[j], path + '.' + j))
          }
        }
      }
      return errors
    }
  },
  _validateObjectSubSchema2: {
    additionalProperties: function (schema, value, path, validatedProperties) {
      const errors = []
      for (let i in value) {
        if (!value.hasOwnProperty(i)) continue
        if (!validatedProperties[i]) {
          // No extra properties allowed
          if (!schema.additionalProperties) {
            errors.push({
              path: path,
              property: 'additionalProperties',
              message: this.translate('error_additional_properties', [i])
            })
            break
          // Allowed
          } else if (schema.additionalProperties === true) {
            break
          // Must match schema
          // TODO: incompatibility between version 3 and 4 of the spec
          } else {
            errors.push(...this._validateSchema(schema.additionalProperties, value[i], path + '.' + i))
          }
        }
      }
      return errors
    },
    dependencies: function (schema, value, path) {
      const errors = []
      for (let i in schema.dependencies) {
        if (!schema.dependencies.hasOwnProperty(i)) continue

        // Doesn't need to meet the dependency
        if (typeof value[i] === 'undefined') continue

        // Property dependency
        if (Array.isArray(schema.dependencies[i])) {
          for (let j = 0; j < schema.dependencies[i].length; j++) {
            if (typeof value[schema.dependencies[i][j]] === 'undefined') {
              errors.push({
                path: path,
                property: 'dependencies',
                message: this.translate('error_dependency', [schema.dependencies[i][j]])
              })
            }
          }
        // Schema dependency
        } else {
          errors.push(...this._validateSchema(schema.dependencies[i], value, path))
        }
      }
      return errors
    }
  },
  _removeDuplicateErrors: function (errors) {
    return errors.reduce(function (err, obj) {
      var first = true
      if (!err) err = []
      err.forEach(function (a) {
        if (a.message === obj.message && a.path === obj.path && a.property === obj.property) {
          a.errorcount++
          first = false
        }
      })
      if (first) {
        obj.errorcount = 1
        err.push(obj)
      }
      return err
    }, [])
  },
  _checkType: function (type, value) {
    const types = {
      string: value => typeof value === 'string',
      number: value => typeof value === 'number',
      integer: value => typeof value === 'number' && value === Math.floor(value),
      boolean: value => typeof value === 'boolean',
      array: value => Array.isArray(value),
      object: value => value !== null && !(Array.isArray(value)) && typeof value === 'object',
      null: value => value === null
    }
    // Simple types
    if (typeof type === 'string') {
      if (types[type]) {
        return types[type](value)
      } else return true
    // Schema
    } else {
      return !this._validateSchema(type, value).length
    }
  }
})
