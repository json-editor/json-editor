const assert = require('assert');
let Helper = codecept_helper;

class customHelpers extends Helper {

  // Custom isTrue function.
  // returns boolean value
  async isTrue(val) {
    const helper = this.helpers['Puppeteer'] || this.helpers['WebDriver'];
    try {
      return val === true
          || val === 1
          || val !== null && (val.toString().toLowerCase() == 'true' || val.toString().toLowerCase() == '1');
    } catch(err) {
      console.log('CodeceptJs Custom Helper "isTrue" Error:', err);
    }
  }

  // Custom pressKey function.
  // Extends to allows use of string of characters instead of single character
  async pressKey(key) {
    const helper = this.helpers['Puppeteer'] || this.helpers['WebDriver'];
    try {
      if (!Array.isArray(key) && key.length > 1 && ['Add', 'Alt', 'ArrowDown', 'Down arrow', 'ArrowLeft', 'Left arrow', 'ArrowRight', 'Right arrow', 'ArrowUp', 'Up arrow', 'Backspace', 'Command', 'Control', 'Del', 'Divide', 'End', 'Enter', 'Equals', 'Escape', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'Home', 'Insert', 'Meta', 'Multiply', 'Numpad 0', 'Numpad 1', 'Numpad 2', 'Numpad 3', 'Numpad 4', 'Numpad 5', 'Numpad 6', 'Numpad 7', 'Numpad 8', 'Numpad 9', 'Pagedown', 'PageDown', 'Pageup', 'PageUp', 'Pause', 'Semicolon', 'Shift', 'Space', 'Subtract', 'Tab'].indexOf(key) === -1) {
       Array.from(key).forEach(async function(el) {
         await helper.pressKey(el);
       });
      }
      else await helper.pressKey(key);
    } catch(err) {
      console.log('CodeceptJs Custom Helper "pressKey" Error:', err);
    }
  }

  // Custom grabBooleanAttributeFrom function.
  // returns boolean value
  async grabBooleanAttributeFrom(xpath, attrib) {
    const helper = this.helpers['Puppeteer'] || this.helpers['WebDriver'];
    try {
      let res = await helper.grabAttributeFrom(xpath, attrib);
      return res === true || res !== null && res.toString().toLowerCase() == 'true';
    } catch(err) {
      console.log('CodeceptJs Custom Helper "grabBooleanAttributeFrom" Error:', err);
    }
  }

  // Custom amCancellingPopups function.
  // returns existing amCancellingPopups function if exists
  async amCancellingPopups() {
    const helper = this.helpers['Puppeteer'] || this.helpers['WebDriver'];
    try {
      if (typeof helper.amCancellingPopups == 'function') return helper.amCancellingPopups.call(arguments);
    } catch(err) {
      console.log('CodeceptJs Custom Helper "amCancellingPopups" Error:', err);
    }
  }

  // Custom amAcceptingPopups function.
  // returns existing amAcceptingPopups function if exists
  async amAcceptingPopups() {
    const helper = this.helpers['Puppeteer'] || this.helpers['WebDriver'];
    try {
      if (typeof helper.amAcceptingPopups == 'function') return helper.amAcceptingPopups.call(arguments);
    } catch(err) {
      console.log('CodeceptJs Custom Helper "amAcceptingPopups" Error:', err);
    }
  }

  // Custom myFunc function.
  // Test function. Just calls click function
  async myFunc(xpath) {
    const helper = this.helpers['Puppeteer'] || this.helpers['WebDriver'];
    try {
      await helper.click(xpath);
    } catch(err) {
      console.log('CodeceptJs Custom Helper "myFunc" Error:', err);
    }
  }
}

module.exports = customHelpers;