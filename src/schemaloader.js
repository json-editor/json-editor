import { extend, hasOwnProperty } from './utilities.js'

/**
 * Handles loading Schema and tracking references.
 */
export class SchemaLoader {
  constructor (options) {
    /**
     * @prop {object}
     *  Options of the schema. @see readme.
     */
    this.options = options || {}

    /**
     * @prop {object}
     *  The orginial schema to load
     */
    this.schema = {}

    /**
     * @prop {object}
     *  Storage of External ref. Exemple :
     *  refs = {
     *    "fully/realized/path/to/schema.json": { ... }
     *    "mylocalschema.json": { ... }
     *  }
     *  NOTE: keys are base part of original $ref without fragment
     */
    this.refs = this.options.refs || {}

    /**
     * @prop {object}
     *  Mapping between the schema and ref. Exemple:
     *  refs_with_info = {
     *   "#/counter/1": "fully/realized/path/to/schema.json"
     *   "#/counter/2": "mylocalschema.json"
     *  }
     */
    this.refs_with_info = {}

    /**
     * @prop {string}
     *  String to eewrite external ref with.
     */
    this.refs_prefix = '#/counter/'

    /**
     * @prop {int}
     *  Counter of ref
     */
    this.refs_counter = 1

    this._subSchema1 = {
      /* Version 3 `type` */
      type (schema) {
        if (typeof schema.type === 'object') {
          schema.type = this._expandSubSchema(schema.type)
        }
      },
      /* Version 3 `disallow` */
      disallow (schema) {
        if (typeof schema.disallow === 'object') {
          schema.disallow = this._expandSubSchema(schema.disallow)
        }
      },
      /* Version 4 `anyOf` */
      anyOf (schema) {
        Object.entries(schema.anyOf).forEach(([key, value]) => {
          schema.anyOf[key] = this.expandSchema(value)
        })
      },
      /* Version 4 `dependencies` (schema dependencies) */
      dependencies (schema) {
        Object.entries(schema.dependencies).forEach(([key, value]) => {
          if (typeof value === 'object' && !(Array.isArray(value))) {
            schema.dependencies[key] = this.expandSchema(value)
          }
        })
      },
      /* Version 4 `not` */
      not (schema) {
        schema.not = this.expandSchema(schema.not)
      }
    }

    this._subSchema2 = {
      /* allOf schemas should be merged into the parent */
      allOf (schema, extended) {
        let _extended = extend({}, extended)
        Object.entries(schema.allOf).forEach(([key, value]) => {
          schema.allOf[key] = this.expandRefs(value, true)
          _extended = this.extendSchemas(_extended, this.expandSchema(value))
        })
        delete _extended.allOf
        return _extended
      },
      /* extends schemas should be merged into parent */
      extends (schema, extended) {
        let _extended
        /* If extends is a schema */
        if (!(Array.isArray(schema.extends))) {
          _extended = this.extendSchemas(extended, this.expandSchema(schema.extends))
        } else {
          /* If extends is an array of schemas */
          _extended = schema.extends.reduce((e, s, i) => {
            return this.extendSchemas(e, this.expandSchema(s))
          }, extended)
        }
        delete _extended.extends
        return _extended
      },
      /* parent should be merged into oneOf schemas */
      oneOf (schema, extended) {
        const tmp = extend({}, extended)
        delete tmp.oneOf
        schema.oneOf.reduce((e, s, i) => {
          e.oneOf[i] = this.extendSchemas(this.expandSchema(s), tmp)
          return e
        }, extended)
        return extended
      }
    }
  }

  /**
   * Fully loads and expands JSON schema for a provided schema object and URL.
   *
   * The callback receives a expanded JSON Schema object with references
   * replaced with loaded schemas.
   *
   * @param {object} schema - A JSON Schema.
   * @param {string} fetchUrl - Base path from which to store the definitions.
   *   Typically the URI of the schema.
   * @param {*} location - The base URL from which to load relative paths.
   * @returns {object} A JSON Schema with references expanded.
   */
  async load (schema, fetchUrl, location) {
    this.schema = schema
    await this._asyncloadExternalRefs(schema, fetchUrl, this._getFileBase(location), true)
    return this.expandRefs(schema)
  }

