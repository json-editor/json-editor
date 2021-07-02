/* global describe beforeEach it expect */

import { SchemaLoader } from '../../src/schemaloader'
import { createFakeServer } from 'sinon'

describe('SchemaLoader', () => {
  let loader
  let fileBase
  let fetchUrl

  describe('when no external ref', () => {
    beforeEach(() => {
      fetchUrl =
        document.location.origin + document.location.pathname.toString()
      loader = new SchemaLoader()
      fileBase = loader._getFileBase(document.location.toString())
    })

    it('should create a loader', () => {
      expect(loader).toBeTruthy()
    })

    it('load schema without $ref', async () => {
      const schema = {
        type: 'object',
        properties: {
          name: { type: 'string' }
        }
      }
      await loader.load(schema, fetchUrl, fileBase)
      const urls = Object.keys(loader.refs)
      expect(urls.length).toEqual(0)
    })

    it('load schema with $ref', async () => {
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
      await loader.load(schema, fetchUrl, fileBase)
      const urls = Object.keys(loader.refs)
      expect(urls.length).toEqual(1)
    })

    it('load schema with urn: $ref', async () => {
      const schema = {
        definitions: {
          fname: {
            id: 'urn:fname',
            type: 'string',
            default: 'John',
            minLength: 4
          },
          lname: {
            $id: 'urn:lname',
            type: 'string',
            default: 'Doe',
            minLength: 4
          }
        },
        type: 'object',
        properties: {
          fname: { $ref: 'urn:fname' },
          lname: { $ref: 'urn:lname' }
        }
      }
      await loader.load(schema, fetchUrl, fileBase)
      const urls = Object.keys(loader.refs)
      expect(urls.length).toEqual(4)
    })
  })

  describe('when external absolute ref exists', () => {
    it('should set oprion { ajax: true }', async () => {
      const response = {
        type: 'string',
        minLength: 4
      }
      const server = createFakeServer()
      server.autoRespond = true
      window.XMLHttpRequest = server.xhr
      server.respondWith('/string.json', [
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(response)
      ])
      fetchUrl =
        document.location.origin + document.location.pathname.toString()
      loader = new SchemaLoader({ ajax: true })
      fileBase = loader._getFileBase(document.location.toString())

      const schema = {
        type: 'object',
        properties: {
          fname: { $ref: '/string.json' },
          lname: { $ref: '/string.json' }
        }
      }
      await loader.load(
        schema,
        fetchUrl,
        fileBase
      )
      const urls = Object.keys(loader.refs)
      expect(urls.length).toEqual(1)
      server.restore()
    })
  })

  describe('when external relative $ref exists', () => {
    it('should set oprion { ajax: true }', async () => {
      const response = {
        type: 'string',
        minLength: 4
      }
      const server = createFakeServer()
      server.autoRespond = true
      window.XMLHttpRequest = server.xhr
      server.respondWith('/string.json', [
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(response)
      ])
      fetchUrl =
        document.location.origin + document.location.pathname.toString()
      loader = new SchemaLoader({ ajax: true })
      fileBase = loader._getFileBase(document.location.toString())

      const schema = {
        type: 'object',
        properties: {
          fname: { $ref: 'string.json' },
          lname: { $ref: 'string.json' }
        }
      }
      await loader.load(
        schema,

        fetchUrl,
        fileBase
      )
      const urls = Object.keys(loader.refs)
      expect(urls.length).toEqual(1)
      server.restore()
    })
  })

  describe('when external absolute-to-relative $ref exists', () => {
    it('can get refs recursively', async () => {
      const schema1 = {
        type: 'object',
        properties: {
          fname: { $ref: '/schema/main.json' },
          lname: { $ref: '/schema/main.json' }
        }
      }
      const schema2 = {
        $ref: 'registry/sub.json'
      }
      const schema3 = {
        type: 'string',
        minLength: 4
      }
      const server = createFakeServer()
      server.autoRespond = true
      window.XMLHttpRequest = server.xhr
      server.respondWith('/schema/main.json', [
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(schema2)
      ])
      server.respondWith('/schema/registry/sub.json', [
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(schema3)
      ])
      fetchUrl =
        document.location.origin + document.location.pathname.toString()
      loader = new SchemaLoader({ ajax: true })
      fileBase = loader._getFileBase(document.location.toString())
      await loader.load(
        schema1,
        fetchUrl,
        fileBase
      )
      expect(Object.keys(loader.refs).length).toBe(2)
      server.restore()
    })
  })

  describe('when external relative-to-relative $ref exists', () => {
    it('can get refs recursively', async () => {
      const schema1 = {
        type: 'object',
        properties: {
          fname: { $ref: 'schema/main.json' },
          lname: { $ref: 'schema/main.json' }
        }
      }
      const schema2 = {
        $ref: 'registry/sub.json'
      }
      const schema3 = {
        type: 'string',
        minLength: 4
      }
      const server = createFakeServer()
      server.autoRespond = true
      window.XMLHttpRequest = server.xhr
      server.respondWith('/schema/main.json', [
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(schema2)
      ])
      server.respondWith('/schema/registry/sub.json', [
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(schema3)
      ])
      fetchUrl =
        document.location.origin + document.location.pathname.toString()
      loader = new SchemaLoader({ ajax: true })
      fileBase = loader._getFileBase(document.location.toString())
      await loader.load(
        schema1,
        fetchUrl,
        fileBase
      )
      expect(Object.keys(loader.refs).length).toBe(2)

      server.restore()
    })
  })

  describe('when external absolute $ref with json pointer exists', () => {
    it('can get refs', async () => {
      const schema1 = {
        type: 'object',
        properties: {
          'test-1': { $ref: '/common.schema.json#' },
          'test-2': { $ref: '/common.schema.json#/definitions/known-product' },
          'test-3': {
            type: 'object',
            properties: {
              Product: { $ref: '/common.schema.json#/definitions/known-product' }
            }
          },
          'test-4': { $ref: '/common.schema.json#/properties/customer' }
        }
      }
      const schema2 = {
        definitions: {
          'known-product': {
            title: 'product',
            type: 'string',
            enum: ['power', 'hydrogen', 'heat']
          }
        },
        title: 'test',
        properties: {
          customer: { type: 'string' },
          product: { $ref: '#/definitions/known-product' }
        }
      }
      const server = createFakeServer()
      server.autoRespond = true
      window.XMLHttpRequest = server.xhr
      server.respondWith('/common.schema.json', [
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(schema2)
      ])
      fetchUrl =
        document.location.origin + document.location.pathname.toString()
      loader = new SchemaLoader({ ajax: true })
      fileBase = loader._getFileBase(document.location.toString())
      await loader.load(
        schema1,
        fetchUrl,
        fileBase
      )
      expect(Object.keys(loader.refs).length).toBe(3)
      server.restore()
    })
  })

  describe('when external relative $ref with json pointer exists', () => {
    it('can get refs', async () => {
      const schema1 = {
        type: 'object',
        properties: {
          'test-1': { $ref: 'common.schema.json#' },
          'test-2': { $ref: 'common.schema.json#/definitions/known-product' },
          'test-3': {
            type: 'object',
            properties: {
              Product: { $ref: 'common.schema.json#/definitions/known-product' }
            }
          },
          'test-4': { $ref: '/common.schema.json#/properties/customer' }
        }
      }
      const schema2 = {
        definitions: {
          'known-product': {
            title: 'product',
            type: 'string',
            enum: ['power', 'hydrogen', 'heat']
          }
        },
        title: 'test',
        properties: {
          customer: { type: 'string' },
          product: { $ref: '#/definitions/known-product' }
        }
      }
      const server = createFakeServer()
      server.autoRespond = true
      window.XMLHttpRequest = server.xhr
      server.respondWith('/common.schema.json', [
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(schema2)
      ])
      fetchUrl =
        document.location.origin + document.location.pathname.toString()
      loader = new SchemaLoader({ ajax: true })
      fileBase = loader._getFileBase(document.location.toString())
      await loader.load(
        schema1,
        fetchUrl,
        fileBase
      )
      expect(Object.keys(loader.refs).length).toBe(4)
      server.restore()
    })
  })

  describe('when external ref exists with json pointer', () => {
    it('should get ref and resolve json pointer', async () => {
      const response = {
        definitions: {
          fruits: {
            enum: [
              'apple',
              'banana',
              'cherry'
            ]
          }
        }
      }
      const server = createFakeServer()
      server.autoRespond = true
      window.XMLHttpRequest = server.xhr
      server.respondWith([
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(response)
      ])
      fetchUrl =
        document.location.origin + document.location.pathname.toString()
      loader = new SchemaLoader({ ajax: true })
      fileBase = loader._getFileBase(document.location.toString())

      const schema = {
        type: 'object',
        properties: {
          fruits: { $ref: '/fruits.json#/definitions/fruits' }
        }
      }
      await loader.load(
        schema,
        fetchUrl,
        fileBase
      )
      const urls = Object.keys(loader.refs)
      expect(urls.length).toEqual(1)
      expect(urls[0]).toEqual('/fruits.json#/definitions/fruits')
      expect(loader.refs['/fruits.json#/definitions/fruits']).toEqual({ enum: ['apple', 'banana', 'cherry'] })
      server.restore()
    })
  })

  describe('when resolving undeclared URN $ref', () => {
    it('can get refs recursively', async () => {
      const schema1 = {
        type: 'object',
        properties: {
          fname: { $ref: 'urn:main' },
          lname: { $ref: 'urn:sub' }
        }
      }
      const schema2 = {
        definitions: {
          name: {
            id: 'urn:main',
            $ref: 'urn:sub'
          }
        }
      }
      const schema3 = {
        definitions: {
          name: {
            $id: 'urn:sub',
            type: 'string',
            default: 'Waldo',
            minLength: 4
          }
        }
      }

      loader = new SchemaLoader({
        urn_resolver: async (urn) => {
          if (urn === 'urn:main') {
            return JSON.stringify(schema2)
          }
          if (urn === 'urn:sub') {
            return (JSON.stringify(schema3))
          }
          return false
        }
      })
      await loader.load(
        schema1
      )
      expect(Object.keys(loader.refs).length).toBe(4)
    })
  })

  describe('when resolving undeclared URN $ref with fragment', () => {
    it('can get refs recursively', async () => {
      const schema1 = {
        type: 'object',
        properties: {
          fname: { $ref: 'urn:main#/definitions/name' },
          lname: { $ref: 'urn:main#/definitions/name' }
        }
      }
      const schema2 = {
        definitions: {
          name: {
            $id: 'urn:main',
            type: 'string',
            default: 'Waldo',
            minLength: 4
          }
        }
      }
      loader = new SchemaLoader({
        urn_resolver: async (urn) => {
          if (urn === 'urn:main') {
            return JSON.stringify(schema2)
          }
          return false
        }
      })
      await loader.load(schema1)
      expect(Object.keys(loader.refs).length).toBe(2)
    })
  })
})
