/* Enum Editor (used for objects and arrays with enumerated values) */
import { AbstractEditor } from '../editor.js'

export class EnumEditor extends AbstractEditor {
  getNumColumns () {
    return 4
  }

  build () {
    this.title = this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())
    this.container.appendChild(this.title)

    this.options.enum_titles = this.options.enum_titles || []

    this.enum = this.schema.enum
    this.selected = 0
    this.select_options = []
    this.html_values = []

    for (let i = 0; i < this.enum.length; i++) {
      this.select_options[i] = this.options.enum_titles[i] || `Value ${i + 1}`
      this.html_values[i] = this.getHTML(this.enum[i])
    }

    /* Switcher */
    this.switcher = this.theme.getSwitcher(this.select_options)
    this.container.appendChild(this.switcher)

    /* Display area */
    this.display_area = this.theme.getIndentedPanel()
    this.container.appendChild(this.display_area)

    if (this.options.hide_display) this.display_area.style.display = 'none'

    this.switcher.addEventListener('change', e => {
      this.selected = this.select_options.indexOf(e.currentTarget.value)
      this.value = this.enum[this.selected]
      this.refreshValue()
      this.onChange(true)
    })
    this.value = this.enum[0]
    this.refreshValue()

    if (this.enum.length === 1) this.switcher.style.display = 'none'
  }

  refreshValue () {
    this.selected = -1
    const stringified = JSON.stringify(this.value)
    this.enum.forEach((el, i) => {
      if (stringified === JSON.stringify(el)) {
        this.selected = i
        return false
      }
    })

    if (this.selected < 0) {
      this.setValue(this.enum[0])
      return
    }

    this.switcher.value = this.select_options[this.selected]
    this.display_area.innerHTML = this.html_values[this.selected]
  }

  enable () {
    if (!this.always_disabled) {
      this.switcher.disabled = false
      super.enable()
    }
  }

  disable (alwaysDisabled) {
    if (alwaysDisabled) this.always_disabled = true
    this.switcher.disabled = true
    super.disable()
  }

  getHTML (el) {
    const each = (obj, callback) => {
      if (Array.isArray(obj) || (typeof obj.length === 'number' && obj.length > 0 && (obj.length - 1) in obj)) {
        Array.from(obj).forEach((e, i) => callback(i, e))
      } else {
        Object.entries(obj).forEach(([key, value]) => callback(key, value))
      }
    }

    if (el === null) {
      return '<em>null</em>'
      /* Array or Object */
    } else if (typeof el === 'object') {
      /* TODO: use theme */
      let ret = ''
      const callback = (i, child) => {
        let html = this.getHTML(child)
        /* Add the keys to object children */
        if (!(Array.isArray(el))) {
          /* TODO: use theme */
          html = `<div><em>${i}</em>: ${html}</div>`
        }
        /* TODO: use theme */
        ret += `<li>${html}</li>`
      }
      each(el, callback)

      if (Array.isArray(el)) ret = `<ol>${ret}</ol>`
      else ret = `<ul style='margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0;'>${ret}</ul>`

      return ret
      /* Boolean */
    } else if (typeof el === 'boolean') {
      return el ? 'true' : 'false'
      /* String */
    } else if (typeof el === 'string') {
      return el.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      /* Number */
    }
    return el
  }

  setValue (val) {
    if (this.value !== val) {
      this.value = val
      this.refreshValue()
      this.onChange()
    }
  }

  destroy () {
    if (this.display_area && this.display_area.parentNode) this.display_area.parentNode.removeChild(this.display_area)
    if (this.title && this.title.parentNode) this.title.parentNode.removeChild(this.title)
    if (this.switcher && this.switcher.parentNode) this.switcher.parentNode.removeChild(this.switcher)

    super.destroy()
  }
}
