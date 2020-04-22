/*
Stub test file
TODO: Write unit tests for all interfaces
*/
import { JSONEditor } from '../../src/core'

const schema = {
  type: 'object',
  properties: {
    name: { type: 'string' }
  }
}

describe('JSONEditor', function () {
  let element
  let editor

  // inject the HTML fixture for the tests
  beforeEach(() => {
    const fixture = '<div id="fixture"></div>'

    document.body.insertAdjacentHTML('afterbegin', fixture)
    element = document.getElementById('fixture')
  })

  // remove the html fixture from the DOM
  afterEach(() => {
    document.body.removeChild(document.getElementById('fixture'))
  })

  it('should create an editor', () => {
    console.log('Attempting to create new JSONEditor')
    editor = new JSONEditor(element, { schema: schema })
    expect(editor).toBeTruthy()
  })

  it('can add custom iconlib', () => {
    const customMapping = {
      collapse: 'key-down',
      expand: 'key-right',
      delete: 'trash',
      edit: 'edit',
      add: 'add',
      subtract: 'minus',
      cancel: 'check-circled',
      save: 'create-file',
      moveup: 'arrow-up',
      moveright: 'arrow-right',
      movedown: 'arrow-down',
      moveleft: 'arrow-left',
      copy: 'copy',
      clear: 'close',
      time: 'time',
      calendar: 'calendar',
      edit_properties: 'settings'
    }
    const customIconPrefix = 'mr-1 text-xl ki-'

    class CustomIconLib extends JSONEditor.AbstractIconLib {
      constructor () {
        super()
        this.mapping = customMapping
        this.icon_prefix = customIconPrefix
      }
    }
    JSONEditor.defaults.iconlibs.myCustom = CustomIconLib
    editor = new JSONEditor(element, { schema: schema, iconlib: 'myCustom' })
    expect(editor.iconlib.icon_prefix).toBe(customIconPrefix)
  })

  it('can add custom theme', () => {
    class CustomTheme extends JSONEditor.AbstractTheme {}
    CustomTheme.rules = { '.slider:focus': 'box-shadow:none' }
    JSONEditor.defaults.themes.myCustom = CustomTheme
    editor = new JSONEditor(element, { schema: schema, theme: 'myCustom' })
    expect(editor.theme).toBeTruthy()
  })

  it('can add custom editor', () => {
    class CustomEditor extends JSONEditor.AbstractEditor {}
    JSONEditor.defaults.editors.custom = CustomEditor
    JSONEditor.defaults.resolvers.unshift((schema) => {
      if (schema.type === 'object' && schema.format === 'custom') {
        return 'custom'
      }
    })
    const schema = {
      type: 'object',
      format: 'custom',
      properties: {
        name: { type: 'string' }
      }
    }
    editor = new JSONEditor(element, { schema: schema })
    expect(editor).toBeTruthy()
  })
})
