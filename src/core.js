import './styles/choices.css'
import './styles/starrating.css'

import { getDefaults } from './defaults'
import { Validator } from './validator'
import { SchemaLoader } from './schemaloader'
import { $extend, $each } from './utilities'

import { AbstractTheme } from './theme'
import { htmlTheme } from './themes/html'
// import { bootstrap2Theme } from './themes/bootstrap2'
// import { bootstrap3Theme } from './themes/bootstrap3'
import { bootstrap4Theme } from './themes/bootstrap4'
// import { foundationTheme, foundation3Theme, foundation4Theme, foundation5Theme, foundation6Theme } from './themes/foundation'
import { jqueryuiTheme } from './themes/jqueryui'
import { barebonesTheme } from './themes/barebones'
// import { materializeTheme } from './themes/materialize'
import { spectreTheme } from './themes/spectre'
import { tailwindTheme } from './themes/tailwind'

import { AbstractEditor } from './editor'
import { AceEditor } from './editors/ace'
import { ArrayEditor } from './editors/array'
import { ArrayChoicesEditor } from './editors/array/choices'
import { ArraySelect2Editor } from './editors/array/select2'
import { ArraySelectizeEditor } from './editors/array/selectize'
import { AutocompleteEditor } from './editors/autocomplete'
import { Base64Editor } from './editors/base64'
import { ButtonEditor } from './editors/button'
import { CheckboxEditor } from './editors/checkbox'
import { ChoicesEditor } from './editors/choices'
import { DatetimeEditor } from './editors/datetime'
import { DescribedByEditor } from './editors/describedby'
import { EnumEditor } from './editors/enum'
import { HiddenEditor } from './editors/hidden'
import { InfoEditor } from './editors/info'
import { IntegerEditor } from './editors/integer'
import { IpEditor } from './editors/ip'
import { JoditEditor } from './editors/jodit'
import { MultipleEditor } from './editors/multiple'
import { MultiSelectEditor } from './editors/multiselect'
import { NullEditor } from './editors/null'
import { NumberEditor } from './editors/number'
import { ObjectEditor } from './editors/object'
import { RadioEditor } from './editors/radio'
import { ScEditor } from './editors/sceditor'
import { SelectEditor } from './editors/select'
import { Select2Editor } from './editors/select2'
import { SelectizeEditor } from './editors/selectize'
import { SignatureEditor } from './editors/signature'
import { SimplemdeEditor } from './editors/simplemde'
import { StarratingEditor } from './editors/starrating'
import { StringEditor } from './editors/string'
import { TableEditor } from './editors/table'
import { UploadEditor } from './editors/upload'
import { UuidEditor } from './editors/uuid'
import { ColorEditor } from './editors/colorpicker'

import { defaultTemplate } from './templates/default'
import { ejsTemplate } from './templates/ejs'
import { handlebarsTemplate } from './templates/handlebars'
import { hoganTemplate } from './templates/hogan'
import { lodashTemplate } from './templates/lodash'
import { markupTemplate } from './templates/markup'
import { mustacheTemplate } from './templates/mustache'
import { swigTemplate } from './templates/swig'
import { underscoreTemplate } from './templates/underscore'

// import { bootstrap2Iconlib } from './iconlibs/bootstrap2'
// import { bootstrap3Iconlib } from './iconlibs/bootstrap3'
import { fontawesome3Iconlib } from './iconlibs/fontawesome3'
import { fontawesome4Iconlib } from './iconlibs/fontawesome4'
import { fontawesome5Iconlib } from './iconlibs/fontawesome5'
// import { foundation2Iconlib } from './iconlibs/foundation2'
// import { foundation3Iconlib } from './iconlibs/foundation3'
import { jqueryuiIconlib } from './iconlibs/jqueryui'
// import { materialiconsIconlib } from './iconlibs/materialicons'
import { spectreIconlib } from './iconlibs/spectre'

var assignIconlibs = function (iconlibs) {
  // iconlibs.bootstrap2 = bootstrap2Iconlib
  // iconlibs.bootstrap3 = bootstrap3Iconlib
  iconlibs.fontawesome3 = fontawesome3Iconlib
  iconlibs.fontawesome4 = fontawesome4Iconlib
  iconlibs.fontawesome5 = fontawesome5Iconlib
  // iconlibs.foundation2 = foundation2Iconlib
  // iconlibs.foundation3 = foundation3Iconlib
  iconlibs.jqueryui = jqueryuiIconlib
  // iconlibs.materialicons = materialiconsIconlib
  iconlibs.spectre = spectreIconlib
}

