var assert = require('assert');

Feature('inheritance');

Scenario('should display all required fields in the allOf hierarchy', async (I) => {
  I.amOnPage('inheritance.html');
  I.seeElement('[data-schemapath="root.breed"]');
  I.seeElement('[data-schemapath="root.numLegs"]');
  I.seeElement('[data-schemapath="root.id"]');
});

