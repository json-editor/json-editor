const assert = require('assert')
// eslint-disable-next-line camelcase
let Helper = codecept_helper

class customHelpers extends Helper {
  // Custom pressKey function, overriding original function.
  // Required for tests to work with Puppeteer, since WebDriver allows undefined keys as multiple keystrokes.
  // Extends to allows use of string of characters instead of single character
  async pressKey () {
    const helper = this.helpers['Puppeteer'] || this.helpers['WebDriver']
    try {
      await helper.pressKey.call(arguments)
    } catch (err) {
      if (/^Unknown key:/.test(err.message) && arguments.length == 1 && typeof arguments[0] == 'string') {
        // If unknown key, then apply 'pressKey' for each character in key
        try {
          Array.from(arguments[0]).forEach(async function (char) {
            await helper.pressKey.call(char)
          })
        } catch (err) {
          console.log('CodeceptJs Custom Helper "pressKey" Error2:', err)
        }
      } else console.log('CodeceptJs Custom Helper "pressKey" Error1:', err)
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

  // Custom seeDisabledAttribute function.
  // Evaluates true if xpath is disabled
  async seeDisabledAttribute (xpath) {
    const helper = this.helpers['Puppeteer'] || this.helpers['WebDriver']
    let res = await helper.grabAttributeFrom(xpath, 'disabled')
    return assert.ok(res !== null && res.toString().toLowerCase() === 'true', "\x1b[31mexpected element '\x1b[91m" + xpath + "\x1b[31m' to be disabled")
  }

  // Custom dontSeeDisabledAttributet function.
  // Evaluates true if xpath is not disabled
  async dontSeeDisabledAttribute (xpath) {
    const helper = this.helpers['Puppeteer'] || this.helpers['WebDriver']
    let res = await helper.grabAttributeFrom(xpath, 'disabled')
    return assert.ok(!(res !== null && res.toString().toLowerCase() === 'true'), "\x1b[31mexpected element '\x1b[91m" + xpath + "\x1b[31m' NOT to be disabled")
  }

  // Custom seeReadOnlyAttribute function.
  // Evaluates true if xpath is disabled
  async seeReadOnlyAttribute (xpath) {
    const helper = this.helpers['Puppeteer'] || this.helpers['WebDriver']
    let res = await helper.grabAttributeFrom(xpath, 'readonly')
    return assert.ok(res !== null && res.toString().toLowerCase() === 'true', "\x1b[31mexpected element '\x1b[91m" + xpath + "\x1b[31m' to be readonly")
  }

  // Custom dontSeeReadOnlyAttributet function.
  // Evaluates true if xpath is not disabled
  async dontSeeReadOnlyAttribute (xpath) {
    const helper = this.helpers['Puppeteer'] || this.helpers['WebDriver']
    let res = await helper.grabAttributeFrom(xpath, 'readonly')
    return assert.ok(!(res !== null && res.toString().toLowerCase() === 'true'), "\x1b[31mexpected element '\x1b[91m" + xpath + "\x1b[31m' NOT to be readonly")
  }

  // Custom grabBooleanAttributeFrom function.
  // returns boolean value
  async grabBooleanAttributeFrom (xpath, attrib) {
    const helper = this.helpers['Puppeteer'] || this.helpers['WebDriver']
    try {
      let res = await helper.grabAttributeFrom(xpath, attrib)
      return res !== null && res.toString().toLowerCase() === 'true'
    } catch (err) {
      console.log('CodeceptJs Custom Helper "grabBooleanAttributeFrom" Error:', err)
    }
  }

  // Custom isTrue function.
  // returns boolean value
  async isTrue (val) {
    try {
      return val !== null && val.toString().toLowerCase() === 'true'
    } catch (err) {
      console.log('CodeceptJs Custom Helper "isTrue" Error:', err)
    }
  }
}

module.exports = customHelpers
