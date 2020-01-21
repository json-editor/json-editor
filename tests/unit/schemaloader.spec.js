import { SchemaLoader } from '../../src/schemaloader'

describe('SchemaLoader', () => {
  let loader
  let fetchUrl
  let fileBase

  beforeEach(() => {
    loader = new SchemaLoader()
    fetchUrl =
            document.location.origin + document.location.pathname.toString()
    fileBase = loader._getFileBase(document.location.toString())
  })

  it('should create a schema', () => {
    expect(loader).toBeTruthy()
  })

  it('load schema without $ref', () => {
    const schema = {
      type: 'object',
      properties: {
        name: { type: 'string' }
      }
    }
    loader.load(schema, (schema) => { }, fetchUrl, fileBase)
    const urls = Object.keys(loader.refs)
    expect(urls.length).toEqual(0)
  })

  it('load schema with $ref', () => {
    const schema = {
      definitions: {
        name: {
          type: 'string',
          minLength: 4
        }
      },
      type: 'object',
      properties: {
        fname: { $ref: '#/definitions/name' },
        lname: { $ref: '#/definitions/name' }
      }
    }
    loader.load(schema, (schema) => {
    }, fetchUrl, fileBase)
    const urls = Object.keys(loader.refs)
    expect(urls.length).toEqual(1)
  })
})
