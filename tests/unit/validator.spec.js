/* global describe beforeAll beforeEach afterEach afterAll it expect */

import { JSONEditor } from '../../src/core'
import { Validator } from '../../src/validator'
import { defaults } from '../../src/defaults'
import fixture from '../fixtures/validation.json'
import fixtureString from '../fixtures/string.json'
import fixtureRecursive from '../fixtures/recursive.json'
import * as math from 'mathjs'
import { createFakeServer } from 'sinon'
import * as deepEqual from 'fast-deep-equal'

describe('Validator', () => {
  it('mathjs test', () => {
    window.math = math
    expect(window.math.mod(window.math.bignumber(1), window.math.bignumber(0.01))).toEqual(window.math.bignumber(0))
  })
  it('should exist', () => {
    expect(Validator).toBeTruthy()
  })

  describe('Constructor()', () => {
    it('should create a new object', () => {
      const jsonEditor = {}
      const schema = {}
      const options = {}
      const instance = new Validator(jsonEditor, schema, options, defaults)
      expect(instance).toBeTruthy()
    })
  })
})

describe('Validation Test', () => {
  let element
  let server

  beforeAll(() => {
    server = createFakeServer()
    server.autoRespond = true
    window.XMLHttpRequest = server.xhr
    const response = {
      string: fixtureString,
      recursive: fixtureRecursive
    }
    server.respondWith(/(\w+)\.json/, (xhr, name) => {
      xhr.respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(response[name]))
    })
  })

  afterAll(() => {
    server.restore()
  })

  beforeEach(() => {
    window.math = math
    document.body.insertAdjacentHTML(
      'afterbegin',
      '<div id="fixture"></div>')
    element = document.getElementById('fixture')
  })

  Object.entries(fixture).forEach(([subject, spec]) => {
    describe(subject, () => {
      let editor
      beforeEach(() => {
        editor = new JSONEditor(element, {
          schema: spec.schema,
          ajax: true
        })
      })

      afterEach(() => {
        editor.destroy()
      })
      spec.valid.forEach((v, i) => {
        it(`valid data ${i + 1}`, (done) => {
          editor.on('ready', () => {
            const result = editor.validate(v)
            expect(result.length).toBe(0)
            done()
          })
        })

        it(`does not change valid data ${i + 1}`, (done) => {
          editor.on('ready', () => {
            editor.setValue(v)
            expect(deepEqual(editor.getValue(), v)).toBe(true)
            done()
          })
        })
      })

      spec.invalid.forEach((v, i) => {
        it(`invalid data ${i + 1}`, (done) => {
          editor.on('ready', () => {
            const result = editor.validate(v)
            expect(result.length).toBeGreaterThan(0)
            done()
          })
        })
      })
    })
  })
})
