import { extend, hasOwnProperty } from './utilities.js'

/**
 * All editors should extend from this class
 */
export class AbstractEditor {
  constructor (options, defaults) {
    this.defaults = defaults
    this.jsoneditor = options.jsoneditor
    this.theme = this.jsoneditor.theme
    this.template_engine = this.jsoneditor.template
    this.iconlib = this.jsoneditor.iconlib
    this.translate = this.jsoneditor.translate || this.defaults.translate
    this.translateProperty = this.jsoneditor.translateProperty || this.defaults.translateProperty
    this.original_schema = options.schema
    this.schema = this.jsoneditor.expandSchema(this.original_schema)
    this.active = true
    this.options = extend({}, (this.options || {}), (this.schema.options || {}), (options.schema.options || {}), options)

    this.formname = this.jsoneditor.options.form_name_root || 'root'

    if (!options.path && !this.schema.id) this.schema.id = this.formname
    this.path = options.path || this.formname
    this.formname = options.formname || this.path.replace(/\.([^.]+)/g, '[$1]')

    this.parent = options.parent
    this.key = this.parent !== undefined ? this.path.split('.').slice(this.parent.path.split('.').length).join('.') : this.path

    this.link_watchers = []
    this.watchLoop = false

    if (options.container) this.setContainer(options.container)
    this.registerDependencies()
  }

  onChildEditorChange (editor) {
    this.onChange(true)
  }

  notify () {
    if (this.path) this.jsoneditor.notifyWatchers(this.path)
  }

  change () {
    if (this.parent) this.parent.onChildEditorChange(this)
    else if (this.jsoneditor) this.jsoneditor.onChange()
  }

  onChange (bubble) {
    this.notify()
    if (this.watch_listener) this.watch_listener()
    if (bubble) this.change()
  }

  register () {
    this.jsoneditor.registerEditor(this)
    this.onChange()
  }

  unregister () {
    if (!this.jsoneditor) return
    this.jsoneditor.unregisterEditor(this)
  }

  getNumColumns () {
    return 12
  }

  isActive () {
    return this.active
  }

  activate () {
    this.active = true
    this.optInCheckbox.checked = true
    this.enable()
    this.change()
  }

  deactivate () {
    /* only non required properties can be deactivated. */
    if (!this.isRequired()) {
      this.active = false
      this.optInCheckbox.checked = false
      this.disable()
      this.change()
    }
  }

  registerDependencies () {
    this.dependenciesFulfilled = true
    const deps = this.options.dependencies
    if (!deps) {
      return
    }

    Object.keys(deps).forEach(dependency => {
      let path = this.path.split('.')
      path[path.length - 1] = dependency
      path = path.join('.')
      this.jsoneditor.watch(path, () => {
        this.evaluateDependencies()
      })
    })
  }

  evaluateDependencies () {
    const wrapper = this.container || this.control
    if (!wrapper || this.jsoneditor === null) {
      return
    }

    const deps = this.options.dependencies
    if (!deps) {
      return
    }
    // Assume true and set to false if any unmet dependencies are found
    const previousStatus = this.dependenciesFulfilled
    this.dependenciesFulfilled = true

    Object.keys(deps).forEach(dependency => {
      let path = this.path.split('.')
      path[path.length - 1] = dependency
      path = path.join('.')
      const choices = deps[dependency]
      this.checkDependency(path, choices)
    })

    if (this.dependenciesFulfilled !== previousStatus) {
      this.notify()
    }

    let displayMode = this.dependenciesFulfilled ? 'block' : 'none'

    if (this.options.hidden) {
      displayMode = 'none'
    }

    if (wrapper.tagName === 'TD') {
      Object.keys(wrapper.childNodes).forEach(child => (wrapper.childNodes[child].style.display = displayMode))
    } else wrapper.style.display = displayMode
  }

