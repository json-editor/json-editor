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