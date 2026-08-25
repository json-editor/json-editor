/* global describe beforeEach afterEach it expect */
import { mergeDeep, overwriteExistingProperties } from '../../src/utilities'
import { JSONEditor } from '../../src/core'
import '../../src/iconlibs/fontawesome5'

describe('utilities', () => {
  afterEach(() => {
    delete Object.prototype.ppBullseye
    delete Function.prototype.ppBullseye
  })

  describe('mergeDeep', () => {
    it('should not pollute Object.prototype via a __proto__ key @security', () => {
      const payload = JSON.parse('{"__proto__":{"ppBullseye":"ppBullseye"}}')
      mergeDeep({}, payload)
      expect({}.ppBullseye).toBeUndefined()
    })

    it('should not pollute Function.prototype via a constructor key @security', () => {
      const payload = JSON.parse('{"constructor":{"prototype":{"ppBullseye":"ppBullseye"}}}')
      mergeDeep({}, payload)
      expect((() => {}).ppBullseye).toBeUndefined()
    })

    it('should still merge legitimate nested keys', () => {
      const target = { a: { b: 1 } }
      mergeDeep(target, { a: { c: 2 }, d: 3 })
      expect(target).toEqual({ a: { b: 1, c: 2 }, d: 3 })
    })
  })

  describe('overwriteExistingProperties', () => {
    it('should not reassign a __proto__ reference @security', () => {
      const payload = JSON.parse('{"__proto__":{"ppBullseye":"ppBullseye"}}')
      overwriteExistingProperties({}, payload)
      expect({}.ppBullseye).toBeUndefined()
    })

    it('should still overwrite legitimate existing keys', () => {
      const obj1 = { a: 1, b: 2 }
      overwriteExistingProperties(obj1, { a: 10, c: 20 })
      expect(obj1).toEqual({ a: 10, b: 2 })
    })
  })

  describe('JSONEditor if/then/else schema handling', () => {
    let element
    let editor

    beforeEach(() => {
      document.body.insertAdjacentHTML('afterbegin', '<div id="fixture"></div>')
      element = document.getElementById('fixture')
    })

    afterEach(() => {
      editor.destroy()
    })

    it('should not pollute Object.prototype when a malicious __proto__ key is present in a then/else schema @security', () => {
      editor = new JSONEditor(element, {
        schema: {
          type: 'object',
          properties: {
            x: { type: 'string' }
          },
          if: {
            properties: { x: { const: 'a' } }
          },
          then: JSON.parse('{"__proto__":{"ppBullseye":"ppBullseye"}}'),
          else: JSON.parse('{"__proto__":{"ppBullseye":"ppBullseye"}}')
        },
        show_opt_in: true
      })

      return editor.promise.then(() => {
        expect({}.ppBullseye).toBeUndefined()
      })
    })
  })
})
