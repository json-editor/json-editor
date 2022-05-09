import { SelectEditor } from './select.js'

export class RadioEditor extends SelectEditor {
  preBuild () {
    super.preBuild()
  }

  build () {
    this.label = ''
    if (!this.options.compact) this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())
    if (this.schema.description) this.description = this.theme.getFormInputDescription(this.translateProperty(this.schema.description))
    if (this.options.infoText) this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText))
    if (this.options.compact) this.container.classList.add('compact')

    this.radioContainer = document.createElement('div')

    this.radioGroup = []

    const radioInputEventhandler = e => {
      this.setValue(e.currentTarget.value)
      this.onChange(true)
    }

    if (!this.isRequired()) {
      this.enum_display.shift()
      this.enum_options.shift()
      this.enum_values.shift()
    }

    for (let i = 0; i < this.enum_values.length; i++) {
      /* form radio elements */
      const attributes = {
        id: `${this.formname}[${i}]`,
        value: this.enum_values[i]
      }

      if (this.jsoneditor.options.use_name_attributes) {
        attributes.name = this.formname
      }

      this.input = this.theme.getFormRadio(attributes)

      /* Set custom attributes on input element. Parameter is array of protected keys. Empty array if none. */
      this.setInputAttributes(['id', 'value', 'name'])

      this.input.addEventListener('change', radioInputEventhandler, false)
      this.radioGroup.push(this.input)

      /* form-label for radio elements */
      const radioLabel = this.theme.getFormRadioLabel(this.enum_display[i])
      radioLabel.htmlFor = this.input.id

      const control = this.theme.getFormRadioControl(radioLabel, this.input, !!(this.options.layout === 'horizontal' || this.options.compact))

      this.radioContainer.appendChild(control)
    }

    if (this.schema.readOnly || this.schema.readonly) {
      this.disable(true)
      for (let j = 0; j < this.radioGroup.length; j++) {
        this.radioGroup[j].disabled = true
      }
      this.radioContainer.classList.add('readonly')
    }

    const radioContainerWrapper = this.theme.getContainer()
    radioContainerWrapper.appendChild(this.radioContainer)
    radioContainerWrapper.dataset.containerFor = 'radio'

    this.input = radioContainerWrapper

    this.control = this.theme.getFormControl(this.label, radioContainerWrapper, this.description, this.infoButton)
    this.container.appendChild(this.control)

    /* Any special formatting that needs to happen after the input is added to the dom */
    window.requestAnimationFrame(() => {
      if (this.input.parentNode) this.afterInputReady()
    })
  }

  enable () {
    if (!this.always_disabled) {
      for (let i = 0; i < this.radioGroup.length; i++) {
        this.radioGroup[i].disabled = false
      }
      this.radioContainer.classList.remove('readonly')
      super.enable()
    }
  }

  disable (alwaysDisabled) {
    if (alwaysDisabled) this.always_disabled = true
    for (let i = 0; i < this.radioGroup.length; i++) {
      this.radioGroup[i].disabled = true
    }
    this.radioContainer.classList.add('readonly')
    super.disable()
  }

  destroy () {
    if (this.radioContainer.parentNode && this.radioContainer.parentNode.parentNode) this.radioContainer.parentNode.parentNode.removeChild(this.radioContainer.parentNode)
    if (this.label && this.label.parentNode) this.label.parentNode.removeChild(this.label)
    if (this.description && this.description.parentNode) this.description.parentNode.removeChild(this.description)
    super.destroy()
  }

  getNumColumns () {
    return 2
  }

  setValue (val) {
    for (let i = 0; i < this.radioGroup.length; i++) {
      if (this.radioGroup[i].value === val) {
        this.radioGroup[i].checked = true
        this.value = val
        this.onChange()
        break
      }
    }
  }
}
