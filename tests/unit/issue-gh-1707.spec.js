/* global describe beforeEach afterEach it expect */
import { JSONEditor } from '../../src/core'

describe('GitHub issue 1707', () => {
  let element
  let editor

  beforeEach(() => {
    document.body.insertAdjacentHTML('afterbegin', '<div id="fixture"></div>')
    element = document.getElementById('fixture')
  })

  afterEach(() => {
    editor.destroy()
    element.remove()
  })

  it('should keep leading spaces in values set with setValue @issue-1707', (done) => {
    editor = new JSONEditor(element, { schema: { type: 'string' } })
    editor.on('ready', () => {
      editor.setValue('  Jeremy Dorn')
      expect(editor.getValue()).toBe('  Jeremy Dorn')

      editor.setValue('   ')
      expect(editor.getValue()).toBe('   ')

      editor.setValue('  <b>Jeremy</b> Dorn')
      expect(editor.getValue()).toBe('  Jeremy Dorn')
      done()
    })
  })

  it('should keep leading spaces typed into the input @issue-1707', (done) => {
    editor = new JSONEditor(element, { schema: { type: 'string' } })
    editor.on('ready', () => {
      const input = element.querySelector('input')
      input.value = '  Jeremy Dorn'
      input.dispatchEvent(new window.Event('change'))

      expect(input.value).toBe('  Jeremy Dorn')
      expect(editor.getValue()).toBe('  Jeremy Dorn')
      done()
    })
  })
})
