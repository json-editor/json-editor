/* Multiple Editor (for when `type` is an array, also when `oneOf` is present) */
import { AbstractEditor } from '../editor.js'
import { Validator } from '../validator.js'
import { extend, each } from '../utilities.js'

export class MultipleEditor extends AbstractEditor {
  register () {
    if (this.editors) {
      for (let i = 0; i < this.editors.length; i++) {
        if (!this.editors[i]) continue
        this.editors[i].unregister()
      }
      if (this.editors[this.type]) this.editors[this.type].register()
    }
    super.register()
  }

  unregister () {
    super.unregister()
    if (this.editors) {
      for (let i = 0; i < this.editors.length; i++) {
        if (!this.editors[i]) continue
        this.editors[i].unregister()
      }
    }
  }

  getNumColumns () {
    if (!this.editors[this.type]) return 4
    return Math.max(this.editors[this.type].getNumColumns(), 4)
  }

  enable () {
    if (!this.always_disabled) {
      if (this.editors) {
        for (let i = 0; i < this.editors.length; i++) {
          if (!this.editors[i]) continue
          this.editors[i].enable()
        }
      }
      this.switcher.disabled = false
      super.enable()
    }
  }

  disable (alwaysDisabled) {
    if (alwaysDisabled) this.always_disabled = true
    if (this.editors) {
      for (let i = 0; i < this.editors.length; i++) {
        if (!this.editors[i]) continue
        this.editors[i].disable(alwaysDisabled)
      }
    }
    this.switcher.disabled = true
    super.disable()
  }

  switchEditor (i) {
    const self = this

    if (!this.editors[i]) {
      this.buildChildEditor(i)
    }

    const currentValue = self.getValue()

    self.type = i

    self.register()

    each(self.editors, (type, editor) => {
      if (!editor) return
      if (self.type === type) {
        if (self.keep_values) editor.setValue(currentValue, true)
        editor.container.style.display = ''
      } else editor.container.style.display = 'none'
    })
    self.refreshValue()
    self.refreshHeaderText()
  }

  buildChildEditor (i) {
    const self = this
    const type = this.types[i]
    const holder = self.theme.getChildEditorHolder()
    self.editor_holder.appendChild(holder)

    let schema

    if (typeof type === 'string') {
      schema = extend({}, self.schema)
      schema.type = type
    } else {
      schema = extend({}, self.schema, type)
      schema = self.jsoneditor.expandRefs(schema)

      /* If we need to merge `required` arrays */
      if (type && type.required && Array.isArray(type.required) && self.schema.required && Array.isArray(self.schema.required)) {
        schema.required = self.schema.required.concat(type.required)
      }
    }

    const editor = self.jsoneditor.getEditorClass(schema)

    self.editors[i] = self.jsoneditor.createEditor(editor, {
      jsoneditor: self.jsoneditor,
      schema,
      container: holder,
      path: self.path,
      parent: self,
      required: true
    })
    self.editors[i].preBuild()
    self.editors[i].build()
    self.editors[i].postBuild()

    if (self.editors[i].header) self.editors[i].header.style.display = 'none'

    self.editors[i].option = self.switcher_options[i]

    holder.addEventListener('change_header_text', () => {
      self.refreshHeaderText()
    })

    if (i !== self.type) holder.style.display = 'none'
  }

  preBuild () {
    this.types = []
    this.type = 0
    this.editors = []
    this.validators = []

    this.keep_values = true
    if (typeof this.jsoneditor.options.keep_oneof_values !== 'undefined') this.keep_values = this.jsoneditor.options.keep_oneof_values
    if (typeof this.options.keep_oneof_values !== 'undefined') this.keep_values = this.options.keep_oneof_values

    if (this.schema.oneOf) {
      this.oneOf = true
      this.types = this.schema.oneOf
      delete this.schema.oneOf
    } else if (this.schema.anyOf) {
      this.anyOf = true
      this.types = this.schema.anyOf
      delete this.schema.anyOf
    } else {
      if (!this.schema.type || this.schema.type === 'any') {
        this.types = ['string', 'number', 'integer', 'boolean', 'object', 'array', 'null']

        /* If any of these primitive types are disallowed */
        if (this.schema.disallow) {
          let { disallow } = this.schema
          if (typeof disallow !== 'object' || !(Array.isArray(disallow))) {
            disallow = [disallow]
          }
          const allowedTypes = []
          each(this.types, (i, type) => {
            if (!disallow.includes(type)) allowedTypes.push(type)
          })
          this.types = allowedTypes
        }
      } else if (Array.isArray(this.schema.type)) {
        this.types = this.schema.type
      } else {
        this.types = [this.schema.type]
      }
      delete this.schema.type
    }

    this.display_text = this.getDisplayText(this.types)
  }

