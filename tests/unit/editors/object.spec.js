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

const patternDepFixture = {
  type: "object",
  title: "Pattern Dependency",
  required: [
    "ServerName"
  ],
  properties: {
    ServerName: {
      type: "string",
      title: "Server Name",
      pattern: "^(AA|BB|CC)-[0-99]{2}$",
    },
    Cloud1: {
      title: "Cloud1",
      type: "string",
      enum: ["one", "two"],
      options: {
        dependencies: {
          ServerName: {
            pattern: "^(AA)-[0-99]{2}$"
          }
        }
        
      }
    },
    Cloud2: {
      title: "Cloud2",
      type: "string",
      enum: ["three", "four"],
      options: {
        dependencies: {
          ServerName: {
           pattern: "^(BB)-[0-99]{2}$"
          }
        }
      }
    },
    Cloud3: {
      title: "Cloud3",
      type: "string",
      enum: ["five", "six"],
      options: {
        dependencies: {
          ServerName: {
            pattern: "^(CC)-[0-99]{2}$"
          }
        }
      }
    }
  }
}

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

describe('Object Editor on Pattern Dependency', () => {
  let element
  let editor

  beforeEach(() => {
    document.body.insertAdjacentHTML(
      'afterbegin',
      '<div id="patternDepFixture"></div>')
    element = document.getElementById('patternDepFixture')
  })

  afterEach(() => {
    editor.destroy()
  })

  
  it('testing appearance of Cloud1 due to patterns', () =>{
    editor = new JSONEditor(element, {
      schema: patternDepFixture
    })
    editor.promise.then(() => {
      const ServerName = editor.getEditor('root.ServerName');
      ServerName.setValue("AA-01");
      expect(editor.getValue()["Cloud1"]).toBeDefined()
      expect(editor.getValue()["Cloud2"]).toBeUndefined()
      expect(editor.getValue()["Cloud3"]).toBeUndefined()
    })

  })
  it('testing appearance of Cloud2 due to patterns', () =>{
    editor = new JSONEditor(element, {
      schema: patternDepFixture
    })
    editor.promise.then(() => {
      const ServerName = editor.getEditor('root.ServerName');
      ServerName.setValue("BB-01");
      expect(editor.getValue()["Cloud2"]).toBeDefined()
      expect(editor.getValue()["Cloud1"]).toBeUndefined()
      expect(editor.getValue()["Cloud3"]).toBeUndefined()
    })

  })
  it('testing appearance of Cloud3 due to patterns', () =>{
    editor = new JSONEditor(element, {
      schema: patternDepFixture
    })
    editor.promise.then(() => {
      const ServerName = editor.getEditor('root.ServerName');
      ServerName.setValue("CC-01");
      expect(editor.getValue()["Cloud3"]).toBeDefined()
      expect(editor.getValue()["Cloud1"]).toBeUndefined()
      expect(editor.getValue()["Cloud2"]).toBeUndefined()
    })

  })
})