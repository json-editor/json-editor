/* This editor is using the signature pad editor from https://github.com/szimek/signature_pad */
/* Credits for the pad itself go to https://github.com/szimek */

import { StringEditor } from './string.js'

export class SignatureEditor extends StringEditor {
  build () {
    if (!this.options.compact) this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())
    if (this.schema.description) this.description = this.theme.getFormInputDescription(this.translateProperty(this.schema.description))
    const formname = this.formname.replace(/\W/g, '')

    if (typeof SignaturePad === 'function') {
      /* Dynamically add the required CSS the first time this editor is used */
      this.input = this.theme.getFormInputField('hidden')
      this.container.appendChild(this.input)

      /* Required to keep height */
      const signatureContainer = document.createElement('div')
      signatureContainer.classList.add('signature-container')

      /* Create canvas for signature pad */
      const canvas = document.createElement('canvas')
      if (this.jsoneditor.options.use_name_attributes) {
        canvas.setAttribute('name', formname)
      }
      canvas.classList.add('signature')
      signatureContainer.appendChild(canvas)

      this.signaturePad = new window.SignaturePad(canvas, {
        onEnd () {
          /* check if the signature is not empty before setting a value */
          if (!this.signaturePad.isEmpty()) {
            this.input.value = this.signaturePad.toDataURL()
          } else {
            this.input.value = ''
          }

          this.is_dirty = true
          this.refreshValue()
          this.watch_listener()
          this.jsoneditor.notifyWatchers(this.path)
          if (this.parent) this.parent.onChildEditorChange(this)
          else this.jsoneditor.onChange()
        }
      })

      /* create button containers and add clear signature button */
      const buttons = document.createElement('div')
      const clearButton = document.createElement('button')
      clearButton.classList.add('tiny', 'button')
      clearButton.innerHTML = 'Clear signature'
      buttons.appendChild(clearButton)
      signatureContainer.appendChild(buttons)

      if (this.options.compact) this.container.setAttribute('class', `${this.container.getAttribute('class')} compact`)

      if (this.schema.readOnly || this.schema.readonly) {
        this.disable(true)

        Array.from(this.inputs).forEach(input => {
          canvas.setAttribute('readOnly', 'readOnly')
          input.disabled = true
        })
      }
      /* add listener to the clear button. when clicked, trigger a canvas change after emptying the canvas */
      clearButton.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.signaturePad.clear()
        /* trigger stroke end to let signaturePad update the dataURL */
        this.signaturePad.strokeEnd()
      })

      this.control = this.theme.getFormControl(this.label, signatureContainer, this.description)
      this.container.appendChild(this.control)
      this.refreshValue()

      /* signature canvas will stretch to signatureContainer width */
      canvas.width = signatureContainer.offsetWidth
      if (this.options && this.options.canvas_height) {
        canvas.height = this.options.canvas_height
      } else {
        canvas.height = '300' /* Set to default height of 300px; */
      }
    } else {
      const message = document.createElement('p')
      message.innerHTML = 'Signature pad is not available, please include SignaturePad from https://github.com/szimek/signature_pad'
      this.container.appendChild(message)
    }
  }

  setValue (val) {
    if (typeof SignaturePad === 'function') {
      const sanitized = this.sanitize(val)
      if (this.value === sanitized) {
        return
      }
      this.value = sanitized
      this.input.value = this.value
      this.signaturePad.clear()
      /* only set contents if value != '' */
      if (val && val !== '') {
        this.signaturePad.fromDataURL(val)
      }
      this.watch_listener()
      this.jsoneditor.notifyWatchers(this.path)
      return false
    }
  }

  destroy () {
    this.signaturePad.off()
    delete this.signaturePad
  }
}
