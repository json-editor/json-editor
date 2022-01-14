/* global describe beforeEach afterEach it expect */

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
    editor.promise.then(() => {
      expect(editor.getValue()).toBe(5)
    })
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
    editor.promise.then(() => {
      expect(JSON.stringify(editor.getValue())).toBe('[1,2,3,4,5]')
    })
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
    editor.promise.then(() => {
      expect(editor.root.value).toBe(5)
    })
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
    editor.promise.then(() => {
      expect(JSON.stringify(editor.getValue())).toBe('[1,2,3,4,5]')
    })
  })

  it('oneOf Editor Test', () => {
    editor = new JSONEditor(element, {
      schema: {
        type: 'object',
        properties: {
          one_or_many: {
            oneOf: [
              {
                type: 'string'
              },
              {
                type: 'array',
                format: 'table',
                items: {
                  type: 'string'
                }
              }
            ]
          }
        }
      }
    })
    editor.promise.then(() => {
      const e = editor.getEditor('root.one_or_many')
      e.switchEditor(1)
    })
  })
})

const fixture = [
  {
    title: 'NumberEditor test',
    schema: {
      type: 'number'
    },
    input: '       123.45   ',
    value: 123.45
  },
  {
    title: 'NumberEditor test (invalid value)',
    schema: {
      type: 'number'
    },
    input: '12-12',
    value: '12-12'
  },
  {
    title: 'Integer test',
    schema: {
      type: 'integer'
    },
    input: '       123   ',
    value: 123
  }
]

describe('Number Editor', () => {
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
        editor.setValue(spec.input)
        expect(editor.getValue()).toBe(spec.value)
      })
    })
  })
})