var assignThemes = function (themes) {
  themes.html = htmlTheme
  // themes.bootstrap2 = bootstrap2Theme
  // themes.bootstrap3 = bootstrap3Theme
  themes.bootstrap4 = bootstrap4Theme
  // themes.foundation = foundationTheme
  // themes.foundation3 = foundation3Theme
  // themes.foundation4 = foundation4Theme
  // themes.foundation5 = foundation5Theme
  // themes.foundation6 = foundation6Theme
  themes.jqueryui = jqueryuiTheme
  themes.barebones = barebonesTheme
  // themes.materialize = materializeTheme
  themes.spectre = spectreTheme
  themes.tailwind = tailwindTheme
}

// Internal helper function called only here so we won't export as part of class
// Previously the assignment to the JSONEditor.defaults.editors was done in each of the editor
// files but doing it this way removes each of the editors' dependency on JSONEditor
var assignDefaultEditors = function (editors) {
  editors.ace = AceEditor
  editors.array = ArrayEditor
  editors.arrayChoices = ArrayChoicesEditor
  editors.arraySelect2 = ArraySelect2Editor
  editors.arraySelectize = ArraySelectizeEditor
  editors.autocomplete = AutocompleteEditor
  editors.base64 = Base64Editor
  editors.button = ButtonEditor
  editors.checkbox = CheckboxEditor
  editors.choices = ChoicesEditor
  editors.datetime = DatetimeEditor
  editors.describedBy = DescribedByEditor
  editors.enum = EnumEditor
  editors.hidden = HiddenEditor
  editors.info = InfoEditor
  editors.integer = IntegerEditor
  editors.ip = IpEditor
  editors.jodit = JoditEditor
  editors.multiple = MultipleEditor
  editors.multiselect = MultiSelectEditor
  editors.null = NullEditor
  editors.number = NumberEditor
  editors.object = ObjectEditor
  editors.radio = RadioEditor
  editors.sceditor = ScEditor
  editors.select = SelectEditor
  editors.select2 = Select2Editor
  editors.selectize = SelectizeEditor
  editors.signature = SignatureEditor
  editors.simplemde = SimplemdeEditor
  editors.starrating = StarratingEditor
  editors.string = StringEditor
  editors.table = TableEditor
  editors.upload = UploadEditor
  editors.uuid = UuidEditor
  editors.colorpicker = ColorEditor
}

var assignTemplates = function (templates) {
  templates.default = defaultTemplate
  templates.ejs = ejsTemplate
  templates.handlebars = handlebarsTemplate
  templates.hogan = hoganTemplate
  templates.hogan = lodashTemplate
  templates.markup = markupTemplate
  templates.mustache = mustacheTemplate
  templates.swig = swigTemplate
  templates.underscore = underscoreTemplate
}

