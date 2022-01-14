/* global describe beforeEach afterEach it expect Event */

/*
Stub test file
TODO: Write unit tests for all interfaces
*/
import { JSONEditor } from '../../src/core'
import someTypes from '../fixtures/some_types.json'
import nestedObject from '../fixtures/nested_object.json'

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
    // eslint-disable-next-line no-console
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

  it('can add custom theme (no custom css rules)', () => {
    class CustomTheme extends JSONEditor.AbstractTheme {}
    JSONEditor.defaults.themes.myCustom2 = CustomTheme
    editor = new JSONEditor(element, { schema: schema, theme: 'myCustom2' })
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

  describe('max_depth option', () => {
    it('should create an editor (schema with recursion on object properties)', () => {
      editor = new JSONEditor(element, {
        schema: {
          definitions: {
            bar: {
              type: 'object',
              properties: {
                foo: {
                  $ref: '#/definitions/bar'
                }
              }
            }
          },
          type: 'object',
          properties: {
            foo: {
              $ref: '#/definitions/bar'
            }
          }
        },
        max_depth: 4
      })
      expect(editor).toBeTruthy()
      editor.promise.then(() => {
        expect(editor.getValue()).toEqual({
          foo: {
            foo: {
              foo: {
                foo: {}
              }
            }
          }
        })
      })
    })

    it('with max_depth that stops on level with enum as object property', () => {
      const depthWithEnum = 2

      editor = new JSONEditor(element, {
        schema: {
          type: 'object',
          properties: {
            field_on_level_one: {
              type: 'object',
              properties: {
                propertyWithEnum: {
                  type: 'string',
                  enum: ['foo', 'bar'],
                  default: 'bar'
                },
                something_else: {
                  type: 'object',
                  properties: {
                    some_field: {
                      type: 'string',
                      default: 'i will be ignored'
                    }
                  }
                }
              }
            }
          }
        },
        max_depth: depthWithEnum
      })
      expect(editor).toBeTruthy()
      editor.promise.then(() => {
        expect(editor.getValue()).toEqual({
          field_on_level_one: {
            propertyWithEnum: 'bar',
            something_else: {}
          }
        })
      })
    })

    it('with max_depth equals to 0 renders all schema', () => {
      editor = new JSONEditor(element, {
        schema: nestedObject,
        max_depth: 0
      })
      expect(editor).toBeTruthy()
      editor.promise.then(() => {
        expect(editor.getValue()).toEqual({ foo1: { foo2: { foo3: { foo4: { bar: 'end schema' } } } } })
      })
    })

    it('renders all schema as default', () => {
      editor = new JSONEditor(element, {
        schema: nestedObject
      })
      expect(editor).toBeTruthy()
      editor.promise.then(() => {
        expect(editor.getValue()).toEqual({ foo1: { foo2: { foo3: { foo4: { bar: 'end schema' } } } } })
      })
    })
  })

  describe('use_default_values', () => {
    describe('false', () => {
      it('do not auto-set default values', () => {
        editor = new JSONEditor(element, {
          schema: someTypes,
          use_default_values: false
        })
        editor.promise.then(() => {
          expect(editor.getValue()).toEqual({
            boolean: undefined,
            enum: undefined,
            integer: undefined,
            number: undefined,
            string: undefined,
            object: {},
            array: []
          })
        })
      })

      it('returns correct values on dirty input text fields', () => {
        editor = new JSONEditor(element, {
          schema: someTypes,
          use_default_values: false
        })
        editor.promise.then(() => {
          expect(editor.getValue()).toEqual({
            boolean: undefined,
            enum: undefined,
            integer: undefined,
            number: undefined,
            string: undefined,
            object: {},
            array: []
          })

          fillField('root[integer]', 3)
          fillField('root[number]', 4)
          fillField('root[string]', 'foo')

          expect(editor.getValue()).toEqual({
            boolean: undefined,
            enum: undefined,
            integer: 3,
            number: 4,
            string: 'foo',
            object: {},
            array: []
          })

          fillField('root[integer]', '')
          fillField('root[number]', '')
          fillField('root[string]', '')

          expect(editor.getValue()).toEqual({
            boolean: undefined,
            enum: undefined,
            integer: undefined,
            number: undefined,
            string: '',
            object: {},
            array: []
          })
        })
      })

      it('returns default value from schema if set', () => {
        editor = new JSONEditor(element, {
          schema: {
            type: 'object',
            properties: {
              string_with_default: { type: 'string', default: 'foobar' },
              string_without_default: { type: 'string' },
              enum_with_default: { type: 'string', enum: ['foobar', 'lorem'], default: 'foobar' },
              enum_without_default: { type: 'string', enum: ['foobar', 'lorem'] }
            }
          },
          use_default_values: false,
          remove_empty_properties: true
        })
        editor.promise.then(() => {
          expect(editor.getValue()).toEqual({
            string_with_default: 'foobar',
            enum_with_default: 'foobar'
          })
        })
      })
    })

    it('true - auto-set default values based on type', () => {
      editor = new JSONEditor(element, {
        schema: someTypes,
        use_default_values: true
      })
      editor.promise.then(() => {
        expect(editor.getValue()).toEqual({
          boolean: false,
          enum: 'foo',
          integer: 0,
          number: 0,
          string: '',
          object: {},
          array: []
        })
      })
    })
  })
})

function fillField (fieldName, value) {
  document.querySelector(`[name="${fieldName}"]`).value = value
  document.querySelector(`[name="${fieldName}"]`).dispatchEvent(new Event('change'))
}
