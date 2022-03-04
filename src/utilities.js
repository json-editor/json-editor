/**
 * Taken from jQuery 2.1.3
 *
 * #### NOTE
 * Not plain objects is,
 * - Any object or value whose internal [[Class]] property is not "[object Object]"
 * - DOM nodes
 * - window
 *
 * @param {Object} obj - Variable name
 * @returns {Boolean}
 */
export function isPlainObject (obj) {
  if (obj === null) return false

  if (typeof obj !== 'object' || obj.nodeType || (obj === obj.window)) return false

  if (obj.constructor && !hasOwnProperty(obj.constructor.prototype, 'isPrototypeOf')) return false

  /* Most likely |obj| is a plain object, created by {} or constructed with new Object */
  return true
}

export function deepCopy (target) {
  return isPlainObject(target) ? extend({}, target) : Array.isArray(target) ? target.map(deepCopy) : target
}

export function extend (destination, ...args) {
  args.forEach(source => {
    if (source) {
      Object.keys(source).forEach(property => {
        if (source[property] && isPlainObject(source[property])) {
          if (!hasOwnProperty(destination, property)) destination[property] = {}
          extend(destination[property], source[property])
        } else if (Array.isArray(source[property])) {
          destination[property] = deepCopy(source[property])
        } else {
          destination[property] = source[property]
        }
      })
    }
  })

  return destination
}

export function trigger (el, event) {
  const e = document.createEvent('HTMLEvents')
  e.initEvent(event, true, true)
  el.dispatchEvent(e)
}

/**
 * Helper function to locate a shadowRoot parent if at all
 *
 * @param {Element} node - Node
 */
export function getShadowParent (node) {
  return node && (node.toString() === '[object ShadowRoot]' ? node : getShadowParent(node.parentNode))
}

/**
 * Helper function to check own property key
 *
 * @see https://eslint.org/docs/rules/no-prototype-builtins
 */
export function hasOwnProperty (obj, key) {
  return obj && Object.prototype.hasOwnProperty.call(obj, key)
}

// From https://github.com/angular/angular.js/blob/master/src/ng/directive/input.js
const NUMBER_REGEXP = /^\s*(-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/

export function isNumber (value) {
  if (typeof value === 'undefined' || value === null) return false
  const match = value.match(NUMBER_REGEXP)
  const v = parseFloat(value)
  return match !== null && !isNaN(v) && isFinite(v)
}

const INTEGER_REGEXP = /^\s*(-|\+)?(\d+)\s*$/

export function isInteger (value) {
  if (typeof value === 'undefined' || value === null) return false
  const match = value.match(INTEGER_REGEXP)
  const v = parseInt(value)
  return match !== null && !isNaN(v) && isFinite(v)
}

/* This function generates a uuid.
https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
TODO: It will be probably better to move to: https://www.npmjs.com/package/uuid
*/
export function generateUUID () {
  let d = new Date().getTime()

  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now() /* use high-precision timer if available */
  }

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
}
