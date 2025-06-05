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

  async notVisible (str, sel) {
    const helper = this.helpers.Puppeteer || this.helpers.WebDriver

    const isVisible = await helper.executeScript((str, sel) => {
      const els = Array.from(document.querySelectorAll(sel))
      return els.some(e => {
        return e.textContent === str && (!!e.offsetParent)
      })
    }, str, sel)

    if (isVisible) {
      throw new Error(
        `Element '${sel}' is present, visible, and has value/text "${str}"`
      )
    }
  }

  async seeInPopupsAfterClick (click, strings, timeout = 3000) {
    let helper = this.helpers.Puppeteer
    if (!helper) {
      helper = this.helpers.WebDriver
      await helper.click(click)
      for (const str of strings) {
        await helper.seeInPopup(str)
      }
    } else {
      //
      // A MASSIVE hack that APPEARS to work around the puppeteer problem of seeing
      // consecutive popups!
      //
      const capturedDialogs = []
      const dialogListener = async dialog => {
        console.log('[GLOBAL LISTENER] Dialog caught.', dialog.message())
        capturedDialogs.push(dialog)
      }

      await helper.usePuppeteerTo('Setup dialog listener', async ({ page }) => {
        page.on('dialog', dialogListener)
        console.log('[GLOBAL LISTENER] Dialog listener attached.')
      })

      async function waitForAndProcessDialog (expectedMessage, internalTimeout = timeout) {
        let dialogToProcess = null
        let attempts = 0
        const checkInterval = 100 // Check every 100ms
        const maxAttempts = internalTimeout / checkInterval
        while (!dialogToProcess && attempts < maxAttempts) {
          await helper.wait(checkInterval / 1000) // Convert ms to seconds for I.wait

          if (capturedDialogs.length > 0) {
            // We have dialogs in the queue. Let's check the first one.
            const potentialDialog = capturedDialogs[0]
            if (potentialDialog.message() === expectedMessage) {
              dialogToProcess = capturedDialogs.shift() // Found it, remove from queue
              console.log(`[WAITING] Found expected dialog: "${expectedMessage}"`)
            } else {
              // If the message doesn't match, it means we caught an unexpected dialog first.
              // This should ideally not happen if the sequence is predictable.
              // For now, let's log it and maybe discard it if not critical.
              console.warn(`[WAITING] Unexpected dialog in queue: "${potentialDialog.message()}". Still waiting for "${expectedMessage}".`)
              // You might need to decide whether to skip this or throw an error.
              // For now, we'll keep it in queue and wait for the correct one.
              // If you need to dismiss unexpected dialogs:
              // await potentialDialog.accept(); // Or dismiss()
              // capturedDialogs.shift(); // Remove it
            }
          }
          attempts++
        }

        if (!dialogToProcess) {
          // If we exit the loop without a dialog, it's a timeout.
          throw new Error(`Timeout after ${timeout}ms: Expected dialog with message "${expectedMessage}" but none appeared in queue.`)
        }

        // Now, process the found dialog
        assert.equal(dialogToProcess.message(), expectedMessage) // Re-assert for safety
        await dialogToProcess.accept() // Accept the dialog
        console.log(`[SUCCESS] Dialog "${expectedMessage}" accepted and processed.`)
      }

      try {
        const dialogPromises = []
        for (const str of strings) {
          dialogPromises.push(waitForAndProcessDialog(str))
        }
        dialogPromises.push(helper.click(click))
        await Promise.all(dialogPromises)
      } finally {
        await helper.usePuppeteerTo('Strike down dialog listener', async ({ page }) => {
          page.off('dialog', dialogListener)
          console.log('[GLOBAL LISTENER] Dialog listener dettached.')
        })
      }
    }
  }
}

module.exports = customHelpers
