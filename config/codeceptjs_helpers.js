/* eslint-disable no-console */
const assert = require('assert')
// eslint-disable-next-line camelcase
const Helper = codecept_helper

// eslint-disable-next-line no-unused-vars
const sleep = async (msec) => {
  return new Promise(resolve => setTimeout(resolve, msec))
}

class customHelpers extends Helper {
  async donSeeDuplicatedIds () {
    const helper = this.helpers.Puppeteer || this.helpers.WebDriver
    await helper.wait(1)
    const donSeeDuplicatedIds = await helper.executeScript(() => {
      let dontSeeDuplicated = true
      const ids = []
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
    const helper = this.helpers.Puppeteer || this.helpers.WebDriver
    try {
      await helper.wait(1)
      const digits = string.split('')
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
    const helper = this.helpers.Puppeteer || this.helpers.WebDriver
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
    const helper = this.helpers.Puppeteer || this.helpers.WebDriver
    try {
      if (typeof helper.amAcceptingPopups === 'function') return helper.amAcceptingPopups.call(arguments)
    } catch (err) {
      console.log('CodeceptJs Custom Helper "amAcceptingPopups" Error:', err)
    }
  }

  // Custom seeCheckedAttribute function.
  // Evaluates true if xpath is checked
  async seeCheckedAttribute (xpath) {
    const helper = this.helpers.Puppeteer || this.helpers.WebDriver
    return await helper.waitForElement(xpath + ':checked')
  }

  // Custom dontSeeCheckedAttribute function.
  // Evaluates true if xpath is not checked
  async dontSeeCheckedAttribute (xpath) {
    const helper = this.helpers.Puppeteer || this.helpers.WebDriver
    return await helper.waitForInvisible(xpath + ':checked')
  }

  // Custom seeDisabledAttribute function.
  // Evaluates true if xpath is disabled
  async seeDisabledAttribute (xpath) {
    const helper = this.helpers.Puppeteer || this.helpers.WebDriver
    return await helper.waitForElement(xpath + ':disabled')
  }

  // Custom dontSeeDisabledAttributet function.
  // Evaluates true if xpath is not disabled
  async dontSeeDisabledAttribute (xpath) {
    const helper = this.helpers.Puppeteer || this.helpers.WebDriver
    return await helper.waitForInvisible(xpath + ':disabled')
  }

  // Custom seeReadOnlyAttribute function.
  // Evaluates true if xpath is disabled
  async seeReadOnlyAttribute (xpath) {
    const helper = this.helpers.Puppeteer || this.helpers.WebDriver
    const res = await helper.grabAttributeFrom(xpath, 'readonly')
    return assert.ok(res !== null && typeof res !== 'undefined' && res.toString().toLowerCase() === 'true', "\x1b[31mexpected element '\x1b[91m" + xpath + "\x1b[31m' to be readonly")
  }

  // Custom dontSeeReadOnlyAttributet function.
  // Evaluates true if xpath is not disabled
  async dontSeeReadOnlyAttribute (xpath) {
    const helper = this.helpers.Puppeteer || this.helpers.WebDriver
    const res = await helper.grabAttributeFrom(xpath, 'readonly')
    return assert.ok(!(res !== null && typeof res !== 'undefined' && res.toString().toLowerCase() === 'true'), "\x1b[31mexpected element '\x1b[91m" + xpath + "\x1b[31m' NOT to be readonly")
  }

  // Custom grabBooleanAttributeFrom function.
  // returns boolean value
  async grabBooleanAttributeFrom (xpath, attrib) {
    const helper = this.helpers.Puppeteer || this.helpers.WebDriver
    try {
      const res = await helper.grabAttributeFrom(xpath, attrib)
      return res !== null && typeof res !== 'undefined' && res.toString().toLowerCase() === 'true'
    } catch (err) {
      console.log('CodeceptJs Custom Helper "grabBooleanAttributeFrom" Error:', err)
    }
  }

  async getSelectedValueAndAssert (selector, expectedValue) {
    const helper = this.helpers.Puppeteer || this.helpers.WebDriver

    const selectValue = await helper.executeScript((sel) => {
      const selectElement = document.querySelector(sel)
      return selectElement.value
    }, selector)

    return assert.strictEqual(selectValue, expectedValue)
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

  async elementNotVisible (sel) {
    const helper = this.helpers.Puppeteer || this.helpers.WebDriver
    const isVisible = await helper.executeScript(sel => {
      const el = document.querySelector(sel)
      return el && (!!el.offsetParent)
    }, sel)
    if (isVisible) {
      throw new Error(
        `Element '${sel}' is present, and visible`
      )
    }
  }

  async textNotVisible (str, sel = 'body') {
    if (!str) return
    const helper = this.helpers.Puppeteer || this.helpers.WebDriver

    await helper.wait(0.2)

    const isVisible = await helper.executeScript((str, sel) => {
      const el = sel ? document.querySelector(sel) : document.body
      if (!el) return // Context element not present
      if (el.nodeName !== 'BODY') {
        if (!el.offsetParent) return false // Either the (non-body) element isn't in the body, or it's not visible
      }
      if (!el.textContent.includes(str)) return false // It may be visible, but it doesn't contain the text

      // The context element is there, visible and contains the text, so now we find the
      // most specific element(s) that contain the text and make sure they are not visible

      const walker = document.createTreeWalker(el, NodeFilter.SHOW_ELEMENT)
      let node

      while ((node = walker.nextNode())) {
        if (!node.offsetParent) continue // Hidden node, not worth checking
        if (node.textContent.includes(str)) {
          // String found - is it in a CHILD node
          let inChildNode = false
          for (const child of node.children) {
            if (child.textContent.includes(str)) {
              inChildNode = true
              break // No need to check other children
            }
          }
          if (inChildNode) continue // We aren't at the most specific node yet
          if (node.offsetParent) return true // We are at a most specific node, and it is visible
        }
      }
      return false
    }, str, sel)
    if (isVisible) {
      throw new Error(
        `Element '${str}' is present, visible"`
      )
    }
  }
}

module.exports = customHelpers
