/* global describe beforeEach it expect */

import { defaults } from '../../src/defaults'

describe('defaults', () => {
  it('should be an object', () => {
    expect(typeof defaults).toBe('object')
  })

  it('should have standard properties defined', () => {
    expect(typeof (defaults.themes)).toBe('object')
    expect(typeof (defaults.templates)).toBe('object')
    expect(typeof (defaults.iconlibs)).toBe('object')
    expect(typeof (defaults.editors)).toBe('object')
    expect(typeof (defaults.languages)).toBe('object')
    expect(Array.isArray(defaults.resolvers)).toBe(true)
    expect(Array.isArray(defaults.custom_validators)).toBe(true)
  })
})

describe('languages test', () => {
  beforeEach(() => {
    defaults.languages.es = {
      error_notset: 'propiedad debe existir'
    }
    defaults.language = 'es'
  })

  it('should translate other language', () => {
    expect(defaults.translate('error_notset')).toBe('propiedad debe existir')
  })

  it('should return default message. if no translation', () => {
    expect(defaults.translate('error_notempty')).toBe('Value required')
  })

  it('should return translation key for unknown translation string', () => {
    expect(defaults.translate('unknown_message')).toBe('unknown_message')
  })
})