  checkDependency (path, choices) {
    if (this.path === path || this.jsoneditor === null) {
      return
    }

    const editor = this.jsoneditor.getEditor(path)
    const value = editor ? editor.getValue() : undefined

    if (!editor || !editor.dependenciesFulfilled) {
      this.dependenciesFulfilled = false
    } else if (Array.isArray(choices)) {
      this.dependenciesFulfilled = choices.some(choice => {
        if (JSON.stringify(value) === JSON.stringify(choice)) {
          return true
        }
      })
    } else if (typeof choices === 'object') {
      if (typeof value !== 'object') {
        this.dependenciesFulfilled = choices === value
      } else {
        Object.keys(choices).some(key => {
          if (!hasOwnProperty(choices, key)) {
            return false
          }
          if (!hasOwnProperty(value, key) || choices[key] !== value[key]) {
            this.dependenciesFulfilled = false
            return true
          }
        })
      }
    } else if (typeof choices === 'string' || typeof choices === 'number') {
      this.dependenciesFulfilled = this.dependenciesFulfilled && value === choices
    } else if (typeof choices === 'boolean') {
      if (choices) {
        this.dependenciesFulfilled = this.dependenciesFulfilled && (value || value.length > 0)
      } else {
        this.dependenciesFulfilled = this.dependenciesFulfilled && (!value || value.length === 0)
      }
    }
  }

  setContainer (container) {
    this.container = container
    if (this.schema.id) this.container.setAttribute('data-schemaid', this.schema.id)
    if (this.schema.type && typeof this.schema.type === 'string') this.container.setAttribute('data-schematype', this.schema.type)
    this.container.setAttribute('data-schemapath', this.path)
  }

  setOptInCheckbox (header) {
    /* the active/deactive checbox control. */

    this.optInCheckbox = document.createElement('input')
    this.optInCheckbox.setAttribute('type', 'checkbox')
    this.optInCheckbox.setAttribute('style', 'margin: 0 10px 0 0;')
    this.optInCheckbox.classList.add('json-editor-opt-in')

    this.optInCheckbox.addEventListener('click', () => {
      if (this.isActive()) {
        this.deactivate()
      } else {
        this.activate()
      }
    })

    /* append active/deactive checkbox if show_opt_in is true */
    const globalOptIn = this.jsoneditor.options.show_opt_in
    const parentOptInDefined = (typeof this.parent.options.show_opt_in !== 'undefined')
    const parentOptInEnabled = (parentOptInDefined && this.parent.options.show_opt_in === true)
    const parentOptInDisabled = (parentOptInDefined && this.parent.options.show_opt_in === false)
    if (parentOptInEnabled || (!parentOptInDisabled && globalOptIn) || (!parentOptInDefined && globalOptIn)) {
      /* and control to type object editors if they are not required */
      if (this.parent && this.parent.schema.type === 'object' && !this.isRequired() && this.header) {
        this.header.appendChild(this.optInCheckbox)
        this.header.insertBefore(this.optInCheckbox, this.header.firstChild)
      }
    }
  }

  preBuild () {

  }

  build () {

  }

  postBuild () {
    this.setupWatchListeners()
    this.addLinks()
    this.setValue(this.getDefault(), true)
    this.updateHeaderText()
    this.register()
    this.onWatchedFieldChange()
  }

  setupWatchListeners () {
    /* Watched fields */
    this.watched = {}
    if (this.schema.vars) this.schema.watch = this.schema.vars
    this.watched_values = {}
    this.watch_listener = () => {
      if (this.refreshWatchedFieldValues()) {
        this.onWatchedFieldChange()
      }
    }

    if (hasOwnProperty(this.schema, 'watch')) {
      let path; let pathParts; let first; let root; let adjustedPath
      const myPath = this.container.getAttribute('data-schemapath')

      Object.keys(this.schema.watch).forEach(name => {
        path = this.schema.watch[name]
        if (Array.isArray(path)) {
          if (path.length < 2) return
          pathParts = [path[0]].concat(path[1].split('.'))
        } else {
          pathParts = path.split('.')
          if (!this.theme.closest(this.container, `[data-schemaid="${pathParts[0]}"]`)) pathParts.unshift('#')
        }
        first = pathParts.shift()

        if (first === '#') first = this.jsoneditor.schema.id || this.jsoneditor.root.formname

        /* Find the root node for this template variable */
        root = this.theme.closest(this.container, `[data-schemaid="${first}"]`)
        if (!root) throw new Error(`Could not find ancestor node with id ${first}`)

        /* Keep track of the root node and path for use when rendering the template */
        adjustedPath = `${root.getAttribute('data-schemapath')}.${pathParts.join('.')}`

        if (myPath.startsWith(adjustedPath)) this.watchLoop = true
        this.jsoneditor.watch(adjustedPath, this.watch_listener)

        this.watched[name] = adjustedPath
      })
    }

    /* Dynamic header */
    if (this.schema.headerTemplate) {
      this.header_template = this.jsoneditor.compileTemplate(this.schema.headerTemplate, this.template_engine)
    }
  }

