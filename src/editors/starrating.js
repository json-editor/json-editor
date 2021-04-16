import { StringEditor } from './string.js'
import rules from './starrating.css.js'

export class StarratingEditor extends StringEditor {
  build () {
    if (!this.options.compact) this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())
    if (this.schema.description) this.description = this.theme.getFormInputDescription(this.translateProperty(this.schema.description))
    if (this.options.infoText) this.infoButton = this.theme.getInfoButton(this.translateProperty(this.options.infoText))
    if (this.options.compact) this.container.classList.add('compact')

    this.ratingContainer = document.createElement('div')
    this.ratingContainer.classList.add('starrating')

    /* Emulate the old "rating" editor parameters */
    if (this.schema.enum === undefined) {
      let max = this.schema.maximum ? this.schema.maximum : 5
      if (this.schema.exclusiveMaximum) max--
      this.enum_values = []
      for (let k = 0; k < max; k++) this.enum_values.push(k + 1)
    } else this.enum_values = this.schema.enum

    this.radioGroup = []

    const radioInputEventhandler = e => {
      e.preventDefault()
      e.stopPropagation()
      this.setValue(e.currentTarget.value)
      this.onChange(true)
    }

    for (let i = this.enum_values.length - 1; i > -1; i--) {
      const id = this.formname + (i + 1)

      /* form radio elements */
      const radioInput = this.theme.getFormInputField('radio')
      radioInput.name = `${this.formname}[starrating]`
      radioInput.value = this.enum_values[i]
      radioInput.id = id
      radioInput.addEventListener('change', radioInputEventhandler, false)
      this.radioGroup.push(radioInput)

      /* form-label for radio elements */
      const radioLabel = document.createElement('label')
      radioLabel.htmlFor = id
      radioLabel.title = this.enum_values[i]
      if (this.options.displayValue) {
        radioLabel.classList.add('starrating-display-enabled')
      }

      this.ratingContainer.appendChild(radioInput)
      this.ratingContainer.appendChild(radioLabel)
    }

    if (this.options.displayValue) {
      this.displayRating = document.createElement('div')
      this.displayRating.classList.add('starrating-display')
      this.displayRating.innerText = this.enum_values[0]
      this.ratingContainer.appendChild(this.displayRating)
    }

    if (this.schema.readOnly || this.schema.readonly) {
      this.disable(true)
      for (let j = 0; j < this.radioGroup.length; j++) {
        this.radioGroup[j].disabled = true
      }
      this.ratingContainer.classList.add('readonly')
    }

    const ratingsContainerWrapper = this.theme.getContainer()
    ratingsContainerWrapper.appendChild(this.ratingContainer)

    this.input = ratingsContainerWrapper

    this.control = this.theme.getFormControl(this.label, ratingsContainerWrapper, this.description, this.infoButton)
    this.container.appendChild(this.control)

    this.refreshValue()
  }

  enable () {
    if (!this.always_disabled) {
      for (let i = 0; i < this.radioGroup.length; i++) {
        this.radioGroup[i].disabled = false
      }
      this.ratingContainer.classList.remove('readonly')
      this.disabled = false
    }
  }

  disable (alwaysDisabled) {
    if (alwaysDisabled) this.always_disabled = true
    for (let i = 0; i < this.radioGroup.length; i++) {
      this.radioGroup[i].disabled = true
    }
    this.ratingContainer.classList.add('readonly')
    this.disabled = true
  }

  destroy () {
    if (this.ratingContainer.parentNode && this.ratingContainer.parentNode.parentNode) this.ratingContainer.parentNode.parentNode.removeChild(this.ratingContainer.parentNode)
    if (this.label && this.label.parentNode) this.label.parentNode.removeChild(this.label)
    if (this.description && this.description.parentNode) this.description.parentNode.removeChild(this.description)
    super.destroy()
  }

  getNumColumns () {
    return 2
  }

  getValue () {
    if (!this.dependenciesFulfilled) {
      return undefined
    }
    if (this.schema.type === 'integer') {
      return this.value === '' ? undefined : this.value * 1
    }
    return this.value
  }

  setValue (value) {
    for (let i = 0; i < this.radioGroup.length; i++) {
      if (this.radioGroup[i].value === `${value}`) {
        this.radioGroup[i].checked = true
        this.value = value

        if (this.options.displayValue) this.displayRating.innerHTML = this.value

        this.onChange(true)
        break
      }
    }
  }
}

StarratingEditor.rules = rules
