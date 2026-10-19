/* global describe beforeEach afterEach it expect jasmine */
import { JSONEditor } from '../../src/core'

// Schema taken verbatim from the demo link in https://github.com/json-editor/json-editor/issues/1079
const issueSchema = {
  type: 'array',
  format: 'table',
  uniqueItems: true,
  id: 'dependencyArray',
  items: {
    type: 'object',
    properties: {
      text: { type: 'string' },
      text2: {
        type: 'string',
        watch: { rows: 'dependencyArray' },
        enumSource: [{ source: 'rows', value: '{{item.text}}' }]
      }
    }
  }
}

const nestedSchema = (watch) => ({
  type: 'object',
  properties: {
    list: {
      type: 'array',
      id: 'listId',
      items: {
        type: 'object',
        properties: {
          text: { type: 'string' },
          pick: { type: 'string', watch }
        }
      }
    }
  }
})

describe('GitHub issue 1079', () => {
  let element
  let editor

  const create = (options, value) => new Promise(resolve => {
    editor = new JSONEditor(element, options)
    editor.on('ready', () => {
      if (value !== undefined) editor.setValue(value)
      setTimeout(resolve, 50)
    })
  })

  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  beforeEach(() => {
    document.body.insertAdjacentHTML('afterbegin', '<div id="fixture"></div>')
    element = document.getElementById('fixture')
  })

  afterEach(() => {
    editor.destroy()
    element.remove()
  })

  it('resolves an ancestor id without sub-path to the ancestor path @issue-1079', async () => {
    await create({ schema: issueSchema }, [{ text: 'a' }, { text: 'b' }])

    const text2 = editor.getEditor('root.0.text2')
    expect(text2.watched.rows).toBe('root')
    expect(text2.watched_values.rows).toEqual(editor.getValue())
    expect(text2.enum_values).toEqual(['a', 'b'])
    expect(editor.getEditor('root.1.text2').enum_values).toEqual(['a', 'b'])
  })

  it('keeps watchLoop for an editor watching its own ancestor and settles after an edit @issue-1079', async () => {
    await create({ schema: issueSchema }, [{ text: 'a' }, { text: 'b' }])

    const row0 = editor.getEditor('root.0.text2')
    const row1 = editor.getEditor('root.1.text2')
    expect(row0.watchLoop).toBe(true)
    expect(row1.watchLoop).toBe(true)

    let calls = 0
    const count = (ed) => {
      const original = ed.onWatchedFieldChange.bind(ed)
      ed.onWatchedFieldChange = () => {
        calls++
        return original()
      }
    }
    count(row0)
    count(row1)

    editor.getEditor('root.0.text').setValue('c')
    await wait(100)
    const callsAfterEdit = calls
    await wait(300)

    expect(row1.enum_values).toEqual(['c', 'b'])
    expect(callsAfterEdit).toBeGreaterThan(0)
    expect(callsAfterEdit).toBeLessThan(10)
    expect(calls).toBe(callsAfterEdit)
  })

  it('resolves a nested ancestor id to its own path @issue-1079', async () => {
    await create({ schema: nestedSchema({ rows: 'listId' }) }, { list: [{ text: 'x', pick: '' }] })
    const pick = editor.getEditor('root.list.0.pick')
    expect(pick.watched.rows).toBe('root.list')
    expect(pick.watched_values.rows).toEqual([{ text: 'x', pick: '' }])
  })

  it('resolves the array form with an empty sub-path to the ancestor path @issue-1079', async () => {
    await create({ schema: nestedSchema({ rows: ['listId', ''] }) }, { list: [{ text: 'x', pick: '' }] })
    expect(editor.getEditor('root.list.0.pick').watched.rows).toBe('root.list')
  })

  it('resolves the root id with a custom form_name_root @issue-1079', async () => {
    await create({ schema: nestedSchema({ all: 'myform' }), form_name_root: 'myform' }, { list: [{ text: 'x', pick: '' }] })
    const pick = editor.getEditor('myform.list.0.pick')
    expect(pick.watched.all).toBe('myform')
    expect(pick.watched_values.all).toEqual(editor.getValue())
  })

  it('leaves paths with a sub-path unchanged @issue-1079', async () => {
    await create({
      schema: nestedSchema({ str: 'listId.0.text', arr: ['listId', '0.text'], abs: 'list.0.text' })
    }, { list: [{ text: 'x', pick: '' }] })
    const pick = editor.getEditor('root.list.0.pick')
    expect(pick.watched).toEqual({ str: 'root.list.0.text', arr: 'root.list.0.text', abs: 'root.list.0.text' })
    expect(pick.watched_values).toEqual(jasmine.objectContaining({ str: 'x', arr: 'x', abs: 'x' }))
  })

  it('leaves paths with a sub-path unchanged under a custom form_name_root @issue-1079', async () => {
    await create({
      schema: nestedSchema({ str: 'listId.0.text', abs: 'list.0.text' }),
      form_name_root: 'myform'
    }, { list: [{ text: 'x', pick: '' }] })
    expect(editor.getEditor('myform.list.0.pick').watched).toEqual({ str: 'myform.list.0.text', abs: 'myform.list.0.text' })
  })
})