  /**
   * Recursively expands loaded references in a provided schema.
   *
   * @param {object} schema - A JSON Schema with references already loaded.
   * @param {boolean} recurseAllOf - Set true to recurse allOf properties.
   * @returns {object} A JSON Schema with references expanded.
   */
  expandRefs (schema, recurseAllOf) {
    const _schema = extend({}, schema)

    if (!_schema.$ref) return _schema
    // This split the ref to get the Json point if it exists
    // exemple #/counter/1#/definition/address +
    // [1] -> /counter/1
    // [2] -> /definition/address
    let refWithPointerSplit = _schema.$ref.split('#')
    // If local ref
    if (refWithPointerSplit.length === 2 && !this.refs_with_info[_schema.$ref]) {
      const sub = this.expandRecursivePointer(this.schema, refWithPointerSplit[1])
      const expandedSchema = this.extendSchemas(_schema, this.expandSchema(sub))
      delete expandedSchema.$ref
      return expandedSchema
    }
    const refObj = (refWithPointerSplit.length > 2)
      ? this.refs_with_info['#' + refWithPointerSplit[1]]
      : this.refs_with_info[_schema.$ref]
    const refPointersTail = refWithPointerSplit.slice(2)
    delete _schema.$ref
    const fetchUrl = refObj.$ref.startsWith('#')
      ? refObj.fetchUrl
      : ''
    const ref = this._getRef(fetchUrl, refObj)

    // lookup schema via .refs[refBase] and dereference via JSON-pointer from ref
    refWithPointerSplit = ref.split('#')
    let refBase = ref
    let refPointers = []
    if (refWithPointerSplit.length > 1) {
      refBase = refWithPointerSplit[0]
      refPointers = refWithPointerSplit.slice(1)
    }
    if (!this.refs[refBase]) { /* if reference not found */
      // eslint-disable-next-line no-console
      console.warn(`reference:'${ref}' not found!`)
    }
    let refSchema = this.refs[refBase]
    while (refPointers.length > 0) {
      refSchema = this.expandRecursivePointer(refSchema, refPointers.shift())
    }

    // further expand JSON-pointer from tail of original fragment [2, ...]
    while (refPointersTail.length > 0) {
      refSchema = this.expandRecursivePointer(refSchema, refPointersTail.shift())
    }

    if (recurseAllOf && hasOwnProperty(refSchema, 'allOf')) {
      const allOf = refSchema.allOf
      Object.keys(allOf).forEach(key => {
        allOf[key] = this.expandRefs(allOf[key], true)
      })
    }
    return this.extendSchemas(_schema, this.expandSchema(refSchema))
  }

  /**
  * Returns a subschema based on a JSON Pointer path.
  * @param {object} schema - Schema too into
  * @param {string} pointer - path to look for
  * @param {object} original_schema - the Original schema
  * @returns the subschema pointed to by the path
  */
  expandRecursivePointer (schema, pointer) {
    let subschema = schema
    pointer.split('/').slice(1).forEach(i => {
      if (subschema[i]) {
        subschema = subschema[i]
      }
    })
    // If the result is a pointer, let's go for another turn
    if (subschema.$refs && subschema.$refs.startsWith('#')) {
      return this.expandRecursivePointer(schema, subschema.$refs)
    }
    return subschema
  }

  /**
   * Expands a JSON schema and its references.
   *
   * @param {object} schema - A JSON Schema with references already loaded.
   * @returns {object} A JSON Schema with references expanded.
   */
  expandSchema (schema) {
    Object.entries(this._subSchema1).forEach(([key, func]) => {
      if (schema[key]) {
        func.call(this, schema)
      }
    })

    let extended = extend({}, schema)

    Object.entries(this._subSchema2).forEach(([key, func]) => {
      if (schema[key]) {
        extended = func.call(this, schema, extended)
      }
    })

    return this.expandRefs(extended)
  }

  _getRef (fetchUrl, refObj) {
    const ref = fetchUrl + refObj

    return this.refs[ref] ? ref : fetchUrl + decodeURIComponent(refObj.$ref)
  }

  _expandSubSchema (subschema) {
    /* Array of types */
    if (Array.isArray(subschema)) return subschema.map(m => typeof m === 'object' ? this.expandSchema(m) : m)

    /* Schema */
    return this.expandSchema(subschema)
  }