  addLinks () {
    /* Add links */
    if (!this.no_link_holder) {
      this.link_holder = this.theme.getLinksHolder()
      /* if description element exists, insert the link before */
      if (typeof this.description !== 'undefined') this.description.parentNode.insertBefore(this.link_holder, this.description)
      /* otherwise just insert link at bottom of container */
      else this.container.appendChild(this.link_holder)
      if (this.schema.links) {
        for (let i = 0; i < this.schema.links.length; i++) {
          this.addLink(this.getLink(this.schema.links[i]))
        }
      }
    }
  }

  onMove () {}

  getButton (text, icon, title, args = []) {
    const btnClass = `json-editor-btn-${icon}`
    if (!this.iconlib) icon = null
    else icon = this.iconlib.getIcon(icon)

    text = this.translate(text, args)
    title = this.translate(title, args)

    if (!icon && title) {
      text = title
      title = null
    }

    const btn = this.theme.getButton(text, icon, title)
    btn.classList.add(btnClass)
    return btn
  }

  setButtonText (button, text, icon, title, args = []) {
    if (!this.iconlib) icon = null
    else icon = this.iconlib.getIcon(icon)

    text = this.translate(text, args)
    title = this.translate(title, args)

    if (!icon && title) {
      text = title
      title = null
    }

    return this.theme.setButtonText(button, text, icon, title)
  }

  addLink (link) {
    if (this.link_holder) this.link_holder.appendChild(link)
  }

  getLink (data) {
    let holder
    let link

    /* Get mime type of the link */
    const mime = data.mediaType || 'application/javascript'
    const type = mime.split('/')[0]

    /* Template to generate the link href */
    const href = this.jsoneditor.compileTemplate(data.href, this.template_engine)
    const relTemplate = this.jsoneditor.compileTemplate(data.rel ? data.rel : data.href, this.template_engine)

    /* Template to generate the link's download attribute */
    let download = null
    if (data.download) download = data.download

    if (download && download !== true) {
      download = this.jsoneditor.compileTemplate(download, this.template_engine)
    }

    /* Image links */
    if (type === 'image') {
      holder = this.theme.getBlockLinkHolder()
      link = document.createElement('a')
      link.setAttribute('target', '_blank')
      const image = document.createElement('img')

      this.theme.createImageLink(holder, link, image)

      /* When a watched field changes, update the url */
      this.link_watchers.push(vars => {
        const url = href(vars)
        const rel = relTemplate(vars)
        link.setAttribute('href', url)
        link.setAttribute('title', rel || url)
        image.setAttribute('src', url)
      })
    /* Audio/Video links */
    } else if (['audio', 'video'].includes(type)) {
      holder = this.theme.getBlockLinkHolder()

      link = this.theme.getBlockLink()
      link.setAttribute('target', '_blank')

      const media = document.createElement(type)
      media.setAttribute('controls', 'controls')

      this.theme.createMediaLink(holder, link, media)

      /* When a watched field changes, update the url */
      this.link_watchers.push(vars => {
        const url = href(vars)
        const rel = relTemplate(vars)
        link.setAttribute('href', url)
        link.textContent = rel || url
        media.setAttribute('src', url)
      })
    /* Text links or blank link */
    } else {
      link = holder = this.theme.getBlockLink()
      holder.setAttribute('target', '_blank')
      holder.textContent = data.rel
      holder.style.display = 'none' /* Prevent blank links from showing up when using custom view */

      /* When a watched field changes, update the url */
      this.link_watchers.push(vars => {
        const url = href(vars)
        const rel = relTemplate(vars)
        if (url) holder.style.display = ''
        holder.setAttribute('href', url)
        holder.textContent = rel || url
      })
    }

    if (download && link) {
      if (download === true) {
        link.setAttribute('download', '')
      } else {
        this.link_watchers.push(vars => {
          link.setAttribute('download', download(vars))
        })
      }
    }

    if (data.class) link.classList.add(data.class)

    return holder
  }

