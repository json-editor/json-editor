import { JSONEditor } from '../../../src/core'

const fixture = [
  {
    title: 'Object Editor Test',
    schema: {
      type: 'object',
      required: [
        'name'
      ],
      properties: {
        name: {
          type: 'string',
          default: 'Jeremy Dorn'
        }
      }
    },
    value: {
      name: 'Jeremy Dorn'
    }
  },
  {
    title: 'remove_empty_properties test',
    schema: {
      type: 'object',
      required: [
        'name'
      ],
      properties: {
        name: {
          type: 'string',
          default: 'Jeremy Dorn'
        },
        location: {
          type: 'object',
          properties: {
            city: {
              type: 'string'
            }
          },
          options: {
            remove_empty_properties: true
          }
        }
      },
      options: {
        remove_empty_properties: true
      }
    },
    value: {
      name: 'Jeremy Dorn'
    }
  }
]

describe('Object Editor', () => {
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

  fixture.forEach(spec => {
    it(spec.title, () => {
      editor = new JSONEditor(element, {
        schema: spec.schema
      })
      editor.promise.then(() => {
        expect(editor.getValue()).toEqual(spec.value)
      })
    })
  })
})
