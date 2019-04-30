var assert = require('assert');
var value = '';

Feature('object');

Scenario('should respect property orders', async (I) => {
  I.amOnPage('object.html');
  value = await I.grabAttributeFrom('[data-schemapath^="root"] .row:nth-of-type(1) [data-schemapath^="root."]', 'data-schemapath');
  assert.equal(value, 'root.age');
  value = await I.grabAttributeFrom('[data-schemapath^="root"] .row:nth-of-type(2) [data-schemapath^="root."]', 'data-schemapath');
  assert.equal(value, 'root.name');
  value = await I.grabAttributeFrom('[data-schemapath^="root"] .row:nth-of-type(3) [data-schemapath^="root."]', 'data-schemapath');
  assert.equal(value, 'root.single');
  value = await I.grabAttributeFrom('[data-schemapath^="root"] .row:nth-of-type(4) [data-schemapath^="root."]', 'data-schemapath');
  assert.equal(value, 'root.values');
  value = await I.grabAttributeFrom('[data-schemapath^="root"] .row:nth-of-type(5) [data-schemapath^="root."]', 'data-schemapath');
  assert.equal(value, 'root.zodiac');
});

Scenario('should validate required properties', async (I) => {
  I.amOnPage('object.html');
  I.see('Value must be at least 18.');
});

Scenario('should validate also not required properties', async (I) => {
  I.amOnPage('object.html');
  I.see('Value must be at least 3 characters long.');
});

Scenario('rows and columns', (I) => {
  I.amOnPage('grid-strict.html');
  I.seeNumberOfVisibleElements('.row', 7);
  I.seeNumberOfVisibleElements('.col-md-3', 11);
  I.seeElement('.col-md-offset-9');
  I.seeElement('.col-md-offset-6');
  I.seeElement('.col-md-offset-3');
});
