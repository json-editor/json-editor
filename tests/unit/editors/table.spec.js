import { JSONEditor } from '../../../src/core'

const fixture = [
  {
    title: 'Table Editor Test',
    schema: {
      type: 'array',
      format: 'table',
      items: {
        type: ['boolean', 'string', 'null', 'number']
      }
    },
    value: [false]
  },
  {
    title: 'Table Editor Test',
    schema: {
      type: 'array',
      format: 'table',
      items: {
        type: ['boolean', 'string', 'null', 'number']
      }
    },
    value: ['']
  },
  {
    title: 'Table Editor Test',
    schema: {
      type: 'array',
      format: 'table',
      items: {
        type: ['boolean', 'string', 'null', 'number']
      }
    },
    value: [0]
  },
  {
    title: 'Table Editor Test',
    schema: {
      type: 'array',
      format: 'table',
      items: {
        type: 'string'
      }
    },
    options: {
      use_default_values: false
    },
    value: ['']
  },
  {
    title: 'Table Editor Test',
    schema: {
      type: 'array',
      format: 'table',
      items: {
        type: 'number'
      }
    },
    options: {
      use_default_values: false
    },
    value: [0]
  }
]

describe('Table Editor', () => {
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
        editor.setValue(spec.value)
        expect(editor.getValue()).toEqual(spec.value)
      })
    })
  })
})
