import { SchemaLoader } from '../../src/schemaloader'
import * as sinon from 'sinon'

describe('SchemaLoader', () => {
  let loader
  let fetchUrl
  let fileBase

  beforeEach(() => {
    loader = new SchemaLoader({}, { ajax: true })
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

  it('load remote schema', (done) => {
    const response = {
      type: 'string',
      minLength: 4
    }
    const server = sinon.fakeServer.create()
    server.autoRespond = true
    window.XMLHttpRequest = server.xhr
    server.respondWith([200, { 'Content-Type': 'application/json' }, JSON.stringify(response)])
    const schema = {
      type: 'object',
      properties: {
        fname: { $ref: '/string.json' },
        lname: { $ref: '/string.json' }
      }
    }
    loader.load(schema, (schema) => {
      const urls = Object.keys(loader.refs)
      expect(urls.length).toEqual(1)
      done()
      server.restore()
    }, fetchUrl, fileBase)
  })
})
