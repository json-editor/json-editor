import { IntegerEditor } from './integer.js'

export class StepperEditor extends IntegerEditor {
  build () {
    super.build()
    this.input.setAttribute('type', 'number')
    const stepperButtons = this.theme.getStepperButtons(this.input)
    this.control.appendChild(stepperButtons)
  }
}
