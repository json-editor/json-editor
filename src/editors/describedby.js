/* hyper-link describeBy Editor */
import { AbstractEditor } from '../editor.js'
import { extend } from '../utilities.js'

export class DescribedByEditor extends AbstractEditor {
  register () {
    if (this.editors) {
      for (let i = 0; i < this.editors.length; i++) {
        if (!this.editors[i]) continue
        this.editors[i].unregister()
      }

      if (this.editors[this.currentEditor]) this.editors[this.currentEditor].register()
    }

    super.register()
  }

  unregister () {
    super.unregister()

    if (this.editors) {
      for (let i = 0; i < this.editors.length; i++) {
        if (!this.editors[i]) continue
        this.editors[i].unregister()
      }
    }
  }

  getNumColumns () {
    if (!this.editors[this.currentEditor]) return 4
    return Math.max(this.editors[this.currentEditor].getNumColumns(), 4)
  }

  enable () {
    if (this.editors) {
      for (let i = 0; i < this.editors.length; i++) {
        if (!this.editors[i]) continue
        this.editors[i].enable()
      }
    }

    super.enable()
  }

  disable () {
    if (this.editors) {
      for (let i = 0; i < this.editors.length; i++) {
        if (!this.editors[i]) continue
        this.editors[i].disable()
      }
    }

    super.disable()
  }

  switchEditor () {
    const vars = this.getWatchedFieldValues()

    if (!vars) return

    /* var ref = this.template.fillFromObject(vars); */
    /* var ref = this.template(vars); */
    const ref = document.location.origin + document.location.pathname + this.template(vars)

    if (!this.editors[this.refs[ref]]) {
      this.buildChildEditor(ref)
    }

    this.currentEditor = this.refs[ref]

    this.register()

    this.editors.forEach((editor, ref) => {
      if (!editor) return
      if (this.currentEditor === ref) {
        editor.container.style.display = ''
      } else {
        editor.container.style.display = 'none'
      }
    })

    this.refreshValue()
    this.onChange(true)
  }

  buildChildEditor (ref) {
    this.refs[ref] = this.editors.length

    const holder = this.theme.getChildEditorHolder()
    this.editor_holder.appendChild(holder)

    const schema = extend({}, this.schema, this.jsoneditor.refs[ref])

    const editorClass = this.jsoneditor.getEditorClass(schema, this.jsoneditor)

    const editor = this.jsoneditor.createEditor(editorClass, {
      jsoneditor: this.jsoneditor,
      schema,
      container: holder,
      path: this.path,
      parent: this,
      required: true
    }
    )

    this.editors.push(editor)

    editor.preBuild()
    editor.build()
    editor.postBuild()
  }

  preBuild () {
    this.refs = {}
    this.editors = []
    this.currentEditor = ''
    let i
    for (i = 0; i < this.schema.links.length; i++) {
      if (this.schema.links[i].rel.toLowerCase() === 'describedby') {
        /* this.template = new UriTemplate(this.schema.links[i].href); */
        this.template = this.jsoneditor.compileTemplate(this.schema.links[i].href, this.template_engine)
        break
      }
    }

    /* this.template.fill(function(varName) {
      this.schema.watch = this.schema.watch || {};
      this.schema.watch[varName] = varName;
      return '';
    }); */

    this.schema.links = this.schema.links.slice(0, i).concat(this.schema.links.slice(i + 1))
    if (this.schema.links.length === 0) delete this.schema.links
    this.baseSchema = extend({}, this.schema)
  }

  build () {
    this.editor_holder = document.createElement('div')
    this.container.appendChild(this.editor_holder)
    this.switchEditor()
  }

  onWatchedFieldChange () {
    this.switchEditor()
  }

  onChildEditorChange (editor) {
    if (this.editors[this.currentEditor]) {
      this.refreshValue()
    }

    super.onChildEditorChange(editor)
  }

  refreshValue () {
    if (this.editors[this.currentEditor]) {
      this.value = this.editors[this.currentEditor].getValue()
    }
  }

  setValue (val, initial) {
    if (this.editors[this.currentEditor]) {
      this.editors[this.currentEditor].setValue(val, initial)
      this.refreshValue()
      this.onChange()
    }
  }

  destroy () {
    this.editors.forEach(editor => {
      if (editor) editor.destroy()
    })

    if (this.editor_holder && this.editor_holder.parentNode) {
      this.editor_holder.parentNode.removeChild(this.editor_holder)
    }

    super.destroy()
  }

  showValidationErrors (errors) {
    this.editors.forEach(editor => {
      if (!editor) return
      editor.showValidationErrors(errors)
    })
  }
}
