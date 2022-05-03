import { AbstractEditor } from '../editor.js'
import { extend } from '../utilities.js'

export class StringEditor extends AbstractEditor {
  register () {
    super.register()
    if (!this.input) return
    if (this.jsoneditor.options.use_name_attributes) {
      this.input.setAttribute('name', this.formname)
    }
    this.input.setAttribute('aria-label', this.formname)
  }

  unregister () {
    super.unregister()
    if (!this.input) return
    this.input.removeAttribute('name')
    this.input.removeAttribute('aria-label')
  }

  setValue (value, initial, fromTemplate) {
    if (this.template && !fromTemplate) return

    if (!this.shouldBeUnset() && (value === null || typeof value === 'undefined')) value = ''
    else if (typeof value === 'object') value = JSON.stringify(value)
    else if (!this.shouldBeUnset() && (typeof value !== 'string')) value = `${value}`

    if (value === this.serialized) return

    /* Sanitize value before setting it */
    const sanitized = this.sanitize(value)

    if (this.input.value === sanitized) return

    this.setValueToInputField(sanitized)

    if (this.format === 'range') {
      const output = this.control.querySelector('output')
      if (output) {
        output.value = sanitized
      }
    }

    const changed = fromTemplate || this.getValue() !== value

    this.refreshValue()

    if (initial) this.is_dirty = false
    else if (this.jsoneditor.options.show_errors === 'change') this.is_dirty = true

    if (this.adjust_height) this.adjust_height(this.input)

    /* Bubble this setValue to parents if the value changed */
    this.onChange(changed)

    /* Return object with changed state and sanitized value for use in editors that extend this */
    return { changed, value: sanitized }
  }

  setValueToInputField (value) {
    this.input.value = value === undefined ? '' : value
  }

  getNumColumns () {
    const min = Math.ceil(Math.max(this.getTitle().length, this.schema.maxLength || 0, this.schema.minLength || 0) / 5)
    let num

    if (this.input_type === 'textarea') num = 6
    else if (['text', 'email'].includes(this.input_type)) num = 4
    else num = 2

    return Math.min(12, Math.max(min, num))
  }

