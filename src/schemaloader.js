import { Class } from './class'
import { $each, $extend } from './utilities'

export const SchemaLoader = Class.extend({
  init: function (refs, options) {
    this.refs_with_info = {}
    this.refs_prefix = '#/counter/'
    this.refs_counter = 1
    this.options = options || {}
    this.refs = refs || {}
  },

  load: function (schema, callback, fetchUrl, location) {
    var self = this
    this._loadExternalRefs(schema, function () {
      self._getDefinitions(schema, fetchUrl + '#/definitions/')
      callback(self.expandRefs(schema))
    }, fetchUrl, self._getFileBase(location))
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
  _getFileBase: function () {
    var fileBase = this.options.ajaxBase
    if (typeof fileBase === 'undefined') {
      fileBase = this._getFileBaseFromFileLocation(document.location.toString())
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
  expandRefs: function (schema, recurseAllOf) {
    schema = $extend({}, schema)

    while (schema.$ref) {
      var refObj = this.refs_with_info[schema.$ref]
      delete schema.$ref
      var fetchUrl = ''
      if (refObj.$ref.startsWith('#')) {
        fetchUrl = refObj.fetchUrl
      }
      var ref = fetchUrl + refObj.$ref
      if (!this.refs[ref]) ref = fetchUrl + decodeURIComponent(refObj.$ref)
      if (!this.refs[ref]) { // if reference not found
        console.warn("reference:'" + ref + "' not found!")
        break
      }
      if (recurseAllOf) {
        if (this.refs[ref].hasOwnProperty('allOf')) {
          var allOf = this.refs[ref].allOf
          for (var i = 0; i < allOf.length; i++) {
            allOf[i] = this.expandRefs(allOf[i], true)
          }
        }
      }
      schema = this.extendSchemas(schema, this.expandSchema(this.refs[ref]))
      // schema = this.extendSchemas(schema, $extend({}, this.refs[ref]))
    }
    return schema
  },
  expandSchema: function (schema, fileBase) {
    var self = this
    var extended = $extend({}, schema)
    var i

    // Version 3 `type`
    if (typeof schema.type === 'object') {
      schema.type = this._expandSubSchema(schema.type)
    }

    // Version 3 `disallow`
    if (typeof schema.disallow === 'object') {
      schema.disallow = this._expandSubSchema(schema.disallow)
    }

    // Version 4 `anyOf`
    if (schema.anyOf) {
      $each(schema.anyOf, function (key, value) {
        schema.anyOf[key] = self.expandSchema(value)
      })
    }
    // Version 4 `dependencies` (schema dependencies)
    if (schema.dependencies) {
      $each(schema.dependencies, function (key, value) {
        if (typeof value === 'object' && !(Array.isArray(value))) {
          schema.dependencies[key] = self.expandSchema(value)
        }
      })
    }
    // Version 4 `not`
    if (schema.not) {
      schema.not = this.expandSchema(schema.not)
    }

    // allOf schemas should be merged into the parent
    if (schema.allOf) {
      for (i = 0; i < schema.allOf.length; i++) {
        schema.allOf[i] = this.expandRefs(schema.allOf[i], true)
        extended = this.extendSchemas(extended, this.expandSchema(schema.allOf[i]))
      }
      delete extended.allOf
    }
    // extends schemas should be merged into parent
    if (schema.extends) {
      // If extends is a schema
      if (!(Array.isArray(schema.extends))) {
        extended = this.extendSchemas(extended, this.expandSchema(schema.extends))
      } else {
        // If extends is an array of schemas
        for (i = 0; i < schema.extends.length; i++) {
          extended = this.extendSchemas(extended, this.expandSchema(schema.extends[i]))
        }
      }
      delete extended.extends
    }
    // parent should be merged into oneOf schemas
    if (schema.oneOf) {
      var tmp = $extend({}, extended)
      delete tmp.oneOf
      for (i = 0; i < schema.oneOf.length; i++) {
        extended.oneOf[i] = this.extendSchemas(this.expandSchema(schema.oneOf[i]), tmp)
      }
    }

    return this.expandRefs(extended)
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
  extendSchemas: function (obj1, obj2) {
    obj1 = $extend({}, obj1)
    obj2 = $extend({}, obj2)

    var self = this
    var extended = {}
    $each(obj1, function (prop, val) {
      // If this key is also defined in obj2, merge them
      if (typeof obj2[prop] !== 'undefined') {
        // Required and defaultProperties arrays should be unioned together
        if ((prop === 'required' || prop === 'defaultProperties') && typeof val === 'object' && Array.isArray(val)) {
          // Union arrays and unique
          extended[prop] = val.concat(obj2[prop]).reduce(function (p, c) {
            if (p.indexOf(c) < 0) p.push(c)
            return p
          }, [])
        } else if (prop === 'type' && (typeof val === 'string' || Array.isArray(val))) {
          // Type should be intersected and is either an array or string
          // Make sure we're dealing with arrays
          if (typeof val === 'string') val = [val]
          if (typeof obj2.type === 'string') obj2.type = [obj2.type]

          // If type is only defined in the first schema, keep it
          if (!obj2.type || !obj2.type.length) {
            extended.type = val
          } else {
            // If type is defined in both schemas, do an intersect
            extended.type = val.filter(function (n) {
              return obj2.type.indexOf(n) !== -1
            })
          }

          // If there's only 1 type and it's a primitive, use a string instead of array
          if (extended.type.length === 1 && typeof extended.type[0] === 'string') {
            extended.type = extended.type[0]
          } else if (extended.type.length === 0) {
            // Remove the type property if it's empty
            delete extended.type
          }
        } else if (typeof val === 'object' && !Array.isArray(val) && val !== null) {
          // Objects should be recursively merged
          extended[prop] = self.extendSchemas(val, obj2[prop])
        } else {
          // Otherwise, use the first value
          extended[prop] = val
        }
      } else {
        // Otherwise, just use the one in obj1
        extended[prop] = val
      }
    })
    // Properties in obj2 that aren't in obj1
    $each(obj2, function (prop, val) {
      if (typeof obj1[prop] === 'undefined') {
        extended[prop] = val
      }
    })

    return extended
  }
})
