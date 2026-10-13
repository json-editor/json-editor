import { JSONEditor } from '../../../src/core'

const waitForEditorChange = editor => new Promise(resolve => {
  editor.on('change', resolve)
})

describe('Base64 Editor', () => {
  let element
  let editor

  beforeEach(() => {
    document.body.insertAdjacentHTML(
      'afterbegin',
      '<div id="fixture"></div>')
    element = document.getElementById('fixture')
  })

  afterEach(() => {
    editor.destroy()
  })

  it('triggers change after reading multiple files into an array', async () => {
    editor = new JSONEditor(element, {
      schema: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            file: {
              type: 'string',
              media: {
                binaryEncoding: 'base64'
              },
              options: {
                multiple: true
              }
            }
          }
        }
      },
      startval: [
        {
          file: ''
        }
      ]
    })
    await new Promise(resolve => editor.on('ready', resolve))

    const base64Editor = editor.getEditor('root.0.file')
    const change = waitForEditorChange(editor)

    Object.defineProperty(base64Editor.uploader, 'files', {
      configurable: true,
      value: [
        new File(['one'], 'one.txt', { type: 'text/plain' }),
        new File(['two'], 'two.txt', { type: 'text/plain' })
      ]
    })
    base64Editor.uploader.dispatchEvent(new Event('change', {
      bubbles: true
    }))

    await change

    const value = editor.getValue()
    expect(value.length).toBe(2)
    expect(value[0].file).toMatch(/^data:text\/plain;base64,/)
    expect(value[1].file).toMatch(/^data:text\/plain;base64,/)
  })
})
