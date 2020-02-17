import { Class } from './class'
import { $each, $extend } from './utilities'

export const SchemaLoader = Class.extend({
  init: function (options) {
    this.options = options || {}
    this.refs = this.options.refs || {}
    this.refs_with_info = {}
    this.refs_prefix = '#/counter/'
    this.refs_counter = 1
  },

  load: function (schema, callback, fetchUrl, location) {
    var self = this
    this._loadExternalRefs(schema, function () {
      self._getDefinitions(schema, fetchUrl + '#/definitions/')
      callback(self.expandRefs(schema))
    }, fetchUrl, self._getFileBase(location))
  },
  expandRefs: function (schema, recurseAllOf) {
    var _schema = $extend({}, schema)
    if (!_schema.$ref) return _schema

    var refObj = this.refs_with_info[_schema.$ref]
    delete _schema.$ref
    var fetchUrl = refObj.$ref.startsWith('#')
      ? refObj.fetchUrl
      : ''
    var ref = this._getRef(fetchUrl, refObj)
    if (!this.refs[ref]) { // if reference not found
      console.warn("reference:'" + ref + "' not found!")
    } else if (recurseAllOf && this.refs[ref].hasOwnProperty('allOf')) {
      var allOf = this.refs[ref].allOf
      for (var i = 0; i < allOf.length; i++) {
        allOf[i] = this.expandRefs(allOf[i], true)
      }
    }
    return this.extendSchemas(_schema, this.expandSchema(this.refs[ref]))
  },
  expandSchema: function (schema, fileBase) {
    Object.entries(this._subSchema1).forEach(([key, func]) => {
      if (schema[key]) {
        func.call(this, schema)
      }
    })

    let extended = $extend({}, schema)

    Object.entries(this._subSchema2).forEach(([key, func]) => {
      if (schema[key]) {
        extended = func.call(this, schema, extended)
      }
    })

    return this.expandRefs(extended)
  },
  _subSchema1: {
    // Version 3 `type`
    type: function (schema) {
      if (typeof schema.type === 'object') {
        schema.type = this._expandSubSchema(schema.type)
      }
    },
    // Version 3 `disallow`
    disallow: function (schema) {
      if (typeof schema.disallow === 'object') {
        schema.disallow = this._expandSubSchema(schema.disallow)
      }
    },
    // Version 4 `anyOf`
    anyOf: function (schema) {
      $each(schema.anyOf, (key, value) => {
        schema.anyOf[key] = this.expandSchema(value)
      })
    },
    // Version 4 `dependencies` (schema dependencies)
    dependencies: function (schema) {
      $each(schema.dependencies, (key, value) => {
        if (typeof value === 'object' && !(Array.isArray(value))) {
          schema.dependencies[key] = this.expandSchema(value)
        }
      })
    },
    // Version 4 `not`
    not: function (schema) {
      schema.not = this.expandSchema(schema.not)
    }
  },
  _subSchema2: {
    // allOf schemas should be merged into the parent
    allOf: function (schema, extended) {
      let _extended = $extend({}, extended)
      for (let i = 0; i < schema.allOf.length; i++) {
        schema.allOf[i] = this.expandRefs(schema.allOf[i], true)
        _extended = this.extendSchemas(_extended, this.expandSchema(schema.allOf[i]))
      }
      delete _extended.allOf
      return _extended
    },
    // extends schemas should be merged into parent
    extends: function (schema, extended) {
      let _extended
      // If extends is a schema
      if (!(Array.isArray(schema.extends))) {
        _extended = this.extendSchemas(extended, this.expandSchema(schema.extends))
      } else {
        // If extends is an array of schemas
        _extended = schema.extends.reduce((e, s, i) => {
          return this.extendSchemas(e, this.expandSchema(s))
        }, extended)
      }
      delete _extended.extends
      return _extended
    },
    // parent should be merged into oneOf schemas
    oneOf: function (schema, extended) {
      const tmp = $extend({}, extended)
      delete tmp.oneOf
      schema.oneOf.reduce((e, s, i) => {
        e.oneOf[i] = this.extendSchemas(this.expandSchema(s), tmp)
        return e
      }, extended)
      return extended
    }
  },
  _getRef: function (fetchUrl, refObj) {
    var ref = fetchUrl + refObj
    return this.refs[ref]
      ? ref
      : fetchUrl + decodeURIComponent(refObj.$ref)
  },
  _expandSubSchema: function (subschema) {
    // Array of types
    if (Array.isArray(subschema)) {
      var self = this
      var mapped = subschema.map(function (m) {
        return typeof value === 'object'
          ? self.expandSchema(m)
          : m
      })
      return mapped
    } else {
      // Schema
      return this.expandSchema(subschema)
    }
  },
  _getDefinitions: function (schema, path) {
    if (schema.definitions) {
      for (var i in schema.definitions) {
        if (!schema.definitions.hasOwnProperty(i)) continue
        this.refs[path + i] = schema.definitions[i]
        if (schema.definitions[i].definitions) {
          this._getDefinitions(schema.definitions[i], path + i + '/definitions/')
        }
      }
    }
  },
  _getExternalRefs: function (schema, fetchUrl) {
    var refs = {}
    var mergeRefs = function (newrefs) {
      for (var i in newrefs) {
        if (newrefs.hasOwnProperty(i)) {
          refs[i] = true
        }
      }
    }

    if (schema.$ref && typeof schema.$ref !== 'object') {
      var refCounter = this.refs_prefix + this.refs_counter++
      if (schema.$ref.substr(0, 1) !== '#' && !this.refs[schema.$ref]) {
        refs[schema.$ref] = true
      }
      this.refs_with_info[refCounter] = { fetchUrl: fetchUrl, $ref: schema.$ref }
      schema.$ref = refCounter
    }

    for (var i in schema) {
      if (!schema.hasOwnProperty(i)) continue
      if (!schema[i] || typeof schema[i] !== 'object') continue
      if (Array.isArray(schema[i])) {
        for (var j = 0; j < schema[i].length; j++) {
          if (schema[i][j] && typeof schema[i][j] === 'object') {
            mergeRefs(this._getExternalRefs(schema[i][j], fetchUrl))
          }
        }
      } else {
        mergeRefs(this._getExternalRefs(schema[i], fetchUrl))
      }
    }
    return refs
  },
  _getFileBase: function (location) {
    var fileBase = this.options.ajaxBase
    if (typeof fileBase === 'undefined') {
      fileBase = this._getFileBaseFromFileLocation(location)
    }
    return fileBase
  },
  _getFileBaseFromFileLocation: function (fileLocationString) {
    var pathItems = fileLocationString.split('/')
    pathItems.pop()
    return pathItems.join('/') + '/'
  },
  _isLocalUrl: function (url, fileBase) {
    return fileBase !== url.substr(0, fileBase.length) &&
      url.substr(0, 4) !== 'http' &&
      url.substr(0, 1) !== '/'
  },
  _loadExternalRefs: function (schema, callback, fetchUrl, fileBase) {
    var self = this
    var refs = this._getExternalRefs(schema, fetchUrl)
    var done = 0; var waiting = 0; var callbackFired = false

    $each(refs, function (url) {
      if (self.refs[url]) return
      if (!self.options.ajax) throw new Error('Must set ajax option to true to load external ref ' + url)
      self.refs[url] = 'loading'
      waiting++

      var fetchUrl = self._isLocalUrl(fileBase, url) ? fileBase + url : url

      // eslint-disable-next-line no-undef
      var r = new XMLHttpRequest()
      r.overrideMimeType('application/json')
      r.open('GET', fetchUrl, true)
      if (self.options.ajaxCredentials) r.withCredentials = self.options.ajaxCredentials
      r.onreadystatechange = function () {
        if (r.readyState !== 4) return
        // Request succeeded
        if (r.status === 200) {
          var response
          try {
            response = JSON.parse(r.responseText)
          } catch (e) {
            window.console.log(e)
            throw new Error('Failed to parse external ref ' + fetchUrl)
          }
          if (!(typeof response === 'boolean' || typeof response === 'object') || response === null || Array.isArray(response)) {
            throw new Error('External ref does not contain a valid schema - ' + fetchUrl)
          }

          self.refs[url] = response
          var fileBase = self._getFileBaseFromFileLocation(fetchUrl)
          self._getDefinitions(response, fetchUrl + '#/definitions/')
          self._loadExternalRefs(response, function () {
            done++
            if (done >= waiting && !callbackFired) {
              callbackFired = true
              callback()
            }
          }, fetchUrl, fileBase)
        } else {
          // Request failed
          window.console.log(r)
          throw new Error('Failed to fetch ref via ajax- ' + url)
        }
      }
      r.send()
    })

    if (!waiting) {
      callback()
    }
  },
  extendSchemas: function (obj1, obj2) {
    obj1 = $extend({}, obj1)
    obj2 = $extend({}, obj2)

    const extended = {}
    const isRequiredOrDefaultProperties = (prop, val) => (prop === 'required' || prop === 'defaultProperties') && typeof val === 'object' && Array.isArray(val)
    const merge = (prop, val) => {
      // Required and defaultProperties arrays should be unioned together
      if (isRequiredOrDefaultProperties(prop, val)) {
        // Union arrays and unique
        extended[prop] = val.concat(obj2[prop]).reduce((p, c) => {
          if (p.indexOf(c) < 0) p.push(c)
          return p
        }, [])
      } else if (prop === 'type' && (typeof val === 'string' || Array.isArray(val))) {
        mergeType(val)
      } else if (typeof val === 'object' && !Array.isArray(val) && val !== null) {
        // Objects should be recursively merged
        extended[prop] = this.extendSchemas(val, obj2[prop])
      } else {
        // Otherwise, use the first value
        extended[prop] = val
      }
    }
    const mergeType = (val) => {
      // Type should be intersected and is either an array or string
      // Make sure we're dealing with arrays
      if (typeof val === 'string') val = [val]
      if (typeof obj2.type === 'string') obj2.type = [obj2.type]

      // If type is only defined in the first schema, keep it
      if (!obj2.type || !obj2.type.length) {
        extended.type = val
      } else {
        // If type is defined in both schemas, do an intersect
        extended.type = val.filter(n => obj2.type.indexOf(n) !== -1)
      }

      // If there's only 1 type and it's a primitive, use a string instead of array
      if (extended.type.length === 1 && typeof extended.type[0] === 'string') {
        extended.type = extended.type[0]
      } else if (extended.type.length === 0) {
        // Remove the type property if it's empty
        delete extended.type
      }
    }
    $each(obj1, (prop, val) => {
      // If this key is also defined in obj2, merge them
      if (typeof obj2[prop] !== 'undefined') {
        merge(prop, val)
      } else {
        // Otherwise, just use the one in obj1
        extended[prop] = val
      }
    })
    // Properties in obj2 that aren't in obj1
    $each(obj2, (prop, val) => {
      if (typeof obj1[prop] === 'undefined') {
        extended[prop] = val
      }
    })
    return extended
  }
})