  build () {
    if (!this.options.compact) this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())
    if (this.schema.description) this.description = this.theme.getFormInputDescription(this.translateProperty(this.schema.description))
    if (this.options.infoText) this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText))

    this.format = this.schema.format
    if (!this.format && this.schema.media && this.schema.media.type) {
      this.format = this.schema.media.type.replace(/(^(application|text)\/(x-)?(script\.)?)|(-source$)/g, '')
    }
    if (!this.format && this.options.default_format) {
      this.format = this.options.default_format
    }
    if (this.options.format) {
      this.format = this.options.format
    }

    /* Specific format */
    if (this.format) {
      /* Text Area */
      if (this.format === 'textarea') {
        this.input_type = 'textarea'
        this.input = this.theme.getTextareaInput()
        /* Range Input */
      } else if (this.format === 'range') {
        this.input_type = 'range'
        let min = this.schema.minimum || 0
        let max = this.schema.maximum || Math.max(100, min + 1)
        let step = 1
        if (this.schema.multipleOf) {
          if (min % this.schema.multipleOf) min = Math.ceil(min / this.schema.multipleOf) * this.schema.multipleOf
          if (max % this.schema.multipleOf) max = Math.floor(max / this.schema.multipleOf) * this.schema.multipleOf
          step = this.schema.multipleOf
        }

        this.input = this.theme.getRangeInput(min, max, step)
        /* HTML5 Input type */
      } else {
        this.input_type = 'text'
        if (['button', 'checkbox', 'color', 'date', 'datetime-local', 'email', 'file', 'hidden', 'image', 'month', 'number', 'password', 'radio', 'reset', 'search', 'submit', 'tel', 'text', 'time', 'url', 'week'].includes(this.format)) {
          this.input_type = this.format
        }
        this.input = this.theme.getFormInputField(this.input_type)
      }
      /* Normal text input */
    } else {
      this.input_type = 'text'
      this.input = this.theme.getFormInputField(this.input_type)
    }

    /* minLength, maxLength, and pattern */
    if (typeof this.schema.maxLength !== 'undefined') this.input.setAttribute('maxlength', this.schema.maxLength)
    if (typeof this.schema.pattern !== 'undefined') this.input.setAttribute('pattern', this.schema.pattern)
    else if (typeof this.schema.minLength !== 'undefined') this.input.setAttribute('pattern', `.{${this.schema.minLength},}`)

    if (this.options.compact) {
      this.container.classList.add('compact')
    } else if (this.options.input_width) this.input.style.width = this.options.input_width

    if (this.schema.readOnly || this.schema.readonly || this.schema.template) {
      this.disable(true)
      this.input.setAttribute('readonly', 'true')
    }

    /* Set custom attributes on input element. Parameter is array of protected keys. Empty array if none. */
    this.setInputAttributes(['maxlength', 'pattern', 'readonly', 'min', 'max', 'step'])

    this.input
      .addEventListener('change', e => {
        e.preventDefault()
        e.stopPropagation()

        /* Don't allow changing if this field is a template */
        if (this.schema.template) {
          e.currentTarget.value = this.value
          return
        }

        const val = e.currentTarget.value

        /* sanitize value */
        const sanitized = this.sanitize(val)
        if (val !== sanitized) {
          e.currentTarget.value = sanitized
        }

        this.is_dirty = true

        this.refreshValue()
        this.onChange(true)
      })

    if (this.options.input_height) this.input.style.height = this.options.input_height
    if (this.options.expand_height) {
      this.adjust_height = (el) => {
        if (!el) return
        let i; let ch = el.offsetHeight
        /* Input too short */
        if (el.offsetHeight < el.scrollHeight) {
          i = 0
          while (el.offsetHeight < el.scrollHeight + 3) {
            if (i > 100) break
            i++
            ch++
            el.style.height = `${ch}px`
          }
        } else {
          i = 0
          while (el.offsetHeight >= el.scrollHeight + 3) {
            if (i > 100) break
            i++
            ch--
            el.style.height = `${ch}px`
          }
          el.style.height = `${ch + 1}px`
        }
      }

      this.input.addEventListener('keyup', e => {
        this.adjust_height(e.currentTarget)
      })
      this.input.addEventListener('change', e => {
        this.adjust_height(e.currentTarget)
      })
      this.adjust_height()
    }

    if (this.format) this.input.setAttribute('data-schemaformat', this.format)

    let { input } = this
    if (this.format === 'range') {
      input = this.theme.getRangeControl(this.input, this.theme.getRangeOutput(this.input, this.schema.default || Math.max(this.schema.minimum || 0, 0)))
    }

    this.control = this.theme.getFormControl(this.label, input, this.description, this.infoButton, this.formname)
    this.container.appendChild(this.control)

    /* Any special formatting that needs to happen after the input is added to the dom */
    window.requestAnimationFrame(() => {
      /* Skip in case the input is only a temporary editor, */
      /* otherwise, in the case of an ace_editor creation, */
      /* it will generate an error trying to append it to the missing parentNode */
      if (this.input.parentNode) this.afterInputReady()
      if (this.adjust_height) this.adjust_height(this.input)
      if (this.format === 'range') {
        const output = this.control.querySelector('output')
        output.value = this.input.value
      }
    })

    /* Compile and store the template */
    if (this.schema.template) {
      const callback = this.expandCallbacks('template', { template: this.schema.template })
      if (typeof callback.template === 'function') this.template = callback.template
      else this.template = this.jsoneditor.compileTemplate(this.schema.template, this.template_engine)
      this.refreshValue()
    } else {
      this.refreshValue()
    }
  }

  setupCleave (el) {
    /* Enable cleave.js support if library is loaded and config is available */
    const options = this.expandCallbacks('cleave', extend({}, this.defaults.options.cleave || {}, this.options.cleave || {}))
    if (typeof options === 'object' && Object.keys(options).length > 0) {
      this.cleave_instance = new window.Cleave(el, options)
    }
  }

  setupImask (el) {
    /* Enable imask.js support if library is loaded and config is available */
    const options = this.expandCallbacks('imask', extend({}, this.defaults.options.imask || {}, this.options.imask || {}))
    if (typeof options === 'object' && Object.keys(options).length > 0) {
      this.imask_instance = window.IMask(el, this.ajustIMaskOptions(options))
    }
  }

  ajustIMaskOptions (obj) {
    /* iMask config format is not JSON friendly, so function and regex based mask */
    /* properties have to be adjusted from string to the correct format */
    Object.keys(obj).forEach(prop => {
      if (obj[prop] === Object(obj[prop])) obj[prop] = this.ajustIMaskOptions(obj[prop])
      else if (prop === 'mask') {
        if (obj[prop].substr(0, 6) === 'regex:') {
          const regExMatch = obj[prop].match(/^regex:\/(.*)\/([gimsuy]*)$/)
          if (regExMatch !== null) {
            try {
              obj[prop] = new RegExp(regExMatch[1], regExMatch[2])
            } catch (e) { }
          }
        } else obj[prop] = this.getGlobalPropertyFromString(obj[prop])
      }
    })
    return obj
  }

  getGlobalPropertyFromString (strValue) {
    if (!strValue.includes('.')) {
      if (typeof window[strValue] !== 'undefined') {
        return window[strValue]
      }
    } else {
      const arrParts = strValue.split('.')
      const obj = arrParts[0]
      const prop = arrParts[1]

      if (typeof window[obj] !== 'undefined' && typeof window[obj][prop] !== 'undefined') {
        return window[obj][prop]
      }
    }
    /* just a string */
    return strValue
  }

  shouldBeUnset () {
    return !this.jsoneditor.options.use_default_values && !this.is_dirty
  }

  getValue () {
    const hasValueSet = !!(this.input && this.input.value)
    if (this.shouldBeUnset() && !hasValueSet) {
      return undefined
    }
    if (this.imask_instance && this.dependenciesFulfilled && this.options.imask.returnUnmasked) {
      return this.imask_instance.unmaskedValue
    } return super.getValue()
  }

  enable () {
    if (!this.always_disabled) {
      this.input.disabled = false
      super.enable()
    }
  }

  disable (alwaysDisabled) {
    if (alwaysDisabled) this.always_disabled = true
    this.input.disabled = true
    super.disable()
  }

  afterInputReady () {
    this.theme.afterInputReady(this.input)
    if (window.Cleave && !this.cleave_instance) this.setupCleave(this.input)
    else if (window.IMask && !this.imask_instance) this.setupImask(this.input)
  }

  refreshValue () {
    this.value = this.input.value
    if (typeof this.value !== 'string' && !this.shouldBeUnset()) this.value = ''
    this.serialized = this.value
  }

  destroy () {
    if (this.cleave_instance) this.cleave_instance.destroy()
    if (this.imask_instance) this.imask_instance.destroy()

    this.template = null
    if (this.input && this.input.parentNode) this.input.parentNode.removeChild(this.input)
    if (this.label && this.label.parentNode) this.label.parentNode.removeChild(this.label)
    if (this.description && this.description.parentNode) this.description.parentNode.removeChild(this.description)

    super.destroy()
  }

  /**
   * This is overridden in derivative editors
   */
  sanitize (value) {
    return value
  }

  /**
   * Re-calculates the value if needed
   */
  onWatchedFieldChange () {
    let vars

    /* If this editor needs to be rendered by a macro template */
    if (this.template) {
      vars = this.getWatchedFieldValues()
      this.setValue(this.template(vars), false, true)
    }

    super.onWatchedFieldChange()
  }

  showValidationErrors (errors) {
    if (this.jsoneditor.options.show_errors === 'always') { } else if (!this.is_dirty && this.previous_error_setting === this.jsoneditor.options.show_errors) return

    this.previous_error_setting = this.jsoneditor.options.show_errors

    const addMessage = (messages, error) => {
      if (error.path === this.path) {
        messages.push(error.message)
      }
      return messages
    }
    const messages = errors.reduce(addMessage, [])

    if (messages.length) {
      this.theme.addInputError(this.input, `${messages.join('. ')}.`)
    } else {
      this.theme.removeInputError(this.input)
    }
  }
}
