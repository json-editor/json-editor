/* global describe beforeEach afterEach it expect */
import { JSONEditor } from '../../src/core'

describe('GitHub issue 1704', () => {
  let element
  let editor

  beforeEach(() => {
    document.body.insertAdjacentHTML('afterbegin', '<div id="fixture"></div>')
    element = document.getElementById('fixture')
    window.__xss1704 = false
  })

  afterEach(() => {
    editor.destroy()
    element.remove()
    delete window.__xss1704
  })

  it('should strip tags without executing event handlers @issue-1704', (done) => {
    editor = new JSONEditor(element, { schema: { type: 'string' } })
    editor.on('ready', () => {
      editor.setValue('a <img src=x onerror="window.__xss1704=true"> b')

      setTimeout(() => {
        expect(window.__xss1704).toBe(false)
        expect(editor.getValue()).toBe('a  b')
        done()
      }, 100)
    })
  })
})
