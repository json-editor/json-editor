/* Use "multiple" as a fall back for everything */
const defaultResolver = schema => typeof schema.type !== 'string' && 'multiple'

/* If the type is not set but properties are defined, we can infer the type is actually object */
const object = schema => !schema.type && schema.properties && 'object'

/* If the type is set and it's a basic type, use the primitive editor */
const primitive = schema => typeof schema.type === 'string' && schema.type

/* Use specialized editor for signatures */
const signature = schema => schema.type === 'string' && schema.format === 'signature' && 'signature'

/* Use the select editor for all boolean values */
const boolean = schema => {
  if (schema.type === 'boolean') {
    /* If explicitly set to 'checkbox', use that */
    if (schema.format === 'checkbox' || (schema.options && schema.options.checkbox)) return 'checkbox'
    /* Otherwise, default to select menu */
    if (schema.format === 'select2') return 'select2'
    if (schema.format === 'selectize') return 'selectize'
    if (schema.format === 'choices') return 'choices'
    return 'select'
  }
}

/* Use the multiple editor for schemas where the `type` is set to "any" */
const any = schema => schema.type === 'any' && 'multiple'

/* Editor for base64 encoded files */
const base64 = schema => schema.type === 'string' && schema.media && schema.media.binaryEncoding === 'base64' && 'base64'

/* Editor for uploading files */
const upload = schema => schema.type === 'string' && schema.format === 'url' && window.FileReader && schema.options && schema.options.upload === Object(schema.options.upload) && 'upload'

/* Use the table editor for arrays with the format set to `table` */
const table = schema => schema.type === 'array' && schema.format === 'table' && 'table'

/* Use the `select` editor for dynamic enumSource enums */
const enumSource = schema => {
  if (schema.enumSource) {
    if (schema.format === 'radio') return 'radio'
    if (schema.format === 'select2') return 'select2'
    if (schema.format === 'selectize') return 'selectize'
    if (schema.format === 'choices') return 'choices'
    return 'select'
  }
}

/* Use the `enum` or `select` editors for schemas with enumerated properties */
const enumeratedProperties = schema => {
  if (schema.enum) {
    if (schema.type === 'array' || schema.type === 'object') return 'enum'
    if (schema.type === 'number' || schema.type === 'integer' || schema.type === 'string') {
      if (schema.format === 'radio') return 'radio'
      if (schema.format === 'select2') return 'select2'
      if (schema.format === 'selectize') return 'selectize'
      if (schema.format === 'choices') return 'choices'
      return 'select'
    }
  }
}

/* Specialized editors for arrays of strings */
const arraysOfStrings = schema => {
  if (schema.type === 'array' && schema.items && !(Array.isArray(schema.items)) && ['string', 'number', 'integer'].includes(schema.items.type)) {
    if (schema.format === 'choices') return 'arrayChoices'
    if (schema.uniqueItems) {
      /* if 'selectize' enabled it is expected to be selectized control */
      if (schema.format === 'selectize') return 'arraySelectize'
      if (schema.format === 'select2') return 'arraySelect2'
      if (schema.items.enum) return 'multiselect' /* otherwise it is select */
    }
  }
}

/* Use the multiple editor for schemas with `oneOf` or `anyOf` set */
const oneOf = schema => (schema.oneOf || schema.anyOf) && 'multiple'

/* Specialized editor for date, time and datetime-local formats */
const date = schema => ['string', 'integer'].includes(schema.type) && ['date', 'time', 'datetime-local'].includes(schema.format) && 'datetime'

/* Use a specialized editor for starratings */
const starratings = schema => ['string', 'integer'].includes(schema.type) && ['starrating', 'rating'].includes(schema.format) && 'starrating'

/* Hyper-link describeBy resolver */
const describeBy = schema => {
  if (schema.links) {
    for (let i = 0; i < schema.links.length; i++) {
      if (schema.links[i].rel && schema.links[i].rel.toLowerCase() === 'describedby') return 'describedBy'
    }
  }
}

/* Use the stepper editor for schemas with type `number` or `integer` and format `stepper` */
const stepper = schema => {
  if ((schema.type === 'integer' || schema.type === 'number') && schema.format === 'stepper') {
    return 'stepper'
  }
}

/* Enable custom editor type */
const button = schema => schema.format === 'button' && 'button'

const info = schema => schema.format === 'info' && 'info'

const uuid = schema => schema.type === 'string' && schema.format === 'uuid' && 'uuid'

const autoComplete = schema => schema.type === 'string' && schema.format === 'autocomplete' && 'autocomplete'

const jodit = schema => schema.type === 'string' && schema.format === 'jodit' && 'jodit'

const markdown = schema => schema.type === 'string' && schema.format === 'markdown' && 'simplemde'

const xhtml = schema => schema.type === 'string' && ['xhtml', 'bbcode'].includes(schema.format) && 'sceditor'

/* Use the ace editor for schemas with format equals any of ace editor modes */
const aceModes = ['actionscript', 'batchfile', 'c', 'c++', 'cpp', 'coffee', 'csharp', 'css', 'dart', 'django', 'ejs', 'erlang', 'golang', 'groovy', 'handlebars', 'haskell', 'haxe', 'html', 'ini', 'jade', 'java', 'javascript', 'json', 'less', 'lisp', 'lua', 'makefile', 'matlab', 'mysql', 'objectivec', 'pascal', 'perl', 'pgsql', 'php', 'python', 'r', 'ruby', 'sass', 'scala', 'scss', 'smarty', 'sql', 'sqlserver', 'stylus', 'svg', 'twig', 'vbscript', 'xml', 'yaml']
const ace = schema => schema.type === 'string' && aceModes.includes(schema.format) && 'ace'

const ip = schema => schema.type === 'string' && ['ip', 'ipv4', 'ipv6', 'hostname'].includes(schema.format) && 'ip'

const colorPicker = schema => schema.type === 'string' && schema.format === 'color' && 'colorpicker'

/* Export resolvers in order of discovery, first to last */
export const resolvers = [colorPicker, ip, ace, xhtml, markdown, jodit, autoComplete, uuid, info, button, stepper, describeBy, starratings, date, oneOf, arraysOfStrings, enumeratedProperties, enumSource, table, upload, base64, any, boolean, signature, primitive, object, defaultResolver]
