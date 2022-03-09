
const defaultMapping = { collapse: '', expand: '', delete: '', edit: '', add: '', cancel: '', save: '', moveup: '', movedown: '' }

export class AbstractIconLib {
  constructor (iconPrefix = '', mapping = defaultMapping) {
    this.mapping = mapping
    this.icon_prefix = iconPrefix
  }

  getIconClass (key) {
    return this.mapping[key] ? this.icon_prefix + this.mapping[key] : this.icon_prefix + key
  }

  getIcon (key) {
    const iconclass = this.getIconClass(key)

    if (!iconclass) return null

    const i = document.createElement('i')
    i.classList.add(...iconclass.split(' '))

    return i
  }
}
