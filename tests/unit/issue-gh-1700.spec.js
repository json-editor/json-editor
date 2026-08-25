/* global describe beforeEach afterEach it expect */
import { JSONEditor } from '../../src/core'
import '../../src/iconlibs/fontawesome5'

describe('GitHub issue 1700', () => {
  let element
  let editor
  let originalButtonProperties

  beforeEach(() => {
    document.body.insertAdjacentHTML('afterbegin', '<div id="fixture"></div>')
    element = document.getElementById('fixture')

    // Override the label key with a sentinel value so we can assert it is
    // actually used for the button's visible text. An iconlib must be
    // active for the bug to be visible - otherwise getButton() falls back
    // to the title key instead of using the (broken) label key.
    originalButtonProperties = JSONEditor.defaults.languages.en.button_properties
    JSONEditor.defaults.languages.en.button_properties = 'TEST_SENTINEL'
  })

  afterEach(() => {
    editor.destroy()
    JSONEditor.defaults.languages.en.button_properties = originalButtonProperties
  })

  it('should use the button_properties language key for the Properties button label @issue-1700', () => {
    editor = new JSONEditor(element, {
      iconlib: 'fontawesome5',
      schema: {
        type: 'object',
        properties: {
          x: { type: 'string' }
        }
      },
      show_opt_in: true
    })

    return editor.promise.then(() => {
      const btn = element.querySelector('.json-editor-btntype-properties')
      expect(btn).toBeTruthy()
      expect(btn.textContent.trim()).toBe('TEST_SENTINEL')
    })
  })
})