  /**
   * Rewrite the passed schema's JSON pointers to prepend with the current reference's path, so that it will be converted to a reference "counter".
   *
   * @example
   * In file "../otherreferencedfile.json", referenced from "schema.json":
   *
   * "$ref": "#/definitions/myschema" => "$ref": "../path/to/my/referenced/schemafile.json#/definitions/myschema"
   *   ...which will then be parsed later in loadExternalReferences() to "$ref": "#/counter/1#/definitions/myschema"
   *
   * @param {object} schema - A JSON Schema with the definitions key present.
   * @param {string} path - Base path from which to store the definitions in refs. (exemple ../path/to/my/referenced/schemafile.json)
   *   Typically the URI of the schema.
   */
  _manageRecursivePointer (schema, path) {
    Object.keys(schema).forEach(i => {
      if (schema[i] && schema[i].$ref && schema[i].$ref.indexOf('#') === 0) {
        schema[i].$ref = path + schema[i].$ref
      }
    })
  }

  /**
   * Recursively parse a (sub)schema to populate loader reference info.
   *
   * @param {object} schema - A JSON Schema
   * @param {string} fetchUrl - Base path from which to store the definitions.
   * @param {boolean} firstIteration - Is it the first time we load this function? Help making difference between external ref vs internal pointer
   * @returns {array} Refs in the format of uri => true if external.
   */
  _getExternalRefs (schema, fetchUrl, firstIteration = false) {
    if (!firstIteration) this._manageRecursivePointer(schema, fetchUrl)
    const refs = {}
    const mergeRefs = newrefs => Object.keys(newrefs).forEach(i => { refs[i] = true })
    if (schema.$ref && typeof schema.$ref !== 'object' && !(schema.$ref.indexOf('#') === 0 && firstIteration)) {
      let refBase = schema.$ref
      let pointer = ''
      // Strip any JSON pointers found for external refs.
      if (refBase.indexOf('#') > 0) refBase = refBase.substr(0, refBase.indexOf('#'))
      if (refBase !== schema.$ref) pointer = schema.$ref.substr(schema.$ref.indexOf('#'))
      // We use a fragment idenfier to track json pointer in top of our pointer
      const refCounter = this.refs_prefix + this.refs_counter++
      const refPointer = refCounter + pointer
      if (schema.$ref.substr(0, 1) !== '#' && !this.refs[schema.$ref]) {
        refs[refBase] = true
      }
      this.refs_with_info[refCounter] = { fetchUrl, $ref: refBase }
      schema.$ref = refPointer
    }

    Object.values(schema).forEach(value => {
      if (!value || typeof value !== 'object') return
      if (Array.isArray(value)) {
        Object.values(value).forEach(e => {
          if (e && typeof e === 'object') {
            mergeRefs(this._getExternalRefs(e, fetchUrl, firstIteration))
          }
        })
      } else {
        // Merge Ref if it's not a Pointer
        if (!value.$ref || !(typeof value.$ref === 'string' && value.$ref.startsWith('#'))) {
          mergeRefs(this._getExternalRefs(value, fetchUrl, firstIteration))
        }
      }
    })

    if (schema.id && typeof schema.id === 'string' && schema.id.substr(0, 4) === 'urn:') {
      this.refs[schema.id] = schema
    } else if (schema.$id && typeof schema.$id === 'string' && schema.$id.substr(0, 4) === 'urn:') {
      this.refs[schema.$id] = schema
    }
    return refs
  }

  _getFileBase (location) {
    if (!location) return '/'

    const { ajaxBase } = this.options

    return typeof ajaxBase === 'undefined' ? this._getFileBaseFromFileLocation(location) : ajaxBase
  }

  _getFileBaseFromFileLocation (fileLocationString) {
    const pathItems = fileLocationString.split('/')
    pathItems.pop()
    return `${pathItems.join('/')}/`
  }

  _joinUrl (url, fileBase) {
    var fetchUrl = url

    if (url.substr(0, 7) !== 'http://' &&
      url.substr(0, 8) !== 'https://' &&
      url.substr(0, 5) !== 'blob:' &&
      url.substr(0, 5) !== 'data:' &&
      url.substr(0, 1) !== '#' &&
      url.substr(0, 1) !== '/'
    ) {
      fetchUrl = fileBase + url
    }

    // strip #fragment from URI, so json pointers resolve correctly #928
    if (fetchUrl.indexOf('#') > 0) fetchUrl = fetchUrl.substr(0, fetchUrl.indexOf('#'))

    return fetchUrl
  }

