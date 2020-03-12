import { defaultTemplate } from './default.js'
import { ejsTemplate } from './ejs.js'
import { handlebarsTemplate } from './handlebars.js'
import { hoganTemplate } from './hogan.js'
import { lodashTemplate } from './lodash.js'
import { markupTemplate } from './markup.js'
import { mustacheTemplate } from './mustache.js'
import { swigTemplate } from './swig.js'
import { underscoreTemplate } from './underscore.js'

export const templates = {
  default: defaultTemplate,
  ejs: ejsTemplate,
  handlebars: handlebarsTemplate,
  hogan: hoganTemplate,
  lodash: lodashTemplate,
  markup: markupTemplate,
  mustache: mustacheTemplate,
  swig: swigTemplate,
  underscore: underscoreTemplate
}
