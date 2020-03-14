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

  if (obj.constructor && !Object.prototype.hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf')) return false

  /* Most likely |obj| is a plain object, created by {} or constructed with new Object */
  return true
}

export function deepCopy (target) {
  return isPlainObject(target) ? extend({}, target) : Array.isArray(target) ? target.map(deepCopy) : target
}

export function extend (destination, ...args) {
  args.forEach(source => {
    Object.keys(source).forEach(property => {
      if (source[property] && isPlainObject(source[property])) {
        if (!destination.hasOwnProperty(property)) destination[property] = {}
        extend(destination[property], source[property])
      } else if (Array.isArray(source[property])) {
        destination[property] = deepCopy(source[property])
      } else {
        destination[property] = source[property]
      }
    })
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