  _isUniformResourceName (uri) {
    return uri.substr(0, 4) === 'urn:'
  }

  /**
   * Loads external references via AJAX.
   *
   * Will fail if this.options.ajax is not set to true.
   *
   * @param {object} schema - JSON Schema with external references.
   * @param {string} fetchUrl - Base path from which to store the definitions.
   *   Typically the URI of the schema.
   * @param {string} fileBase - The base URL from which to load relative paths.
   *   Typically the URI of the schema minus filename, with trailing slash.
   * @param {boolean} firstIteration - Is it the first time we load this function? Help making difference between external ref vs internal pointer
   *
   * @return {boolean}
   * @throws Error
   */
  async _asyncloadExternalRefs (schema, fetchUrl, fileBase, firstIteration = false) {
    const refs = this._getExternalRefs(schema, fetchUrl, firstIteration)
    let waiting = 0
    // Loop into all schema references
    for (const uri of Object.keys(refs)) {
      if (typeof uri === 'undefined') continue
      if (this.refs[uri]) continue
      if (this._isUniformResourceName(uri)) {
        this.refs[uri] = 'loading'
        waiting++
        const urnResolver = this.options.urn_resolver
        let urn = uri
        if (typeof urnResolver !== 'function') {
          // eslint-disable-next-line no-console
          console.log(`No "urn_resolver" callback defined to resolve "${urn}"`)
          throw new Error(`Must set urn_resolver option to a callback to resolve ${urn}`)
        }
        // theoretically a URN can contain a JSON pointer
        if (urn.indexOf('#') > 0) urn = urn.substr(0, urn.indexOf('#'))
        let response
        try {
          let externalSchema
          response = await urnResolver(urn)
          try {
            externalSchema = JSON.parse(response)
          } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e)
            throw new Error(`Failed to parse external ref ${urn}`)
          }
          if (!(typeof externalSchema === 'boolean' || typeof externalSchema === 'object') || externalSchema === null || Array.isArray(externalSchema)) {
            throw new Error(`External ref does not contain a valid schema - ${urn}`)
          }

          this.refs[uri] = externalSchema

          await this._asyncloadExternalRefs(externalSchema, uri, fileBase)
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log(e)
          throw new Error(`Failed to parse external ref ${urn}`)
        }

        if (typeof response === 'boolean') {
          throw new Error(`External ref does not contain a valid schema - ${urn}`)
        }
        continue
      }
      if (!this.options.ajax) throw new Error(`Must set ajax option to true to load external ref ${uri}`)
      waiting++

      let url = this._joinUrl(uri, fileBase)

      let externalSchema
      if (this.options.ajax_cache_responses) {
        const schemaFromCache = this.cacheGet(url)
        if (schemaFromCache) {
          externalSchema = schemaFromCache
        }
      }

      if (!externalSchema) {
        const response = await new Promise(resolve => {
          const r = new XMLHttpRequest()
          if (this.options.ajaxCredentials) r.withCredentials = this.options.ajaxCredentials
          r.overrideMimeType('application/json')
          r.open('GET', url, true)
          r.onload = () => {
            resolve(r)
          }
          r.onerror = (e) => {
            resolve(undefined)
          }
          r.send()
        })
        if (typeof response === 'undefined') throw new Error(`Failed to fetch ref via ajax - ${uri}`)
        try {
          externalSchema = JSON.parse(response.responseText)
          if (this.options.ajax_cache_responses) {
            this.cacheSet(url, externalSchema)
          }
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log(e)
          throw new Error(`Failed to parse external ref ${url}`)
        }
      }

      if (!(typeof externalSchema === 'boolean' || typeof externalSchema === 'object') || externalSchema === null || Array.isArray(externalSchema)) {
        throw new Error(`External ref does not contain a valid schema - ${url}`)
      }
      this.refs[uri] = externalSchema
      const newfileBase = this._getFileBaseFromFileLocation(url)