  refreshWatchedFieldValues () {
    if (!this.watched_values) return
    const watched = {}
    let changed = false

    if (this.watched) {
      Object.keys(this.watched).forEach(name => {
        const editor = this.jsoneditor.getEditor(this.watched[name])
        const val = editor ? editor.getValue() : null
        if (this.watched_values[name] !== val) changed = true
        watched[name] = val
      })
    }

    watched.self = this.getValue()
    if (this.watched_values.self !== watched.self) changed = true

    this.watched_values = watched

    return changed
  }

  getWatchedFieldValues () {
    return this.watched_values
  }

  updateHeaderText () {
    if (this.header) {
      const headerText = this.getHeaderText()
      /* If the header has children, only update the text node's value */
      if (this.header.children.length) {
        for (let i = 0; i < this.header.childNodes.length; i++) {
          if (this.header.childNodes[i].nodeType === 3) {
            this.header.childNodes[i].nodeValue = this.cleanText(headerText)
            break
          }
        }
      /* Otherwise, just update the entire node */
      } else {
        if (window.DOMPurify) this.header.innerHTML = window.DOMPurify.sanitize(headerText)
        else this.header.textContent = this.cleanText(headerText)
      }
    }
  }

  getHeaderText (titleOnly) {
    if (this.header_text) return this.header_text
    else if (titleOnly) return this.translateProperty(this.schema.title)
    else return this.getTitle()
  }

  getPathDepth () {
    return this.path.split('.').length
  }

  cleanText (txt) {
    /* Clean out HTML tags from txt */
    const tmp = document.createElement('div')
    tmp.innerHTML = txt
    return (tmp.textContent || tmp.innerText)
  }

  onWatchedFieldChange () {
    let vars
    if (this.header_template) {
      vars = extend(this.getWatchedFieldValues(), {
        key: this.key,
        i: this.key,
        i0: (this.key * 1),
        i1: (this.key * 1 + 1),
        title: this.getTitle()
      })
      const headerText = this.header_template(vars)

      if (headerText !== this.header_text) {
        this.header_text = headerText
        this.updateHeaderText()
        this.notify()
        /* this.fireChangeHeaderEvent(); */
      }
    }
    if (this.link_watchers.length) {
      vars = this.getWatchedFieldValues()
      for (let i = 0; i < this.link_watchers.length; i++) {
        this.link_watchers[i](vars)
      }
    }
  }

  setValue (value) {
    this.value = value
  }

  getValue () {
    if (!this.dependenciesFulfilled) {
      return undefined
    }
    return this.value
  }

  refreshValue () {

  }

  getChildEditors () {
    return false
  }

  destroy () {
    this.unregister(this)
    if (this.watched) {
      Object.values(this.watched).forEach(adjustedPath => this.jsoneditor.unwatch(adjustedPath, this.watch_listener))
    }

    this.watched = null
    this.watched_values = null
    this.watch_listener = null
    this.header_text = null
    this.header_template = null
    this.value = null
    if (this.container && this.container.parentNode) this.container.parentNode.removeChild(this.container)
    this.container = null
    this.jsoneditor = null
    this.schema = null
    this.path = null
    this.key = null
    this.parent = null
  }

  isDefaultRequired () {
    return this.isRequired() || !!this.jsoneditor.options.use_default_values
  }

