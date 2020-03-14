const glob = require('glob')
const fs = require('fs')
const path = require('path')
const css2json = require('css2json')

class CssToJson {
  constructor (params) {
    this.pattern = params.pattern
  }

  apply (compiler) {
    compiler.hooks.entryOption.tap('CssToJson', (context, entry) => {
      glob(this.pattern, (err, files) => {
        if (err) throw err
        files.forEach(this.convert)
      })
    })
  }

  convert (file) {
    const target =
      path.join(path.dirname(path.resolve(file)), path.basename(file, '.css')) + '.css.js'

    if (fs.existsSync(target) && (fs.statSync(file).mtime < fs.statSync(target).mtime)) {
      return
    }

    const css = fs.readFileSync(file, { encoding: 'utf-8' })
    const rules = Object.entries(css2json(css))
      .map(
        ([selector, block]) =>
          `"${formatSelector(selector)}":"${concatBlock(block)}"`
      )
      .join(',')
    fs.writeFileSync(target, `/* eslint-disable */\nexport default {${rules}}\n/* eslint-enable */\n`)
  }
}

function formatSelector (selector) {
  return _fixQuote(selector).replace(/\r?\n/g, ' ')
}

function concatBlock (value) {
  const block = Object.entries(value)
    .map(([property, value]) => `${property}:${encodeURIComponent(value)}`)
    .join(';')

  return _fixQuote(block)
}

function _fixQuote (str) {
  return str.replace(/"/g, "'")
}

module.exports = CssToJson
