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

    it('load schema without $ref', () => {
      const schema = {
        type: 'object',
        properties: {
          name: { type: 'string' }
        }
      }
      loader.load(schema, schema => {}, fetchUrl, fileBase)
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
      loader.load(schema, schema => {}, fetchUrl, fileBase)
      const urls = Object.keys(loader.refs)
      expect(urls.length).toEqual(1)
    })
  })

  describe('when external absolute ref exists', () => {
    it('should set oprion { ajax: true }', done => {
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
      loader.load(
        schema,
        schema => {
          const urls = Object.keys(loader.refs)
          expect(urls.length).toEqual(1)
          done()
          server.restore()
        },
        fetchUrl,
        fileBase
      )
    })
  })

  describe('when external relative $ref exists', () => {
    it('should set oprion { ajax: true }', done => {
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
      loader.load(
        schema,
        schema => {
          const urls = Object.keys(loader.refs)
          expect(urls.length).toEqual(1)
          done()
          server.restore()
        },
        fetchUrl,
        fileBase
      )
    })
  })

  describe('when external absolute-to-relative $ref exists', () => {
    it('can get refs recursively', done => {
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
      loader.load(
        schema1,
        schema => {
          expect(Object.keys(loader.refs).length).toBe(2)
          done()
          server.restore()
        },
        fetchUrl,
        fileBase
      )
    })
  })

  describe('when external relative-to-relative $ref exists', () => {
    it('can get refs recursively', done => {
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
      loader.load(
        schema1,
        schema => {
          console.log(loader.refs)
          expect(Object.keys(loader.refs).length).toBe(2)
          done()
          server.restore()
        },
        fetchUrl,
        fileBase
      )
    })
  })

  describe('when external absolute $ref with json pointer exists', () => {
    it('can get refs', done => {
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
          }
        }
      }
      const schema2 = {
        definitions: {
          'known-product': {
            title: 'product',
            type: 'string',
            enum: [ 'power', 'hydrogen', 'heat' ]
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
      loader.load(
        schema1,
        schema => {
          console.log(loader.refs)
          expect(Object.keys(loader.refs).length).toBe(2)
          done()
          server.restore()
        },
        fetchUrl,
        fileBase
      )
    })
  })

  describe('when external relative $ref with json pointer exists', () => {
    it('can get refs', done => {
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
          }
        }
      }
      const schema2 = {
        definitions: {
          'known-product': {
            title: 'product',
            type: 'string',
            enum: [ 'power', 'hydrogen', 'heat' ]
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
      loader.load(
        schema1,
        schema => {
          console.log(loader.refs)
          expect(Object.keys(loader.refs).length).toBe(2)
          done()
          server.restore()
        },
        fetchUrl,
        fileBase
      )
    })
  })

  describe('when external ref exists with json pointer', () => {
    it('should get ref and resolve json pointer', done => {
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
      loader.load(
        schema,
        schema => {
          const urls = Object.keys(loader.refs)
          expect(urls.length).toEqual(1)
          expect(urls[0]).toEqual('/fruits.json#/definitions/fruits')
          expect(loader.refs['/fruits.json#/definitions/fruits']).toEqual({ enum: ['apple', 'banana', 'cherry'] })
          done()
          server.restore()
        },
        fetchUrl,
        fileBase
      )
    })
  })
})