      // Add leading slash.
      if (url !== uri) {
        const pathItems = url.split('/')
        url = (uri.substr(0, 1) === '/' ? '/' : '') + pathItems.pop()
      }
      await this._asyncloadExternalRefs(externalSchema, url, newfileBase)
    }
    if (!waiting) {
      return true
    }
  }

  extendSchemas (obj1, obj2) {
    obj1 = extend({}, obj1)
    obj2 = extend({}, obj2)

    const extended = {}
    const isRequiredOrDefaultProperties = (prop, val) => (prop === 'required' || prop === 'defaultProperties') && typeof val === 'object' && Array.isArray(val)
    const merge = (prop, val) => {
      /* Required and defaultProperties arrays should be unioned together */
      if (isRequiredOrDefaultProperties(prop, val)) {
        /* Union arrays and unique */
        extended[prop] = val.concat(obj2[prop]).reduce((p, c) => {
          if (!p.includes(c)) p.push(c)
          return p
        }, [])
      } else if (prop === 'type' && (typeof val === 'string' || Array.isArray(val))) {
        mergeType(val)
      } else if (typeof val === 'object' && !Array.isArray(val) && val !== null) {
        /* Objects should be recursively merged */
        extended[prop] = this.extendSchemas(val, obj2[prop])
      } else {
        /* Otherwise, use the first value */
        extended[prop] = val
      }
    }

    const mergeType = (val) => {
      /* Type should be intersected and is either an array or string */
      /* Make sure we're dealing with arrays */
      if (typeof val === 'string') val = [val]
      if (typeof obj2.type === 'string') obj2.type = [obj2.type]

      /* If type is only defined in the first schema, keep it */
      if (!obj2.type || !obj2.type.length) {
        extended.type = val
      } else {
        /* If type is defined in both schemas, do an intersect */
        extended.type = val.filter(n => obj2.type.includes(n))
      }

      /* If there's only 1 type and it's a primitive, use a string instead of array */
      if (extended.type.length === 1 && typeof extended.type[0] === 'string') {
        extended.type = extended.type[0]
      } else if (extended.type.length === 0) {
        /* Remove the type property if it's empty */
        delete extended.type
      }
    }

    Object.entries(obj1).forEach(([prop, val]) => {
      /* If this key is also defined in obj2, merge them */
      if (typeof obj2[prop] !== 'undefined') {
        merge(prop, val)
      } else {
        /* Otherwise, just use the one in obj1 */
        extended[prop] = val
      }
    })

    /* Properties in obj2 that aren't in obj1 */
    Object.entries(obj2).forEach(([prop, val]) => {
      if (typeof obj1[prop] === 'undefined') {
        extended[prop] = val
      }
    })
    return extended
  }

  /**
   * Gets a cache key namespaced for JSON Editor.
   *
   * @param {*} key
   *   The schema's key, e.g., URL.
   * @returns {string}
   *   A namespaced cache key, by prefixing "je-cache::".
   */
  getCacheKey (key) {
    return ['je-cache', key].join('::')
  }

  /**
   * Returns the schema cache buster from JSON Editor settings.
   *
   * @returns {string}
   *   The configured cache buster, if any. Otherwise, returns the current date
   *   in ISO 8601 simplified format (e.g., 2011-10-05 for October 5, 2011).
   */
  getCacheBuster () {
    return this.options.ajax_cache_buster || new Date().toISOString().slice(0, 10)
  }

  /**
   * Sets a schema into localStorage cache.
   *
   * @param {string} key
   *   The schema's key, e.g., URL.
   * @param {mixed} data
   *   The schema to store. Can be any data type.
   */
  cacheSet (key, data) {
    try {
      window.localStorage.setItem(this.getCacheKey(key), JSON.stringify({
        cacheBuster: this.getCacheBuster(),
        schema: data
      }))
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }

  /**
   * Fetches a schema from localStorage cache.
   *
   * @param {string} key
   *   The schema's key, e.g., URL.
   *
   * @returns {mixed}
   *   If found, returns the schema.
   */
  cacheGet (key) {
    try {
      const resultRaw = window.localStorage.getItem(this.getCacheKey(key))
      if (resultRaw) {
        const resultDecoded = JSON.parse(resultRaw)
        if (resultDecoded.cacheBuster && resultDecoded.schema) {
          if (resultDecoded.cacheBuster === this.getCacheBuster()) {
            return resultDecoded.schema
          }
        }
        this.cacheDelete(key)
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }

  /**
   * Deletes a schema from localStorage cache.
   *
   * @param {string} key
   *   The schema's key, e.g., URL.
   */
  cacheDelete (key) {
    window.localStorage.removeItem(this.getCacheKey(key))
  }
}
