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
export function isPlainObject(obj) {
  if (obj === null) return false

  if (typeof obj !== 'object' || obj.nodeType || (obj === obj.window)) return false

  if (obj.constructor && !Object.prototype.hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf')) return false

  /* Most likely |obj| is a plain object, created by {} or constructed with new Object */
  return true
}

export function deepCopy(target) {
  return isPlainObject(target) ? extend({}, target) : Array.isArray(target) ? target.map(deepCopy) : target
}

export function extend(destination, ...args) {
  for (let i = 0; i < args.length; i++) {
    let source = args[i]
    for (let property in source) {
      if (!source.hasOwnProperty(property)) continue
      if (source[property] && isPlainObject(source[property])) {
        if (!destination.hasOwnProperty(property)) destination[property] = {}
        extend(destination[property], source[property])
      } else if (Array.isArray(source[property])) {
        destination[property] = deepCopy(source[property])
      } else {
        destination[property] = source[property]
      }
    }
  }

  return destination
}

export function each(obj, callback) {
  if (!obj || typeof obj !== 'object') return
  let i
  if (Array.isArray(obj) || (typeof obj.length === 'number' && obj.length > 0 && (obj.length - 1) in obj)) {
    for (i = 0; i < obj.length; i++) {
      if (callback(i, obj[i]) === false) return
    }
  } else {
    if (Object.keys) {
      const keys = Object.keys(obj)
      for (i = 0; i < keys.length; i++) {
        if (callback(keys[i], obj[keys[i]]) === false) return
      }
    } else {
      for (i in obj) {
        if (!obj.hasOwnProperty(i)) continue
        if (callback(i, obj[i]) === false) return
      }
    }
  }
}

export function trigger(el, event) {
  const e = document.createEvent('HTMLEvents')
  e.initEvent(event, true, true)
  el.dispatchEvent(e)
}
