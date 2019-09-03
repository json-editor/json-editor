var assert = require('assert');

Feature('multiselect');

Scenario('should be disabled if "readonly" is specified', async (I) => {
  I.amOnPage('read-only.html');
  //I.seeElement('[name="root[multiselect]"]');
  //assert.equal(await I.grabAttributeFrom('[name="root[multiselect]"]', 'disabled'), true);
  I.seeElement('[name="root[multiselect]"]:disabled');
});