  build () {
    const self = this
    const { container } = this

    this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())
    this.container.appendChild(this.header)

    this.switcher = this.theme.getSwitcher(this.display_text)
    container.appendChild(this.switcher)
    this.switcher.addEventListener('change', function (e) {
      e.preventDefault()
      e.stopPropagation()

      self.switchEditor(self.display_text.indexOf(this.value))
      self.onChange(true)
    })

    this.editor_holder = document.createElement('div')
    container.appendChild(this.editor_holder)

    const validatorOptions = {}
    if (self.jsoneditor.options.custom_validators) {
      validatorOptions.custom_validators = self.jsoneditor.options.custom_validators
    }

    this.switcher_options = this.theme.getSwitcherOptions(this.switcher)
    each(this.types, (i, type) => {
      self.editors[i] = false

      let schema

      if (typeof type === 'string') {
        schema = extend({}, self.schema)
        schema.type = type
      } else {
        schema = extend({}, self.schema, type)

        /* If we need to merge `required` arrays */
        if (type.required && Array.isArray(type.required) && self.schema.required && Array.isArray(self.schema.required)) {
          schema.required = self.schema.required.concat(type.required)
        }
      }

      self.validators[i] = new Validator(self.jsoneditor, schema, validatorOptions, self.defaults)
    })

    this.switchEditor(0)
  }

  onChildEditorChange (editor) {
    if (this.editors[this.type]) {
      this.refreshValue()
      this.refreshHeaderText()
    }

    super.onChildEditorChange()
  }

  refreshHeaderText () {
    const displayText = this.getDisplayText(this.types)
    each(this.switcher_options, (i, option) => {
      option.textContent = displayText[i]
    })
  }

  refreshValue () {
    this.value = this.editors[this.type].getValue()
  }

  setValue (val, initial) {
    /* Determine type by getting the first one that validates */
    const self = this
    const prevType = this.type
    /* find the best match one */
    let fitTestVal = {
      match: 0,
      extra: 0,
      i: this.type
    }
    const validVal = {
      match: 0,
      i: null
    }
    each(this.validators, (i, validator) => {
      let fitTestResult = null
      if (typeof self.anyOf !== 'undefined' && self.anyOf) {
        fitTestResult = validator.fitTest(val)
        if (fitTestVal.match < fitTestResult.match) {
          fitTestVal = fitTestResult
          fitTestVal.i = i
        } else if (fitTestVal.match === fitTestResult.match) {
          if (fitTestVal.extra > fitTestResult.extra) {
            fitTestVal = fitTestResult
            fitTestVal.i = i
          }
        }
      }
      if (!validator.validate(val).length && validVal.i === null) {
        validVal.i = i
        if (fitTestResult !== null) {
          validVal.match = fitTestResult.match
        }
      }
    })
    let finalI = validVal.i
    /* if the best fit schema has more match properties, then use the best fit schema. */
    /* usually the value could be */
    if (typeof self.anyOf !== 'undefined' && self.anyOf) {
      if (validVal.match < fitTestVal.match) {
        finalI = fitTestVal.i
      }
    }
    if (finalI === null) {
      finalI = this.type
    }
    this.type = finalI
    this.switcher.value = this.display_text[finalI]

    const typeChanged = this.type !== prevType
    if (typeChanged) {
      this.switchEditor(this.type)
    }

    this.editors[this.type].setValue(val, initial)

    this.refreshValue()
    self.onChange(typeChanged)
  }

  destroy () {
    each(this.editors, (type, editor) => {
      if (editor) editor.destroy()
    })
    if (this.editor_holder && this.editor_holder.parentNode) this.editor_holder.parentNode.removeChild(this.editor_holder)
    if (this.switcher && this.switcher.parentNode) this.switcher.parentNode.removeChild(this.switcher)
    super.destroy()
  }

  showValidationErrors (errors) {
    const self = this

    /* oneOf and anyOf error paths need to remove the oneOf[i] part before passing to child editors */
    if (this.oneOf || this.anyOf) {
      const checkPart = this.oneOf ? 'oneOf' : 'anyOf'
      each(this.editors, (i, editor) => {
        if (!editor) return
        const check = `${self.path}.${checkPart}[${i}]`
        const newErrors = []
        each(errors, (j, error) => {
          if (error.path === check.substr(0, error.path.length)) {
            const newError = extend({}, error)
            newError.path = self.path + newError.path.substr(check.length)
            newErrors.push(newError)
          }
        })

        editor.showValidationErrors(newErrors)
      })
    } else {
      each(this.editors, (type, editor) => {
        if (!editor) return
        editor.showValidationErrors(errors)
      })
    }
  },
  addLinks: function () {
    // multiple editor itself don't create links
  }
}
