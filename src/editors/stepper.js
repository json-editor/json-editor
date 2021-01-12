import { IntegerEditor } from './integer.js'

export class StepperEditor extends IntegerEditor {
  build () {
    super.build()
    this.input.setAttribute('type', 'number')
    if (!this.input.getAttribute('step')) {
      this.input.setAttribute('step', '1')
    }
    const stepperButtons = this.theme.getStepperButtons(this.input)
    this.control.appendChild(stepperButtons)
    this.stepperDown = this.control.querySelector('.stepper-down')
    this.stepperUp = this.control.querySelector('.stepper-up')
  }

  enable () {
    super.enable()
    this.stepperDown.removeAttribute('disabled')
    this.stepperUp.removeAttribute('disabled')
  }

  disable () {
    super.disable()
    this.stepperDown.setAttribute('disabled', true)
    this.stepperUp.setAttribute('disabled', true)
  }
}
