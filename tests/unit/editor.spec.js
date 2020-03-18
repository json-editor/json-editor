import { JSONEditor } from '../../src/core'

describe('Editor', () => {
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

  it('Primitive Editor start value test', () => {
    editor = new JSONEditor(element, {
      schema: {
        title: 'integer',
        type: 'integer',
        maximum: '5',
        exclusiveMaximum: false
      },
      startval: 5
    })
    expect(editor.getValue()).toBe(5)
  })

  it('Array start value test', () => {
    editor = new JSONEditor(element, {
      schema: {
        type: 'array',
        title: 'Checkboxes',
        items: {
          title: 'Rating',
          type: 'integer',
          maximum: '5',
          exclusiveMaximum: false
        }
      },
      startval: [1, 2, 3, 4, 5]
    })
    expect(JSON.stringify(editor.getValue())).toBe('[1,2,3,4,5]')
  })

  it('Starrating start value test', () => {
    editor = new JSONEditor(element, {
      schema: {
        title: 'Rating',
        type: 'integer',
        format: 'rating',
        maximum: '5',
        exclusiveMaximum: false
      },
      startval: 5
    })
    expect(editor.root.value).toBe(5)
  })

  it('Starrating Array start value test', () => {
    editor = new JSONEditor(element, {
      schema: {
        type: 'array',
        title: 'Checkboxes',
        items: {
          title: 'Rating',
          type: 'integer',
          format: 'rating',
          maximum: '5',
          exclusiveMaximum: false
        }
      },
      startval: [1, 2, 3, 4, 5]
    })
    expect(JSON.stringify(editor.getValue())).toBe('[1,2,3,4,5]')
  })
})