  getDefault () {
    if (typeof this.schema.default !== 'undefined') {
      return this.schema.default
    }

    if (typeof this.schema.enum !== 'undefined') {
      return this.schema.enum[0]
    }

    let type = this.schema.type || this.schema.oneOf
    if (type && Array.isArray(type)) type = type[0]
    if (type && typeof type === 'object') type = type.type
    if (type && Array.isArray(type)) type = type[0]

    if (typeof type === 'string') {
      if (type === 'number') return this.isDefaultRequired() ? 0.0 : undefined
      if (type === 'boolean') return this.isDefaultRequired() ? false : undefined
      if (type === 'integer') return this.isDefaultRequired() ? 0 : undefined
      if (type === 'string') return ''
      if (type === 'object') return {}
      if (type === 'array') return []
    }

    return null
  }

  getTitle () {
    return this.translateProperty(this.schema.title || this.key)
  }

  enable () {
    this.disabled = false
  }

  disable () {
    this.disabled = true
  }

  isEnabled () {
    return !this.disabled
  }

  isRequired () {
    if (typeof this.schema.required === 'boolean') return this.schema.required
    else if (this.parent && this.parent.schema && Array.isArray(this.parent.schema.required)) return this.parent.schema.required.includes(this.key)
    else if (this.jsoneditor.options.required_by_default) return true
    else return false
  }

  getDisplayText (arr) {
    const disp = []
    const used = {}

    /* Determine how many times each attribute name is used. */
    /* This helps us pick the most distinct display text for the schemas. */
    arr.forEach(el => {
      if (el.title) {
        used[el.title] = used[el.title] || 0
        used[el.title]++
      }
      if (el.description) {
        used[el.description] = used[el.description] || 0
        used[el.description]++
      }
      if (el.format) {
        used[el.format] = used[el.format] || 0
        used[el.format]++
      }
      if (el.type) {
        used[el.type] = used[el.type] || 0
        used[el.type]++
      }
    })

    /* Determine display text for each element of the array */
    arr.forEach(el => {
      let name

      /* If it's a simple string */
      if (typeof el === 'string') name = el
      /* Object */
      else if (el.title && used[el.title] <= 1) name = el.title
      else if (el.format && used[el.format] <= 1) name = el.format
      else if (el.type && used[el.type] <= 1) name = el.type
      else if (el.description && used[el.description] <= 1) name = el.descripton
      else if (el.title) name = el.title
      else if (el.format) name = el.format
      else if (el.type) name = el.type
      else if (el.description) name = el.description
      else if (JSON.stringify(el).length < 500) name = JSON.stringify(el)
      else name = 'type'

      disp.push(name)
    })

    /* Replace identical display text with "text 1", "text 2", etc. */
    const inc = {}
    disp.forEach((name, i) => {
      inc[name] = inc[name] || 0
      inc[name]++

      if (used[name] > 1) disp[i] = `${name} ${inc[name]}`
    })

    return disp
  }

  /* Replace space(s) with "-" to create valid id value */
  getValidId (id) {
    id = id === undefined ? '' : id.toString()
    return id.replace(/\s+/g, '-')
  }

  setInputAttributes (inputAttribute) {
    if (this.schema.options && this.schema.options.inputAttributes) {
      const inputAttributes = this.schema.options.inputAttributes
      const protectedAttributes = ['name', 'type'].concat(inputAttribute)
      Object.keys(inputAttributes).forEach(key => {
        if (!protectedAttributes.includes(key.toLowerCase())) {
          this.input.setAttribute(key, inputAttributes[key])
        }
      })
    }
  }

  expandCallbacks (scope, options) {
    const callback = this.defaults.callbacks[scope]
    Object.entries(options).forEach(([key, value]) => {
      if (value === Object(value)) {
        options[key] = this.expandCallbacks(scope, value)
      } else if (typeof value === 'string' &&
                 typeof callback === 'object' &&
                 typeof callback[value] === 'function') {
        options[key] = callback[value].bind(null, this)
      }
    })
    return options
  }

  showValidationErrors (errors) {

  }
}
