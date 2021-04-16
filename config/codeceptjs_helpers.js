const assert = require('assert')
// eslint-disable-next-line camelcase
let Helper = codecept_helper

const sleep = async (msec) => {
  return new Promise(resolve => setTimeout(resolve, msec))
}

class customHelpers extends Helper {
  async donSeeDuplicatedIds () {
    const helper = this.helpers['Puppeteer'] || this.helpers['WebDriver']
    await helper.wait(1)
    let donSeeDuplicatedIds = await helper.executeScript(() => {
      let dontSeeDuplicated = true
      let ids = []
      const all = [].slice.call(document.querySelectorAll('*'))
      all.forEach((el) => {
        const id = el.getAttribute('id')
        if (ids.includes(id)) {
          dontSeeDuplicated = false
        }
        if (id) {
          ids.push(id)
        }
      })
      return dontSeeDuplicated
    })
    return assert.strictEqual(donSeeDuplicatedIds, true)
  }

  async pressKeys (string) {
    const helper = this.helpers['Puppeteer'] || this.helpers['WebDriver']
    try {
      await helper.wait(1)
      let digits = string.split('')
      for (let i = 0; i < digits.length; i++) {
        await helper.pressKey(digits[i])
      }
    } catch (err) {
      console.log('CodeceptJs Custom Helper "pressKeys" Error:', err)
    }
  }

  // Custom amCancellingPopups function, overriding original function.
  // Required for tests to work with WebDriver, since "amCancellingPopups" is a Puppeteer command.
  // returns existing amCancellingPopups function if exists
  async amCancellingPopups () {
    const helper = this.helpers['Puppeteer'] || this.helpers['WebDriver']
    try {
      if (typeof helper.amCancellingPopups === 'function') return helper.amCancellingPopups.call(arguments)
    } catch (err) {
      console.log('CodeceptJs Custom Helper "amCancellingPopups" Error:', err)
    }
  }

  // Custom amAcceptingPopups function, overriding original function.
  // Required for tests to work with WebDriver, since "amAcceptingPopups" is a Puppeteer command.
  // returns existing amAcceptingPopups function if exists
  async amAcceptingPopups () {
    const helper = this.helpers['Puppeteer'] || this.helpers['WebDriver']
    try {
      if (typeof helper.amAcceptingPopups === 'function') return helper.amAcceptingPopups.call(arguments)
    } catch (err) {
      console.log('CodeceptJs Custom Helper "amAcceptingPopups" Error:', err)
    }
  }

  // Custom seeCheckedAttribute function.
  // Evaluates true if xpath is checked
  async seeCheckedAttribute (xpath) {
    const helper = this.helpers['Puppeteer'] || this.helpers['WebDriver']
    let res = await helper.grabAttributeFrom(xpath, 'checked')
    return assert.ok(res !== null && typeof res !== 'undefined' && res.toString().toLowerCase() === 'true', "\x1b[31mexpected element '\x1b[91m" + xpath + "\x1b[31m' to be checked")
  }

  // Custom dontSeeCheckedAttribute function.
  // Evaluates true if xpath is not checked
  async dontSeeCheckedAttribute (xpath) {
    const helper = this.helpers['Puppeteer'] || this.helpers['WebDriver']
    let res = await helper.grabAttributeFrom(xpath, 'checked')
    return assert.ok(!(res !== null && typeof res !== 'undefined' && res.toString().toLowerCase() === 'true'), "\x1b[31mexpected element '\x1b[91m" + xpath + "\x1b[31m' NOT to be checked")
  }

  // Custom seeDisabledAttribute function.
  // Evaluates true if xpath is disabled
  async seeDisabledAttribute (xpath) {
    const helper = this.helpers['Puppeteer'] || this.helpers['WebDriver']
    let res = await helper.grabAttributeFrom(xpath, 'disabled')
    return assert.ok(res !== null && typeof res !== 'undefined' && res.toString().toLowerCase() === 'true', "\x1b[31mexpected element '\x1b[91m" + xpath + "\x1b[31m' to be disabled")
  }

  // Custom dontSeeDisabledAttributet function.
  // Evaluates true if xpath is not disabled
  async dontSeeDisabledAttribute (xpath) {
    const helper = this.helpers['Puppeteer'] || this.helpers['WebDriver']
    let res = await helper.grabAttributeFrom(xpath, 'disabled')
    return assert.ok(!(res !== null && typeof res !== 'undefined' && res.toString().toLowerCase() === 'true'), "\x1b[31mexpected element '\x1b[91m" + xpath + "\x1b[31m' NOT to be disabled")
  }

  // Custom seeReadOnlyAttribute function.
  // Evaluates true if xpath is disabled
  async seeReadOnlyAttribute (xpath) {
    const helper = this.helpers['Puppeteer'] || this.helpers['WebDriver']
    let res = await helper.grabAttributeFrom(xpath, 'readonly')
    return assert.ok(res !== null && typeof res !== 'undefined' && res.toString().toLowerCase() === 'true', "\x1b[31mexpected element '\x1b[91m" + xpath + "\x1b[31m' to be readonly")
  }

  // Custom dontSeeReadOnlyAttributet function.
  // Evaluates true if xpath is not disabled
  async dontSeeReadOnlyAttribute (xpath) {
    const helper = this.helpers['Puppeteer'] || this.helpers['WebDriver']
    let res = await helper.grabAttributeFrom(xpath, 'readonly')
    return assert.ok(!(res !== null && typeof res !== 'undefined' && res.toString().toLowerCase() === 'true'), "\x1b[31mexpected element '\x1b[91m" + xpath + "\x1b[31m' NOT to be readonly")
  }

  // Custom grabBooleanAttributeFrom function.
  // returns boolean value
  async grabBooleanAttributeFrom (xpath, attrib) {
    const helper = this.helpers['Puppeteer'] || this.helpers['WebDriver']
    try {
      let res = await helper.grabAttributeFrom(xpath, attrib)
      return res !== null && typeof res !== 'undefined' && res.toString().toLowerCase() === 'true'
    } catch (err) {
      console.log('CodeceptJs Custom Helper "grabBooleanAttributeFrom" Error:', err)
    }
  }

  // Custom isTrue function.
  // returns boolean value
  async isTrue (val) {
    try {
      return val !== null && typeof val !== 'undefined' && val.toString().toLowerCase() === 'true'
    } catch (err) {
      console.log('CodeceptJs Custom Helper "isTrue" Error:', err)
    }
  }
}

module.exports = customHelpers
