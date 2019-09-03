var assert = require('assert');

Feature('rating');

Scenario('should be disabled if "readonly" is specified', async (I) => {
  I.amOnPage('read-only.html');
  //assert.equal(await I.grabAttributeFrom('[id="root[rating]5"]', 'disabled'), true);
  //assert.equal(await I.grabAttributeFrom('[id="root[rating]4"]', 'disabled'), true);
  //assert.equal(await I.grabAttributeFrom('[id="root[rating]3"]', 'disabled'), true);
  //assert.equal(await I.grabAttributeFrom('[id="root[rating]2"]', 'disabled'), true);
  //assert.equal(await I.grabAttributeFrom('[id="root[rating]1"]', 'disabled'), true);

  // Fails because the input element is not visible (display: none)
  //I.seeElement('[id="root[rating]5"]:disabled');
  //I.seeElement('[id="root[rating]4"]:disabled');
  //I.seeElement('[id="root[rating]3"]:disabled');
  //I.seeElement('[id="root[rating]2"]:disabled');
  //I.seeElement('[id="root[rating]1"]:disabled');

  assert.equal(await I.grabBooleanAttributeFrom('[id="root[rating]5"]', 'disabled'), true);
  assert.equal(await I.grabBooleanAttributeFrom('[id="root[rating]4"]', 'disabled'), true);
  assert.equal(await I.grabBooleanAttributeFrom('[id="root[rating]3"]', 'disabled'), true);
  assert.equal(await I.grabBooleanAttributeFrom('[id="root[rating]2"]', 'disabled'), true);
  assert.equal(await I.grabBooleanAttributeFrom('[id="root[rating]1"]', 'disabled'), true);
});