export var JSONEditor = function (element, options) {
  // eslint-disable-next-line no-undef
  if (!(element instanceof Element)) {
    throw new Error('element should be an instance of Element')
  }
  options = $extend({}, JSONEditor.defaults.options, options || {})
  this.element = element
  this.options = options
  this.init()
}
JSONEditor.prototype = {
  // necessary since we remove the ctor property by doing a literal assignment. Without this
  // the $isplainobject function will think that this is a plain object.
  constructor: JSONEditor,
  init: function () {
    var self = this

    this.ready = false
    this.copyClipboard = null

    var themeName = this.options.theme || JSONEditor.defaults.theme
    var themeClass = JSONEditor.defaults.themes[themeName]
    if (!themeClass) throw new Error('Unknown theme ' + themeName)

    this.schema = this.options.schema
    // eslint-disable-next-line new-cap
    this.theme = new themeClass(this)

    this.element.setAttribute('data-theme', themeName)
    if (!this.theme.options.disable_theme_rules) this.addNewStyleRules(themeName, this.theme.rules)

    this.template = this.options.template
    this.uuid = 0
    this.__data = {}

    var iconClass = JSONEditor.defaults.iconlibs[this.options.iconlib || JSONEditor.defaults.iconlib]
    // eslint-disable-next-line new-cap
    if (iconClass) this.iconlib = new iconClass()

    this.root_container = this.theme.getContainer()

    this.element.appendChild(this.root_container)

    this.translate = this.options.translate || JSONEditor.defaults.translate

    // Fetch all external refs via ajax
    var fetchUrl = document.location.origin + document.location.pathname.toString()
    var loader = new SchemaLoader(self.options)
    var location = document.location.toString()

    this.expandSchema = function (schema, fileBase) { return loader.expandSchema(schema, fileBase) }
    this.expandRefs = function (schema, fileBase) { return loader.expandRefs(schema, fileBase) }
    this.refs = loader.refs

    loader.load(self.options.schema, function (schema) {
      // Validator options
      var validatorOptions = {}
      if (self.options.custom_validators) {
        validatorOptions.custom_validators = self.options.custom_validators
      }
      self.validator = new Validator(self, null, validatorOptions, JSONEditor.defaults)

      var editorClass = self.getEditorClass(schema)
      self.root = self.createEditor(editorClass, {
        jsoneditor: self,
        schema: schema,
        required: true,
        container: self.root_container
      })

      self.root.preBuild()
      self.root.build()
      self.root.postBuild()

      // Starting data
      if (self.options.hasOwnProperty('startval')) self.root.setValue(self.options.startval)

      self.validation_results = self.validator.validate(self.root.getValue())
      self.root.showValidationErrors(self.validation_results)
      self.ready = true

      // Fire ready event asynchronously
      window.requestAnimationFrame(function () {
        if (!self.ready) return
        self.validation_results = self.validator.validate(self.root.getValue())
        self.root.showValidationErrors(self.validation_results)
        self.trigger('ready')
        self.trigger('change')
      })
    }, fetchUrl, location)
  },

  getValue: function () {
    if (!this.ready) throw new Error("JSON Editor not ready yet.  Listen for 'ready' event before getting the value")

    return this.root.getValue()
  },
  setValue: function (value) {
    if (!this.ready) throw new Error("JSON Editor not ready yet.  Listen for 'ready' event before setting the value")

    this.root.setValue(value)
    return this
  },
  validate: function (value) {
    if (!this.ready) throw new Error("JSON Editor not ready yet.  Listen for 'ready' event before validating")

    // Custom value
    if (arguments.length === 1) {
      return this.validator.validate(value)
    // Current value (use cached result)
    } else {
      return this.validation_results
    }
  },
  destroy: function () {
    if (this.destroyed) return
    if (!this.ready) return

    this.schema = null
    this.options = null
    this.root.destroy()
    this.root = null
    this.root_container = null
    this.validator = null
    this.validation_results = null
    this.theme = null
    this.iconlib = null
    this.template = null
    this.__data = null
    this.ready = false
    this.element.innerHTML = ''
    this.element.removeAttribute('data-theme')

    this.destroyed = true
  },
  on: function (event, callback) {
    this.callbacks = this.callbacks || {}
    this.callbacks[event] = this.callbacks[event] || []
    this.callbacks[event].push(callback)

    return this
  },
  off: function (event, callback) {
    // Specific callback
    if (event && callback) {
      this.callbacks = this.callbacks || {}
      this.callbacks[event] = this.callbacks[event] || []
      var newcallbacks = []
      for (var i = 0; i < this.callbacks[event].length; i++) {
        if (this.callbacks[event][i] === callback) continue
        newcallbacks.push(this.callbacks[event][i])
      }
      this.callbacks[event] = newcallbacks
    } else if (event) {
    // All callbacks for a specific event
      this.callbacks = this.callbacks || {}
      this.callbacks[event] = []
    } else {
    // All callbacks for all events
      this.callbacks = {}
    }

    return this
  },
  trigger: function (event, editor) {
    if (this.callbacks && this.callbacks[event] && this.callbacks[event].length) {
      for (var i = 0; i < this.callbacks[event].length; i++) {
        this.callbacks[event][i].apply(this, [editor])
      }
    }

    return this
  },
  setOption: function (option, value) {
    if (option === 'show_errors') {
      this.options.show_errors = value
      this.onChange()
    } else {
    // Only the `show_errors` option is supported for now
      throw new Error('Option ' + option + ' must be set during instantiation and cannot be changed later')
    }

    return this
  },
  getEditorClass: function (schema) {
    var classname

    schema = this.expandSchema(schema)

    $each(JSONEditor.defaults.resolvers, function (i, resolver) {
      var tmp = resolver(schema)
      if (tmp) {
        if (JSONEditor.defaults.editors[tmp]) {
          classname = tmp
          return false
        }
      }
    })

    if (!classname) throw new Error('Unknown editor for schema ' + JSON.stringify(schema))
    if (!JSONEditor.defaults.editors[classname]) throw new Error('Unknown editor ' + classname)

    return JSONEditor.defaults.editors[classname]
  },
  createEditor: function (editorClass, options) {
    options = $extend({}, editorClass.options || {}, options)
    // eslint-disable-next-line new-cap
    return new editorClass(options, JSONEditor.defaults)
  },
  onChange: function () {
    if (!this.ready) return

    if (this.firing_change) return
    this.firing_change = true

    var self = this

    window.requestAnimationFrame(function () {
      self.firing_change = false
      if (!self.ready) return

      // Validate and cache results
      self.validation_results = self.validator.validate(self.root.getValue())

      if (self.options.show_errors !== 'never') {
        self.root.showValidationErrors(self.validation_results)
      } else {
        self.root.showValidationErrors([])
      }

      // Fire change event
      self.trigger('change')
    })

    return this
  },
  compileTemplate: function (template, name) {
    name = name || JSONEditor.defaults.template

    var engine

    // Specifying a preset engine
    if (typeof name === 'string') {
      if (!JSONEditor.defaults.templates[name]) throw new Error('Unknown template engine ' + name)
      engine = JSONEditor.defaults.templates[name]()

      if (!engine) throw new Error('Template engine ' + name + ' missing required library.')
    } else {
    // Specifying a custom engine
      engine = name
    }

    if (!engine) throw new Error('No template engine set')
    if (!engine.compile) throw new Error('Invalid template engine set')

    return engine.compile(template)
  },
  _data: function (el, key, value) {
    // Setting data
    if (arguments.length === 3) {
      var uuid
      if (el.hasAttribute('data-jsoneditor-' + key)) {
        uuid = el.getAttribute('data-jsoneditor-' + key)
      } else {
        uuid = this.uuid++
        el.setAttribute('data-jsoneditor-' + key, uuid)
      }

      this.__data[uuid] = value
    } else {
    // Getting data
      // No data stored
      if (!el.hasAttribute('data-jsoneditor-' + key)) return null

      return this.__data[el.getAttribute('data-jsoneditor-' + key)]
    }
  },
  registerEditor: function (editor) {
    this.editors = this.editors || {}
    this.editors[editor.path] = editor
    return this
  },
  unregisterEditor: function (editor) {
    this.editors = this.editors || {}
    this.editors[editor.path] = null
    return this
  },
  getEditor: function (path) {
    if (!this.editors) return
    return this.editors[path]
  },
  watch: function (path, callback) {
    this.watchlist = this.watchlist || {}
    this.watchlist[path] = this.watchlist[path] || []
    this.watchlist[path].push(callback)

    return this
  },
  unwatch: function (path, callback) {
    if (!this.watchlist || !this.watchlist[path]) return this
    // If removing all callbacks for a path
    if (!callback) {
      this.watchlist[path] = null
      return this
    }

    var newlist = []
    for (var i = 0; i < this.watchlist[path].length; i++) {
      if (this.watchlist[path][i] === callback) continue
      else newlist.push(this.watchlist[path][i])
    }
    this.watchlist[path] = newlist.length ? newlist : null
    return this
  },
  notifyWatchers: function (path) {
    if (!this.watchlist || !this.watchlist[path]) return this
    for (var i = 0; i < this.watchlist[path].length; i++) {
      this.watchlist[path][i]()
    }
  },
  isEnabled: function () {
    return !this.root || this.root.isEnabled()
  },
  enable: function () {
    this.root.enable()
  },
  disable: function () {
    this.root.disable()
  },
  setCopyClipboardContents: function (value) {
    this.copyClipboard = value
  },
  getCopyClipboardContents: function () {
    return this.copyClipboard
  },
  addNewStyleRules: function (themeName, rules) {
    var styleTag = document.querySelector('#theme-' + themeName)
    if (!styleTag) {
      styleTag = document.createElement('style')
      styleTag.setAttribute('id', 'theme-' + themeName)
      styleTag.appendChild(document.createTextNode(''))
      document.head.appendChild(styleTag)
    }

    var sheet = styleTag.sheet ? styleTag.sheet : styleTag.styleSheet
    var qualifier = this.element.nodeName.toLowerCase()

    for (var selector in rules) {
      if (!rules.hasOwnProperty(selector)) continue
      var sel = qualifier + '[data-theme="' + themeName + '"] ' + selector
      // all browsers, except IE before version 9
      if (sheet.insertRule) sheet.insertRule(sel + ' {' + rules[selector] + '}', 0)
      // Internet Explorer before version 9
      else if (sheet.addRule) sheet.addRule(sel, rules[selector], 0)
    }
  }
}

JSONEditor.defaults = getDefaults()
assignThemes(JSONEditor.defaults.themes)
JSONEditor.AbstractEditor = AbstractEditor
JSONEditor.AbstractTheme = AbstractTheme
assignDefaultEditors(JSONEditor.defaults.editors)
assignTemplates(JSONEditor.defaults.templates)
assignIconlibs(JSONEditor.defaults.iconlibs)

window.JSONEditor = JSONEditor
